# Ground-Up Mobile App Setup Plan (Based on Nathan Covey's Stack)

This plan outlines a comprehensive, production-ready mobile app setup inspired by Nathan Covey's tech stack. Each phase will be filled in as we progress through the implementation.

---

## Reference: Nathan Covey's Ultimate Mobile App Stack

**Source:** [@nathan_covey on X](https://x.com/nathan_covey/status/1986900010600976793)

> THE ULTIMATE MOBILE APP STACK
>
> I've tried 200+ software tools this year (not exaggerating).
>
> This is everything I've landed on for making mobile apps.
>
> It's made building faster and easier. Nearly all of these have generous free plans btw.

### FRONTEND
- **Expo** – Simplifies building and deploying React Native apps → https://expo.dev
- **Nativewind** – Tailwind for React Native. Make your app look pretty → https://nativewind.dev
- **RN Reanimated** – Lightweight animations for mobile → https://docs.swmansion.com/react-native-reanimated/
- **LottieFiles** – Lightweight visuals → https://lottiefiles.com

### BACKEND
- **Convex** – My favorite backend ever. It's so good. Database, crons, functions → https://convex.dev
- **Clerk** – Easy, reliable auth. (May switch to Convex Auth soon though) → https://clerk.com
- **Resend** – Handles transactional + marketing emails. Pairs well with Convex → https://resend.com
- **OpenAI** – For AI features. Works great with Convex → https://platform.openai.com/docs/overview

### MARKETING
- **Vercel + NextJS** – For app landing pages. Faster iteration than Framer if you have a good vibe coding workflow → https://vercel.com
- **Apple Search Ads** – Low-hanging fruit marketing to acquire customers → https://ads.apple.com/app-store
- **Sanity** – CMS for blog posts. Integrates cleanly with NextJS → https://sanity.io
- **Pallyy** – My favorite social scheduling tool after testing many → https://pallyy.com
- **Screen Studio** – Awesome screen recordings of your computer and your phone → https://screenstudio.lemonsqueezy.com
- **Meta Ads** – Best paid channel so far. Make sure to use an MMP like Singular (see below).
- **Organic Social** – Most of my subscribers have been coming from X, LinkedIn, IG, and TikTok.

### DEVELOPMENT
- **Cursor** – I use the $200/mo plan. Totally worth it. I used to use Claude Code too but I've found Cursor alone suffices → https://cursor.com
- **Figma** – For branding + visuals (I build app UIs directly with AI, not in Figma btw) → https://figma.com
- **Willow Voice** – Mac speech-to-text app to prompt AI faster → https://willowvoice.com
- **Ebb** – Blocks distracting sites on Mac → https://ebb.cool

### PAYMENTS
- **RevenueCat** – Simplifies App Store subscriptions + paywalls → https://revenuecat.com

### ANALYTICS
- **PostHog** – Best analytics platform by far. Generous free tier → https://posthog.com
- **Singular** – For ad attribution. Preferred over AppsFlyer + Adjust → https://singular.net
- **AppTweak** – For App Store Optimization (ASO). Basically SEO for App Store → https://apptweak.com
- **Sentry** – Mentioning this reluctantly. Works for now, but switching once PostHog adds error tracking for React Native.

---

## Phase 1 - Project Initialization & Core Setup

### Overview
Set up a new Expo project with TypeScript, install core dependencies, and configure the basic project structure.

### Configuration
- **Project Name:** best-shot-app
- **Expo SDK:** ~53
- **TypeScript:** Strict mode enabled
- **Package Manager:** Yarn

### Steps

#### 1.1 Create New Expo Project
```bash
# Create project with TypeScript template
npx create-expo-app@latest best-shot-app --template blank-typescript

# Navigate into project
cd best-shot-app
```

#### 1.2 Install Expo Router & Navigation Dependencies
```bash
# Install expo-router and required dependencies
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

#### 1.3 Install TanStack Query (React Query)
```bash
# Install React Query for data fetching and caching
yarn add @tanstack/react-query
```

#### 1.4 Update package.json
Update the entry point and add development scripts:

```json
{
  "name": "best-shot-app",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "echo \"Linting setup in Phase 10\"",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

#### 1.5 Configure TypeScript (tsconfig.json)
Update with strict mode and prepare for path aliases:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "skipLibCheck": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

#### 1.6 Create Basic Project Structure
```bash
# Create essential directories
mkdir -p src/app
mkdir -p src/components
mkdir -p src/services
mkdir -p src/hooks
mkdir -p src/store
mkdir -p src/types
mkdir -p src/utils
mkdir -p src/config
mkdir -p src/constants
mkdir -p src/assets/images
mkdir -p src/assets/fonts
```

#### 1.7 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial project setup with Expo and TypeScript"
```

#### 1.8 Create .gitignore
Ensure the following is in `.gitignore`:

```
# Expo
.expo/
dist/
web-build/

# Dependencies
node_modules/

# Environment
.env
.env.local
.env.*.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

#### 1.9 Create app.json Configuration
```json
{
  "expo": {
    "name": "Best Shot",
    "slug": "best-shot-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/images/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./src/assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.bestshot.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.bestshot.app"
    },
    "web": {
      "favicon": "./src/assets/images/favicon.png"
    },
    "scheme": "bestshot",
    "plugins": [
      "expo-router"
    ]
  }
}
```

### Verification
After completing Phase 1, verify the setup:

```bash
# Check TypeScript compilation
yarn type-check

# Start development server
yarn start
```

### Expected Outcome
- ✅ Expo project created with TypeScript
- ✅ Expo Router installed and configured
- ✅ React Query installed
- ✅ Project structure created
- ✅ TypeScript strict mode enabled
- ✅ Development scripts configured
- ✅ Git repository initialized

### Next Phase
Proceed to **Phase 2 - Styling System (NativeWind + Animations + Visuals)**

## Phase 2 - Styling System (NativeWind + Animations + Visuals)

### Overview
Set up NativeWind (Tailwind CSS for React Native) and React Native Reanimated for performant animations. Lottie is documented for future use but not implemented in this phase.

### Tools from Nathan's Stack
- **NativeWind** - Tailwind CSS for React Native
- **React Native Reanimated** - Performant, interactive animations (UI thread)
- **LottieFiles** - Vector animations for branding/illustrations (OPTIONAL - implement when needed)

### Animation Strategy
**Two Types of Animations:**

1. **Reanimated (Performant Animations)** ✅ Implementing Now
   - Code-based, runs on UI thread (60fps+)
   - Interactive & gesture-based
   - Small bundle size
   - Use for: transitions, gestures, interactive UI elements
   - Examples: slide-ins, pull-to-refresh, swipe actions

2. **Lottie (Vector Animations)** 📋 Optional for Later
   - Designer-created in After Effects, exported as JSON
   - Complex illustrations with brand personality
   - Larger file size
   - Use for: loading spinners, success states, onboarding illustrations
   - Examples: animated logo, checkmark animations, confetti effects

**Our Approach:** Start with Reanimated for all functional animations. Add Lottie later only when we need branded/decorative animations.

### Steps

#### 2.1 Install NativeWind
```bash
# Install NativeWind and Tailwind CSS
yarn add nativewind
yarn add --dev tailwindcss@3.3.2

# Initialize Tailwind configuration
npx tailwindcss init
```

#### 2.2 Configure Tailwind CSS
Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Add your brand colors here
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
```

#### 2.3 Configure Babel for NativeWind
Update `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

#### 2.4 Create NativeWind TypeScript Declaration
Create `nativewind-env.d.ts` in the root:

```typescript
/// <reference types="nativewind/types" />
```

#### 2.5 Install React Native Reanimated
```bash
# Install Reanimated
npx expo install react-native-reanimated

# Install Reanimated Babel plugin (required)
```

#### 2.6 Configure Babel for Reanimated
Update `babel.config.js` to include Reanimated plugin (must be listed last):

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin', // Must be listed last
    ],
  };
};
```

#### 2.7 Create Base UI Component Library Structure
```bash
# Create UI component directories
mkdir -p src/components/ui
mkdir -p src/components/animated
```

#### 2.8 Create Example Button Component with NativeWind
Create `src/components/ui/button.tsx`:

```typescript
import { Pressable, Text, ActivityIndicator } from 'react-native';
import type { PressableProps } from 'react-native';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'rounded-lg items-center justify-center flex-row';

  const sizeClasses = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  const variantClasses = {
    primary: 'bg-primary-600 active:bg-primary-700',
    secondary: 'bg-gray-600 active:bg-gray-700',
    outline: 'border-2 border-primary-600 active:bg-primary-50',
    ghost: 'active:bg-gray-100',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-600',
    ghost: 'text-gray-900',
  };

  const disabledClasses = disabled || isLoading ? 'opacity-50' : '';

  return (
    <Pressable
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ActivityIndicator size="small" className="mr-2" />}
      <Text className={`${textColorClasses[variant]} ${textSizeClasses[size]} font-semibold`}>
        {children}
      </Text>
    </Pressable>
  );
}
```

#### 2.9 Create Example Animated Component with Reanimated
Create `src/components/animated/fade-in-view.tsx`:

```typescript
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import type { ViewProps } from 'react-native';

