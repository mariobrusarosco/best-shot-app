# Phase 1: Foundation & Setup

**Goal**: Establish the project structure, core dependencies, and initial configurations to support development across Web, iOS, and Android.

## Tasks

1.  **[ ] Initialize Expo Project**

    - [ ] Create a new Expo (SDK latest stable version) project with TypeScript.
    - [ ] Choose a suitable template (e.g., blank with tabs, or a minimal template).
    - [ ] Verify project runs on Web, iOS simulator, and Android emulator.

2.  **[ ] Setup Directory Structure**

    - [ ] Create `docs/` directory.
      - [ ] Create `docs/decisions/` (ADRs will go here - `001-technology-stack.md` already created).
      - [ ] Create `docs/guides/` (Developer guides will go here).
      - [ ] Create `docs/plan/` (Phase plans will go here - this file `phase-1-foundation.md` is the first).
      - [ ] Create `docs/fixing-log/` (Issue resolution logs will go here).
    - [ ] Define a scalable `src/` directory structure:
      - `src/components/` (shared UI components)
      - `src/screens/` (top-level screen components)
      - `src/navigation/` (navigation setup, stacks, navigators)
      - `src/services/` (API interaction, other external services)
      - `src/hooks/` (custom React hooks)
      - `src/store/` (state management setup - e.g., TanStack Query providers, Zustand stores if used)
      - `src/types/` (shared TypeScript types and interfaces, especially for API data)
      - `src/assets/` (images, fonts, etc.)
      - `src/constants/` (application-wide constants)
      - `src/utils/` (utility functions)
      - `src/config/` (environment configurations, API base URLs etc.)

3.  **[ ] Install Core Dependencies**

    - [ ] `react-navigation` (for navigation - `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs` etc. as needed).
    - [ ] `expo-router` (Consider for file-system based routing if preferred over React Navigation's declarative approach, especially good for web-like routing).
      - _Decision Point_: We need to decide if `expo-router` is a better fit than `react-navigation` or if they can be used complementarily. For a start, `react-navigation` is more established for mobile-first, but `expo-router` is gaining traction for universal apps.
    - [ ] `tanstack/react-query` (for API data fetching and caching).
    - [ ] `axios` (or `fetch` API) for HTTP requests.
    - [ ] Consider a UI component library (e.g., `react-native-paper`, `tamagui`, or `nativewind` for TailwindCSS-like styling) - _Decision Point_: To be discussed and decided in an ADR if we opt for a full library beyond basic `StyleSheet`.

4.  **[ ] Setup Basic Navigation**

    - [ ] Implement a basic tab navigator or stack navigator (e.g., Home, Profile, Settings placeholders).
    - [ ] Ensure navigation works on all three platforms.

5.  **[ ] Environment Configuration**

    - [ ] Set up a way to manage environment variables (e.g., API base URL) using `expo-constants` or a `.env` file approach compatible with Expo.

6.  **[ ] Linting and Formatting**

    - [ ] Configure ESLint and Prettier for consistent code style.
    - [ ] Add script to `package.json` for linting and formatting.

7.  **[ ] Initial `README.md` Update**

    - [ ] Update the root `README.md` to include:
      - Project overview.
      - Instructions on how to get started (install dependencies, run the project on different platforms).
      - Links to `docs/decisions/`, `docs/guides/`, and `docs/plan/`.

8.  **[ ] Basic API Service Setup**
    - [ ] Create a basic API service module in `src/services/api.ts` (e.g., using Axios instance with base URL).
    - [ ] Define a simple type for a common API response or a placeholder endpoint in `src/types/api.ts`.

**Completion Criteria for Phase 1**: All tasks above are checked. The project has a basic runnable skeleton with navigation, foundational tooling, and clear documentation structure. The development environment is stable and consistent for all team members.
