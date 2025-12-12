# Best Shot Mobile — Implementation Plan

> Mobile companion app for the Best Shot football prediction platform  
> Based on Nathan Covey's Ultimate Mobile App Stack

---

## Project Context

| Aspect | Details |
|--------|---------|
| **Web App** | React + TypeScript + Vite + Tanstack Router + MUI |
| **API** | Node.js + Express + PostgreSQL + Drizzle ORM |
| **API URL** | `api-best-shot-demo.mariobrusarosco.com` |
| **RN Experience** | First React Native project |
| **Team** | Solo developer |
| **Timeline** | Flexible / learning-focused |

---

## Tech Stack Summary

### Frontend
| Tool | Purpose |
|------|---------|
| Expo | React Native framework & tooling |
| Expo Router | File-based navigation |
| NativeWind | Tailwind CSS for React Native |
| React Native Reanimated | Performant animations |
| LottieFiles | Motion graphics & micro-interactions |

### Data & Auth
| Tool | Purpose |
|------|---------|
| Tanstack Query | Server state (same as web app) |
| Axios | HTTP client |
| Expo SecureStore | Encrypted token storage |
| Clerk (optional) | Mobile-optimized authentication |

### Analytics & Monitoring
| Tool | Purpose |
|------|---------|
| PostHog | Product analytics |
| Sentry | Error tracking |

### Payments (Future)
| Tool | Purpose |
|------|---------|
| RevenueCat | In-app subscriptions |

---

## EAS & Publishing Pipeline

Expo provides **EAS (Expo Application Services)** — a cloud platform that handles building and submitting your app. This is central to the publishing process.

### EAS Services

| Service | What It Does |
|---------|--------------|
| **EAS Build** | Builds your APK/AAB (Android) and IPA (iOS) in the cloud |
| **EAS Submit** | Uploads builds directly to Google Play & App Store Connect |
| **EAS Update** | Push JS/UI updates without app store review (OTA updates) |

### The Publishing Flow

```
Your Code
    ↓
EAS Build (Expo's cloud servers)
    ↓
Signed APK/AAB (Android) or IPA (iOS)
    ↓
EAS Submit ──→ Google Play Console / App Store Connect
    ↓
Testing Track or Production
```

### Why EAS Matters

| Without Expo | With Expo + EAS |
|--------------|-----------------|
| Need Xcode on Mac for iOS builds | Build iOS in cloud (no Mac required for builds) |
| Manually configure Android signing | Expo manages certificates for you |
| Build locally, upload manually | One command to build + submit |
| No over-the-air updates | Push JS updates instantly |

### Developer Account Costs

| Account | Cost | Notes |
|---------|------|-------|
| Google Play Developer | $25 | One-time fee |
| Apple Developer | $99/year | Annual subscription |

### EAS Pricing

| Tier | Builds/Month | Price |
|------|--------------|-------|
| Free | 30 iOS + 30 Android | $0 |
| Production | Unlimited | $99/month |

The free tier is plenty for solo development and early-stage projects.

### Google Play Testing Tracks

Google has a tiered system — perfect for gradual rollout:

| Track | Audience | Review? | Use Case |
|-------|----------|---------|----------|
| **Internal Testing** | Up to 100 invited testers | No | Hello World, early dev |
| **Closed Testing** | Invite-only groups | Yes (fast) | Alpha/Beta testing |
| **Open Testing** | Anyone via link | Yes | Public beta |
| **Production** | Everyone | Yes | Public launch |

**Internal Testing** is instant — upload a build, get a link, install within minutes. No review, no polished assets required.

### Apple TestFlight

| Distribution | Audience | Review? | Use Case |
|--------------|----------|---------|----------|
| **Internal TestFlight** | Up to 100 team members | No | Early dev testing |
| **External TestFlight** | Up to 10,000 testers | Yes (lighter) | Wider beta |
| **App Store** | Everyone | Yes (full) | Public launch |

### Recommended Publishing Path

| Phase | Distribution Method | Store Review? |
|-------|---------------------|---------------|
| Phases 1-2 | Expo Go (no build needed) | No |
| Phases 3-5 | Internal Testing + Internal TestFlight | No |
| Phases 6-8 | Closed Testing + External TestFlight | Light review |
| Phase 9 | Open Testing (optional) | Yes |
| Phase 10 | Production | Yes |

### EAS Update (Post-Launch Power)

After your app is live, EAS Update lets you push JavaScript and asset changes instantly:

- Bug fixes without app store review
- UI tweaks go live in minutes
- Users get updates on next app open

**Limitation:** Native code changes (new libraries, permissions) still require a full build + store review.

---

## Phase 1: Foundation & Environment Setup

**Goal:** Development environment ready, "Hello World" running on all platforms

### Tasks

- [ ] Install Xcode (iOS Simulator) — Mac only
- [ ] Install Android Studio + configure emulator
- [ ] Install Expo Go on physical device
- [ ] Create Expo project with TypeScript template
- [ ] Install EAS CLI for builds
- [ ] Configure NativeWind (Tailwind)
- [ ] Configure Reanimated
- [ ] Set up basic folder structure
- [ ] Create first test screen
- [ ] Verify app runs on iOS Simulator
- [ ] Verify app runs on Android Emulator
- [ ] Verify app runs on physical device via Expo Go