interface FadeInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
  children: React.ReactNode;
}

export function FadeInView({
  duration = 600,
  delay = 0,
  children,
  style,
  ...props
}: FadeInViewProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration });
      translateY.value = withSpring(0);
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]} {...props}>
      {children}
    </Animated.View>
  );
}
```

#### 2.10 Create Global Styles/Theme Constants
Create `src/constants/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    background: '#ffffff',
    text: '#111827',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 30,
  },
} as const;
```

### Verification
After completing Phase 2, verify the setup:

```bash
# Clear Metro bundler cache
npx expo start --clear

# Test on your preferred platform
yarn ios
# or
yarn android
# or
yarn web
```

**Create a test screen to verify NativeWind:**
```typescript
import { View, Text } from 'react-native';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function TestScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <FadeInView>
        <Text className="text-3xl font-bold text-gray-900 mb-4">
          NativeWind Works!
        </Text>
        <Button onPress={() => console.log('Pressed!')}>
          Test Button
        </Button>
      </FadeInView>
    </View>
  );
}
```

### Optional: Lottie Setup (For Future Use)

When you need branded/decorative animations, install Lottie:

```bash
# Install Lottie (only when needed)
npx expo install lottie-react-native
```

**Where to find Lottie animations:**
- https://lottiefiles.com (free and premium animations)
- Create custom in After Effects and export with Bodymovin plugin
- Place JSON files in `src/assets/animations/`

**Example Lottie component:**
```typescript
import LottieView from 'lottie-react-native';

