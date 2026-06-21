**PRODUCT REQUIREMENTS DOCUMENT**

Wedding Website &

Guest Management

System

Client: Adaeze & Emmanuel · Wedding Date: 14 February 2026 · Lagos,
Nigeria

Version: 1.0 · Status: Final Draft · RSVP Deadline: 31 July 2025

  -----------------------------------------------------------------------
  **PROJECT SUMMARY**

  **Project:** Wedding Website + Admin Dashboard

  **Stack:** Next.js 14 (App Router) + Supabase + Resend + Vercel

  **Deliverables:** Two web applications --- public site and admin
  dashboard

  **Prepared by:** Development Team

  **Last Updated:** 04 June 2026
  -----------------------------------------------------------------------

1\. Project Overview

This PRD covers the full build of a digital wedding experience for
Adaeze and Emmanuel. The project consists of exactly two web
applications --- a public-facing wedding website and a private admin
dashboard for the couple\'s coordinators.

There is no QR scanner, no usher app, and no third check-in system. The
scope is deliberately lean: collect RSVPs cleanly, manage guests
efficiently, and generate a beautiful printable event pass for each
confirmed guest.

**What we are building**

-   App 1 --- Public Wedding Website: The invitation, couple\'s story,
    event details and RSVP form

-   App 2 --- Admin Dashboard: Coordinator tools --- guest list, event
    pass generator, notifications

**What is out of scope**

-   QR code check-in scanner at venue

-   Usher mobile app

-   Seating plan or table assignment

-   Custom domain setup (deferred to final handoff phase)

2\. App 1 --- Public Wedding Website

Built with Next.js 14 App Router. Single-page scroll experience with the
following screens in order, exactly as agreed in the wireframe.

**2.1 SCREEN FLOW (IN ORDER)**

1.  Intro Gate --- full-screen dark overlay with couple monogram,
    tagline, and \"Let Our Story Begin\" button. Music begins on tap.

2.  Hero --- fullscreen background image slider (3 photos, auto-advance
    every 5.5 seconds with dot navigation). Couple names + typewriter
    phrase cycling. Music mute/unmute button fixed bottom-right.

3.  Marquee strip --- horizontally scrolling text loop.

4.  Countdown timer --- live days / hours / minutes / seconds to 14 Feb
    2026.

5.  Our Story --- stacked card photo slider. Cards sit on top of each
    other with slight rotation offsets. Drag or swipe the top card to
    reveal the next. Progress bar below shows position. Arrow button
    fallback.

6.  Event Details --- three cards: Ceremony, Reception, Dress Code.

7.  Timeline --- vertical milestone list from 2019 to 2026.

8.  Colours of the Day --- five colour swatches with names and hex
    codes.

9.  Etiquette --- six house rules on dark background.

10. RSVP Form --- collects guest info, auto-closes 31 July 2025, sends
    confirmation email on submit.

11. Footer --- names, date, nav links, hashtag.

**2.2 RSVP FORM --- FIELDS**

-   First name (required)

-   Last name (required)

-   Email address (required)

-   Phone number (optional)

-   Number of guests in party (required) --- options: 1, 2, 3, 4

-   Which events attending (required) --- Ceremony & Reception /
    Reception only / Ceremony only / Unable to attend

-   Message to the couple (optional, free text)

**2.3 RSVP DEADLINE --- AUTO-CLOSE**

The form checks the current date against the deadline of 31 July 2025 on
every page load. After that date:

-   The form inputs are hidden

-   A \"RSVPs are now closed\" message is displayed in its place

-   No new submissions are accepted

> → *This is enforced both on the frontend (UI hidden) and backend
> (Supabase RLS policy rejects inserts after the deadline date).*

**2.4 RSVP --- UPDATE & CANCELLATION**

Guests can update or cancel their RSVP after submitting. Flow:

12. Guest receives confirmation email with a unique secure link
    (token-based, not guessable).

13. Clicking the link opens a pre-filled edit form with their original
    response.

14. Guest can change any field or select \"Cancel my RSVP\".