### Learning Goals

- Understand Expo managed workflow vs bare workflow
- Learn core RN components: View, Text, ScrollView, FlatList, Pressable
- Understand key differences from React DOM (no div/span, no CSS, Flexbox defaults)

### Deliverable

✅ App launches successfully on all three platforms

---

## Phase 2: Navigation & Screen Structure

**Goal:** Complete navigation skeleton with all screens as placeholders

### Tasks

- [ ] Set up Expo Router file-based routing
- [ ] Create root layout with providers
- [ ] Create auth screens group (login, register)
- [ ] Create main tab navigator with 4 tabs:
  - Home (dashboard)
  - Matches (browse matches)
  - Predictions (user's predictions)
  - Profile (settings & account)
- [ ] Create dynamic route for match details
- [ ] Add tab bar icons
- [ ] Configure screen transitions
- [ ] Test deep linking basics

### Screen Map

```
Landing → Auth Flow → Main Tabs
                         ├── Home
                         ├── Matches → Match Detail
                         ├── Predictions
                         └── Profile
```

### Deliverable

✅ Can navigate between all screens with placeholder content

---

## Phase 3: API Integration

**Goal:** App fetches and displays real data from existing Best Shot API

### Tasks

- [ ] Create API client with base URL configuration
- [ ] Set up environment-based API URLs (dev vs prod)
- [ ] Configure Tanstack Query provider
- [ ] Create query hooks mirroring web app patterns:
  - useMatches
  - useMatch (single)
  - useLeagues
  - usePredictions
  - useUserPredictions
  - useProfile
- [ ] Implement loading states
- [ ] Implement error states
- [ ] Add pull-to-refresh on list screens
- [ ] Test API connectivity on all platforms

### Considerations

- Handle network failures gracefully (mobile connectivity is unreliable)
- Consider offline indicators
- Match query key patterns from web app for consistency

### Deliverable

✅ All screens display real data from the API

---

## Phase 4: Authentication

**Goal:** Users can log in, stay logged in, and access protected content

### Tasks

- [ ] Decide: Use existing API auth OR integrate Clerk
- [ ] Create AuthContext for global auth state
- [ ] Implement secure token storage (Expo SecureStore)
- [ ] Build login screen UI
- [ ] Build registration screen UI
- [ ] Add auth interceptor to API client (attach tokens)
- [ ] Implement protected route redirects
- [ ] Handle token refresh (if applicable)
- [ ] Handle logout flow
- [ ] Test session persistence across app restarts
- [ ] Test auth flow on all platforms

### Auth Flow

```
App Launch → Check stored token → Valid? → Main App
                                → Invalid? → Auth Screens
```

### Deliverable

✅ Complete auth flow working with session persistence

---

## Phase 5: Core Features UI

**Goal:** Full-featured screens with production-quality UI

### Home Screen
- [ ] Welcome message with user name
- [ ] Upcoming matches summary
- [ ] Recent predictions with results
- [ ] Quick stats (win rate, streak, etc.)
- [ ] Quick action buttons

### Matches Screen
- [ ] Match list with optimized scrolling
- [ ] Filter by league
- [ ] Filter by date
- [ ] Search functionality
- [ ] Match card component with team logos, time, odds

### Match Detail Screen
- [ ] Teams display with logos
- [ ] Match information (date, venue, competition)
- [ ] Prediction form
- [ ] User's existing prediction (if any)
- [ ] Other users' predictions (if public)
- [ ] Match stats (if available)

### Predictions Screen
- [ ] User's prediction history
- [ ] Filter by status (pending, won, lost)
- [ ] Stats summary (total, wins, losses, win rate)
- [ ] Prediction card with match info and result

### Profile Screen
- [ ] User info display
- [ ] Edit profile option
- [ ] App settings (notifications, theme)
- [ ] About/help section
- [ ] Logout button
- [ ] App version display

### Shared Components to Build
- [ ] Button (primary, secondary, outline variants)
- [ ] Card container
- [ ] Input fields
- [ ] Loading spinner
- [ ] Empty state
- [ ] Error state
- [ ] Match card
- [ ] Prediction card
- [ ] Team logo display
- [ ] Score display

### Deliverable

✅ All screens fully functional with polished UI

---

## Phase 6: Polish & Animations

**Goal:** App feels native, responsive, and delightful

### Animations (Reanimated)
- [ ] Screen transition animations
- [ ] Tab bar animations
- [ ] List item enter/exit animations
- [ ] Button press feedback (scale)
- [ ] Pull-to-refresh animation
- [ ] Skeleton loading states
- [ ] Card flip for prediction reveal

### Micro-interactions (Lottie)
- [ ] App loading animation
- [ ] Empty state illustrations
- [ ] Success animation (correct prediction)
- [ ] Error animation
- [ ] Celebration animation (winning streak)

### Haptics
- [ ] Button press feedback
- [ ] Success/error feedback
- [ ] Pull-to-refresh feedback

### Visual Polish
- [ ] Consistent spacing and typography
- [ ] Dark mode support (or single polished theme)
- [ ] Platform-specific adjustments (iOS vs Android)
- [ ] Safe area handling
- [ ] Keyboard avoiding views on forms

### Deliverable

✅ App feels premium and native on both platforms

---

## Phase 7: Analytics & Error Tracking

**Goal:** Visibility into app usage and issues

### PostHog Setup
- [ ] Install and configure PostHog
- [ ] Track screen views
- [ ] Track key user actions:
  - Login/signup
  - View match
  - Make prediction
  - Share prediction
- [ ] Set up user identification
- [ ] Create key funnels (signup → first prediction)

### Sentry Setup
- [ ] Install and configure Sentry
- [ ] Enable crash reporting
- [ ] Add performance monitoring
- [ ] Set up source maps for readable stack traces
- [ ] Configure alert rules

### Deliverable

✅ Analytics dashboard showing user behavior  
✅ Error alerts configured and tested

---

## Phase 8: Build & App Store Prep

**Goal:** Production builds ready for store submission

### EAS Build Configuration
- [ ] Configure eas.json for dev, preview, and production
- [ ] Set up iOS provisioning profiles
- [ ] Set up Android keystore
- [ ] Create first iOS build
- [ ] Create first Android build
- [ ] Test builds on physical devices

### App Store Assets
- [ ] App icon (1024x1024 for iOS, adaptive for Android)
- [ ] Splash screen
- [ ] Screenshots for all required sizes:
  - iPhone 6.7" (required)
  - iPhone 6.5" (required)
  - iPhone 5.5" (required)
  - iPad Pro 12.9" (if supporting tablet)
  - Android phone
  - Android tablet (if supporting)
- [ ] App preview video (optional but recommended)

### Store Listing Content
- [ ] App name (30 char limit iOS)
- [ ] Subtitle (30 char limit iOS)
- [ ] Description (4000 char limit)
- [ ] Keywords (100 char limit iOS)
- [ ] Category selection
- [ ] Privacy policy URL
- [ ] Support URL

### Deliverable

✅ Production builds created  
✅ All store assets ready

---

## Phase 9: Beta Testing

**Goal:** Real user feedback before public launch

### TestFlight (iOS)
- [ ] Upload build to App Store Connect
- [ ] Add internal testers
- [ ] Add external testers (if desired)
- [ ] Collect and address feedback
- [ ] Iterate on builds

### Play Store Internal Testing
- [ ] Upload build to Play Console
- [ ] Set up internal testing track
- [ ] Add testers
- [ ] Collect and address feedback
- [ ] Iterate on builds

### Feedback Collection
- [ ] Create feedback form/channel
- [ ] Prioritize issues and improvements
- [ ] Fix critical bugs
- [ ] Polish based on feedback

### Deliverable

✅ Beta tested with real users  
✅ Critical issues resolved

---

## Phase 10: Launch

**Goal:** App live on both app stores

### App Store Submission
- [ ] Complete App Store Connect listing
- [ ] Submit for review
- [ ] Respond to any review feedback
- [ ] App approved and live

### Play Store Submission
- [ ] Complete Play Console listing
- [ ] Submit for review
- [ ] Respond to any review feedback
- [ ] App approved and live

### Post-Launch
- [ ] Monitor crash reports (Sentry)
- [ ] Monitor analytics (PostHog)
- [ ] Respond to user reviews
- [ ] Plan first update based on feedback

### Deliverable

✅ App live on iOS App Store  
✅ App live on Google Play Store

---

## Future Phases (Post-Launch)

### Phase 11: Push Notifications
- Match reminders
- Prediction results
- Friend activity

### Phase 12: Social Features
- Follow friends
- Leaderboards
- Share predictions

### Phase 13: Monetization
- RevenueCat integration
- Premium features
- Subscription tiers

### Phase 14: Marketing
- Landing page (Vercel + Next.js)
- Apple Search Ads
- Social media presence
- ASO optimization (AppTweak)

---

## Resources

### Documentation
- Expo Docs — docs.expo.dev
- React Native Docs — reactnative.dev
- Expo Router — docs.expo.dev/router
- NativeWind — nativewind.dev
- Reanimated — docs.swmansion.com/react-native-reanimated

### Learning (Recommended for RN beginners)
- Simon Grimm's YouTube — Free Expo tutorials
- Academind RN Course — Comprehensive paid option
- Expo's official examples repository

### Your Advantages
- Already know React + TypeScript
- Already know Tanstack Query
- API already built and deployed
- Web app patterns to reference

---

## Notes

- Each phase can be adjusted based on learning pace
- Phases 1-5 are the MVP (functional app)
- Phases 6-10 are launch preparation
- Don't skip Phase 6 (polish) — it's what makes an app feel "real"
- Consider journaling learnings for future reference