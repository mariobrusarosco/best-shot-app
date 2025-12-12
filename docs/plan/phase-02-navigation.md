# Phase 2: Navigation & Screen Structure

**Goal:** Complete navigation skeleton with all screens as placeholders

**Timeline Estimate:** 3-5 hours

**Prerequisites:** Phase 1 completed (Expo project running on all platforms)

---

## Overview

Implement file-based routing using Expo Router, create the complete screen hierarchy, and set up navigation patterns. By the end, you'll have a fully navigable app structure with placeholder content ready for API integration.

---

## Part 1: Expo Router Installation & Configuration

### Task 1.1: Install Expo Router Dependencies
- [ ] Install expo-router and required peer dependencies
- [ ] Install react-native-safe-area-context
- [ ] Install react-native-screens
- [ ] Install expo-linking, expo-constants, expo-status-bar
- [ ] Verify all packages appear in package.json

### Task 1.2: Configure Project for Expo Router
- [ ] Update app.json to add expo-router plugin
- [ ] Configure deep linking scheme (e.g., "bestshot")
- [ ] Set bundle identifiers for iOS and Android
- [ ] Update package.json entry point to "expo-router/entry"
- [ ] Clear Expo cache

### Task 1.3: Restructure Project Directory
- [ ] Create `app/` directory in project root
- [ ] Move/backup existing App.tsx
- [ ] Understand that files in `app/` become routes automatically
- [ ] Plan route structure based on screen map

**Checkpoint:** Project configured for Expo Router, ready to create routes

---

## Part 2: Root Layout & Landing Screen

### Task 2.1: Create Root Layout
- [ ] Create `app/_layout.tsx` as root layout wrapper
- [ ] Configure Stack navigator from expo-router
- [ ] Set global navigation options (header style, colors)
- [ ] Add StatusBar component
- [ ] Register all top-level routes

### Task 2.2: Create Landing Screen
- [ ] Create `app/index.tsx` (maps to `/` route)
- [ ] Design simple landing page with app branding
- [ ] Add navigation buttons to Sign In and Register
- [ ] Use SafeAreaView for proper spacing
- [ ] Test landing screen loads as default route

### Task 2.3: Test Basic Expo Router Setup
- [ ] Start dev server with cleared cache
- [ ] Verify landing screen appears on all platforms
- [ ] Test that Link component navigates (will 404 for now)
- [ ] Check console for any router errors

**Checkpoint:** Expo Router working, landing screen displays, basic navigation functions

---

## Part 3: Authentication Screens

### Task 3.1: Create Sign In Screen
- [ ] Create `app/sign-in.tsx` file
- [ ] Design sign-in UI with email and password inputs
- [ ] Add "Sign In" button (placeholder action for now)
- [ ] Add link to navigate back to landing
- [ ] Add link to register screen
- [ ] Style for consistent dark theme

### Task 3.2: Create Register Screen
- [ ] Create `app/register.tsx` file
- [ ] Design registration UI (name, email, password fields)
- [ ] Add "Register" button (placeholder action)
- [ ] Add link to navigate back to landing
- [ ] Add link to sign-in screen
- [ ] Match styling with sign-in screen

