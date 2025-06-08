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

**Authentication & Scopes:**
- Firebase Authentication provides Google OAuth tokens (implemented ✅)
- Required API scopes:
  - `https://www.googleapis.com/auth/tasks` - Read/write Google Tasks
  - `https://www.googleapis.com/auth/calendar.events` - Create/read calendar events  
  - `https://www.googleapis.com/auth/photoslibrary.readonly` - View Google Photos albums
- Google APIs JavaScript library for client-side calls
- CDN-based Firebase integration for maximum compatibility

**Error Handling Strategy:**
- Network connectivity issues: Show offline indicators
- Permission denied: Clear user communication and re-auth flow  
- API rate limits: Implement exponential backoff
- Service unavailable: Graceful degradation with cached data

**Current Status:**
- ✅ Firebase Auth with Google OAuth implemented
- ✅ CDN-based Firebase SDK integration
- 🎯 Next: Google Tasks API integration with task list creation

## Consequences
**Positive**: Simple architecture, real-time sync, leverages Google accounts
**Negative**: Network dependency, client-side rate limit handling

## References
- Vision: `.raise/vision.md` - Google services integration requirement
- Stories: `.raise/stories.yaml` - Google Tasks, Calendar, Photos features