# ADR-002: Adopt a Google-Inspired Design System Using CSS Variables, Svelte Components, and Shoelace

**Status**: Accepted  
**Date**: 2025-05-12 (updated for SvelteKit migration)

---

## Context

This app integrates Google Tasks, Calendar, and Photos, and should feel visually consistent with those tools. As we migrate to SvelteKit, we want to maintain an opinionated, easy-to-reference styling system that leverages Svelte's component model and scoped styles, while still using CSS variables for global theming.

---

## Decision

- Use **Svelte components** for all UI structure and logic.
- Use **CSS custom properties** (variables) to define a shared design system for colors, typography, spacing, and radius.
- Style components via Svelte's scoped styles and utility classes, referencing global tokens.
- Use **Shoelace** for prebuilt, accessible UI components, styled with our design tokens.
- Prompt LLMs with real-world analogies (“like Google Calendar”) and component names.

---

## Consequences

- Consistent, familiar UI for users of Google apps
- No CSS-framework bloat—bundle remains lightweight
- LLM-friendly prompts and easy global theming via variables
- Foundation for rapid, coherent design growth using Svelte's component model
