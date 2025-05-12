# CLI: Setup Google Resources for Summer to Remember

This CLI tool creates a Google Tasks list, Google Calendar, and Google Photos album for your "Summer to Remember" app. It uses your Google account and allows you to specify custom names for each resource, or use sensible defaults.

## Features
- Creates a Google Tasks list
- Creates a Google Calendar
- Creates a Google Photos album
- Allows custom names via CLI flags

## Prerequisites
- Node.js (v16 or later recommended)
- A Google Cloud project with the following APIs enabled:
  - Google Tasks API
  - Google Calendar API
  - Google Photos Library API
- OAuth 2.0 credentials for a **Desktop** app (download as `credentials.json`)

## Setup
1. **Install dependencies:**
   ```sh
   cd cli
   npm install
   ```
2. **Get OAuth credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Select your project at the top of the page.
   - In the left sidebar, go to **APIs & Services > Credentials**.
   - Click **+ CREATE CREDENTIALS** and choose **OAuth client ID**.
   - If prompted, configure the consent screen (fill in required fields).
   - For **Application type**, select **Desktop app** (not Web app!).
   - The redirect URI should be set to `http://localhost` (this is automatic for Desktop app clients).
   - Give it a name (e.g., "CLI Setup Tool") and click **Create**.
   - Click **Download JSON** in the dialog that appears.
   - **Rename the downloaded file to `credentials.json` and place it in the `cli/` directory.**
   - *Do not commit `credentials.json` to version control.*

## Usage
Run the script from the `cli/` directory:

```sh
node setup_resources.js
```

By default, this will create:
- Tasks list: `Summer to Remember Tasks`
- Calendar: `Summer to Remember Calendar`
- Album: `Summer to Remember Memories`

### Custom Names
You can override the default names:

```sh
node setup_resources.js \
  --tasks-name="My Custom Tasks" \
  --calendar-name="My Custom Calendar" \
  --album-name="My Custom Album"
```

Or use short flags:
```sh
node setup_resources.js -t "Todo List" -c "Events" -a "Photos"
```

### First Run: Authentication
- On first run, the script will prompt you to visit a URL and paste back an authentication code.
- The resulting token will be saved as `token.json` for future runs.
- **After authorizing in your browser, you may see a blank or error page. This is normal! Copy the `code` value from the URL in your browser's address bar and paste it into your terminal when prompted.**

## Output
The script will print the IDs of the created resources. Save these if you need to reference them in your app.

## Troubleshooting
- **Missing credentials.json:** Download it from Google Cloud Console and place it in `cli/`.
- **Missing token.json:** This is normal on first run; it will be created after authentication.
- **API errors:** Make sure the required APIs are enabled in your Google Cloud project.

## License
MIT (or your preferred license) 