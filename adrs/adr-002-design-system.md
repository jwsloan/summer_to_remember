# ADR-002: Adopt a Google-Inspired Design System Using CSS Variables and Utility Classes

**Status**: Accepted  
**Date**: 2025-05-12

---

## Context

This app integrates Google Tasks, Calendar, and Photos, and should feel visually consistent with those tools. As a backend-heavy team relying on LLM assistance, we need an opinionated, easy-to-reference styling system without frameworks.

---

## Decision

Use **vanilla CSS** with **custom properties** to define a shared design system:

- All styles live in a single `style.css`
- Define tokens for colors, typography, spacing, and radius
- Style components (Web Components or HTML) via utility classes and scoped selectors
- Prompt LLMs with real-world analogies (“like Google Calendar”) and component names

---

## Consequences

- Consistent, familiar UI for users of Google apps
- No CSS-framework bloat—bundle remains lightweight
- LLM-friendly prompts and easy global theming via variables
- Foundation for rapid, coherent design growth
