# ADR 001: Core Technology Stack

**Date**: 2024-07-27

**Status**: Proposed

## Context

We need to develop "Best Shot," a football match guessing game, targeting Web, Android, and iOS platforms with a single, integrated codebase. The API and database are pre-existing and will be consumed by this application. The goal is to enable rapid development and a consistent user experience across all platforms.

## Decision

We will use the following core technology stack:

1.  **Framework**: React Native
    - **Reasoning**: Allows for cross-platform development from a single JavaScript/TypeScript codebase, targeting native performance on mobile and a web version. It has a large community and rich ecosystem. The provided `React Native Docs` and `ExpoDoc` support this choice.
2.  **Development Platform & Tooling**: Expo
    - **Reasoning**: Expo significantly simplifies React Native development by managing native modules, providing a robust SDK, offering powerful build services (EAS Build), and enabling web support out-of-the-box. This aligns with the "unique codebase" requirement and the positive experiences shared in the `ExpoDoc`. It helps in shipping fast and iterating.
3.  **Language**: TypeScript
    - **Reasoning**: Adds static typing to JavaScript, improving code quality, maintainability, and developer experience by catching errors early. Recommended in `ExpoDoc` as "the best static typing system in the world."
4.  **Navigation**: React Navigation
    - **Reasoning**: The de-facto standard for navigation in React Native applications, offering flexible and customizable navigation solutions for mobile and web. Mentioned in `ExpoDoc` as a helpful library.
5.  **State Management**:
    - **Async State/API Cache**: TanStack Query (formerly React Query)
      - **Reasoning**: Excellent for fetching, caching, synchronizing, and updating server state. It simplifies data fetching logic and provides features like automatic refetching and caching. Mentioned in `ExpoDoc`.
    - **Global UI State**: Zustand (or a similar lightweight library like MobX-State-Tree, if complex global state becomes a clear need).
      - **Reasoning**: For managing global UI state that isn't directly tied to server data. Zustand is simple, small, and unopinionated. MobX-State-Tree is mentioned in `ExpoDoc` as a view-modeling tool, which can be considered if complex client-side state modeling is required. We will start with TanStack Query and introduce a global UI state manager if the need arises.
6.  **Styling**: React Native StyleSheet + Platform-Specific Adaptations / Potentially Tamagui
    - **Reasoning**: Start with React Native's built-in `StyleSheet` for core styling. For web responsiveness and potentially more advanced cross-platform styling, explore options like utility-based approaches or a UI kit like Tamagui, which is designed for universal React Native apps.

## Consequences

- **Benefits**:
  - Single codebase for Web, iOS, and Android, reducing development and maintenance effort.
  - Faster development cycles due to Expo's tooling and React Native's ecosystem.
  - Improved code quality and robustness with TypeScript.
  - Access to a wide range of community libraries and tools.
- **Potential Drawbacks**:
  - Performance on web might not be as optimized as a purely web-native framework for very complex UIs, but Expo Web has made significant strides.
  - Reliance on Expo's ecosystem and release cycle for some native features, though the "bare workflow" offers flexibility if needed (as mentioned in `ExpoDoc`).
  - Learning curve for developers new to React Native or Expo.

## Alternatives Considered

- **Native Development (Swift/Kotlin) + Separate Web App**: Would not meet the "single codebase" requirement and would significantly increase development time and cost.
- **Flutter**: Another strong cross-platform framework, but React Native aligns better with potential existing JavaScript/React expertise and the provided documentation leans towards React/Expo.
- **Progressive Web App (PWA) only**: Would not provide a native app experience on iOS and Android, which is often preferred by users for games and regular engagement.

This stack provides a solid foundation for building "Best Shot" efficiently and effectively across the target platforms.
