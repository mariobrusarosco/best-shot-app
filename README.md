# Best Shot App

## Project Overview

This is the Best Shot App, a cross-platform application built with Expo, React Native, TypeScript, and Tamagui. It aims to deliver [describe the main purpose or goal of the app briefly here - e.g., a fantastic user experience for X, Y, and Z].

This project uses `expo-router` for file-system based navigation and `tanstack/react-query` for data fetching.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- Expo CLI: `npm install -g expo-cli` (if not already installed)
- Android Studio (for Android emulator) or Xcode (for iOS simulator)

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd best-shot-app
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Project

-   **Start the development server:**
    ```bash
    npm start
    # or
    # expo start
    ```
    This will open the Expo DevTools in your browser.

-   **Run on Android:**
    -   Open an Android emulator or connect a physical device.
    -   In the Expo DevTools (or terminal where `npm start` is running), press `a`.
    -   Alternatively, run: `npm run android`

-   **Run on iOS:**
    -   Open an iOS simulator or connect a physical device (macOS required).
    -   In the Expo DevTools (or terminal where `npm start` is running), press `i`.
    -   Alternatively, run: `npm run ios`

-   **Run on Web:**
    -   In the Expo DevTools (or terminal where `npm start` is running), press `w`.
    -   Alternatively, run: `npm run web`

## Project Structure

-   `src/`: Contains all the application source code.
    -   `app/`: Expo Router screens and layouts.
    -   `assets/`: Images, fonts, etc.
    -   `components/`: Shared UI components.
    -   `constants/`: Theme colors, global styles, etc.
    -   `config/`: Environment configurations.
    -   `domains/`: Feature-specific modules.
    -   `hooks/`: Shared custom React hooks.
    -   `services/`: API services.
    -   `store/`: State management.
    -   `types/`: Shared TypeScript types.
    -   `utils/`: Utility functions.
-   `docs/`: Project documentation.

## Linting and Formatting

-   **Lint files:**
    ```bash
    npm run lint
    ```
-   **Fix linting errors:**
    ```bash
    npm run lint:fix
    ```
-   **Format files with Prettier:**
    ```bash
    npm run format
    ```

## Documentation

-   **Architectural Decision Records (ADRs):** [`docs/decisions/`](./docs/decisions/)
-   **Developer Guides:** [`docs/guides/`](./docs/guides/)
-   **Development Plan:** [`docs/plan/`](./docs/plan/)
-   **Issue Resolution Log:** [`docs/fixing-log/`](./docs/fixing-log/)

---

_This README is a work in progress and will be updated as the project evolves._ 
