# Summer to Remember

A family activity tracker web app for making memories that matter throughout the summer.

## Overview

Summer to Remember helps families plan, track, and remember their summer activities together. Built with simplicity and family participation in mind, it provides an elegant dashboard to view progress, manage activities, and capture memories with photos and family notes.

## Features

- **Dashboard**: Summer progress overview with activity stats and recent highlights
- **Activity Management**: Plan, schedule, and track family activities
- **Photo Integration**: Connect with Google Photos for activity albums
- **Family Memories**: Capture thoughts and memories from each family member
- **Google Integration**: Seamlessly works with Google Calendar, Tasks, and Photos

## Technology Stack

- **11ty (Eleventy)**: Static site generation with shared templates
- **HTML5/CSS**: Semantic markup with elegant summer-themed design system
- **Firebase Auth**: Google OAuth for family member authentication
- **Google APIs**: Integration with Calendar, Tasks, and Photos
- **Progressive Enhancement**: HTML/CSS first, JavaScript only when needed

## Design Philosophy

- **Clean Elegance**: Modern app-style interface with summer color palette
- **Family-Friendly**: Intuitive for all ages and tech comfort levels
- **Memories Over Features**: Focus on capturing meaningful moments
- **Simplicity Wins**: Minimal complexity, maximum usability

## Development

### Prerequisites
- Node.js and npm
- Firebase project (for authentication and data)
- Google Cloud project (for API access)

### Setup
```bash
git clone [repository-url]
cd summer_to_remember
npm install
./setup-hooks.sh  # Sets up pre-commit hooks
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run all tests
```

### Testing
- **Playwright**: Navigation and responsive design testing
- **HTML Validation**: Semantic markup validation with html-validate
- **Pre-commit Hooks**: Automated quality checks before commits

## RAISE Methodology

This project follows the [RAISE methodology](https://useraise.dev) for structured development:

- **Requirements**: Vision and values in `.raise/`
- **Architecture**: ADRs document technical decisions
- **Implementation**: User stories guide feature development
- **Stories**: User journeys define the experience
- **Execution**: Development plan tracks progress

See the `.raise/` directory for complete project foundation documents.

## Project Structure

```
src/
├── _includes/          # Reusable templates
│   ├── base.njk       # Base HTML layout
│   ├── nav.njk        # Navigation component
│   └── activity-card.njk  # Activity display component
├── css/
│   └── styles.css     # Complete design system
├── js/                # JavaScript for Google integrations
└── [pages].njk        # Page templates

.raise/                # RAISE methodology artifacts
├── vision.md          # Project vision
├── values.yaml        # Core values
├── designs.md         # Design system documentation
├── sitemap.yaml       # Site structure
└── user_stories/      # User journey definitions
```

## Contributing

1. Review the `.raise/` artifacts to understand project goals
2. Follow the design system patterns in `src/css/styles.css`
3. Use semantic HTML and progressive enhancement
4. Test thoroughly with `npm run test`
5. Pre-commit hooks ensure code quality

## License

MIT License - see LICENSE file for details