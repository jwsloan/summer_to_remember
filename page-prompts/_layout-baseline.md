# Layout Baseline

> Applies to every page unless overridden.

## Global Layout
- Top app bar: <app-header> (title + buttons)
- Vertical scroll, horizontal padding 1rem–1.5rem
- Max content width 720px, centered on wide screens
- Touch-target minimum 40px height
- **Google-inspired look:** Use color palette, spacing, and typography similar to Google Calendar, Tasks, and Photos. Surfaces are clean, with subtle shadows and rounded corners. UI should feel native to Google services.
- Use Shoelace components for buttons and inputs, styled with custom CSS variables for Google-like theming.

## Typography
- Font: Roboto
- Base size: 14px; Headings: 18px; Labels: 12px

## Spacing & Structure
- Section/card gap: 1rem
- Border radius: 8px
- Box shadow: 0 1px 2px rgba(0,0,0,0.1)

## Colors
- Background: #ffffff
- Surface: #f8f9fa
- Border: #dadce0
- Primary: #1a73e8
- Text: #202124
- Muted: #5f6368

## LLM Guidance
- Reference real-world analogies (“like Google Calendar”)
- Use named components (<task-card>, <photo-tile>, etc.)
- Rely on CSS variables defined in style.css
- All UI should feel like a natural extension of Google's own apps.
