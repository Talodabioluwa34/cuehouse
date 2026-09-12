# PRD — Church Service Operations Platform

**Product name:** CueHouse  
**Document version:** V1.0  
**Platform:** Web/Desktop-first, with mobile companion later  
**Primary market:** Churches in Nigeria → Africa → global  
**Primary users:** Media operators, pastors, service coordinators  
**Ingested:** 2026-09-11  
**Name locked:** 2026-09-12 (was PureBeam-style / Beam / ServiceFlow / WorshipFlow — killed; see `naming.md`)

---

## 1. Product Vision

Build the operating layer that helps churches run live services smoothly by connecting:

- Scriptures
- Sermon presentations
- Songs
- Announcements
- Videos
- Service schedules
- Media operators
- Pastors/ministers
- Screens/displays

The product should reduce the cognitive load on the media team while giving pastors and service leaders confidence that what they call for will appear quickly and correctly.

### Vision statement

Every church service should flow without the media team fighting the technology.

---

## 2. Problem

Church media teams currently rely on combinations of:

- PowerPoint
- ProPresenter
- EasyWorship
- OBS
- YouTube
- Google Drive
- WhatsApp
- PDF files
- manually searched Bible apps
- USB drives
- laptops
- printed service schedules

This creates operational friction.

### Typical service

Pastor: “Let's look at John 3:16.”

Media operator:

1. Opens Bible app.
2. Searches John.
3. Finds chapter.
4. Finds verse.
5. Copies it.
6. Pastes into presentation.
7. Formats it.
8. Sends it to screen.

By the time the scripture appears, the pastor has already moved on.

---

## 3. Core Problem Statement

Church media teams need a faster and more reliable way to control everything displayed during a live service without constantly switching between applications and manually preparing content while the service is happening.

---

## 4. Target Users

### Primary User — Media Operator

**Profile**

Usually:

- 18–35 years old
- volunteer or paid
- technically capable
- responsible for presentation/media
- works under time pressure
- may operate alone or with a small team

**Jobs to be done**

“When the pastor calls something unexpectedly, help me put it on screen immediately.”

---

## 5. Secondary User — Pastor / Minister

The pastor doesn't necessarily need to operate the software.

They need:

- confidence
- speed
- minimal interruption
- prepared sermon content
- predictable service flow

**Job**

“I should be able to preach without constantly worrying about whether the media team can follow me.”

---

## 6. Third User — Service Coordinator

Responsible for:

- service order
- timing
- announcements
- transitions
- speakers
- worship sessions

**Job**

“I need everyone involved in the service to know what happens next.”

---

## 7. Fourth User — Church Administrator

Needs:

- team management
- church settings
- service history
- content management
- permissions
- subscription/billing

---

## 8. Product Positioning

**Don't position it as:**

“Church presentation software.”

**Position it as:**

The control center for your church service.

Or:

Run your church service without the media scramble.

The presentation system is the wedge.  
The long-term product becomes the operating system for live church services.

---

## 9. MVP Scope

The MVP should have six core capabilities.

1. **Service Planning** — Create a service and define its order.
2. **Presentation** — Control what appears on the church screen.
3. **Scripture Search** — Search and display scriptures instantly.
4. **Song Library** — Search and display lyrics.
5. **Media Library** — Manage images/videos/slides.
6. **Live Control** — Operate everything from one interface.

---

## 10. Core Product Architecture

```text
                    CHURCH
                       │
              ┌────────┴────────┐
              │                 │
        SERVICE PLANNING    CONTENT LIBRARY
              │                 │
              └────────┬────────┘
                       │
                 LIVE SERVICE
                       │
          ┌────────────┼────────────┐
          │            │            │
      Scriptures      Songs      Media
          │            │            │
          └────────────┼────────────┘
                       │
                  PRESENTATION
                       │
                 CHURCH SCREENS
```

---

## 11. Dashboard

The dashboard should answer: **What is happening in my church today?**

```text
Dashboard
Good morning, Media Team

NEXT SERVICE
Sunday Celebration
10:00 AM
Today

[Open Service]

────────────────────────

UPCOMING

Sunday Celebration
10:00 AM

Wednesday Bible Study
6:00 PM

────────────────────────

RECENT SERVICES

Sunday Celebration
Sep 6

Wednesday Service
Sep 2

────────────────────────

QUICK ACTIONS

+ New Service
+ Add Song
+ Add Media
Search Scripture
```

