# Summer to Remember Development Plan

## Technology Stack
- **Eleventy (11ty)**: Static site generation with shared templates
- **HTML5/CSS**: Semantic markup and responsive styling
- **JavaScript**: Google API integration and basic interactivity
- **Firebase Auth**: Google OAuth for family access
- **HTMX**: Progressive enhancement (only when HTML/CSS exhausted)

## Development Phases

### Phase 1: Foundation & Testing Infrastructure ✅ COMPLETE
**Files Created:**
- `package.json` - 11ty and testing dependencies
- `.eleventy.js` - 11ty configuration
- `src/_includes/base.njk` - Base layout template with navigation
- `src/index.njk` - Home page dashboard
- `src/css/styles.css` - Complete design system styles
- `src/js/auth.js` - Placeholder for Firebase authentication
- `tests/navigation.spec.js` - Playwright navigation tests
- `playwright.config.js` - Test configuration
- `setup-hooks.sh` - Developer onboarding script
- `.git/hooks/pre-commit` - Quality assurance automation

**Completed:**
- ✅ 11ty project initialized with shared templates
- ✅ Responsive CSS implementing full design system with summer theme
- ✅ App-focused dashboard layout (vs marketing-style layouts)
- ✅ Elegant color palette with turquoise/ocean, sunset orange, nature green
- ✅ Navigation structure updated to Dashboard|Activities|Login
- ✅ HTML validation with html-validate
- ✅ Playwright testing for navigation and responsive design
- ✅ Pre-commit hooks ensuring code quality
- ✅ Lighthouse performance standards established (ADR-007)
- ✅ Current scores: Performance 95, Accessibility 94, Best Practices 92, SEO 73

### Phase 2: Authentication ✅ COMPLETE
**Files Created:**
- ✅ `src/login.njk` - Login page with FirebaseUI
- ✅ `src/js/firebase-config.js` - Firebase project configuration
- ✅ `src/js/auth.js` - Complete Firebase authentication implementation
- ✅ `src/_includes/nav.njk` - Modular navigation component

**Completed:**
- ✅ Firebase Authentication with Google OAuth
- ✅ FirebaseUI integration for seamless sign-in experience
- ✅ Dynamic navigation updating based on auth state
- ✅ User display name shown when signed in
- ✅ Sign-out functionality with confirmation dialog
- ✅ Auth state persistence across page reloads
- ✅ Mobile and desktop navigation support
- ✅ Automatic redirect handling (login ↔ dashboard)
- ✅ Cleaned up Firebase config duplication between auth.js and firebase-config.js

**Next:** Google Tasks integration for activity idea management

### Phase 3: Google Tasks Integration ⚡ CURRENT
**Files to Create:**
- `src/js/google-tasks.js` - Google Tasks API integration
- `src/activities.njk` - Task ideas viewing and prioritization page
- Update `src/js/auth.js` - Add Tasks API scope to authentication
- `src/js/local-storage.js` - Priority and notes storage

**Current Sprint Goals:**
1. **Story 004: View Task Ideas from Google Tasks**
   - Set up Google Tasks API integration with proper scopes
   - Create or connect to "Summer 2024 Activities" task list on first login
   - Display tasks in clean interface on /activities/ page
   - Handle API errors gracefully

**Architecture Foundation (ADR-008):**
- Google Tasks = Activity idea pool (family brainstorming)
- Local storage = Priority rankings and family notes  
- Future: Google Calendar = Scheduled activities
- Future: Google Photos = Activity memories

**Implementation Notes:**
- Use existing Firebase Auth to get Google OAuth tokens
- Add `https://www.googleapis.com/auth/tasks` scope
- Create dedicated task list to avoid mixing with personal tasks
- Store local priority/notes with task IDs as keys

### Phase 4: Activity Promotion & Scheduling
**Files to Create:**
- `src/js/google-calendar.js` - Calendar API integration
- Enhanced activity prioritization UI
- Task-to-calendar promotion workflow

**Features:**
- Prioritize and add notes to task ideas (Story 005)
- Promote tasks to scheduled calendar events (Story 006)
- View scheduled activities from calendar (Story 007)

### Phase 4: Memories & Polish
**Files to Create:**
- `src/js/memories.js` - Journal entry functionality
- Enhanced CSS for photo galleries
- Form handling for activity creation

**Features:**
- Family journal entries
- Photo viewing and organization
- Activity completion tracking
- Basic offline caching

## Key Principles
- Start with semantic HTML and CSS
- Add JavaScript only for Google API integration
- Use HTMX only after exhausting HTML/CSS capabilities
- Keep complexity minimal for family use
- Leverage Google services for data storage

## Quality Assurance
- **Testing**: Playwright for navigation and responsive design
- **HTML Validation**: html-validate for clean markup
- **Pre-commit Hooks**: Automated build + validation + tests
- **Performance**: Lighthouse standards (ADR-007) targeting 100/100/100/100
- **Developer Setup**: `./setup-hooks.sh` for easy onboarding

## References
- ADR-006: Frontend technology stack decisions
- ADR-007: Lighthouse performance standards
- ADR-002: Google APIs integration approach  
- ADR-008: Google services as data architecture backbone
- User Stories 004-007: Google Tasks workflow implementation
- Sitemap: Page structure and navigation
- Design System: Interface requirements and styling