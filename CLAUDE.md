# Development Workflow

**Follow this sequence for any changes:**

1. **Understand the RAISE foundation** - Check https://useraise.dev to understand the methodology
2. **Review all `.raise/` artifacts** - Vision, values, user stories, designs, and sitemap provide complete context and requirements  
3. **Read `.raise/development_plan.md`** - Follow the established roadmap and current phase
4. **Study `.raise/designs.md`** - Use the summer-themed design system (see `src/index.njk` as reference implementation)
5. **Implement** - NO placeholder content, always use established component patterns from design system
6. **Test** - Pre-commit hooks run `npm run build` and `npm run test` automatically

## Project Context

This is a **family activity tracker app**, not a marketing website. Design and UX should be:
- **App-focused**: Dashboard-style layouts, functional over promotional
- **Family-friendly**: Intuitive for all ages and tech comfort levels  
- **Memory-centered**: Features that capture and preserve meaningful moments

## Tech Stack Principles

- **HTML/CSS first** - Avoid JavaScript until necessary for Google API integrations
- **11ty for templating** - Use includes and components for reusability
- **Progressive enhancement** - Build up from semantic HTML foundation
- **Google integrations essential** - Calendar, Tasks, Photos, and Firebase Auth are core to the app

## Design System Usage

- **Summer color palette** - Turquoise/ocean, sunset orange, nature green documented in `.raise/designs.md`
- **Component patterns** - Use `.nav-link`, `.stat-card`, `.activity-item`, `.card` classes
- **Responsive approach** - Mobile-first with `<details>` navigation (zero JavaScript)
- **Elegant simplicity** - Clean, uncluttered interfaces that focus on family memories

## Key Files for Reference

- `src/_includes/nav.njk` - Navigation component with mobile hamburger menu
- `src/_includes/activity-card.njk` - Reusable activity display component  
- `src/css/styles.css` - Complete design system with CSS variables
- `src/index.njk` - Dashboard implementation showcasing component usage

## Commit Standards

Follow **Conventional Commits** format:

```
type(scope): brief description

Body paragraph explaining WHY this change was made.
The diff shows WHAT changed - focus the body on the 
motivation, context, and reasoning behind the change.

Refs: story-id (if implementing a user story)
```

**Examples:**
```
feat(navigation): add mobile hamburger menu without JavaScript

Family members need intuitive mobile navigation that works
across all devices and tech comfort levels. Using native
<details> element provides accessible expand/collapse
without JavaScript dependencies.

Refs: ACTIVITIES-001
```

```
fix(dashboard): improve stat card hover states for touch devices

Hover effects weren't accessible on touch devices, making
the interface feel less responsive for mobile family members.

Refs: HOME-001
```

**Types:** feat, fix, docs, style, refactor, test, chore

## Quality Standards

- **Semantic HTML** - Use proper elements and ARIA attributes
- **CSS-only interactions** - Leverage `<details>`, `:hover`, `:focus` states
- **Performance-conscious** - Lighthouse scores targeting 95+ across all metrics
- **Family-accessible** - WCAG AA compliance, large touch targets, readable fonts