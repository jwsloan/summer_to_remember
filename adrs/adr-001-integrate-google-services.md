# ADR-001: Integrate Google Services with Frontend

**Status**: Accepted  
**Date**: 2025-05-12 (updated for technology stack migration)

---

## Context

The application integrates Google Tasks, Calendar, and Photos to help users plan, schedule, and capture memories. Originally, the frontend had a different architecture. We have now migrated to an improved frontend architecture for better developer experience, maintainability, and speed.

## Decision

- The frontend will be built using a modular and reusable component-based approach.
- Google APIs (Tasks, Calendar, Photos, Picker) will be accessed from the app using OAuth tokens managed by Firebase Authentication.
- State management will ensure reactivity and modularity.
- Firebase remains the backend for authentication, Firestore database, and hosting.
- Prebuilt UI components may be used to accelerate development.

## Consequences

- Enables an improved frontend architecture.
- Simplifies state management and reactivity.
- Maintains secure, scalable backend services with Firebase.
