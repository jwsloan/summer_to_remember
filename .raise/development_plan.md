# Summer to Remember Development Plan

## Technology Stack
- **Eleventy (11ty)**: Static site generation with shared templates
- **HTML5/CSS**: Semantic markup and responsive styling
- **JavaScript**: Google API integration and basic interactivity
- **Firebase Auth**: Google OAuth for family access
- **HTMX**: Progressive enhancement (only when HTML/CSS exhausted)

## Development Phases

### Phase 1: Foundation & Authentication
**Files to Create:**
- `package.json` - 11ty and basic dependencies
- `.eleventy.js` - 11ty configuration
- `src/_includes/base.njk` - Base layout template
- `src/index.njk` - Home page
- `src/login.njk` - Login page
- `src/js/auth.js` - Firebase authentication
- `src/css/styles.css` - Design system styles

**Setup:**
- Initialize 11ty project
- Configure Firebase Authentication with Google provider
- Implement shared layout with navigation from sitemap
- Basic responsive CSS following design system

### Phase 2: Activities & Google Integration
**Files to Create:**
- `src/activities.njk` - Activities list page
- `src/activity.njk` - Activity detail template
- `src/js/google-apis.js` - Tasks, Calendar, Photos integration
- `src/js/activities.js` - Activity management

**Features:**
- View activities (unscheduled, scheduled, completed)
- Add new activities
- Schedule activities to Google Calendar
- Basic photo display from Google Photos

### Phase 3: Memories & Polish
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

## References
- ADR-006: Frontend technology stack decisions
- ADR-002: Google APIs integration approach
- Sitemap: Page structure and navigation
- Design System: Interface requirements and styling