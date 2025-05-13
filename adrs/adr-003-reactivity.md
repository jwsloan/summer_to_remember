# ADR-003: Use Svelte's Built-in Reactivity and Stores for State Management

**Status**: Accepted  
**Date**: 2025-05-12 (updated for SvelteKit migration)

---

## Context

The application is now a SvelteKit app, using Svelte components and stores. Svelte provides a built-in, idiomatic reactivity system and store pattern that is well-suited for modular, testable, and reactive state management. This replaces the need for a custom Proxy-based store.

---

## Decision

- Use Svelte's built-in reactivity (reactive assignments, `$:` labels) for local component state.
- Use Svelte stores (`writable`, `readable`, `derived`) for shared and global state.
- Organize state logic in modular store files (e.g., `authStore.ts`, `calendarStore.ts`).
- Ensure all store logic and state transitions are covered by unit tests (using Vitest).
- Maintain a clear separation between state, actions, and UI components.

---

## Consequences

- Enables reactive data flows using Svelte's idiomatic patterns.
- Makes app logic modular, testable, and portable between components and routes.
- Reduces friction for future refactoring and feature growth.
- Leverages Svelte's ecosystem and best practices for state management.