export function LottieLoader({ source }: { source: any }) {
  return (
    <LottieView
      source={source}
      autoPlay
      loop
      style={{ width: 100, height: 100 }}
    />
  );
}
```

### Expected Outcome
- ✅ NativeWind installed and configured (Tailwind v3)
- ✅ Tailwind CSS working with React Native
- ✅ React Native Reanimated installed and configured
- ✅ Base UI component library started (Button example)
- ✅ Example animated components created (FadeInView)
- ✅ Theme constants defined
- 📋 Lottie documented for future use (not installed yet)

### Common Issues & Solutions
- **NativeWind styles not applying:** Clear Metro cache with `npx expo start --clear`
- **Reanimated not working:** Ensure the Babel plugin is listed LAST in `babel.config.js`
- **TypeScript errors:** Make sure `nativewind-env.d.ts` is in the root directory

### Next Phase
Proceed to **Phase 3 - Project Structure & TypeScript Configuration**

## Phase 3 - Project Structure & TypeScript Configuration

### Overview
Configure TypeScript for strict type safety, set up module path aliases for cleaner imports, and establish a scalable project structure.

### Goals
- Enable TypeScript strict mode for maximum type safety
- Configure path aliases (@/) for cleaner imports
- Set up Babel module resolver
- Organize project structure for scalability
- Create type definitions and utility types

### Steps

#### 3.1 Enhanced TypeScript Configuration

We already configured basic TypeScript in Phase 1. Now let's enhance it with additional compiler options.

Update `tsconfig.json`:

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    // Strict Type Checking
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    // Module Resolution
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/utils/*": ["./src/utils/*"],
      "@/types/*": ["./src/types/*"],
      "@/services/*": ["./src/services/*"],
      "@/store/*": ["./src/store/*"],
      "@/config/*": ["./src/config/*"],
      "@/constants/*": ["./src/constants/*"],
      "@/assets/*": ["./src/assets/*"]
    },

    // Additional Options
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### 3.2 Configure Babel Module Resolver

Install babel-plugin-module-resolver:

```bash
yarn add --dev babel-plugin-module-resolver
```

Update `babel.config.js`:

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/components': './src/components',
            '@/hooks': './src/hooks',
            '@/utils': './src/utils',
            '@/types': './src/types',
            '@/services': './src/services',
            '@/store': './src/store',
            '@/config': './src/config',
            '@/constants': './src/constants',
            '@/assets': './src/assets',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
      'react-native-reanimated/plugin', // Must be listed last
    ],
  };
};
```

