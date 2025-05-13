# ADR-001: Integrate Google Services with SvelteKit Frontend

**Status**: Accepted  
**Date**: 2025-05-12 (updated for SvelteKit migration)

---

## Context

The application integrates Google Tasks, Calendar, and Photos to help users plan, schedule, and capture memories. Originally, the frontend was implemented with vanilla JS and web components. We have now migrated to a SvelteKit-based frontend for improved developer experience, maintainability, and speed.

## Decision

- The frontend will be built with SvelteKit and Svelte components.
- Google APIs (Tasks, Calendar, Photos, Picker) will be accessed from the SvelteKit app using OAuth tokens managed by Firebase Authentication.
- State management will use Svelte stores for reactivity and modularity.
- Firebase remains the backend for authentication, Firestore database, and hosting.
- Shoelace will be used for prebuilt UI components, integrated within Svelte components.

## Consequences

- Enables a modern, component-based architecture with SvelteKit.
- Simplifies state management and reactivity using Svelte stores.
- Maintains secure, scalable backend services with Firebase.
- UI development is faster and more maintainable with Svelte and Shoelace.
