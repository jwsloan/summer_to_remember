# ADR-001: Use Reactive Store with Proxy for State Management (with Future SPA Compatibility and Full Test Coverage)

**Status**: Accepted  
**Date**: 2025-05-12

---

## Context

The application is a multi-page web app designed to be lightweight and dependency-free, using Web Components, vanilla JavaScript, and CSS. As features such as calendar integration, task planning, and photo management are added, a consistent and reactive state management approach is needed.

This solution must support the current multi-page structure while allowing for an easy future transition to a single-page application (SPA) if needed.

---

## Decision

We will implement a lightweight reactive store using the JavaScript `Proxy` API.

Key properties:

- Application state will live in modular, scoped store files (e.g., `authStore.js`, `calendarStore.js`).
- Components and business logic will interact with state through explicit, named actions.
- State updates will trigger subscriber callbacks, enabling reactive DOM updates.
- State and rendering logic will be cleanly separated to support composability and testing.
- State can be persisted or hydrated per page using `localStorage`, cookies, or server-side data injection.

**We require 100% unit test coverage** for:
- Store logic and state transitions
- All actions (including async logic and error handling)
- Component behaviors that depend on state
- Edge cases (e.g., state resets, permission changes, failed fetches)

This coverage ensures reliability, enables confident refactoring, and provides strong support for future AI-assisted code generation.

---

## Consequences

- Enables reactive data flows without introducing third-party dependencies or runtime frameworks.
- Makes app logic modular, testable, and portable between pages or routes.
- Reduces friction when converting the app to an SPA in the future.
- Adds a disciplined layer of abstraction to enforce state hygiene and testability.