#### 3.3 Finalize Project Structure

Create remaining directories and organization:

```bash
# Create feature-based structure
mkdir -p src/features

# Create services subdirectories
mkdir -p src/services/api
mkdir -p src/services/auth
mkdir -p src/services/storage

# Create additional component directories
mkdir -p src/components/layouts
mkdir -p src/components/features

# Create hooks subdirectories
mkdir -p src/hooks/queries
mkdir -p src/hooks/mutations

# Create types subdirectories
mkdir -p src/types/api
mkdir -p src/types/entities

# Create utils subdirectories
mkdir -p src/utils/validation
mkdir -p src/utils/formatting

# Create assets subdirectories
mkdir -p src/assets/animations
mkdir -p src/assets/icons
```

**Final Project Structure:**

```
src/
├── app/                          # Expo Router screens (file-system routing)
│   ├── _layout.tsx              # Root layout
│   ├── index.tsx                # Landing/home screen
│   ├── +not-found.tsx           # 404 page
│   ├── (public)/                # Public routes (unauthenticated)
│   │   ├── _layout.tsx
│   │   ├── sign-in.tsx
│   │   └── sign-up.tsx
│   └── (auth)/                  # Protected routes (authenticated)
│       ├── _layout.tsx
│       ├── home.tsx
│       ├── matches.tsx
│       └── profile.tsx
│
├── components/                   # Reusable components
│   ├── ui/                      # Base UI components (Button, Input, Card)
│   ├── animated/                # Animated components (FadeInView, etc.)
│   ├── layouts/                 # Layout components (Screen, Container)
│   └── features/                # Feature-specific components
│
├── features/                     # Feature modules (optional, for large apps)
│   └── [feature-name]/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types/
│
├── hooks/                        # Custom React hooks
│   ├── queries/                 # React Query hooks (useGetUser, etc.)
│   ├── mutations/               # React Query mutations (useUpdateProfile, etc.)
│   └── use-auth.ts              # Auth hook example
│
├── services/                     # External services & API
│   ├── api/                     # API client and endpoints
│   │   ├── client.ts           # Axios/fetch client
│   │   └── endpoints/          # API endpoint definitions
│   ├── auth/                    # Authentication service
│   └── storage/                 # AsyncStorage utilities
│
├── store/                        # Global state management
│   ├── use-user-store.ts       # User state (Zustand)
│   └── use-app-store.ts        # App state (Zustand)
│
├── types/                        # TypeScript type definitions
│   ├── api/                     # API response types
│   ├── entities/                # Domain entities (User, Match, etc.)
│   ├── navigation.ts            # Navigation types
│   └── common.ts                # Common/shared types
│
├── utils/                        # Utility functions
│   ├── validation/              # Validation helpers
│   ├── formatting/              # Date/number formatters
│   └── helpers.ts               # General helpers
│
├── config/                       # App configuration
│   ├── env.ts                   # Environment variables
│   └── constants.ts             # App constants
│
├── constants/                    # Design system constants
│   ├── theme.ts                 # Theme colors, spacing, etc.
│   └── styles.ts                # Global styles
│
└── assets/                       # Static assets
    ├── images/                  # Images, icons
    ├── fonts/                   # Custom fonts
    └── animations/              # Lottie JSON files (when needed)
```

