
function renderProfile(user) {
  const profileSection = document.querySelector('.user-profile');
  if (!user) {
    profileSection.innerHTML = '';
    return;
  }
  profileSection.innerHTML = `
    <div class="profile-info">
      <img src="${user.photoURL}" alt="Profile" class="profile-img" style="height:40px;width:40px;border-radius:50%;vertical-align:middle;">
      <span class="profile-name">${user.displayName}</span>
    </div>
  `;
}

function renderUpcoming(activities) {
  const list = document.querySelector('.activities-list');
  if (!list) return;
  if (!activities.length) {
    list.innerHTML = '<p>No upcoming activities.</p>';
    return;
  }
  list.innerHTML = activities.map(a => `
    <div class="activity-item">
      <span class="activity-title">${a.title}</span>
      <span class="activity-date">${a.dueDate}</span>
    </div>
  `).join('');
}

function renderToday(count) {
  const countSpan = document.querySelector('.today-count');
  if (countSpan) countSpan.textContent = `${count} task${count === 1 ? '' : 's'} scheduled for today`;
}

function mockFetchActivities() {
  // Replace with Firestore/Google Tasks fetch later
  return [
    { title: 'Picnic at the park', dueDate: '2024-06-15' },
    { title: 'Visit museum', dueDate: '2024-06-16' },
    { title: 'Family movie night', dueDate: '2024-06-17' },
  ];
}

function mockFetchTodayCount() {
  // Replace with real logic later
  return 2;
}

function setupGoToToday() {
  const btn = document.querySelector('.go-to-today');
  if (btn) {
    btn.onclick = () => window.location.href = '/today.html';
  }
}

function renderDashboard(state) {
  if (!state.isLoggedIn) {
    window.location.href = '/login.html';
    return;
  }
  renderProfile(state.user);
  renderUpcoming(mockFetchActivities());
  renderToday(mockFetchTodayCount());
  setupGoToToday();
}

// Initial render
renderDashboard(window.s2r.auth.store);
// Subscribe to authStore changes
window.s2r.auth.subscribe(renderDashboard); 