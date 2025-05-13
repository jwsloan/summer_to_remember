# Component: <app-header>

## Purpose
Persistent top bar showing page title and core navigation.

## Initial Features
- Left: Title (e.g., “Login”, “Plan”, “Today”)
- Right: two buttons (“Login”/“Logout” and “Photos”)

## Layout
- Height: 56px; full width; fixed top
- Padding: 0 16px
- Title left-aligned; buttons right-aligned
- Subtle bottom border: 1px solid #dadce0
- **Google-inspired:** Should look and feel like a Google app bar (e.g., Calendar, Tasks). Use Google's color palette, spacing, and iconography where possible. Shoelace or native elements should be styled to match Google's design system.

## Style
- Background: #ffffff
- Font: Roboto 16px bold for title; 14px medium for buttons
- Button color: #1a73e8; text only; padding 8px
- Use Shoelace for buttons, styled with custom CSS variables for Google-like appearance

## Behavior
- Switch "Login" ↔ "Logout" based on auth state
- On narrow screens, collapse buttons into a menu icon

## LLM Guidance
- Use <app-header> in page layouts
- Dynamically render buttons per auth state
- Follow baseline tokens and layout rules
- All header UI should feel like a natural extension of Google's own apps.