#### 3.4 Create Common Type Definitions

Create `src/types/common.ts`:

```typescript
// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// API response wrapper types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

// Common entity types
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Form state types
export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Loading states
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: Error | null;
}
```

#### 3.5 Create Navigation Types (for expo-router)

Create `src/types/navigation.ts`:

```typescript
import type { StackScreenProps } from '@react-navigation/stack';

// Define your route params
export type RootStackParamList = {
  index: undefined;
  '(public)/sign-in': undefined;
  '(public)/sign-up': undefined;
  '(auth)/home': undefined;
  '(auth)/matches': undefined;
  '(auth)/profile': { userId?: string };
  // Add more routes as needed
};

// Screen props helper type
export type ScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;
```

#### 3.6 Create Utility Functions

Create `src/utils/helpers.ts`:

```typescript
/**
 * Sleep utility for async operations
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Safely parse JSON with fallback
 */
export const safeJsonParse = <T>(json: string, fallback: T): T => {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
};

/**
 * Check if value is defined (not null or undefined)
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

/**
 * Truncate string with ellipsis
 */
export const truncate = (str: string, length: number): string => {
  return str.length > length ? `${str.slice(0, length)}...` : str;
};
```

Create `src/utils/formatting/date.ts`:

```typescript
/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return past.toLocaleDateString();
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date | string, locale = 'en-US'): string => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
```

#### 3.7 Create Environment Configuration

Create `src/config/env.ts`:

```typescript
/**
 * Environment configuration
 * Uses Expo environment variables (prefixed with EXPO_PUBLIC_)
 */

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  // API Configuration
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',

  // Feature Flags (optional, will be filled in later phases)
  // clerkPublishableKey: getEnvVar('EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  // convexUrl: getEnvVar('EXPO_PUBLIC_CONVEX_URL'),

  // App Configuration
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;
```

Create `.env.example`:

```bash
# API Configuration
EXPO_PUBLIC_API_URL=http://localhost:3000/api

# Authentication (to be filled in Phase 6)
# EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=

# Backend (to be filled in Phase 5)
# EXPO_PUBLIC_CONVEX_URL=
```

#### 3.8 Update .gitignore for Environment Files

Ensure `.gitignore` includes:

```
# Environment variables
.env
.env.local
.env.*.local
!.env.example
```

### Verification

After completing Phase 3, verify the setup:

```bash
# Type check should pass with strict mode
yarn type-check

# Test path aliases by creating a test file
# Create src/test-imports.ts
```

Create `src/test-imports.ts` to test aliases:

```typescript
// Test path aliases
import { theme } from '@/constants/theme';
import { Button } from '@/components/ui/button';
import { env } from '@/config/env';
import type { ApiResponse } from '@/types/common';

// If this file compiles without errors, path aliases are working
console.log('Path aliases working!');
```

Run type check:
```bash
yarn type-check
```

Delete `src/test-imports.ts` after verification.

