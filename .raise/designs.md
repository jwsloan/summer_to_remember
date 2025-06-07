# Summer to Remember - Design System & Screens

## Design Principles
- **Elegant Simplicity**: Clean, uncluttered interfaces that focus on content over decoration
- **Family-Friendly**: Large touch targets, readable fonts, intuitive navigation for all ages
- **Content First**: Let photos and memories be the star, not the interface
- **Minimal Color Palette**: Neutral background with one accent color for key actions

## Design System

### Colors
- **Background**: White (#FFFFFF)
- **Text**: Dark gray (#333333)
- **Secondary Text**: Medium gray (#666666)
- **Accent**: Warm blue (#4A90E2) for primary actions
- **Success**: Soft green (#7ED321) for completed activities
- **Borders**: Light gray (#E5E5E5)

### Typography
- **Headers**: System font, 24px, medium weight
- **Body**: System font, 16px, regular weight
- **Small text**: System font, 14px, regular weight

### Layout
- **Max width**: 800px centered
- **Padding**: 20px on mobile, 40px on desktop
- **Card spacing**: 16px between elements
- **Button height**: 44px minimum for touch

## Screen Designs

### 1. Home Screen
```
┌─────────────────────────────────────────┐
│ Summer to Remember              👤Login │
├─────────────────────────────────────────┤
│                                         │
│    "Making memories that matter"        │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │        Summer Progress              │ │
│ │   🎯 12 Activities Planned          │ │
│ │   ✅ 5 Completed                    │ │
│ │   📸 47 Photos Captured             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │     Recent Activity                 │ │
│ │   Beach Day - Yesterday             │ │
│ │   [3 photos] [2 journal entries]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│        [View All Activities]            │
│                                         │
└─────────────────────────────────────────┘
```

### 2. Activities List
```
┌─────────────────────────────────────────┐
│ ← Summer Activities            [+ Add]   │
├─────────────────────────────────────────┤
│                                         │
│ ▼ Unscheduled (7)                       │
│ ┌─────────────────────────────────────┐ │
│ │ 🎢 Amusement Park                   │ │
│ │ Everyone's excited for this one!    │ │
│ │                    [Schedule] [→]   │ │
│ └─────────────────────────────────────┘ │
│ ┌─────────────────────────────────────┐ │
│ │ 🏕️ Camping Trip                     │ │
│ │ Dad's been planning this            │ │
│ │                    [Schedule] [→]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ▼ Scheduled (3)                         │
│ ┌─────────────────────────────────────┐ │
│ │ 🎭 Local Theater Show               │ │
│ │ July 15th, 7:00 PM                  │ │
│ │                              [→]    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ▼ Completed (2)                         │
│ ┌─────────────────────────────────────┐ │
│ │ ✅ Beach Day                        │ │
│ │ June 1st - Amazing sunset!          │ │
│ │ 📸 5 photos 📝 3 entries      [→]   │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 3. Activity Detail Screen
```
┌─────────────────────────────────────────┐
│ ← Beach Day                    [Edit]   │
├─────────────────────────────────────────┤
│                                         │
│ 🏖️ Beach Day                            │
│ June 1st, 2025 - Completed ✅           │
│                                         │
│ "Perfect weather for our first beach    │
│ trip of the summer!"                    │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │           Photos (5)                │ │
│ │ ┌─────┐ ┌─────┐ ┌─────┐ [+3 more]   │ │
│ │ │ IMG │ │ IMG │ │ IMG │             │ │
│ │ └─────┘ └─────┘ └─────┘             │ │
│ │              [View Album]           │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │        Family Memories              │ │
│ │                                     │ │
│ │ 👨 Dad: "Kids loved the sandcastles" │ │
│ │ 👩 Mom: "Best sunset ever!"         │ │
│ │ 👧 Emma: "Found so many shells!"    │ │
│ │                                     │ │
│ │          [Add Your Memory]          │ │
│ └─────────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### 4. Add Activity Screen
```
┌─────────────────────────────────────────┐
│ ← Add New Activity                      │
├─────────────────────────────────────────┤
│                                         │
│ Activity Name                           │
│ ┌─────────────────────────────────────┐ │
│ │ Hiking at Bear Mountain             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Description                             │
│ ┌─────────────────────────────────────┐ │
│ │ Family hike with picnic lunch       │ │
│ │                                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Family Hopes                            │
│ ┌─────────────────────────────────────┐ │
│ │ 👨 Dad: See the waterfall           │ │
│ │ 👩 Mom: Quality family time         │ │
│ │ 👧 Emma: Take nature photos         │ │
│ │                                     │ │
│ │        [Add Hope] [Remove]          │ │
│ └─────────────────────────────────────┘ │
│                                         │
│             [Save Activity]             │
│                                         │
└─────────────────────────────────────────┘
```

## Mobile Considerations
- All designs stack vertically on mobile
- Navigation becomes hamburger menu
- Cards maintain 16px margins
- Touch targets remain 44px minimum
- Font sizes stay readable (16px+)

## Integration Points
- **Google Tasks**: Activity list sync
- **Google Calendar**: Scheduling widget embedded
- **Google Photos**: Album viewer component
- **Firebase**: Simple Google sign-in button