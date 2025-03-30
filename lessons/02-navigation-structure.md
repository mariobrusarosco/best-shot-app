# Lesson 2: Navigation & Screen Structure

## Lesson Objectives

By the end of this lesson, you will be able to:
1. Set up React Navigation for cross-platform navigation
2. Implement a navigation structure that works on all platforms
3. Create multiple screens with proper routing
4. Understand navigation patterns specific to each platform

## Lesson Plan (2 hours)

### 1. React Navigation Setup (30 min)

- Install React Navigation and dependencies:
  ```bash
  npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
  npx expo install react-native-screens react-native-safe-area-context
  ```

- For web support:
  ```bash
  npm install @react-navigation/web
  ```

- Set up the navigation container in App.tsx
- Understanding navigation concepts:
  - Navigators
  - Screens
  - Navigation props
  - Params

### 2. Creating a Navigation Structure (45 min)

- Implementing a Stack Navigator for main screens
- Adding a Bottom Tab Navigator for primary navigation
- Configuring headers and navigation options
- Creating a shared navigation structure for all platforms
- Platform-specific navigation customizations

### 3. Building Multiple Screens (45 min)

- Create 3 basic screens:
  - Home Screen (enhancing our existing Welcome Screen)
  - Profile Screen
  - Settings Screen
- Implementing navigation between screens
- Passing parameters between screens
- Handling deep linking for web

## Homework

1. Customize the tab bar appearance for each platform
2. Add a drawer navigator for additional navigation options
3. Create at least one more screen with a form component
4. Experiment with navigation animations and transitions

## Next Lesson Preview

Lesson 3 will focus on data management and connecting to APIs. 