15. On save, the database record is updated and a new confirmation email
    is sent.

16. Update and cancellation links expire on 31 July 2025 --- same as the
    RSVP deadline.

> → *The edit token is a UUID stored in the rsvps table. The URL pattern
> is /rsvp/edit/\[token\]. No login required.*

**2.5 CONFIRMATION EMAIL --- ON RSVP SUBMIT**

Sent via Resend immediately after a successful form submission.
Contains:

-   Personalised greeting using guest\'s first name

-   Summary of their RSVP (events attending, number of guests)

-   Event details --- date, time, both venue addresses, dress code

-   Unique edit link so they can update or cancel

-   Add to Google Calendar and Apple Calendar links

-   Coordinator contact details

> → *No QR code in this email. The confirmation is informational only.*

3\. App 2 --- Admin Dashboard

A private Next.js application, separate from the public site. Access is
restricted to coordinators via a simple password login (Supabase Auth).
The dashboard gives coordinators full visibility over RSVPs and tools to
manage the guest list.

**3.1 AUTHENTICATION**

-   Login page with email + password (Supabase Auth)

-   Coordinator accounts created manually by the developer --- no
    self-registration

-   Session persists for 7 days, then re-login required

-   All dashboard routes are protected --- unauthenticated users are
    redirected to login

**3.2 GUEST LIST VIEW**

The main dashboard screen. Shows a table of all RSVPs with the following
columns:

-   Guest ID (auto-generated, e.g. AE-0042)

-   Full name

-   Email

-   Phone

-   Number of guests

-   Events attending

-   RSVP status --- Confirmed / Cancelled

-   Date submitted

-   Actions --- View, Edit, Generate Pass, Delete

Coordinator tools above the table:

-   Search by name or email

-   Filter by event (Ceremony / Reception / Both)

-   Filter by status (Confirmed / Cancelled / All)

-   Summary stats bar --- Total RSVPs, Total guests, Ceremony count,
    Reception count, Cancelled

-   Export to CSV --- downloads the full filtered guest list as a
    spreadsheet

-   Manually add guest --- for guests who RSVP by phone or message

**3.3 EVENT PASS GENERATOR**

The centrepiece feature of the admin dashboard. For every confirmed
RSVP, the coordinator can generate and download a beautifully designed
printable event pass.

**Design**

Portrait card format --- elegant luxury invite style. Dimensions: A5
(148mm × 210mm), suitable for professional print or home printing. The
pass is generated as a downloadable PDF.

**Pass content --- fixed elements (same for all passes)**

-   Couple names --- Adaeze & Emmanuel

-   Wedding date --- Saturday, 14 February 2026

-   Venue details --- Ceremony and Reception locations

-   Hashtag --- #AdaAndEmma2026

-   Decorative design elements --- gold border, ornamental typography,
    colour palette

**Pass content --- dynamic elements (personalised per guest)**

-   Guest full name --- slots into a designated name placeholder on the
    design

-   Guest ID --- printed in small text (e.g. AE-0042)

-   Events attending --- \"Ceremony & Reception\" / \"Reception only\" /
    \"Ceremony only\"

-   Number of guests --- \"1 guest\" or \"Party of 3\" etc.

**Generation flow**

17. Coordinator opens a guest\'s record and clicks \"Generate Pass\".

18. The system renders the pass design with the guest\'s details filled
    in.

19. A preview is shown in a modal before downloading.

20. Coordinator clicks \"Download PDF\" --- the pass downloads as
    GuestName_EventPass.pdf.

21. Coordinator can also click \"Download All Passes\" to bulk-generate
    a ZIP of all confirmed guest passes.

**Technical implementation**

The pass is rendered using a Next.js API route that:

-   Accepts a guest ID in the request

-   Fetches the guest record from Supabase

-   Renders an HTML template with the guest\'s details injected

-   Converts the HTML to PDF using Puppeteer (headless Chrome) or the
    \@react-pdf/renderer library

-   Streams the PDF back as a download response

> → *If using \@react-pdf/renderer --- the pass is designed as a React
> component with absolute positioning to match the luxury card layout.
> This runs entirely server-side.*