### Expected Outcome
- ✅ TypeScript strict mode enabled with enhanced compiler options
- ✅ Path aliases (@/) configured in both TypeScript and Babel
- ✅ Project structure organized and scalable
- ✅ Common type definitions created
- ✅ Utility functions established
- ✅ Environment configuration set up
- ✅ Navigation types defined
- ✅ All imports using clean @/ syntax

### Benefits of This Setup
- **Type Safety**: Strict mode catches more bugs at compile time
- **Clean Imports**: `@/components/ui/button` instead of `../../../components/ui/button`
- **Scalability**: Clear separation of concerns with organized structure
- **Maintainability**: Easy to find and organize code
- **DX Improvements**: Better autocomplete and navigation in IDE

### Next Phase
Proceed to **Phase 4 - File-System Routing (expo-router)**

## Phase 4 - File-System Routing (expo-router)

### Overview
Set up expo-router for file-system based routing, create route groups for public and protected routes, and implement navigation patterns.

### Route Group Strategy
- **(public)** - Unauthenticated routes (landing, sign-in, sign-up)
- **(auth)** - Protected/authenticated routes (home, matches, profile)

### Key Concepts
**expo-router** uses the file system to define routes, similar to Next.js:
- Files in `src/app/` automatically become routes
- `_layout.tsx` files define layout wrappers
- Route groups `(name)` organize routes without affecting URLs (e.g., `(public)`, `(auth)`)
- `+` prefix creates special routes (e.g., `+not-found.tsx`)

### Steps

#### 4.1 Create Root Layout

Create `src/app/_layout.tsx`:

```typescript
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
        }}
      />
    </QueryClientProvider>
  );
}
```

#### 4.2 Create Landing/Index Screen

Create `src/app/index.tsx`:

```typescript
import { View, Text } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <FadeInView>
        <Text className="text-4xl font-bold text-gray-900 mb-2">
          Best Shot
        </Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          Your football match prediction game
        </Text>

        <View className="w-full gap-3">
          <Button onPress={() => router.push('/(public)/sign-in')}>
            Sign In
          </Button>
          <Button
            variant="outline"
            onPress={() => router.push('/(public)/sign-up')}
          >
            Create Account
          </Button>
        </View>
      </FadeInView>
    </View>
  );
}
```

#### 4.3 Create Public Route Group

Create the public group directory and layout:

```bash
mkdir -p src/app/\(public\)
```

Create `src/app/(public)/_layout.tsx`:

```typescript
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}
    />
  );
}
```

#### 4.4 Create Sign In Screen

Create `src/app/(public)/sign-in.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // TODO: Implement actual sign in logic in Phase 6
    console.log('Sign in with:', email, password);
    router.replace('/(auth)/home');
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8">
          Welcome Back
        </Text>

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <Button onPress={handleSignIn}>Sign In</Button>

        <Pressable
          onPress={() => router.push('/(public)/sign-up')}
          className="mt-4"
        >
          <Text className="text-center text-gray-600">
            Don't have an account?{' '}
            <Text className="text-primary-600 font-semibold">Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
```

#### 4.5 Create Sign Up Screen

Create `src/app/(public)/sign-up.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function SignUpScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Implement actual sign up logic in Phase 6
    console.log('Sign up with:', name, email, password);
    router.replace('/(auth)/home');
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8">
          Create Account
        </Text>

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Password
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <Button onPress={handleSignUp}>Create Account</Button>

        <Pressable
          onPress={() => router.push('/(public)/sign-in')}
          className="mt-4"
        >
          <Text className="text-center text-gray-600">
            Already have an account?{' '}
            <Text className="text-primary-600 font-semibold">Sign In</Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
```

#### 4.6 Create Auth Route Group (Protected Routes)

Create the auth group directory:

```bash
mkdir -p src/app/\(auth\)
```

Create `src/app/(auth)/_layout.tsx`:

```typescript
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function AuthLayout() {
  // TODO: Add auth check in Phase 6
  // const { isAuthenticated } = useAuth();
  // if (!isAuthenticated) {
  //   return <Redirect href="/(public)/sign-in" />;
  // }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>⚽</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}
```

