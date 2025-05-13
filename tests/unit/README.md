# Unit Tests for Summer to Remember

This directory contains unit tests for all reactive store logic and state transitions, as required by [ADR-001](../../ADRs/adr-001-reactivity.md).

## Coverage Requirements
- 100% unit test coverage for:
  - Store logic and state transitions
  - All actions (including async logic and error handling)
  - Component behaviors that depend on state
  - Edge cases (e.g., state resets, permission changes, failed fetches)

## Running Tests

Use your preferred test runner (e.g., Jest, Vitest, or a browser-based runner) to execute all tests in this directory.

```
# Example with Jest (if installed globally)
jest tests/unit
```

All new store modules and actions must include corresponding unit tests to maintain full coverage. 