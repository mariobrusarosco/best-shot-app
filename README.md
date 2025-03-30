# Best Shot Mobile App

A cross-platform (Web, iOS, Android) mobile application for Best Shot, built with React Native and Expo.

## 🚀 Project Overview

Best Shot Mobile is the companion mobile application to the existing web platform at [best-shot.mariobrusarosco.com](https://best-shot.mariobrusarosco.com). It allows users to access all Best Shot features across multiple platforms with a unified experience.

## 📱 Supported Platforms

- **Web**: Browser-based version
- **iOS**: Native app for iPhone and iPad
- **Android**: Native app for Android devices

## 🏗️ Architecture

This project follows a hybrid architecture combining Domain-Driven Design (DDD) with a Feature-First organization:

```
src/
├── core/                 # Domain layer (DDD)
│   ├── entities/         # Domain models 
│   ├── usecases/         # Business logic
│   └── repositories/     # Data interfaces
├── infrastructure/       # Implementation of repositories
│   ├── api/              # API clients
│   └── storage/          # Local storage
├── features/             # UI organized by feature
│   ├── auth/             # Authentication screens & logic
│   ├── profile/          # Profile screens & logic
│   └── [feature]/        # Other features
├── ui/                   # Shared UI components
│   ├── components/       # Reusable UI components
│   └── theme/            # Design tokens & styling
└── platform/             # Platform-specific code
    ├── web/              # Web-specific implementations
    ├── ios/              # iOS-specific implementations
    └── android/          # Android-specific implementations
```

### Key Architecture Principles

1. **Business Logic Isolation**: Core business logic lives in the `core` directory, independent of UI
2. **Feature Organization**: UI components are organized by feature for better discoverability
3. **Cross-Platform First**: Components are designed to work across platforms by default
4. **Platform-Specific Overrides**: When needed, platform-specific code is isolated in the `platform` directory

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- For iOS: macOS with Xcode
- For Android: Android Studio with an emulator

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/app-best-shot.git
   cd app-best-shot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## 🚀 Running the App

From the Expo development server, you can:

- Press `w` to open in web browser
- Press `i` to open in iOS simulator (requires macOS)
- Press `a` to open in Android emulator
- Scan the QR code with the Expo Go app on your physical device

## 🧩 Key Technologies

- [React Native](https://reactnative.dev/): Core framework
- [Expo](https://expo.dev/): Development platform
- [TypeScript](https://www.typescriptlang.org/): Type safety
- [React Navigation](https://reactnavigation.org/): Navigation library
- [React Native for Web](https://necolas.github.io/react-native-web/): Web support

## 📜 Development Guidelines

### Styling

- Use the theme constants from `src/ui/theme` for consistent styling
- Handle platform differences using `Platform.select()`
- Keep styles colocated with their components

### Component Organization

- Create new features in the `features` directory
- Place reusable UI components in `ui/components`
- Don't mix business logic with presentation components

### Cross-Platform Development

- Test on all platforms regularly
- Use platform-specific code sparingly
- When needed, use the `Platform` API to customize behavior

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use proper typing for component props

## 📦 Building for Production

### Web

```bash
npx expo export:web
```

The output will be in the `web-build` directory, ready to deploy to any static hosting service.

### iOS & Android

```bash
eas build --platform ios
eas build --platform android
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add some amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📝 License

This project is private and proprietary.