#### 4.7 Create Home Screen

Create `src/app/(auth)/home.tsx`:

```typescript
import { View, Text, ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-2">
            Welcome! 👋
          </Text>
          <Text className="text-lg text-gray-600 mb-6">
            Ready to make your predictions?
          </Text>
        </FadeInView>

        <FadeInView delay={200}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Upcoming Matches
            </Text>
            <Text className="text-gray-600">
              No matches scheduled yet. Check back soon!
            </Text>
          </View>
        </FadeInView>

        <FadeInView delay={400}>
          <View className="bg-white rounded-lg p-6">
            <Text className="text-xl font-semibold text-gray-900 mb-2">
              Your Stats
            </Text>
            <Text className="text-gray-600 mb-4">
              Track your prediction accuracy and compete with friends
            </Text>
            <Button variant="outline">View Leaderboard</Button>
          </View>
        </FadeInView>
      </View>
    </ScrollView>
  );
}
```

#### 4.8 Create Matches Screen

Create `src/app/(auth)/matches.tsx`:

```typescript
import { View, Text, ScrollView } from 'react-native';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function MatchesScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-6">
            Matches ⚽
          </Text>
        </FadeInView>

        <FadeInView delay={200}>
          <View className="bg-white rounded-lg p-6">
            <Text className="text-lg text-gray-600 text-center">
              Match list will be populated from the API in Phase 5
            </Text>
          </View>
        </FadeInView>
      </View>
    </ScrollView>
  );
}
```

#### 4.9 Create Profile Screen

Create `src/app/(auth)/profile.tsx`:

```typescript
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function ProfileScreen() {
  const router = useRouter();

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic in Phase 6
    router.replace('/');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-6">
            Profile 👤
          </Text>
        </FadeInView>

        <FadeInView delay={200}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              Guest User
            </Text>
            <Text className="text-gray-600">guest@example.com</Text>
          </View>
        </FadeInView>

        <FadeInView delay={400}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Account Settings
            </Text>
            <Button variant="outline" onPress={() => {}}>
              Edit Profile
            </Button>
          </View>
        </FadeInView>

        <FadeInView delay={600}>
          <Button variant="outline" onPress={handleSignOut}>
            Sign Out
          </Button>
        </FadeInView>
      </View>
    </ScrollView>
  );
}
```

#### 4.10 Create 404 Not Found Screen

Create `src/app/+not-found.tsx`:

```typescript
import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/button';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-6xl mb-4">404</Text>
      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Page Not Found
      </Text>
      <Text className="text-gray-600 mb-8 text-center">
        The page you're looking for doesn't exist
      </Text>
      <Link href="/" asChild>
        <Button>Go Home</Button>
      </Link>
    </View>
  );
}
```

#### 4.11 Add Deep Linking Configuration

Update `app.json` to include deep linking scheme:

```json
{
  "expo": {
    "scheme": "bestshot",
    "plugins": ["expo-router"]
  }
}
```

#### 4.12 Create Navigation Utilities

Create `src/utils/navigation.ts`:

```typescript
import { router } from 'expo-router';

/**
 * Navigate to a route and reset the navigation stack
 */
export const navigateAndReset = (route: string) => {
  router.replace(route as any);
};

/**
 * Go back or navigate to fallback if no history
 */
export const goBackOrNavigate = (fallback: string) => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.push(fallback as any);
  }
};
```

### Route Structure Overview

After Phase 4, your routing structure will be:

```
Routes:
├── /                           → Landing page (index.tsx)
├── /(public)/sign-in          → Sign in screen
├── /(public)/sign-up          → Sign up screen
└── /(auth)/                   → Protected routes with tab navigation
    ├── home                   → Home screen
    ├── matches                → Matches list
    └── profile                → User profile

Special:
└── +not-found                 → 404 page
```

### Navigation Patterns

**1. Push to a route:**
```typescript
import { useRouter } from 'expo-router';

const router = useRouter();
router.push('/(public)/sign-in');
```

