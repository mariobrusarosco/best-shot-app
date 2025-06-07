# Best Shot App

A cross-platform football match guessing game built with React Native and Expo, targeting Web, iOS, and Android platforms from a single codebase.

## 🎯 Project Overview

**Best Shot** is a football match prediction game where users can guess match outcomes and compete with others. The application is designed to provide a consistent user experience across all platforms while leveraging a pre-existing API and database.

### Key Features (Planned)

- Football match prediction gameplay
- Cross-platform compatibility (Web, iOS, Android)
- Real-time match data integration
- User scoring and leaderboards
- Social features for competition

## 🏗️ Architecture & Technology Stack

This project follows a well-documented architectural approach with clear decision records and planning phases.

### Core Technologies

- **Framework**: React Native with Expo SDK 53
- **Language**: TypeScript for type safety and better developer experience
- **Navigation**: Expo Router (file-system based routing)
- **State Management**:
  - TanStack Query (planned) for server state management
  - Zustand (planned) for global UI state if needed
- **Styling**: React Native StyleSheet with theme support
- **Testing**: Jest with React Test Renderer

### Project Structure

```
best-shot-app/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab-based navigation group
│   │   ├── index.tsx      # Home tab screen
│   │   ├── two.tsx        # Second tab screen
│   │   └── _layout.tsx    # Tab navigation layout
│   ├── _layout.tsx        # Root layout with theme provider
│   ├── +html.tsx          # Web-specific HTML template
│   ├── +not-found.tsx     # 404 error page
│   └── modal.tsx          # Modal screen example
├── assets/                # Static assets
│   ├── fonts/             # Custom fonts (SpaceMono)
│   └── images/            # App icons and images
├── components/            # Reusable UI components
│   ├── __tests__/         # Component tests
│   ├── EditScreenInfo.tsx # Development info component
│   ├── ExternalLink.tsx   # External link component
│   ├── StyledText.tsx     # Styled text component
│   ├── Themed.tsx         # Theme-aware components
│   └── useColorScheme.*   # Color scheme hooks
├── constants/             # App-wide constants
│   └── Colors.ts          # Theme color definitions
├── docs/                  # Project documentation
│   ├── decisions/         # Architectural Decision Records (ADRs)
│   ├── guides/            # Developer guides
│   └── plan/              # Project planning documents
├── app.json              # Expo app configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- For mobile development:
  - iOS: Xcode and iOS Simulator (macOS only)
  - Android: Android Studio and Android Emulator

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd best-shot-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running on Different Platforms

- **Web**: `npm run web` or press `w` in the terminal
- **iOS**: `npm run ios` or press `i` in the terminal (requires macOS)
- **Android**: `npm run android` or press `a` in the terminal
- **Development Build**: Use Expo Go app on your device and scan the QR code

### Testing

Run the test suite:

```bash
npm test
```

## 📱 Current Implementation Status

### ✅ Completed (Phase 1 Foundation)

- [x] Expo project initialization with TypeScript
- [x] Cross-platform compatibility (Web, iOS, Android)
- [x] Basic tab navigation structure
- [x] Theme support (light/dark mode)
- [x] TypeScript configuration with strict mode
- [x] Documentation structure with ADRs
- [x] Basic component architecture
- [x] Testing setup with Jest

### 🚧 In Progress

- [ ] API service integration
- [ ] State management implementation (TanStack Query)
- [ ] UI component library selection
- [ ] Environment configuration setup

### 📋 Planned Features

- [ ] Football match data integration
- [ ] User authentication system
- [ ] Match prediction interface
- [ ] Scoring and leaderboard system
- [ ] Social features and user profiles

## 🎨 Design System

The app implements a comprehensive theming system:

- **Color Scheme**: Automatic light/dark mode detection
- **Typography**: Custom SpaceMono font with FontAwesome icons
- **Components**: Theme-aware components in `components/Themed.tsx`
- **Platform Adaptation**: Web-specific optimizations and mobile-first design

## 📚 Documentation

This project maintains comprehensive documentation:

- **[Architectural Decisions](./docs/decisions/)**: Technical decision records

  - [001-technology-stack.md](./docs/decisions/001-technology-stack.md): Core technology choices
  - [002-navigation-strategy.md](./docs/decisions/002-navigation-strategy.md): Navigation approach
  - [003-ui-styling-strategy.md](./docs/decisions/003-ui-styling-strategy.md): UI and styling decisions

- **[Project Planning](./docs/plan/)**: Development phases and roadmap

  - [phase-1-foundation.md](./docs/plan/phase-1-foundation.md): Foundation setup tasks

- **[Developer Guides](./docs/guides/)**: Development guidelines and best practices

## 🔧 Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint and Prettier configured (planned)
- Component-based architecture
- File-system based routing with Expo Router

### Platform Considerations

- **Web**: Static output with Metro bundler
- **iOS**: Tablet support enabled
- **Android**: Edge-to-edge display with adaptive icons
- **Universal**: Automatic UI style adaptation

### State Management Strategy

- Server state: TanStack Query for API data fetching and caching
- Client state: React hooks for local component state
- Global state: Zustand for cross-component UI state (when needed)

## 🤝 Contributing

1. Review the [architectural decisions](./docs/decisions/) to understand the project's technical direction
2. Check the [current phase plan](./docs/plan/) for ongoing development priorities
3. Follow the established project structure and naming conventions
4. Write tests for new components and features
5. Update documentation for significant changes

## 📄 License

This project is private and proprietary.

---

**Note**: This is an active development project. The current implementation represents the foundational phase with basic navigation and theming. The core football prediction features are planned for subsequent development phases.
