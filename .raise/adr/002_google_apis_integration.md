# ADR-002: Google APIs Integration Strategy

## Status
Accepted

## Context
Family activity tracker needs integration with Google Tasks, Calendar, and Photos APIs for a seamless experience leveraging existing Google services.

## Decision
Use **client-side Google API calls** with JavaScript SDK for direct browser-to-Google communication.

## Rationale
- **Simplicity**: No server-side proxy complexity
- **Real-time**: Direct API access for immediate updates
- **Google ecosystem**: Leverages existing family Google accounts
- **Minimal infrastructure**: Client-side only, no backend services needed

## Implementation
- Firebase Authentication provides Google OAuth tokens
- Google APIs JavaScript library for client-side calls
- Appropriate scopes: tasks.readonly, calendar.events, photos.readonly
- Error handling for network and permission issues

## Consequences
**Positive**: Simple architecture, real-time sync, leverages Google accounts
**Negative**: Network dependency, client-side rate limit handling

## References
- Vision: `.raise/vision.md` - Google services integration requirement
- Stories: `.raise/stories.yaml` - Google Tasks, Calendar, Photos features