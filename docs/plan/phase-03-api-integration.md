# Phase 3: API Integration

**Goal:** App fetches and displays real data from existing Best Shot API

**Timeline Estimate:** 4-6 hours

**Prerequisites:** Phase 2 completed (all screens navigable with placeholder data)

---

## Overview

Connect the mobile app to your existing Best Shot API (`api-best-shot-demo.mariobrusarosco.com`). Implement Tanstack Query for data fetching, caching, and state management. Replace all placeholder/mock data with real API responses. Handle loading states, error states, and network failures gracefully.

---

## Part 1: Environment Configuration

### Task 1.1: Set Up Environment Variables
- [ ] Install expo-constants (if not already installed)
- [ ] Create `.env` file in project root
- [ ] Add API base URL for development
- [ ] Add API base URL for production
- [ ] Add any API keys or tokens needed
- [ ] Create `.env.example` with placeholder values

### Task 1.2: Configure Environment Variable Access
- [ ] Install dotenv or use Expo's environment variable system
- [ ] Configure app.json to use environment variables
- [ ] Create config file to access environment variables
- [ ] Test that environment variables load correctly
- [ ] Add .env to .gitignore

### Task 1.3: Verify API Accessibility
- [ ] Test API URL is reachable from development machine
- [ ] Verify API accepts requests from mobile app
- [ ] Check if CORS is configured (for web platform)
- [ ] Confirm API endpoints match web app endpoints
- [ ] Document available endpoints

**Checkpoint:** Environment configured, API URL accessible

---

## Part 2: HTTP Client Setup

### Task 2.1: Install HTTP Client
- [ ] Install axios (or fetch wrapper)
- [ ] Verify installation in package.json

### Task 2.2: Create API Client Service
- [ ] Create `src/services/api-client.ts`
- [ ] Configure base URL from environment variables
- [ ] Set default headers (Content-Type, Accept)
- [ ] Set timeout for requests
- [ ] Export configured client instance

### Task 2.3: Add Request Interceptor
- [ ] Create request interceptor function
- [ ] Log outgoing requests (development only)
- [ ] Add authorization header placeholder (for Phase 4)
- [ ] Handle request configuration

### Task 2.4: Add Response Interceptor
- [ ] Create response interceptor for successful responses
- [ ] Log successful responses (development only)
- [ ] Return response data consistently

### Task 2.5: Add Error Interceptor
- [ ] Create error interceptor for failed requests
- [ ] Handle network errors (no connection)
- [ ] Handle timeout errors
- [ ] Handle 4xx errors (client errors)
- [ ] Handle 5xx errors (server errors)
- [ ] Log errors appropriately
- [ ] Format error messages for user display

### Task 2.6: Test API Client
- [ ] Create simple test request to API
- [ ] Verify successful response
- [ ] Test error handling with invalid endpoint
- [ ] Test timeout handling
- [ ] Verify interceptors log correctly

**Checkpoint:** API client configured and tested, interceptors working

---

## Part 3: Tanstack Query Setup

### Task 3.1: Install Tanstack Query
- [ ] Install @tanstack/react-query
- [ ] Verify installation in package.json

### Task 3.2: Configure Query Client
- [ ] Create query client instance
- [ ] Set default query options (staleTime, cacheTime, retry logic)
- [ ] Configure refetch on window focus behavior
- [ ] Configure refetch on reconnect behavior
- [ ] Set default error handling

### Task 3.3: Add Query Provider to App
- [ ] Import QueryClientProvider
- [ ] Wrap app with QueryClientProvider in root layout
- [ ] Pass configured query client
- [ ] Verify provider wraps all navigable screens

### Task 3.4: Set Up React Query DevTools (Optional)
- [ ] Install @tanstack/react-query-devtools
- [ ] Add DevTools to app (development only)
- [ ] Test DevTools display query state
- [ ] Understand how to inspect queries

**Checkpoint:** Tanstack Query installed, provider configured, ready for queries

---

## Part 4: API Endpoint Definitions