---

## 12. Service Builder

This is one of the most important screens.

```text
Create Service
Sunday Celebration
September 13, 2026

ORDER

01  Welcome
02  Opening Prayer
03  Worship
04  Praise
05  Announcements
06  Sermon
07  Offering
08  Closing Prayer

                         LIVE
```

Each item can contain:

- title
- presenter
- notes
- duration
- presentation
- songs
- scriptures
- videos
- images

---

## 13. Drag-and-Drop Service Order

Media operators should be able to rearrange:

```text
☰ Welcome
☰ Worship
☰ Prayer
☰ Sermon
☰ Offering
☰ Announcements
☰ Closing
```

Drag to reorder.

---

## 14. Live Mode

This is the heart of the product.

The operator needs a completely different UI from the administration interface.

```text
Live Mode
┌─────────────────────────────────────────────┐
│ LIVE • Sunday Celebration          10:42 AM │
├───────────────┬─────────────────────────────┤
│ SERVICE       │                             │
│               │       PREVIEW               │
│ Welcome       │                             │
│ Worship       │      John 3:16              │
│ Prayer        │                             │
│ ► Sermon      │                             │
│ Offering      │                             │
│               │                             │
├───────────────┴─────────────────────────────┤
│ [Previous] [BLACK] [GO LIVE] [Next]        │
└─────────────────────────────────────────────┘
```

### Critical principle

Live mode must be radically simpler than the rest of the application.

During service, the operator doesn't need:

- analytics
- settings
- billing
- complicated menus

They need: **Find → Preview → Send**

---

## 15. Instant Scripture

This is potentially the product's strongest feature.

Operator enters: `John 3:16`

System immediately displays:

```text
John 3:16

For God so loved the world...
```

### Search behavior

Allow:

- John 3:16
- John 3
- Romans 8:28
- Psalm 23
- 1 Corinthians 13:4-7

Also support partial search: `God so loved` → matching verses.

---

## 16. Scripture Display

Once selected:

```text
┌─────────────────────────────────┐
│                                 │
│           JOHN 3:16             │
│                                 │
│ For God so loved the world      │
│ that he gave his one and only   │
│ Son...                          │
│                                 │
└─────────────────────────────────┘
```

Operator can choose:

- verse only
- verse + reference
- multiple verses
- split verses across slides

---

## 17. Bible Translation System

Important technical/legal issue.

Do not assume you can freely bundle every popular Bible translation.

The architecture should support:

```text
Bible
 ├── Translation A
 ├── Translation B
 ├── Public-domain translation
 └── Licensed translations
```

Translations requiring licensing should be integrated through appropriate licensing/API agreements.

For MVP, start with translations you are legally permitted to distribute.

---

## 18. Song Library

Churches should be able to create:

```text
Song

Title:
Great Is Thy Faithfulness

Author:
...

Slides:
1. Verse
2. Chorus
3. Verse
4. Chorus
5. Bridge
```

### During live service

Operator clicks: Great Is Thy Faithfulness

Then:

```text
VERSE 1

...

[Send to Screen]
```

---

## 19. Song Import

Potential import formats:

- PowerPoint
- TXT
- CSV
- manually entered lyrics

Later:

- CCLI integration
- song databases
- church-specific libraries

Again, licensing matters for copyrighted lyrics.

---

## 20. Presentation Builder

Users should be able to create slides without PowerPoint.

### Slide types

- Scripture
- Text
- Image
- Video
- Announcement
- Song
- Countdown
- Blank
- Offering
- Title

---

## 21. Templates

Church administrators can define templates.

**Example — Scripture Template**

```text
[Church logo]

JOHN 3:16

For God so loved...
```

**Example — Announcement Template**

```text
MEN'S PRAYER MEETING

Saturday
7:00 AM
```

**Example — Sermon Template**

```text
SERMON TITLE

Pastor Name
```

---

## 22. Brand Settings

Church admin can configure:

- logo
- primary color
- fonts
- background
- scripture style
- song style
- announcement style

Then every presentation automatically uses the church's visual system.

This is where product-design advantage can be significant.

---

## 23. Media Library

Central repository:

```text
MEDIA

Images
Videos
Presentations
Backgrounds
Logos
Audio
Documents
```

Search: Search media...  
Filter: Images | Videos | Presentations

---

## 24. Video Playback

Operator should be able to play:

