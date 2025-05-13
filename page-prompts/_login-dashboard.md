# Story 001: Google OAuth Login & Dashboard Intro

**As a** returning user  
**I want to** log in using my Google account  
**So that** I can quickly access my activities and manage my tasks

---

## Acceptance Criteria

1. **Login Flow with Google OAuth**
   - User lands on `/login.html`
   - `<app-header>` shows title "Login"
   - **Login button** labeled "Sign in with Google"
     - Clicking triggers Google OAuth flow.
   - On successful login, the user is redirected to `/dashboard.html`
     - User's profile information (name, email) is stored in the session or localStorage
   - **Google-inspired UI:** The login page and button should look and feel like a Google login screen, using Shoelace and custom CSS variables for color, spacing, and typography.

2. **Dashboard View**
   - `<app-header>` title becomes "Dashboard"
   - Shows two sections:
     - **Upcoming**: List of next 3 planned activities (title + due date)
     - **Today**: Count of tasks scheduled for today with a "Go to Today" button
   - **Google profile image** is displayed next to the user's name in the top-right corner of the header
   - "Photos" button in header navigates to `/photos.html`
   - **Google-inspired UI:** The dashboard layout, cards, and buttons should match Google's design system as closely as possible, using Shoelace and custom CSS variables.

3. **LLM Integration**
   - Use `<login-button>` component for Google OAuth
   - Style per `_layout-baseline.md` and `_app-header.md`
   - Handle OAuth in `authStore`, ensure logic is unit-testable for the login state and redirect process

---

## Notes

- Use Google OAuth API for authentication
- Ensure to store the `accessToken` and `idToken` securely in `localStorage` or `sessionStorage`
- Make sure all API calls are authenticated using the `accessToken`
- Include basic error handling (e.g., display message if login fails)
- **All UI should feel like a natural extension of Google's own apps.** 