### Task 4.1: Document API Endpoints
- [ ] List all endpoints from existing web app
- [ ] Document matches endpoints (list, single, by league, by date)
- [ ] Document leagues endpoints
- [ ] Document predictions endpoints (create, list, user predictions)
- [ ] Document user/profile endpoints
- [ ] Document authentication endpoints (for Phase 4)
- [ ] Note request methods (GET, POST, PUT, DELETE)
- [ ] Note required parameters and payloads

### Task 4.2: Create API Service Functions
- [ ] Create `src/services/matches.ts`
- [ ] Create `src/services/leagues.ts`
- [ ] Create `src/services/predictions.ts`
- [ ] Create `src/services/users.ts`
- [ ] Define function for each endpoint using API client
- [ ] Add TypeScript types for request/response

### Task 4.3: Define TypeScript Types
- [ ] Create `src/types/match.ts` for match data types
- [ ] Create `src/types/league.ts` for league data types
- [ ] Create `src/types/prediction.ts` for prediction data types
- [ ] Create `src/types/user.ts` for user data types
- [ ] Create `src/types/api.ts` for API response wrappers
- [ ] Ensure types match API response structure

**Checkpoint:** API services structured, endpoints defined with types

---

## Part 5: Create Query Hooks

### Task 5.1: Create Matches Query Hooks
- [ ] Create `src/hooks/useMatches.ts`
- [ ] Implement useMatches hook (fetch all matches)
- [ ] Implement useMatch hook (fetch single match by ID)
- [ ] Implement useMatchesByLeague hook
- [ ] Implement useUpcomingMatches hook
- [ ] Configure query keys properly
- [ ] Set appropriate staleTime for each query

### Task 5.2: Create Leagues Query Hooks
- [ ] Create `src/hooks/useLeagues.ts`
- [ ] Implement useLeagues hook (fetch all leagues)
- [ ] Implement useLeague hook (fetch single league)
- [ ] Configure query keys

