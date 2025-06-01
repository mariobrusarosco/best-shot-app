# ADR 003: UI Styling and Component Strategy

**Date**: 2024-07-27

**Status**: Decided

## Context

We need a UI styling and component strategy for the "Best Shot" application that ensures a consistent look and feel across Web, Android, and iOS. The strategy should support responsive design, theming, efficient development, and good performance on all target platforms.

## Decision

We will adopt **Tamagui** as our primary UI styling and component strategy.

## Reasoning

1.  **Universal by Design**: Tamagui is specifically architected for universal React Native applications, targeting iOS, Android, and Web from a single codebase. This aligns perfectly with our core requirement.
2.  **Optimizing Compiler**: Tamagui includes an optimizing compiler that flattens styles, extracts critical CSS, and performs other optimizations to ensure high performance on all platforms, especially the web.
3.  **Rich Styling System**: It offers a comprehensive styling system that includes:
    - Responsive styles (e.g., `{$sm: 'red', $md: 'blue'}`).
    - Pseudo-styles (hover, focus, active).
    - Theming support.
    - Utility props for rapid styling.
4.  **Optional UI Component Library**: Tamagui provides a set of pre-built, unstyled or minimally styled components (`tamagui/lucide-icons`, `tamagui/sheet`, `tamagui/dialog`, `tamagui/button`, etc.) that are highly customizable and themable. We can use these as needed or build our own on top of Tamagui's core styling capabilities.
5.  **Developer Experience**: The combination of powerful styling primitives and optional components can significantly speed up UI development and ensure consistency.
6.  **Performance Focus**: The creators of Tamagui have put a strong emphasis on performance, which is critical for a good user experience, particularly on mobile and for web Vitals.
7.  **Incremental Adoption**: We can start by using Tamagui Core for styling and gradually adopt its pre-built UI components as our needs evolve.
8.  **Ecosystem Alignment**: While newer, Tamagui is gaining significant traction in the Expo and React Native universal app community.

## Consequences

- **Benefits**:
  - Truly universal UI styling and components from a single API.
  - High performance due to the optimizing compiler.
  - Consistent look and feel across platforms.
  - Rich feature set for styling (responsive, themes, pseudo-styles).
  - Improved developer productivity.
- **Potential Considerations**:
  - There is a learning curve associated with Tamagui's concepts and compiler, though its API is generally intuitive.
  - The ecosystem around Tamagui, while growing, might be smaller than that of more established web-only UI libraries for very specific pre-built components. However, its flexibility allows for easy creation of custom components.

## Alternatives Considered

- **React Native `StyleSheet` + Manual Adaptation**: Offers maximum control but is verbose and makes cross-platform consistency and responsiveness challenging to maintain.
- **Utility-First CSS (e.g., NativeWind)**: Excellent for styling but doesn't provide pre-built UI components. Would require an additional component library or manual component creation.
- **React Native Paper**: Mature component library with Material Design focus. Good for mobile, but less explicitly designed for universal web + native parity in the way Tamagui is.
- **Other Cross-Platform Component Libraries**: Many libraries focus primarily on mobile or web, with cross-platform support as a secondary concern. Tamagui's primary focus _is_ universal.
