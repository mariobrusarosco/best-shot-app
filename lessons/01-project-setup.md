# Lesson 1: Project Setup & Multi-Platform Foundations

## Lesson Objectives

By the end of this lesson, you will be able to:
1. Create and configure a new Expo project with TypeScript
2. Implement the hybrid architecture folder structure
3. Create components that work across Web, iOS, and Android
4. Understand platform-specific customizations

## Lesson Plan (2 hours)

### 1. Project Initialization (30 min)

- Create a new Expo project:
  ```bash
  npx create-expo-app BestShotV2 -t expo-template-typescript
  ```
- Set up the hybrid architecture folders:
  ```
  src/
  ├── core/              # Domain layer (DDD)
  ├── infrastructure/    # External services 
  ├── features/          # Feature-organized components
  ├── ui/                # Shared UI components
  └── platform/          # Platform-specific overrides
  ```
- Configure essential dependencies:
  - Navigation
  - State management
  - Testing utilities

### 2. Multi-Platform Fundamentals (45 min)

- Understanding React Native components vs. Web components
- Creating responsive layouts that work on all platforms
- Platform-specific styling and behavior:
  ```jsx
  import { Platform, StyleSheet } from 'react-native';
  
  const styles = StyleSheet.create({
    container: {
      padding: Platform.select({
        ios: 10,
        android: 8,
        web: 12
      })
    }
  });
  ```
- Testing components on different platforms

### 3. First Feature Implementation (45 min)

- Implementing a simple screen from your existing app
- Applying architecture principles in practice
- Ensuring consistent behavior across platforms
- Running and testing on Web, iOS simulator, and Android emulator

## Homework

1. Complete any unfinished aspects of the first feature
2. Experiment with platform-specific customizations
3. Review React Navigation documentation for next lesson

## Next Lesson Preview

Lesson 2 will focus on navigation and routing across platforms. 