**3.4 NOTIFICATIONS**

Two notification channels run in parallel. Both fire on every new RSVP
submission.

**Channel 1 --- Email notification to coordinators**

-   Sent via Resend to a configured coordinator email address (or list
    of addresses)

-   Subject: \"New RSVP --- \[Guest Name\]\"

-   Body: guest name, email, events attending, number of guests, message
    if any, and a direct link to their record in the admin dashboard

-   Fires immediately on form submission via a Supabase database webhook
    or a Next.js API route post-insert

**Channel 2 --- Browser push notification**

-   Coordinators opt in to push notifications the first time they open
    the admin dashboard

-   Uses the Web Push API with VAPID keys

-   Notification title: \"New RSVP\"

-   Notification body: \"\[Guest Name\] just confirmed attendance\"

-   Clicking the notification opens the admin dashboard directly

-   Push subscriptions are stored in a separate Supabase table
    (push_subscriptions)

-   A Supabase Edge Function handles sending the push payload to all
    subscribed devices on each new RSVP

> → *Push notifications only work when the coordinator has the admin
> dashboard open in a browser tab or has installed it as a PWA
> (Progressive Web App). If the browser is closed, the notification is
> missed --- email is the reliable fallback.*

4\. Database Schema --- Supabase

All data lives in a single Supabase project. Three tables:

**TABLE 1 --- RSVPS**

  ------------------ ---------------- ------------------ ------------------
  **COLUMN**         **TYPE**         **NOTES**          **EXAMPLE**

  **id**             uuid             Primary key,       a1b2c3d4-\...
                                      auto-gen           

  **guest_id**       text             Human-readable ID  AE-0042

  **first_name**     text             Required           Ngozi

  **last_name**      text             Required           Okafor

  **email**          text             Required, unique   ngozi@mail.com

  **phone**          text             Optional           08012345678

  **guest_count**    integer          Party size 1--4    2

  **attending**      text             both / reception / both
                                      ceremony / no      

  **message**        text             Optional           \"Can\'t wait!\"

  **status**         text             confirmed /        confirmed
                                      cancelled          

  **edit_token**     uuid             For update/cancel  x9y8z7w6-\...
                                      link               

  **submitted_at**   timestamptz      Auto, default      2025-06-01 10:22
                                      now()              

  **updated_at**     timestamptz      Updates on any     2025-06-02 14:10
                                      change             
  ------------------ ---------------- ------------------ ------------------

**TABLE 2 --- PUSH_SUBSCRIPTIONS**

-   id --- uuid, primary key

-   endpoint --- text (push service URL)

-   p256dh --- text (encryption key)

-   auth --- text (auth secret)

-   coordinator_email --- text

-   created_at --- timestamptz

**TABLE 3 --- ADMIN_USERS (MANAGED BY SUPABASE AUTH)**

Standard Supabase Auth users table. No custom schema needed ---
coordinators are added via the Supabase dashboard by the developer.

**ROW LEVEL SECURITY (RLS)**

-   rsvps table --- public INSERT allowed only before 31 July 2025;
    public SELECT and UPDATE allowed only with matching edit_token; all
    operations allowed for authenticated admin users

-   push_subscriptions --- INSERT and SELECT only for authenticated
    admin users

5\. Tech Stack

  ------------------ ---------------------- ------------------------------
  **LAYER**          **TOOL / SERVICE**     **REASON**

  **Framework**      Next.js 14 (App        Server components, API routes,
                     Router)                SSR --- one framework for both
                                            apps

  **Database**       Supabase (PostgreSQL)  Managed DB, RLS, real-time,
                                            built-in Auth, Edge Functions

  **Auth**           Supabase Auth          Email + password login for
                                            admin; no auth needed on
                                            public site

  **Email**          Resend                 Reliable transactional email,
                                            free up to 3,000/month, great
                                            DX

  **PDF generation** \@react-pdf/renderer   Renders event pass as PDF
                     or Puppeteer           server-side in Next.js API
                                            route

  **Push             Web Push API + VAPID   Browser-native push, no
  notifications**                           third-party service needed

  **Push delivery**  Supabase Edge Function Triggers on DB insert, sends
                                            push payload to all
                                            subscriptions

  **Hosting**        Vercel                 Zero-config Next.js deploy,
                                            free tier covers this project

  **Domain**         Custom (deferred)      e.g. adaandemma.ng ---
                                            configured at final handoff

  **Styling**        Tailwind CSS           Utility-first, fast to build,
                                            easy to maintain
  ------------------ ---------------------- ------------------------------