- sermon clips
- announcement videos
- worship videos
- event promos

Live controls: Play / Pause / Restart / Stop

---

## 25. Display Output

This is a critical technical requirement.

```text
Application
      ↓
Presentation Output
      ↓
Church Display
```

### MVP

Browser-based presentation window.

Example: `http://localhost:3000/display`

- Operator controls from `/control`
- Display screen shows `/display`

This allows:

- Laptop 1 → Operator control
- Projector/TV → Presentation display

---

## 26. Multi-Screen Architecture

Later:

```text
MAIN SCREEN
      │
      ├── Projector
      ├── LED Screen
      ├── Confidence Monitor
      └── Livestream
```

Each output can have different content.

Example:

- Main screen → Scripture
- Confidence monitor → Next slide + speaker notes
- Livestream → Different lower-third layout

---

## 27. Confidence Monitor

Valuable for pastors.

```text
CURRENT

John 3:16

────────────────

NEXT

Romans 5:8

────────────────

NOTES

Transition to offering
```

Pastor can see what's coming without looking at the main screen.

---

## 28. Presenter Mode

Pastor can potentially control the presentation remotely.

Mobile interface:

```text
CURRENT SLIDE

John 3:16

[Previous]

[Next]

[Black]
```

This should be later, not MVP.

---

## 29. Service Timeline

```text
10:00 Welcome       ✓
10:05 Worship       ✓
10:25 Prayer        ✓
10:30 Sermon        ● LIVE
11:15 Offering      ○
11:25 Closing       ○
```

Gives the team situational awareness.

---

## 30. Team Collaboration

Church can invite:

- Media operator
- Pastor
- Worship leader
- Service coordinator
- Admin

| Role | Permissions |
|---|---|
| Owner | Everything |
| Admin | Manage church |
| Media | Live presentation |
| Pastor | View/control service |
| Worship | Songs |
| Coordinator | Service planning |

---

## 31. RBAC

Implement proper role-based access control.

```text
Church
   ↓
Teams
   ↓
Roles
   ↓
Permissions
```

Never rely solely on frontend restrictions. Backend authorization must enforce permissions.

---

## 32. Multi-Church Architecture

This should be SaaS from day one.

```text
Organization
      │
      ├── Users
      ├── Services
      ├── Songs
      ├── Scriptures
      ├── Media
      └── Presentations
```

Every record should belong to a church/organization. Use strict tenant isolation.

If using Supabase: **RLS is mandatory.**

---

## 33. Authentication

Support:

- Email/password
- Google
- magic link

Later:

- Microsoft
- Apple

---

## 34. Onboarding

Church signs up.

1. What's your church name?
2. How many people are on your media team?
3. What do you currently use? (PowerPoint / ProPresenter / EasyWorship / OBS / Other)
4. Create your first service
5. You're ready → [Start Service Setup]

---

## 35. The Killer Onboarding Moment

Don't make them configure 20 things.

Get them to: **Create a service → add a scripture → display it.**

The first “aha” should happen within minutes.

---

## 36. Search Everywhere

Global command/search: ⌘ K

Search across:

- John 3:16
- Great Is Thy Faithfulness
- Men's Meeting
- Sunday Service
- Pastor David

Results grouped: SCRIPTURES / SONGS / SERVICES / MEDIA

This could eventually become one of the product's strongest UX features.

---

## 37. Keyboard Shortcuts

Live operators love keyboard shortcuts.

| Shortcut | Action |
|---|---|
| Space | Go live |
| ← | Previous |
| → | Next |
| B | Black screen |
| S | Search |
| Esc | Exit |
| Ctrl/Cmd + K | Command search |

---

## 38. Emergency Controls

The operator should always have:

- **Black screen** — Immediately hide presentation
- **Freeze** — Freeze current screen
- **Clear** — Remove current content
- **Emergency slide** — Show predefined “Service will resume shortly.”

These should be accessible without navigating through menus.

---

## 39. Offline Mode

This is not optional for the target market.

Church internet connections can fail. The service should continue operating if internet = 0.

Previously downloaded services, songs, scriptures, images, and videos should remain available.

---

## 40. Local-First Architecture

**Recommended:**

```text
Cloud
  ↕
Local App
  ↓
Presentation Engine
  ↓
Display
```

**Not:**

```text
Internet
 ↓
Cloud
 ↓
Presentation
```

The second architecture introduces an unnecessary failure point.