### Task 5.3: Create Predictions Query Hooks
- [ ] Create `src/hooks/usePredictions.ts`
- [ ] Implement usePredictions hook (fetch all predictions for a match)
- [ ] Implement useUserPredictions hook (fetch current user's predictions)
- [ ] Implement usePredictionsByStatus hook (pending, won, lost)
- [ ] Configure query keys

### Task 5.4: Create User/Profile Query Hooks
- [ ] Create `src/hooks/useProfile.ts`
- [ ] Implement useProfile hook (fetch current user profile)
- [ ] Implement useUserStats hook (win rate, total predictions, etc.)
- [ ] Configure query keys

### Task 5.5: Test Query Hooks
- [ ] Test each hook fetches data correctly
- [ ] Verify data is cached
- [ ] Verify refetch behavior
- [ ] Check query keys are unique and descriptive

**Checkpoint:** All query hooks created and tested, data fetching works

---

## Part 6: Integrate API into Screens

### Task 6.1: Update Home Screen
- [ ] Replace mock data with useUpcomingMatches hook
- [ ] Replace mock data with useUserPredictions hook
- [ ] Replace mock data with useUserStats hook
- [ ] Display actual counts (upcoming matches, predictions)
- [ ] Display actual win rate
- [ ] Handle loading state (show skeleton or spinner)
- [ ] Handle error state (show error message)
- [ ] Handle empty state (no data yet)

### Task 6.2: Update Matches Screen
- [ ] Replace mock matches with useMatches hook
- [ ] Display real match data in list
- [ ] Show team names from API
- [ ] Show match times and dates from API
- [ ] Show league/competition info
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty state (no matches available)

### Task 6.3: Update Match Detail Screen
- [ ] Get match ID from route params
- [ ] Use useMatch hook with the ID
- [ ] Display real match data (teams, venue, time, competition)
- [ ] Show team logos if available in API
- [ ] Display any available match stats
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle match not found (invalid ID)

### Task 6.4: Update Predictions Screen
- [ ] Replace mock predictions with useUserPredictions hook
- [ ] Display real prediction data
- [ ] Show match details from prediction
- [ ] Show prediction status (pending, won, lost)
- [ ] Calculate and display stats (total, wins, losses, win rate)
- [ ] Handle loading state
- [ ] Handle error state
- [ ] Handle empty state (no predictions yet)

### Task 6.5: Update Profile Screen
- [ ] Use useProfile hook to fetch user data
- [ ] Display real user name and email
- [ ] Show user stats if available
- [ ] Handle loading state
- [ ] Handle error state

**Checkpoint:** All screens display real API data, mock data removed

---

## Part 7: Loading & Error States

### Task 7.1: Create Loading Components
- [ ] Create `src/components/LoadingSpinner.tsx`
- [ ] Create `src/components/SkeletonCard.tsx` for list items
- [ ] Create `src/components/SkeletonScreen.tsx` for full screens
- [ ] Style loading components consistently
- [ ] Use NativeWind/Tailwind for styling

### Task 7.2: Create Error Components
- [ ] Create `src/components/ErrorMessage.tsx`
- [ ] Accept error message prop
- [ ] Add retry button prop/callback
- [ ] Style error component
- [ ] Consider different error types (network, server, not found)

### Task 7.3: Create Empty State Components
- [ ] Create `src/components/EmptyState.tsx`
- [ ] Accept message and icon/illustration
- [ ] Add optional action button
- [ ] Style consistently

### Task 7.4: Implement Loading States
- [ ] Use isLoading from query hooks
- [ ] Show loading spinner or skeleton while fetching
- [ ] Ensure loading doesn't block navigation
- [ ] Test loading states on slow network

### Task 7.5: Implement Error States
- [ ] Use isError and error from query hooks
- [ ] Display error messages to users
- [ ] Add retry functionality using refetch
- [ ] Test error states (turn off API or use invalid URL)
- [ ] Test network timeout errors

### Task 7.6: Implement Empty States
- [ ] Check if data is empty after successful fetch
- [ ] Show appropriate empty state message
- [ ] Add helpful action (e.g., "Browse Matches" if no predictions)
- [ ] Test empty states with new user account

**Checkpoint:** All screens handle loading, errors, and empty data gracefully

---

## Part 8: Pull-to-Refresh & Data Refetching

### Task 8.1: Add Pull-to-Refresh to Home Screen
- [ ] Import RefreshControl from react-native
- [ ] Wrap ScrollView with refresh control
- [ ] Use refetch from query hooks
- [ ] Set refreshing state based on isFetching
- [ ] Test pull-to-refresh updates data
- [ ] Style refresh indicator

### Task 8.2: Add Pull-to-Refresh to Matches Screen
- [ ] Add RefreshControl to FlatList
- [ ] Use refetch from useMatches hook
- [ ] Set refreshing state
- [ ] Test pull-to-refresh
- [ ] Ensure list scrolls to top on refresh (optional)

### Task 8.3: Add Pull-to-Refresh to Predictions Screen
- [ ] Add RefreshControl to FlatList
- [ ] Use refetch from useUserPredictions hook
- [ ] Set refreshing state
- [ ] Test pull-to-refresh

### Task 8.4: Add Pull-to-Refresh to Profile Screen
- [ ] Add RefreshControl to ScrollView
- [ ] Use refetch from useProfile hook
- [ ] Set refreshing state
- [ ] Test pull-to-refresh

### Task 8.5: Test Refetch Behavior
- [ ] Test data updates when pulled to refresh
- [ ] Verify cache updates correctly
- [ ] Test on slow network (should not block UI)
- [ ] Test simultaneous refreshes on different screens

**Checkpoint:** Pull-to-refresh working on all list/scroll screens

---

## Part 9: Offline Handling & Network Awareness

### Task 9.1: Install Network Detection
- [ ] Install @react-native-community/netinfo
- [ ] Verify installation

### Task 9.2: Create Network Status Hook
- [ ] Create `src/hooks/useNetworkStatus.ts`
- [ ] Use NetInfo to detect connection status
- [ ] Return isConnected state
- [ ] Return connection type (wifi, cellular, none)

### Task 9.3: Show Network Status Indicator
- [ ] Create `src/components/OfflineNotice.tsx`
- [ ] Display banner when offline
- [ ] Auto-hide when back online
- [ ] Style appropriately (subtle, not intrusive)

### Task 9.4: Add Network Banner to App
- [ ] Add OfflineNotice to root layout
- [ ] Position at top or bottom of screen
- [ ] Test by turning off network
- [ ] Verify banner appears/disappears

### Task 9.5: Configure Query Client for Offline
- [ ] Update query client network mode settings
- [ ] Decide behavior: fail immediately or queue for retry
- [ ] Configure retry logic for network errors
- [ ] Test app behavior when offline (queries should not retry infinitely)

### Task 9.6: Test Offline Scenarios
- [ ] Launch app while offline
- [ ] Use app, then go offline
- [ ] Verify cached data still displays
- [ ] Verify network banner appears
- [ ] Go back online, verify queries refetch
- [ ] Test on all platforms

**Checkpoint:** App handles offline gracefully, shows network status

---

## Part 10: Testing & Validation

### Task 10.1: Test All API Integrations
- [ ] **Home Screen:**
  - [ ] Fetches and displays upcoming matches count
  - [ ] Fetches and displays user predictions count
  - [ ] Fetches and displays user stats (win rate)
  - [ ] Shows loading state initially
  - [ ] Shows error if API fails
- [ ] **Matches Screen:**
  - [ ] Fetches and displays list of matches
  - [ ] Shows correct team names, times, dates
  - [ ] Navigates to detail with correct ID
  - [ ] Handles pagination (if implemented)
- [ ] **Match Detail Screen:**
  - [ ] Fetches single match by ID
  - [ ] Displays all match information
  - [ ] Shows loading while fetching
  - [ ] Shows error for invalid ID
- [ ] **Predictions Screen:**
  - [ ] Fetches user's predictions
  - [ ] Displays match, prediction, and status
  - [ ] Shows empty state for new users
  - [ ] Shows loading and error states
- [ ] **Profile Screen:**
  - [ ] Fetches user profile data
  - [ ] Displays name and email
  - [ ] Shows loading and error states

### Task 10.2: Test Loading States
- [ ] Throttle network in dev tools (slow 3G)
- [ ] Verify loading indicators appear
- [ ] Verify loading doesn't block navigation
- [ ] Verify skeleton screens look appropriate
- [ ] Test on all platforms

### Task 10.3: Test Error Handling
- [ ] Stop API server or use invalid URL
- [ ] Verify error messages display
- [ ] Test retry button functionality
- [ ] Restart API, verify retry works
- [ ] Test timeout errors (set low timeout)

### Task 10.4: Test Pull-to-Refresh
- [ ] Pull down on each screen with scrollable content
- [ ] Verify data refetches
- [ ] Verify refresh indicator animates
- [ ] Verify data updates after refresh
- [ ] Test on all platforms

### Task 10.5: Test Caching Behavior
- [ ] Load a screen (e.g., matches)
- [ ] Navigate away
- [ ] Navigate back
- [ ] Verify data loads instantly from cache
- [ ] Wait for background refetch if stale
- [ ] Test on all platforms

### Task 10.6: Test Cross-Platform API Calls
- [ ] Test all API integrations on iOS
- [ ] Test all API integrations on Android
- [ ] Test all API integrations on Web (if supported)
- [ ] Test on physical devices
- [ ] Verify network handling on cellular vs wifi

**Checkpoint:** All API integrations tested and working reliably

---

## Part 11: Documentation & Cleanup

### Task 11.1: Document API Integration
- [ ] Create `docs/api-integration.md`
- [ ] Document API base URLs (dev/prod)
- [ ] List all API endpoints used
- [ ] Document query keys structure
- [ ] Explain caching strategy
- [ ] Document error handling approach

### Task 11.2: Document Query Hooks
- [ ] List all custom query hooks
- [ ] Document parameters each hook accepts
- [ ] Document return values (data, loading, error, refetch)
- [ ] Provide usage examples

### Task 11.3: Update README
- [ ] Add API configuration section
- [ ] Explain how to set up .env file
- [ ] Document environment variables needed
- [ ] Explain how to point to different API environments

### Task 11.4: Code Cleanup
- [ ] Remove all mock data and comments referencing it
- [ ] Remove unused imports
- [ ] Verify all console.logs are removed or marked for dev only
- [ ] Format code consistently
- [ ] Check for any hardcoded API URLs (use env vars)

### Task 11.5: Commit Phase 3
- [ ] Review all changes
- [ ] Verify no mock data remains
- [ ] Ensure all screens fetch real data
- [ ] Test app end-to-end one more time
- [ ] Create git commit: "feat: Complete Phase 3 - API Integration"

---

## API Endpoints Reference

Document these based on your existing API:

### Matches
- `GET /matches` - List all matches
- `GET /matches/:id` - Get single match
- `GET /matches?league=:id` - Matches by league
- `GET /matches?date=:date` - Matches by date

### Leagues
- `GET /leagues` - List all leagues
- `GET /leagues/:id` - Get single league

### Predictions
- `GET /predictions/:matchId` - All predictions for a match
- `GET /users/:userId/predictions` - User's predictions
- `POST /predictions` - Create new prediction
- `PUT /predictions/:id` - Update prediction
- `DELETE /predictions/:id` - Delete prediction

### User/Profile
- `GET /users/me` - Current user profile
- `GET /users/:id` - User profile
- `GET /users/:id/stats` - User statistics

### Authentication (Phase 4)
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token

---

## Learning Goals

Before moving to Phase 4, ensure you understand:

- **Tanstack Query:** How to configure and use React Query
- **Query Hooks:** Creating custom hooks that wrap useQuery
- **Query Keys:** Importance of unique, structured query keys
- **Caching:** How React Query caches and invalidates data
- **Loading States:** Handling isLoading, isFetching, isRefetching
- **Error Handling:** Using isError and error from queries
- **Refetching:** Manual refetch, pull-to-refresh, background refetch
- **Network Awareness:** Detecting and handling offline state
- **Environment Variables:** Managing different environments (dev/prod)

---

## Deliverable Checklist

- [ ] Environment variables configured
- [ ] API client created with interceptors
- [ ] Tanstack Query installed and configured
- [ ] All API endpoints documented
- [ ] API service functions created with types
- [ ] Query hooks created for all data needs
- [ ] Home screen displays real API data
- [ ] Matches screen displays real API data
- [ ] Match detail screen displays real API data
- [ ] Predictions screen displays real API data
- [ ] Profile screen displays real API data
- [ ] Loading states implemented on all screens
- [ ] Error states implemented on all screens
- [ ] Empty states implemented where appropriate
- [ ] Pull-to-refresh working on all scrollable screens
- [ ] Network status detection implemented
- [ ] Offline notice displayed when no connection
- [ ] All API integrations tested on iOS
- [ ] All API integrations tested on Android
- [ ] All API integrations tested on physical devices
- [ ] API integration documented
- [ ] Phase 3 committed to git

**Status:** ✅ Phase 3 Complete — Ready for Phase 4 (Authentication)

---

## Common Issues to Watch For

- Environment variables not loading (check expo-constants setup)
- CORS errors on web platform (configure API server)
- Query keys not unique (leads to cache conflicts)
- Infinite refetch loops (check staleTime and cacheTime)
- Race conditions with multiple queries
- Network errors not handled gracefully
- Loading states blocking navigation
- Cached data showing stale information
- Pull-to-refresh not working (check RefreshControl integration)
- TypeScript type mismatches with API responses
- Offline mode causing infinite retries
- Memory leaks from unhandled promises