6\. Next.js API Routes

All backend logic lives in Next.js API routes under /app/api/.

**PUBLIC SITE API ROUTES**

-   POST /api/rsvp --- validates and inserts RSVP, generates guest_id
    and edit_token, triggers confirmation email to guest and
    notification email to coordinators, triggers push notification

-   GET /api/rsvp/\[token\] --- fetches RSVP record by edit_token for
    pre-filling the edit form

-   PATCH /api/rsvp/\[token\] --- updates an existing RSVP record, sends
    updated confirmation email

**ADMIN DASHBOARD API ROUTES**

-   GET /api/admin/guests --- returns all RSVPs with filters and search,
    authenticated only

-   POST /api/admin/guests --- manually adds a guest, authenticated only

-   PATCH /api/admin/guests/\[id\] --- edits a guest record,
    authenticated only

-   DELETE /api/admin/guests/\[id\] --- deletes a guest record,
    authenticated only

-   GET /api/admin/pass/\[id\] --- generates and streams a PDF event
    pass for the given guest ID, authenticated only

-   GET /api/admin/passes/bulk --- generates a ZIP of all confirmed
    guest passes, authenticated only

-   POST /api/admin/push/subscribe --- saves a push subscription for the
    current coordinator

7\. Build Phases

Recommended build order --- each phase delivers something testable
before moving to the next.

  -----------------------------------------------------------------------
  **DEVELOPMENT PHASES**

  **Phase 1:** Project setup --- Next.js monorepo or two separate apps,
  Supabase project, Vercel deploy, Resend account, environment variables

  **Phase 2:** Public website --- all screens static (no backend yet):
  intro, hero, marquee, countdown, story slider, details, timeline,
  colours, etiquette, footer

  **Phase 3:** RSVP system --- form connected to Supabase, guest_id
  generation, deadline enforcement, confirmation email via Resend,
  edit/cancel flow

  **Phase 4:** Admin dashboard --- auth login, guest list table,
  search/filter, CSV export, manual add guest

  **Phase 5:** Event pass generator --- pass design, PDF generation API
  route, single download, bulk ZIP download

  **Phase 6:** Notifications --- coordinator email on new RSVP (Resend),
  browser push (Web Push + VAPID + Supabase Edge Function)

  **Phase 7:** Testing & QA --- end-to-end test all flows, mobile
  responsiveness, email delivery, PDF output quality, RLS security test

  **Phase 8:** Handoff --- custom domain setup, coordinator onboarding,
  README documentation
  -----------------------------------------------------------------------

8\. Decisions Made

The following questions were raised during planning and have been
answered by the client:

  ------------------------------- ---------------------------------------
  **QUESTION**                    **DECISION**

  Should the RSVP form            Yes --- deadline is 31 July 2025
  auto-close?                     

  Can guests update or cancel?    Yes --- via unique edit link in their
                                  confirmation email

  Is there a cap on guest         No --- no maximum limit
  numbers?                        

  What notification channels?     Email to coordinator + browser push
                                  notification

  QR code check-in at venue?      No --- scrapped. Not needed for this
                                  project

  Event pass design style?        Elegant portrait card (luxury invite
                                  format), downloadable as PDF

  Custom domain?                  Yes --- to be configured at final
                                  handoff (Phase 8)

  WhatsApp notifications?         No --- replaced by email + push
                                  notifications
  ------------------------------- ---------------------------------------

*Adaeze & Emmanuel · 14 February 2026 · Lagos, Nigeria*

*#AdaAndEmma2026*
