# Architecture Decision Record: Frontend Technology Stack

## Status
Accepted

## Context
Family activity tracker needs a simple, maintainable web interface with shared layouts across multiple pages (Home, Activities, Activity Detail, Login). The app integrates with Google services and should be easy to host and maintain for personal family use.

## Decision
Use **Eleventy (11ty)** for templating with **modern HTML5, CSS, and progressive HTMX enhancement**.

## Rationale
- **HTML-first approach**: Start with semantic HTML and CSS, add HTMX only when needed
- **Zero framework complexity**: No build-time JavaScript frameworks or complex tooling
- **Shared templates**: 11ty eliminates header/footer duplication across pages
- **Google API ready**: Client-side JavaScript works seamlessly with static output
- **Family-friendly**: Simple to understand and maintain for personal project
- **Fast loading**: Static HTML/CSS loads quickly on any device

## Implementation
1. 11ty for templating and shared layouts
2. Modern HTML5 with semantic markup
3. CSS for styling and responsive design
4. Client-side JavaScript for Google API integration
5. HTMX for progressive enhancement only after exhausting HTML/CSS capabilities

## Consequences
**Positive**: Simple maintenance, fast performance, easy hosting, minimal complexity
**Negative**: Manual JavaScript for some interactivity, build step for templating

## References
- Sitemap: `.raise/sitemap.yaml` - Page structure
- Design System: `.raise/designs.md` - Interface requirements