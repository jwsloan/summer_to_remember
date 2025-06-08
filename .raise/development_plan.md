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
- ✅ Navigation structure updated to Dashboard|Activities|Photos|Login
- ✅ HTML validation with html-validate
- ✅ Playwright testing for navigation and responsive design
- ✅ Pre-commit hooks ensuring code quality
- ✅ Lighthouse performance standards established (ADR-007)
- ✅ Current scores: Performance 95, Accessibility 94, Best Practices 92, SEO 73

**Next:** Firebase Authentication with Google provider

### Phase 2: Authentication & Google Integration
**Files to Create:**
- `src/login.njk` - Login page
- `src/js/firebase-config.js` - Firebase configuration
- Update `src/js/auth.js` - Firebase authentication implementation
- `src/activities.njk` - Activities list page
- `src/activity.njk` - Activity detail template
- `src/js/google-apis.js` - Tasks, Calendar, Photos integration
- `src/js/activities.js` - Activity management

**Features:**
- Firebase Authentication with Google OAuth
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
- Sitemap: Page structure and navigation
- Design System: Interface requirements and styling