**2. Replace current route (no back button):**
```typescript
router.replace('/(auth)/home'); // After successful login
```

**3. Go back:**
```typescript
router.back();
```

**4. Using Link component:**
```typescript
import { Link } from 'expo-router';

<Link href="/(auth)/home">Go to Home</Link>
```

**5. Deep linking:**
```bash
# Will work after proper configuration
bestshot://auth/profile
bestshot://public/sign-in
```

### Verification

Test the routing setup:

```bash
# Start the app
yarn start

# Test on your platform
yarn ios
# or
yarn android
# or
yarn web
```

**Test flow:**
1. Land on index screen → See "Sign In" and "Create Account" buttons
2. Tap "Sign In" → Navigate to sign-in screen
3. Fill in credentials and sign in → Navigate to home with tabs
4. Navigate between Home, Matches, Profile tabs
5. Sign out → Return to index screen

### Expected Outcome
- ✅ File-system based routing configured with expo-router
- ✅ Root layout with React Query provider
- ✅ Landing/index screen with navigation
- ✅ Public route group (sign-in, sign-up) under (public)
- ✅ Protected route group with tab navigation under (auth)
- ✅ Home, Matches, Profile screens created
- ✅ 404 not-found screen
- ✅ Deep linking configured
- ✅ Navigation utilities created
- ✅ All routes properly typed

### Key Benefits
- **Type-safe routing**: expo-router provides TypeScript support
- **File-system based**: Routes are automatically created from files
- **Nested layouts**: Layouts can be nested for complex navigation
- **Deep linking**: Built-in support for universal links
- **Code splitting**: Automatic code splitting per route

### Next Phase
Proceed to **Phase 5 - Backend Infrastructure (Convex)**

## Phase 5 - Backend Infrastructure (Convex)
To be defined

## Phase 6 - Authentication (Clerk or Convex Auth)
To be defined

## Phase 7 - Email Infrastructure (Resend)
To be defined

## Phase 8 - State Management & Data Fetching (React Query)
To be defined

## Phase 9 - AI Features Integration (OpenAI)
To be defined

## Phase 10 - Code Quality & Development Tools (Cursor, Figma, Willow Voice, Ebb)
To be defined

## Phase 11 - Payments & Subscriptions (RevenueCat)
To be defined

## Phase 12 - Analytics & Monitoring (PostHog, Singular, AppTweak)
To be defined

## Phase 13 - Error Tracking (Sentry / PostHog)
To be defined

## Phase 14 - Landing Page & Blog (Vercel + Next.js + Sanity)
To be defined

## Phase 15 - Social Media & Content Tools (Pallyy, Screen Studio, Organic Social)
To be defined

## Phase 16 - App Store Optimization & Ads (Apple Search Ads, Meta Ads)
To be defined

## Phase 17 - Testing & CI/CD
To be defined

## Phase 18 - Documentation & Developer Experience
To be defined

---

## Progress Tracker

- [x] Phase 1 - Project Initialization & Core Setup
- [x] Phase 2 - Styling System
- [x] Phase 3 - Project Structure & TypeScript Configuration
- [x] Phase 4 - File-System Routing
- [ ] Phase 5 - Backend Infrastructure
- [ ] Phase 6 - Authentication
- [ ] Phase 7 - Email Infrastructure
- [ ] Phase 8 - State Management & Data Fetching
- [ ] Phase 9 - AI Features Integration
- [ ] Phase 10 - Code Quality & Development Tools
- [ ] Phase 11 - Payments & Subscriptions
- [ ] Phase 12 - Analytics & Monitoring
- [ ] Phase 13 - Error Tracking
- [ ] Phase 14 - Landing Page & Blog
- [ ] Phase 15 - Social Media & Content Tools
- [ ] Phase 16 - App Store Optimization & Ads
- [ ] Phase 17 - Testing & CI/CD
- [ ] Phase 18 - Documentation & Developer Experience
