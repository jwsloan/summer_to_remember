const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');
const readline = require('readline');
const axios = require('axios');

const SCOPES = [
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/photoslibrary',
  'https://www.googleapis.com/auth/photoslibrary.appendonly',
  'https://www.googleapis.com/auth/photoslibrary.readonly',
];
const TOKEN_PATH = path.join(__dirname, 'token.json');
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const IDS_PATH = path.join(__dirname, 'resource_ids.json');

async function authorize() {
  let credentials;
  try {
    credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  } catch (err) {
    console.error('Error loading credentials.json. Download it from Google Cloud Console.');
    process.exit(1);
  }
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  if (fs.existsSync(TOKEN_PATH)) {
    oAuth2Client.setCredentials(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
    return oAuth2Client;
  }
  return getNewToken(oAuth2Client);
}

function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    include_granted_scopes: true
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  console.log('After authorizing, copy the code from the URL in your browser and paste it here.');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve, reject) => {
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return reject('Error retrieving access token');
        oAuth2Client.setCredentials(token);
        fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to', TOKEN_PATH);
        resolve(oAuth2Client);
      });
    });
  });
}

async function getOrCreateTaskList(auth, name) {
  const tasks = google.tasks({ version: 'v1', auth });
  const lists = await tasks.tasklists.list();
  const found = (lists.data.items || []).find(l => l.title === name);
  if (found) {
    console.log(`Task list '${name}' already exists. Using existing.`);
    return found;
  }
  const res = await tasks.tasklists.insert({ requestBody: { title: name } });
  return res.data;
}

async function getOrCreateCalendar(auth, name) {
  const calendar = google.calendar({ version: 'v3', auth });
  const cals = await calendar.calendarList.list();
  const found = (cals.data.items || []).find(c => c.summary === name);
  if (found) {
    console.log(`Calendar '${name}' already exists. Using existing.`);
    return found;
  }
  const res = await calendar.calendars.insert({ requestBody: { summary: name } });
  return res.data;
}

async function getOrCreateAlbum(auth, name) {
  const accessToken = (await auth.getAccessToken()).token;
  let albums = [];
  let nextPageToken = undefined;
  do {
    const res = await axios.get(
      'https://photoslibrary.googleapis.com/v1/albums',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { pageSize: 50, pageToken: nextPageToken }
      }
    );
    albums = albums.concat(res.data.albums || []);
    nextPageToken = res.data.nextPageToken;
  } while (nextPageToken);

  const found = albums.find(a => a.title === name);
  if (found) {
    console.log(`Album '${name}' already exists. Using existing.`);
    return found;
  }
  const createRes = await axios.post(
    'https://photoslibrary.googleapis.com/v1/albums',
    { album: { title: name } },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return createRes.data;
}

(async () => {
  const auth = await authorize();
  console.log('Authenticated with Google.');

  // Load previous IDs if present
  let ids = {};
  if (fs.existsSync(IDS_PATH)) {
    ids = JSON.parse(fs.readFileSync(IDS_PATH, 'utf8'));
  }

  // Google Tasks list
  const taskList = await getOrCreateTaskList(auth, 'Summer to Remember Tasks');
  ids.tasks = { id: taskList.id, title: taskList.title };

  // Google Calendar
  const calendar = await getOrCreateCalendar(auth, 'Summer to Remember Calendar');
  ids.calendar = { id: calendar.id, summary: calendar.summary };

  // Google Photos album (not idempotent: always create new)
  const album = await (async () => {
    const accessToken = (await auth.getAccessToken()).token;
    const createRes = await axios.post(
      'https://photoslibrary.googleapis.com/v1/albums',
      { album: { title: 'Summer to Remember Memories' } },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    return createRes.data;
  })();
  ids.album = { id: album.id, title: album.title };

  // Save IDs
  fs.writeFileSync(IDS_PATH, JSON.stringify(ids, null, 2));
  console.log(`\nResource IDs saved to ${IDS_PATH}`);

  console.log('\nResources:');
  console.log(`- Tasks list: ${taskList.title} (ID: ${taskList.id})`);
  console.log(`- Calendar: ${calendar.summary} (ID: ${calendar.id})`);
  console.log(`- Album: ${album.title} (ID: ${album.id})`);
})();
