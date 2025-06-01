# ADR 002: Navigation Strategy

**Date**: 2024-07-27

**Status**: Decided

## Context

We require a navigation solution for the "Best Shot" application that supports a unique codebase targeting Web, Android, and iOS. The solution should provide a good developer experience, handle deep linking effectively, and feel intuitive across all platforms. Key contenders considered were `react-navigation` and `expo-router`.

## Decision

We will adopt **`expo-router`** as our primary navigation solution.

## Reasoning

1.  **Universal Design**: `expo-router` is specifically designed and built by the Expo team for universal applications (iOS, Android, Web). Its architecture inherently supports the "unique codebase" requirement.
2.  **File-System Routing**: It employs a file-system-based routing paradigm (similar to Next.js), which is intuitive for web development and translates effectively to native app structures. This simplifies route definition and organization.
3.  **Web-First Experience**: `expo-router` excels at providing a native web experience, including clean URLs, server-side rendering capabilities (if ever needed), and robust deep linking.
4.  **Simplified Deep Linking**: Universal deep linking across all platforms is streamlined with `expo-router`.
5.  **API Routes**: While our primary API is external, `expo-router`'s support for API routes offers flexibility for any future light backend-for-frontend needs directly within the app structure.
6.  **Expo Ecosystem Alignment**: Adopting `expo-router` aligns us with the recommended tooling and future direction of the Expo platform, ensuring better long-term support and compatibility.
7.  **Developer Experience**: It aims to reduce boilerplate for universal navigation compared to manually configuring `react-navigation` for all three platforms with a consistent feel.

While `react-navigation` is a mature and powerful library for mobile, `expo-router`'s focus on universal app development makes it a more strategic choice for this project's specific requirements.

## Consequences

- **Benefits**:
  - Simplified setup for universal navigation.
  - Intuitive routing for developers familiar with web frameworks like Next.js.
  - Improved web experience and SEO-friendly URLs.
  - Strong integration with the Expo ecosystem.
- **Potential Considerations**:
  - The `expo-router` community and third-party ecosystem, while growing rapidly, might be smaller than that of `react-navigation` for highly specific, complex mobile-only navigation patterns. However, `expo-router` can often be composed with `react-navigation` primitives if absolutely necessary.
  - The team will need to familiarize themselves with file-system routing if they haven't used it before.

## Alternatives Considered

- **`react-navigation`**: A highly mature library, excellent for mobile-first applications. However, adapting it for a truly seamless universal (web + native) experience with shared routing logic can be more complex than using `expo-router`.