### Task 3.3: Test Authentication Screen Navigation
- [ ] Navigate from landing to sign-in
- [ ] Navigate from landing to register
- [ ] Test back navigation from both screens
- [ ] Verify forms display correctly on all platforms
- [ ] Check keyboard behavior (doesn't cover inputs)

**Checkpoint:** Auth screens accessible and navigable

---

## Part 4: Main Tab Navigation Structure

### Task 4.1: Create Tabs Route Group
- [ ] Create `app/(tabs)/` directory
- [ ] Understand route groups (parentheses don't appear in URL)
- [ ] Create `app/(tabs)/_layout.tsx` for tab configuration

### Task 4.2: Configure Tab Navigator
- [ ] Set up Tabs component from expo-router
- [ ] Configure 4 tabs: Home, Matches, Predictions, Profile
- [ ] Add tab bar icons using @expo/vector-icons (Ionicons)
- [ ] Set tab bar styling (colors, background)
- [ ] Set active/inactive tint colors
- [ ] Configure header styling for all tabs

### Task 4.3: Create Home Tab Screen
- [ ] Create `app/(tabs)/index.tsx` (Home tab)
- [ ] Design dashboard layout with placeholder stats
- [ ] Show mock data: upcoming matches count, predictions count, win rate
- [ ] Use ScrollView for future expandability
- [ ] Style with card components

### Task 4.4: Create Matches Tab Screen
- [ ] Create `app/(tabs)/matches.tsx`
- [ ] Design match list with FlatList
- [ ] Create mock data array (3-5 matches)
- [ ] Design match card component showing teams, time, date
- [ ] Make cards pressable (navigate to detail later)
- [ ] Add "Upcoming Matches" header

### Task 4.5: Create Predictions Tab Screen
- [ ] Create `app/(tabs)/predictions.tsx`
- [ ] Design predictions list with FlatList
- [ ] Create mock predictions data (pending, won, lost statuses)
- [ ] Design prediction card showing match, prediction, status
- [ ] Color-code status (green=won, red=lost, yellow=pending)
- [ ] Add "Your Predictions" header

### Task 4.6: Create Profile Tab Screen
- [ ] Create `app/(tabs)/profile.tsx`
- [ ] Design profile layout with ScrollView
- [ ] Add user info section (avatar placeholder, name, email)
- [ ] Add settings sections (account, notifications, about)
- [ ] Add logout button (navigate to landing for now)
- [ ] Show app version

### Task 4.7: Update Root Layout for Tab Navigation
- [ ] Register `(tabs)` route in `app/_layout.tsx`
- [ ] Hide header for tabs (tabs have their own headers)
- [ ] Configure how to navigate to tabs from auth screens

### Task 4.8: Test Tab Navigation
- [ ] Navigate from sign-in to tabs (placeholder button action)
- [ ] Verify all 4 tabs are accessible
- [ ] Test switching between tabs
- [ ] Verify tab bar icons display correctly
- [ ] Check active tab highlighting
- [ ] Test on all platforms

**Checkpoint:** All 4 tabs created with placeholder content, fully navigable

---

## Part 5: Dynamic Routes (Match Detail)

### Task 5.1: Create Match Detail Dynamic Route
- [ ] Create `app/match/` directory
- [ ] Create `app/match/[id].tsx` (dynamic route with id parameter)
- [ ] Access route parameter using useLocalSearchParams hook
- [ ] Design match detail screen layout

### Task 5.2: Build Match Detail UI
- [ ] Display teams facing each other with placeholder logos
- [ ] Show match information (time, date, competition, venue)
- [ ] Display route parameter (match ID) to verify it works
- [ ] Add prediction form placeholder (3 buttons: Home, Draw, Away)
- [ ] Add back button to return to matches list

### Task 5.3: Link Matches List to Match Detail
- [ ] Update Matches tab to make cards pressable
- [ ] Use router.push() or Link to navigate to `/match/[id]`
- [ ] Pass match ID from list to detail screen
- [ ] Verify ID displays correctly on detail screen

### Task 5.4: Configure Match Detail in Root Layout
- [ ] Register `match/[id]` route in root layout
- [ ] Configure header title ("Match Details")
- [ ] Set presentation style (card or modal)
- [ ] Test back navigation

### Task 5.5: Test Dynamic Routing
- [ ] Navigate from matches list to detail
- [ ] Verify correct match ID appears
- [ ] Test with different match IDs
- [ ] Verify back navigation works
- [ ] Test on all platforms

**Checkpoint:** Dynamic routing working, can view individual match details

---

## Part 6: Error Handling & Edge Cases

### Task 6.1: Create 404 Not Found Screen
- [ ] Create `app/+not-found.tsx`
- [ ] Design 404 error screen with helpful message
- [ ] Add button to navigate back to landing/home
- [ ] Style consistently with app theme

### Task 6.2: Test 404 Handling
- [ ] Navigate to invalid route manually
- [ ] Verify 404 screen appears
- [ ] Test "Go Home" button works

**Checkpoint:** App handles invalid routes gracefully

---

## Part 7: Deep Linking & Advanced Navigation

### Task 7.1: Test Deep Linking (Development)
- [ ] Use npx uri-scheme to test iOS deep links
- [ ] Use npx uri-scheme to test Android deep links
- [ ] Test opening specific match: `bestshot://match/123`
- [ ] Test opening tabs: `bestshot://(tabs)/matches`
- [ ] Verify invalid deep links show 404

### Task 7.2: Configure Screen Transitions (Optional)
- [ ] Explore animation options for tab switches
- [ ] Configure platform-specific transitions (iOS vs Android)
- [ ] Test transition smoothness

**Checkpoint:** Deep linking functional, navigation feels polished

---

## Part 8: Documentation & Final Testing

### Task 8.1: Document Navigation Structure
- [ ] Create `docs/navigation-map.md`
- [ ] Document complete route tree
- [ ] List all deep link patterns
- [ ] Explain route groups and dynamic routes

### Task 8.2: Comprehensive Navigation Testing
- [ ] **Landing Screen:**
  - [ ] Sign In navigation works
  - [ ] Register navigation works
- [ ] **Auth Screens:**
  - [ ] Forms display properly
  - [ ] Navigation to tabs works (placeholder)
  - [ ] Back navigation to landing works
- [ ] **Tabs:**
  - [ ] All tabs accessible
  - [ ] Icons display correctly
  - [ ] Active state highlights properly
  - [ ] Headers show correct titles
- [ ] **Match Detail:**
  - [ ] Accessible from matches list
  - [ ] Shows correct match ID
  - [ ] Back navigation works
- [ ] **404:**
  - [ ] Shows for invalid routes
  - [ ] Navigation back works
- [ ] **Deep Links:**
  - [ ] Match deep links work
  - [ ] Invalid deep links show 404
- [ ] **Cross-Platform:**
  - [ ] Test everything on iOS
  - [ ] Test everything on Android
  - [ ] Test everything on Web (if applicable)
  - [ ] Test on physical devices

### Task 8.3: Update Project Documentation
- [ ] Update README with navigation section
- [ ] Document how to test deep links
- [ ] List all available routes
- [ ] Explain routing conventions used

### Task 8.4: Commit Phase 2
- [ ] Review all changes
- [ ] Verify no broken navigation paths
- [ ] Ensure all screens load without errors
- [ ] Create git commit: "feat: Complete Phase 2 - Navigation & Screen Structure"

---

## Screen Map Reference

```
/                           → Landing Screen
├── sign-in                 → Sign In Screen
├── register                → Register Screen
├── (tabs)                  → Tab Navigator
│   ├── index               → Home Tab
│   ├── matches             → Matches List Tab
│   ├── predictions         → Predictions Tab
│   └── profile             → Profile Tab
├── match/[id]              → Match Detail Screen
└── +not-found              → 404 Screen
```

---

## Learning Goals

Before moving to Phase 3, ensure you understand:

- **File-based Routing:** How files in `app/` map to routes
- **Layouts:** How `_layout.tsx` files configure navigation
- **Route Groups:** Using parentheses for organization without affecting URLs
- **Dynamic Routes:** Square brackets `[param]` for variable segments
- **Navigation Methods:** Link component vs useRouter hook
- **Deep Linking:** How Expo Router handles app schemes
- **Navigation Patterns:** Stack vs Tabs vs Modals

---

## Deliverable Checklist

- [ ] Expo Router installed and configured
- [ ] Landing screen functional
- [ ] Sign In screen created (placeholder)
- [ ] Register screen created (placeholder)
- [ ] Tab navigation with 4 tabs working
- [ ] All tab screens have placeholder content
- [ ] Match detail dynamic route functional
- [ ] 404 screen handles invalid routes
- [ ] Navigation works on iOS (macOS only)
- [ ] Navigation works on Android
- [ ] Navigation works on physical device
- [ ] Deep linking tested
- [ ] Navigation documented
- [ ] Phase 2 committed to git

**Status:** ✅ Phase 2 Complete — Ready for Phase 3 (API Integration)

---

## Common Issues to Watch For

- Forgetting to set entry point in package.json
- Missing expo-router plugin in app.json
- Incorrect file naming (case sensitivity matters)
- Route groups not working (check parentheses syntax)
- Deep links not working (verify scheme in app.json)
- Tab icons not showing (check @expo/vector-icons installation)
- Headers appearing when they shouldn't (check headerShown option)
- Navigation not updating (clear cache and restart)