---

## 41. Desktop Application

Eventually build the presentation engine as a desktop application.

| Layer | Stack |
|---|---|
| Frontend | Next.js / React |
| Desktop | Tauri or Electron |
| Backend | Supabase |
| Database | PostgreSQL |
| Storage | Supabase Storage / S3-compatible |
| Realtime | Supabase Realtime / WebSockets |

---

## 42. Why Desktop Matters

A browser is excellent for:

- administration
- service preparation
- team management

But live presentation requires:

- reliable display output
- local media
- offline operation
- video playback
- multi-display support
- hardware integration

Therefore: **Web app for management + desktop app for presentation.**

---

## 43. AI Layer

Do not start with AI as the main product.

First solve the operational problem. Then AI can accelerate it.

### AI features later

Pastor says: “Let's read the scripture about casting our cares.”

AI suggests:

1. 1 Peter 5:7
2. Philippians 4:6
3. Psalm 55:22

Operator chooses → sends to screen.

---

## 44. AI Sermon Assistant

Before service:

Upload sermon notes. AI extracts scriptures, sermon points, quotes, key phrases, songs, references — then generates a service presentation.

---

## 45. AI Live Assistant

Later, the operator could type: “Show the verse about renewing your mind.”

AI returns Romans 12:2 → [Preview] [Send]

**Important:** AI must suggest, not autonomously control the live service. Human confirmation remains the final gate.

---

## 46. Analytics

Church admins eventually need counts for services, presentations, scriptures displayed, songs displayed, media assets.

Analytics are **not** an MVP priority.

---

## 47. Service History

After every service: duration, scriptures used, songs, media.

Useful for replay, planning, auditing, training new operators.

---

## 48. Pricing

Don't start with complex pricing. Possible structure (unvalidated hypotheses):

| Tier | Price | Includes |
|---|---|---|
| Free | ₦0 | 1 church, 2 users, basic presentation, limited library |
| Church | ₦15,000–₦30,000/month | unlimited services, 10 users, media library, collaboration, cloud sync, templates |
| Pro | ₦50,000–₦100,000/month | unlimited users, multiple campuses, advanced presentation, livestream integration, AI features, advanced permissions |

Pricing should ultimately be validated through interviews rather than guessed.

---

## 49. MVP Pricing Experiment

Consider: Free for 30 days, then ask churches to convert.

This gives real willingness-to-pay data.

---

## 50. MVP Success Metrics

Don't measure downloads. Measure:

| Metric | Target / note |
|---|---|
| Activation | Churches that create service → display first scripture — **60%+** |
| Time to first value | **&lt;10 minutes** |
| Weekly active churches | More important than individual users |
| Services run | Core metric |
| Presentation failures | Near-zero service-breaking failures |

---

## 51. North Star Metric

**Successful church services run through the platform per week.**

Every service represents actual product value.

---

## 52. Reliability Metric

**Presentation Success Rate**

Example: 1,000 presentation actions → 997 successful → 99.7%

For a church-service product, reliability is arguably more important than feature count.

---

## 53. Competitive Landscape

Indirect competitors:

- ProPresenter
- EasyWorship
- OpenLP
- Quelea
- MediaShout
- OBS
- PowerPoint
- Google Slides

Don't beat them by building more features.

**Wedge:** Fast, simple, modern church-service operations designed for churches that don't have dedicated technical production teams.

---

## 54. Differentiation

Moat should eventually become:

1. **Workflow** — The entire church-service workflow
2. **Local-first reliability** — Designed for imperfect internet environments
3. **Scripture intelligence** — Extremely fast scripture discovery
4. **Church content ecosystem** — Songs, sermons, services, templates, media
5. **Collaboration** — Pastor + media + worship + coordinator
6. **AI assistance** — Reduces operator workload without taking control

---

## 55. MVP — What NOT to Build

Do not initially build:

- church accounting
- donations
- attendance
- member management
- CRM
- livestream hosting
- church website builder
- mobile social network
- sermon marketplace
- AI sermon generation
- complex analytics
- multi-campus management
- elaborate scheduling

Those are separate products.

First job: **Make live church presentation dramatically easier.**

---

## 56. V1 Product Map

