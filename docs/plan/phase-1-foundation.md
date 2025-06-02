# Phase 1: Foundation & Setup

**Goal**: Establish the project structure, core dependencies, and initial configurations to support development across Web, iOS, and Android.

## Tasks

1.  **[X] Initialize Expo Project**

    - [X] Create a new Expo (SDK latest stable version) project with TypeScript.
    - [X] Choose a suitable template (e.g., blank with tabs, or a minimal template).
    - [X] Verify project runs on Web, iOS simulator, and Android emulator.

2.  **[X] Setup Directory Structure**

    - [X] Create `docs/` directory.
      - [X] Create `docs/decisions/` (ADRs will go here - `001-technology-stack.md` already created).
      - [X] Create `docs/guides/` (Developer guides will go here).
      - [X] Create `docs/plan/` (Phase plans will go here - this file `phase-1-foundation.md` is the first).
      - [X] Create `docs/fixing-log/` (Issue resolution logs will go here).
    - [X] Define a scalable `src/` directory structure:
      - `src/app/` (Expo Router: screen components, layouts, and route definitions)
      - `src/assets/` (images, fonts, etc. - moved from root)
      - `src/components/` (shared, global UI components - moved from root)
      - `src/constants/` (application-wide constants, themes - moved from root)
      - `src/config/` (environment configurations, API base URLs etc.)
      - `src/domains/` (feature-specific modules, each potentially containing its own components, hooks, services, types, utils, store slices)
      - `src/hooks/` (shared, global custom React hooks)
      - `src/services/` (shared, global API interaction, other external services)
      - `src/store/` (shared, global state management setup - e.g., TanStack Query providers, Zustand stores if used)
      - `src/types/` (shared, global TypeScript types and interfaces)
      - `src/utils/` (shared, global utility functions)
      - `src/navigation/` (Optional: for navigation helper functions or complex configurations beyond Expo Router's file-based setup)

3.  **[X] Install Core Dependencies**

    - [X] `react-navigation` (for navigation - `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs` etc. as needed). - _Note: `@react-navigation/native` is present. `expo-router` handles stack/tabs._
    - [X] `expo-router` (Consider for file-system based routing if preferred over React Navigation's declarative approach, especially good for web-like routing). - _Note: Already installed and configured as main entry._
    - [X] `tanstack/react-query` (for API data fetching and caching).
    - [X] `axios` (or `fetch` API) for HTTP requests.
    - [X] UI Component Library: `tamagui` (with `@tamagui/config`, `@tamagui/babel-plugin`, `@tamagui/font-inter`).

4.  **[X] Setup Basic Navigation**

    - [X] Implement a basic tab navigator (Home, Explore, Profile) using `expo-router`.
    - [ ] Ensure navigation works on all three platforms. (_Note: Basic structure created, platform testing pending by developer_)

5.  **[X] Environment Configuration**

    - [X] Set up a way to manage environment variables (e.g., API base URL) using `expo-constants` and `app.json` `extra` field. (Placeholders added).

6.  **[X] Linting and Formatting**

    - [X] Configure ESLint and Prettier for consistent code style.
    - [X] Add script to `package.json` for linting and formatting.

7.  **[X] Initial `README.md` Update**

    - [X] Update the root `README.md` to include:
      - Project overview.
      - Instructions on how to get started (install dependencies, run the project on different platforms).
      - Links to `docs/decisions/`, `docs/guides/`, and `docs/plan/`.

8.  **[X] Basic API Service Setup**
    - [X] Create a basic API service module in `src/services/api.ts` (e.g., using Axios instance with base URL).
    - [X] Define a simple type for a common API response or a placeholder endpoint in `src/types/api.ts`.

**Completion Criteria for Phase 1**: All tasks above are checked. The project has a basic runnable skeleton with navigation, foundational tooling, and clear documentation structure. The development environment is stable and consistent for all team members.
