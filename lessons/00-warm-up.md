# Warm-Up Session: Course Introduction (February 28th)

## Session Overview

This initial warm-up session established the course structure and prepared for our upcoming lessons.

## Topics Covered

1. **Course Structure**
   - 12-week curriculum
   - 2 hours per week (Fridays)
   - Combined learning and coding in each session

2. **Technology Stack**
   - React Native with Expo
   - Multi-platform approach (Web, iOS, Android)
   - TypeScript for type safety

3. **Architecture Decision**
   - Selected a Hybrid approach combining:
     - Domain-Driven Design for business logic
     - Feature-First organization for UI components
   - Folder structure:
   ```
   src/
   ├── core/                 # Domain layer
   │   ├── entities/         # Domain models
   │   ├── usecases/         # Business logic
   │   └── repositories/     # Data interfaces
   ├── infrastructure/       # Implementation of repositories
   │   ├── api/
   │   └── storage/
   ├── features/             # Organized by feature
   │   ├── auth/
   │   ├── profile/
   │   └── [feature]/
   ├── ui/                   # Shared UI components
   │   ├── components/
   │   └── theme/
   └── platform/             # Platform-specific code
       ├── web/
       ├── ios/
       └── android/
   ```

4. **Development Strategy**
   - Start from scratch with Expo
   - Target all three platforms simultaneously
   - Incremental migration from existing web app
   - Deploy to best-shot-v2.mariobrusarosco.com

## Pre-Lesson Setup Tasks

- Install Node.js (LTS version)
- Install Expo CLI: `npm install -g expo-cli`
- Set up development environment for mobile testing

## Resources Shared

- [React Native Core Concepts](https://reactnative.dev/docs/intro-react-native-components)
- [React Native for Web Developers](https://reactnative.dev/docs/intro-react)
- [Environment Setup Options](https://reactnative.dev/docs/environment-setup)
- [Platform-Specific Code](https://reactnative.dev/docs/platform-specific-code)

## Next Steps

Prepare for Lesson 1 focusing on project initialization and multi-platform fundamentals. 