```text
AUTH
│
├── Login
├── Signup
└── Church Setup

DASHBOARD
│
├── Upcoming Services
├── Recent Services
└── Quick Actions

SERVICES
│
├── Service List
├── Service Builder
├── Service Details
└── Live Mode

CONTENT
│
├── Scriptures
├── Songs
├── Slides
├── Images
└── Videos

PRESENTATION
│
├── Preview
├── Live Output
├── Confidence Monitor
└── Emergency Controls

TEAM
│
├── Members
├── Roles
└── Permissions

SETTINGS
│
├── Church
├── Branding
├── Presentation
└── Account
```

---

## 57. Recommended Database

At minimum:

- organizations
- users
- organization_members
- roles
- services
- service_items
- presentations
- slides
- songs
- song_slides
- media_assets
- bible_translations
- bible_books
- bible_chapters
- bible_verses
- templates
- display_outputs
- audit_logs

Later:

- sermons
- ai_suggestions
- service_runs
- analytics_events
- subscriptions
- campuses

---

## 58. Core Data Relationship

```text
Organization
     │
     ├── Members
     │
     ├── Services
     │      │
     │      └── Service Items
     │               │
     │               ├── Scripture
     │               ├── Song
     │               ├── Presentation
     │               ├── Video
     │               └── Announcement
     │
     ├── Media
     ├── Songs
     ├── Templates
     └── Settings
```

---

## 59. Critical UX Principle

There are really two products inside the product.

### Preparation Mode

Complexity is acceptable: Create / Plan / Organize / Edit / Configure

### Live Mode

Complexity is unacceptable: Search / Preview / Send / Next / Previous / Black

That distinction should drive the entire UX architecture.

---

## 60. MVP User Journey

### Before service

```text
Login
 ↓
Open Sunday Service
 ↓
Review service order
 ↓
Check songs
 ↓
Check scriptures
 ↓
Check videos
 ↓
Start Live Mode
```

### During service

```text
Pastor calls scripture
 ↓
Operator presses S
 ↓
Types "John 3:16"
 ↓
Selects result
 ↓
Preview
 ↓
GO LIVE
```

**Target:** 2–5 seconds.

---

## 61. The Product's “Magic Moment”

Pastor says: “Turn with me to Romans 8:28.”

Operator types: `Romans 8:28`

Within seconds, ROMANS 8:28 appears on the church screen.

No PowerPoint. No copy/paste. No frantic searching. No “Media, media, media!”

That is the product demonstration for marketing.

---

## 62. Product Roadmap

### Phase 0 — Validation (2 weeks)

Interview:

- 10 media operators
- 5 pastors
- 5 church administrators

Observe actual Sunday service workflows.

Don't ask: “Would you use this?”  
Ask: “Show me how you currently put a scripture on the screen.”

---

## 63. Phase 1 — Prototype (2–3 weeks)

Build Figma prototype:

- Dashboard
- Service Builder
- Live Mode
- Scripture Search
- Presentation Output

Test with 5–10 media operators.

---

## 64. Phase 2 — MVP (6–10 weeks)

Build:

- Authentication
- Organizations
- RBAC
- Service Builder
- Scripture search
- Songs
- Slides
- Media library
- Live Mode
- Display output
- Offline caching
- Basic templates

---

## 65. Phase 3 — Pilot

Deploy to 3–5 churches. Do not immediately chase 100 churches.

Watch them use it during real Sunday services.

Job: discover where the product fails when the pressure is real.

---

## 66. Phase 4 — Reliability

Before aggressive growth:

- offline improvements
- crash recovery
- media caching
- display recovery
- backups
- audit logs
- performance optimization
- error monitoring

Use: Sentry, PostHog, Supabase, structured logging

---

## 67. Phase 5 — Growth

Then add:

- AI scripture assistant
- sermon import
- remote pastor control
- livestream integration
- multi-campus
- advanced templates
- collaboration
- integrations

---

## 68. Founder Strategy

Biggest mistake: “I'm building a church management platform.” (Too broad.)

Instead: “I'm building the fastest way for a church media team to run a live service.”

Expansion path (earn each step):

```text
Presentation
     ↓
Service Operations
     ↓
Content Management
     ↓
Team Collaboration
     ↓
Church Operations
```

---

## 69. The Business Thesis

The fundamental insight isn't: Churches need better slides.

It's: Live church services are high-pressure collaborative environments, and the software supporting them is often fragmented.

Initial wedge remains narrow:

**Pastor calls it → media team finds it → congregation sees it.**

Eventual product could become: the operating system for church services — but earn the right to expand.
