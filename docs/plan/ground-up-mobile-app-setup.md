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

## Phase 5 - API Integration (Existing Backend)

### Overview
Integrate with the existing Best Shot API, set up API client with axios, configure React Query for data fetching, and create typed API services.

### API Details
- **Base URL:** `https://api-best-shot-staging.mariobrusarosco.com/`
- **Environment:** Staging (demo)
- **Type:** RESTful API

### Goals
- Configure axios API client
- Set up environment variables for API URL
- Create typed API service layer
- Integrate with React Query for caching and state management
- Create example queries and mutations
- Handle authentication headers

### Steps

#### 5.1 Install Dependencies

We already have React Query from Phase 1. Now add axios:

```bash
yarn add axios
```

#### 5.2 Configure Environment Variables

Update `.env.example`:

```bash
# API Configuration
EXPO_PUBLIC_API_URL=https://api-best-shot-staging.mariobrusarosco.com
```

Create `.env.local`:

```bash
EXPO_PUBLIC_API_URL=https://api-best-shot-staging.mariobrusarosco.com
```

Update `src/config/env.ts`:

```typescript
/**
 * Environment configuration
 * Uses Expo environment variables (prefixed with EXPO_PUBLIC_)
 */

export const env = {
  // API Configuration
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api-best-shot-staging.mariobrusarosco.com',

  // App Configuration
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

// Validate required env vars
if (!env.apiUrl) {
  throw new Error('Missing required environment variable: EXPO_PUBLIC_API_URL');
}
```

#### 5.3 Create Axios API Client

Create `src/services/api/client.ts`:

```typescript
import axios from 'axios';
import { env } from '@/config/env';

/**
 * Axios instance configured for Best Shot API
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add auth token to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    // TODO: Get token from secure storage in Phase 6
    // const token = await getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // TODO: Redirect to login in Phase 6
      console.warn('Unauthorized - redirect to login');
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);
```

#### 5.4 Create API Type Definitions

Create `src/types/api/matches.ts`:

```typescript
import type { BaseEntity } from '@/types/common';

/**
 * Match entity from API
 */
export interface Match extends BaseEntity {
  homeTeam: string;
  awayTeam: string;
  homeTeamLogo?: string;
  awayTeamLogo?: string;
  date: string;
  venue?: string;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  league?: string;
}

/**
 * Prediction entity from API
 */
export interface Prediction extends BaseEntity {
  userId: string;
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;
}

/**
 * Leaderboard entry from API
 */
export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  totalPoints: number;
  correctPredictions: number;
  rank: number;
}
```

Create `src/types/api/user.ts`:

```typescript
import type { BaseEntity } from '@/types/common';

/**
 * User entity from API
 */
export interface User extends BaseEntity {
  email: string;
  username: string;
  avatar?: string;
  totalPoints: number;
  correctPredictions: number;
}

/**
 * Auth response from API
 */
export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  email: string;
  username: string;
  password: string;
}
```

#### 5.5 Create API Endpoint Services

Create `src/services/api/endpoints/matches.ts`:

```typescript
import { apiClient } from '../client';
import type { Match, Prediction } from '@/types/api/matches';
import type { ApiResponse, PaginatedResponse } from '@/types/common';

/**
 * Matches API endpoints
 */
export const matchesApi = {
  /**
   * Get all matches
   */
  getAll: async (): Promise<Match[]> => {
    const { data } = await apiClient.get<ApiResponse<Match[]>>('/matches');
    return data.data;
  },

  /**
   * Get upcoming matches
   */
  getUpcoming: async (): Promise<Match[]> => {
    const { data } = await apiClient.get<ApiResponse<Match[]>>('/matches/upcoming');
    return data.data;
  },

  /**
   * Get match by ID
   */
  getById: async (id: string): Promise<Match> => {
    const { data } = await apiClient.get<ApiResponse<Match>>(`/matches/${id}`);
    return data.data;
  },

  /**
   * Get live matches
   */
  getLive: async (): Promise<Match[]> => {
    const { data } = await apiClient.get<ApiResponse<Match[]>>('/matches/live');
    return data.data;
  },
};

/**
 * Predictions API endpoints
 */
export const predictionsApi = {
  /**
   * Get user's predictions
   */
  getMyPredictions: async (): Promise<Prediction[]> => {
    const { data } = await apiClient.get<ApiResponse<Prediction[]>>('/predictions/me');
    return data.data;
  },

  /**
   * Create a prediction
   */
  create: async (prediction: {
    matchId: string;
    homeScore: number;
    awayScore: number;
  }): Promise<Prediction> => {
    const { data } = await apiClient.post<ApiResponse<Prediction>>(
      '/predictions',
      prediction
    );
    return data.data;
  },

  /**
   * Update a prediction
   */
  update: async (
    id: string,
    prediction: { homeScore: number; awayScore: number }
  ): Promise<Prediction> => {
    const { data } = await apiClient.put<ApiResponse<Prediction>>(
      `/predictions/${id}`,
      prediction
    );
    return data.data;
  },

  /**
   * Delete a prediction
   */
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/predictions/${id}`);
  },
};
```

Create `src/services/api/endpoints/auth.ts`:

```typescript
import { apiClient } from '../client';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from '@/types/api/user';
import type { ApiResponse } from '@/types/common';

/**
 * Authentication API endpoints
 */
export const authApi = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/login',
      credentials
    );
    return data.data;
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
      '/auth/register',
      userData
    );
    return data.data;
  },

  /**
   * Get current user
   */
  me: async (): Promise<User> => {
    const { data } = await apiClient.get<ApiResponse<User>>('/auth/me');
    return data.data;
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout');
  },
};
```

Create `src/services/api/endpoints/leaderboard.ts`:

```typescript
import { apiClient } from '../client';
import type { LeaderboardEntry } from '@/types/api/matches';
import type { ApiResponse } from '@/types/common';

/**
 * Leaderboard API endpoints
 */
export const leaderboardApi = {
  /**
   * Get global leaderboard
   */
  getGlobal: async (limit = 100): Promise<LeaderboardEntry[]> => {
    const { data } = await apiClient.get<ApiResponse<LeaderboardEntry[]>>(
      '/leaderboard',
      { params: { limit } }
    );
    return data.data;
  },

  /**
   * Get user's rank
   */
  getMyRank: async (): Promise<LeaderboardEntry> => {
    const { data } = await apiClient.get<ApiResponse<LeaderboardEntry>>(
      '/leaderboard/me'
    );
    return data.data;
  },
};
```

Create `src/services/api/index.ts` (barrel export):

```typescript
export * from './client';
export * from './endpoints/matches';
export * from './endpoints/auth';
export * from './endpoints/leaderboard';
```

#### 5.6 Create React Query Hooks

Create `src/hooks/queries/use-matches.ts`:

```typescript
import { useQuery } from '@tanstack/react-query';
import { matchesApi } from '@/services/api';

/**
 * Query keys for matches
 */
export const matchesKeys = {
  all: ['matches'] as const,
  upcoming: ['matches', 'upcoming'] as const,
  live: ['matches', 'live'] as const,
  detail: (id: string) => ['matches', id] as const,
};

/**
 * Get all matches
 */
export const useMatches = () => {
  return useQuery({
    queryKey: matchesKeys.all,
    queryFn: matchesApi.getAll,
  });
};

/**
 * Get upcoming matches
 */
export const useUpcomingMatches = () => {
  return useQuery({
    queryKey: matchesKeys.upcoming,
    queryFn: matchesApi.getUpcoming,
  });
};

/**
 * Get live matches
 */
export const useLiveMatches = () => {
  return useQuery({
    queryKey: matchesKeys.live,
    queryFn: matchesApi.getLive,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

/**
 * Get match by ID
 */
export const useMatch = (id: string) => {
  return useQuery({
    queryKey: matchesKeys.detail(id),
    queryFn: () => matchesApi.getById(id),
    enabled: !!id, // Only run if ID exists
  });
};
```

Create `src/hooks/mutations/use-predictions.ts`:

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { predictionsApi } from '@/services/api';
import { matchesKeys } from '../queries/use-matches';

/**
 * Create a prediction
 */
export const useCreatePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: predictionsApi.create,
    onSuccess: () => {
      // Invalidate matches queries to refetch with new predictions
      queryClient.invalidateQueries({ queryKey: matchesKeys.all });
    },
  });
};

/**
 * Update a prediction
 */
export const useUpdatePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; homeScore: number; awayScore: number }) =>
      predictionsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchesKeys.all });
    },
  });
};

/**
 * Delete a prediction
 */
export const useDeletePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: predictionsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: matchesKeys.all });
    },
  });
};
```

#### 5.7 Update Matches Screen with Real Data

Update `src/app/(auth)/matches.tsx`:

```typescript
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { FadeInView } from '@/components/animated/fade-in-view';
import { useUpcomingMatches } from '@/hooks/queries/use-matches';
import { formatDate } from '@/utils/formatting/date';

export default function MatchesScreen() {
  const { data: matches, isLoading, error } = useUpcomingMatches();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-gray-600 mt-4">Loading matches...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <Text className="text-red-600 text-center">
          Failed to load matches. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-6">
            Upcoming Matches ⚽
          </Text>
        </FadeInView>

        {matches && matches.length === 0 && (
          <FadeInView delay={200}>
            <View className="bg-white rounded-lg p-6">
              <Text className="text-lg text-gray-600 text-center">
                No upcoming matches at the moment
              </Text>
            </View>
          </FadeInView>
        )}

        {matches?.map((match, index) => (
          <FadeInView key={match.id} delay={200 + index * 100}>
            <View className="bg-white rounded-lg p-4 mb-3">
              <Text className="text-sm text-gray-500 mb-2">
                {formatDate(match.date)}
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-gray-900 flex-1">
                  {match.homeTeam}
                </Text>
                <Text className="text-gray-400 mx-4">vs</Text>
                <Text className="text-lg font-semibold text-gray-900 flex-1 text-right">
                  {match.awayTeam}
                </Text>
              </View>
              {match.venue && (
                <Text className="text-sm text-gray-500 mt-2">
                  📍 {match.venue}
                </Text>
              )}
            </View>
          </FadeInView>
        ))}
      </View>
    </ScrollView>
  );
}
```

#### 5.8 Create Error Boundary (Optional but Recommended)

Create `src/components/error-boundary.tsx`:

```typescript
import React from 'react';
import { View, Text } from 'react-native';
import { Button } from './ui/button';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 items-center justify-center bg-gray-50 p-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </Text>
          <Text className="text-gray-600 mb-6 text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <Button onPress={() => this.setState({ hasError: false })}>
            Try Again
          </Button>
        </View>
      );
    }

    return this.props.children;
  }
}
```

### Verification

Test the API integration:

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
1. Navigate to Matches screen
2. Verify matches load from API
3. Check loading state while fetching
4. Test error handling (turn off internet)
5. Verify data displays correctly

### Expected Outcome
- ✅ Axios API client configured
- ✅ Environment variables set up for API URL
- ✅ Typed API service layer created
- ✅ React Query hooks for queries and mutations
- ✅ Example implementation in Matches screen
- ✅ Loading and error states handled
- ✅ Request/response interceptors configured
- ✅ Ready for authentication integration in Phase 6

### Key Benefits
- **Type Safety**: Full TypeScript support for API responses
- **Caching**: React Query handles caching automatically
- **Error Handling**: Centralized error handling with interceptors
- **Reusability**: API functions can be reused across the app
- **Testability**: API layer is isolated and easy to mock

### Next Steps
- Phase 6 will add authentication token management
- Phase 12 will add analytics to track API errors
- Phase 13 will add error tracking (Sentry)

### Next Phase
Proceed to **Phase 6 - Authentication (Clerk or Custom)**

## Phase 6 - Authentication

### Overview
Implement authentication with secure token storage, auth state management, and protected routes. Two approaches available: **Clerk** (managed service) or **Custom Auth** (using your existing API).

### Decision: Choose Your Auth Approach

#### **Option A: Clerk** (Recommended by Nathan)
- ✅ Managed authentication service
- ✅ Pre-built UI components
- ✅ Social logins (Google, Apple, etc.)
- ✅ Easy setup, minimal code
- ⚠️ Additional service dependency
- ⚠️ Costs after free tier (10,000 MAU free)

#### **Option B: Auth0** (Alternative Managed Service)
- ✅ Established auth platform (industry standard)
- ✅ Social logins (Google, Apple, GitHub, etc.)
- ✅ More flexible than Clerk
- ✅ Works with your existing API
- ✅ Generous free tier (7,000 MAU free)
- ⚠️ Slightly more configuration than Clerk
- ⚠️ Additional service dependency

**Recommendation:** Use **Clerk** for easiest setup, or **Auth0** for more flexibility and wider feature set.

---

## OPTION A: Clerk Implementation

### A.1 Install Clerk Dependencies

```bash
npx expo install @clerk/clerk-expo expo-secure-store
```

### A.2 Get Clerk API Keys

1. Sign up at https://clerk.com
2. Create a new application
3. Get your publishable key from the dashboard
4. Add to `.env.local`:

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

Update `src/config/env.ts`:

```typescript
export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api-best-shot-staging.mariobrusarosco.com',
  clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

if (!env.clerkPublishableKey) {
  throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY');
}
```

### A.3 Configure Clerk Provider

Update `src/app/_layout.tsx`:

```typescript
import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { tokenCache } from '@/services/auth/token-cache';
import { env } from '@/config/env';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <ClerkProvider
      publishableKey={env.clerkPublishableKey!}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <QueryClientProvider client={queryClient}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'white' },
            }}
          />
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
```

### A.4 Create Token Cache

Create `src/services/auth/token-cache.ts`:

```typescript
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Secure token cache for Clerk
 */
export const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.error('SecureStore get error:', error);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error('SecureStore set error:', error);
    }
  },
};
```

### A.5 Update Sign In Screen with Clerk

Update `src/app/(public)/sign-in.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { Button } from '@/components/ui/button';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    if (!isLoaded) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.replace('/(auth)/home');
      }
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-8">
          Welcome Back
        </Text>

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-600">{error}</Text>
          </View>
        )}

        <View className="gap-4 mb-6">
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isLoading}
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!isLoading}
            />
          </View>
        </View>

        <Button onPress={handleSignIn} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        <Pressable
          onPress={() => router.push('/(public)/sign-up')}
          className="mt-4"
          disabled={isLoading}
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

### A.6 Protect Routes with Clerk

Update `src/app/(auth)/_layout.tsx`:

```typescript
import { Redirect, Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isSignedIn) {
    return <Redirect href="/(public)/sign-in" />;
  }

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
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚽</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
```

### A.7 Add Sign Out to Profile

Update `src/app/(auth)/profile.tsx`:

```typescript
import { View, Text, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-6">Profile 👤</Text>
        </FadeInView>

        <FadeInView delay={200}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {user?.fullName || 'User'}
            </Text>
            <Text className="text-gray-600">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>
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

---

## OPTION B: Auth0 Implementation

### B.1 Install Auth0 Dependencies

```bash
yarn add react-native-auth0
npx expo install expo-web-browser expo-crypto
```

### B.2 Create Auth0 Application

1. Sign up at https://auth0.com
2. Create a new application → **Native App**
3. Get your credentials:
   - **Domain:** `your-tenant.us.auth0.com`
   - **Client ID:** `your-client-id`

4. Configure Allowed Callback URLs:
   ```
   exp://localhost:8081,
   bestshot://auth,
   com.bestshot.app://auth
   ```

5. Configure Allowed Logout URLs:
   ```
   exp://localhost:8081,
   bestshot://auth,
   com.bestshot.app://auth
   ```

### B.3 Configure Environment Variables

Add to `.env.local`:

```bash
EXPO_PUBLIC_AUTH0_DOMAIN=your-tenant.us.auth0.com
EXPO_PUBLIC_AUTH0_CLIENT_ID=your-client-id
```

Update `src/config/env.ts`:

```typescript
export const env = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api-best-shot-staging.mariobrusarosco.com',

  // Auth0 configuration
  auth0Domain: process.env.EXPO_PUBLIC_AUTH0_DOMAIN,
  auth0ClientId: process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID,

  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

if (!env.auth0Domain || !env.auth0ClientId) {
  throw new Error('Missing Auth0 environment variables');
}
```

### B.4 Create Auth0 Provider

Create `src/services/auth/auth0-provider.tsx`:

```typescript
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import Auth0 from 'react-native-auth0';
import { env } from '@/config/env';

const auth0 = new Auth0({
  domain: env.auth0Domain!,
  clientId: env.auth0ClientId!,
});

interface Auth0User {
  sub: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface AuthContextType {
  user: Auth0User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function Auth0Provider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Auth0User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Handle navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inPublicGroup = segments[0] === '(public)';

    if (!user && inAuthGroup) {
      router.replace('/(public)/sign-in');
    } else if (user && inPublicGroup) {
      router.replace('/(auth)/home');
    }
  }, [user, segments, isLoading]);

  const checkAuth = async () => {
    try {
      // Try to get user info from stored credentials
      const credentials = await auth0.credentialsManager.getCredentials();
      if (credentials?.accessToken) {
        const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
        setUser(userInfo);
        setAccessToken(credentials.accessToken);
      }
    } catch (error) {
      console.log('No stored credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });

      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUser(userInfo);
      setAccessToken(credentials.accessToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signUp = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
        // Add signup screen hint
        additionalParameters: {
          screen_hint: 'signup',
        },
      });

      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });
      setUser(userInfo);
      setAccessToken(credentials.accessToken);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth0.webAuth.clearSession();
      await auth0.credentialsManager.clearCredentials();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        accessToken,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth0 = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth0 must be used within Auth0Provider');
  }
  return context;
};
```

### B.5 Update API Client with Auth0 Token

Update `src/services/api/client.ts`:

```typescript
import axios from 'axios';
import { env } from '@/config/env';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({
  domain: env.auth0Domain!,
  clientId: env.auth0ClientId!,
});

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor - Add Auth0 token to requests
 */
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const credentials = await auth0.credentialsManager.getCredentials();
      if (credentials?.accessToken) {
        config.headers.Authorization = `Bearer ${credentials.accessToken}`;
      }
    } catch (error) {
      console.log('No Auth0 credentials available');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear Auth0 credentials
      await auth0.credentialsManager.clearCredentials();
      console.warn('Unauthorized - cleared auth data');
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }

    return Promise.reject(error);
  }
);
```

### B.6 Add Auth0Provider to Root Layout

Update `src/app/_layout.tsx`:

```typescript
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Auth0Provider } from '@/services/auth/auth0-provider';

export default function RootLayout() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'white' },
          }}
        />
      </Auth0Provider>
    </QueryClientProvider>
  );
}
```

### B.7 Update Sign In Screen with Auth0

Update `src/app/(public)/sign-in.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth0 } from '@/services/auth/auth0-provider';
import { Button } from '@/components/ui/button';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signIn();
      // Auth0Provider will handle navigation
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Welcome Back
        </Text>
        <Text className="text-lg text-gray-600 mb-8">
          Sign in with Auth0
        </Text>

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-600">{error}</Text>
          </View>
        )}

        <Button onPress={handleSignIn} disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In with Auth0'}
        </Button>

        <Pressable
          onPress={() => router.push('/(public)/sign-up')}
          className="mt-4"
          disabled={isLoading}
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

### B.8 Update Sign Up Screen with Auth0

Update `src/app/(public)/sign-up.tsx`:

```typescript
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth0 } from '@/services/auth/auth0-provider';
import { Button } from '@/components/ui/button';

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setIsLoading(true);
    setError('');

    try {
      await signUp();
      // Auth0Provider will handle navigation
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-gray-900 mb-2">
          Create Account
        </Text>
        <Text className="text-lg text-gray-600 mb-8">
          Sign up with Auth0
        </Text>

        {error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-red-600">{error}</Text>
          </View>
        )}

        <Button onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? 'Creating Account...' : 'Sign Up with Auth0'}
        </Button>

        <Pressable
          onPress={() => router.push('/(public)/sign-in')}
          className="mt-4"
          disabled={isLoading}
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

### B.9 Protect Routes with Auth0

Update `src/app/(auth)/_layout.tsx`:

```typescript
import { Redirect, Tabs } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import { useAuth0 } from '@/services/auth/auth0-provider';

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth0();

  // Show loading while checking auth
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(public)/sign-in" />;
  }

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
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="matches"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>⚽</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
```

### B.10 Update Profile Screen with Auth0

Update `src/app/(auth)/profile.tsx`:

```typescript
import { View, Text, ScrollView } from 'react-native';
import { useAuth0 } from '@/services/auth/auth0-provider';
import { Button } from '@/components/ui/button';
import { FadeInView } from '@/components/animated/fade-in-view';

export default function ProfileScreen() {
  const { user, signOut } = useAuth0();

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-6">
        <FadeInView>
          <Text className="text-3xl font-bold text-gray-900 mb-6">Profile 👤</Text>
        </FadeInView>

        <FadeInView delay={200}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-1">
              {user?.name || 'User'}
            </Text>
            <Text className="text-gray-600">{user?.email}</Text>
          </View>
        </FadeInView>

        <FadeInView delay={400}>
          <View className="bg-white rounded-lg p-6 mb-4">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Auth0 Info
            </Text>
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">User ID</Text>
              <Text className="font-mono text-xs">{user?.sub}</Text>
            </View>
          </View>
        </FadeInView>

        <FadeInView delay={600}>
          <Button variant="outline" onPress={signOut}>
            Sign Out
          </Button>
        </FadeInView>
      </View>
    </ScrollView>
  );
}
```

### B.11 Configure Deep Linking for Auth0

Update `app.json`:

```json
{
  "expo": {
    "scheme": "bestshot",
    "plugins": [
      "expo-router",
      [
        "react-native-auth0",
        {
          "domain": "your-tenant.us.auth0.com"
        }
      ]
    ]
  }
}
```

---

## Verification

Test authentication flow:

```bash
yarn start
```

**Test flow:**
1. App opens → Should redirect to landing page
2. Tap "Sign In" → Navigate to sign-in screen
3. Enter credentials → Sign in successfully
4. Should redirect to `/(auth)/home` with tabs
5. Navigate to Profile → See user data
6. Tap "Sign Out" → Clear auth and redirect to landing

### Expected Outcome
- ✅ Authentication working (Clerk or Custom)
- ✅ Secure token storage with expo-secure-store
- ✅ Protected routes redirecting unauthenticated users
- ✅ Auth state managed globally
- ✅ API requests include auth token
- ✅ Sign out clears auth data
- ✅ Persistent login across app restarts

### Common Issues & Solutions
- **Expo SecureStore errors on web:** Use AsyncStorage fallback for web
- **401 errors:** Check token format in API interceptor
- **Navigation loops:** Ensure auth check completes before navigation
- **Token not persisting:** Verify SecureStore permissions

### Next Phase
Proceed to **Phase 7 - Email Infrastructure (Resend)**

## Phase 7 - Email Infrastructure (API Integration)

**Overview**: Integrate email functionality by consuming backend API email endpoints. The backend handles actual email sending (Resend, SendGrid, etc.). The mobile app triggers email operations through API calls.

**Common Email Use Cases**:
- Password reset requests
- Email verification/confirmation
- Match reminder notifications
- Weekly digest subscriptions

### 7.1 Create Email Service Layer

**File**: `src/services/api/email.ts`

```typescript
import { apiClient } from './client';
import type { ApiResponse } from '@/types/api/common';

export interface RequestPasswordResetParams {
  email: string;
}

export interface VerifyEmailParams {
  token: string;
}

export const emailApi = {
  requestPasswordReset: async (params: RequestPasswordResetParams): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post('/auth/request-password-reset', params);
    return data;
  },

  verifyEmail: async (params: VerifyEmailParams): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post('/auth/verify-email', params);
    return data;
  },

  resendVerification: async (): Promise<ApiResponse<void>> => {
    const { data } = await apiClient.post('/users/resend-verification');
    return data;
  },
};
```

### 7.2 Create React Query Mutations

**File**: `src/hooks/mutations/use-email.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { emailApi } from '@/services/api/email';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: emailApi.requestPasswordReset,
  });
};

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: emailApi.verifyEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: emailApi.resendVerification,
  });
};
```

### 7.3 Create Forgot Password Screen

**File**: `src/app/(public)/forgot-password.tsx`

```typescript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useRequestPasswordReset } from '@/hooks/mutations/use-email';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { mutate: requestReset, isPending } = useRequestPasswordReset();

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    requestReset({ email }, {
      onSuccess: () => {
        Alert.alert('Email Sent', 'Check your email for reset instructions', [
          { text: 'OK', onPress: () => router.back() }
        ]);
      },
      onError: (error: any) => {
        Alert.alert('Error', error?.response?.data?.message || 'Failed to send reset email');
      },
    });
  };

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-2">Reset Password</Text>
      <Text className="text-gray-600 mb-6">
        Enter your email to receive reset instructions
      </Text>

      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isPending}
      />

      <TouchableOpacity
        className={`bg-blue-500 rounded-lg py-3 ${isPending ? 'opacity-50' : ''}`}
        onPress={handleSubmit}
        disabled={isPending}
      >
        <Text className="text-white text-center font-semibold">
          {isPending ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={() => router.back()}>
        <Text className="text-blue-500 text-center">Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 7.4 Add Forgot Password Link

**Update**: `src/app/(public)/sign-in.tsx`

```typescript
import { Link } from 'expo-router';

// Add after password input:
<View className="items-end mb-4">
  <Link href="/(public)/forgot-password" asChild>
    <TouchableOpacity>
      <Text className="text-blue-500">Forgot Password?</Text>
    </TouchableOpacity>
  </Link>
</View>
```

### 7.5 Handle Email Verification Deep Links

**Update**: `src/app/_layout.tsx`

```typescript
import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useVerifyEmail } from '@/hooks/mutations/use-email';

export default function RootLayout() {
  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    const handleDeepLink = (url: string) => {
      const { path, queryParams } = Linking.parse(url);

      if (path === 'verify-email' && queryParams?.token) {
        verifyEmail({ token: queryParams.token as string });
      }
    };

    Linking.getInitialURL().then((url) => url && handleDeepLink(url));
    const subscription = Linking.addEventListener('url', ({ url }) => handleDeepLink(url));

    return () => subscription.remove();
  }, []);

  // ... rest of layout
}
```

---

**Phase 7 Complete** ✅

**What We Built**:
- Email API service layer
- React Query mutations for email operations
- Forgot password flow
- Deep linking for email verification

**Key Takeaways**:
- Backend handles email sending
- Mobile app triggers via API calls
- React Query manages state

**Next Steps**:
- Verify backend API endpoints match contracts
- Test email flows end-to-end

## Phase 8 - State Management & Data Fetching (React Query Advanced Patterns)

**Overview**: Build on the React Query foundation from Phase 5. Implement advanced patterns like optimistic updates, infinite queries, prefetching, and offline support for a production-ready data layer.

**Note**: Basic React Query setup was completed in Phase 5. This phase adds **advanced patterns** only.

### 8.1 Setup Infinite Queries for Pagination

**File**: `src/hooks/queries/use-infinite-matches.ts`

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';
import { matchesApi } from '@/services/api/matches';

export const useInfiniteMatches = (status?: 'upcoming' | 'live' | 'finished') => {
  return useInfiniteQuery({
    queryKey: ['matches', 'infinite', status],
    queryFn: ({ pageParam = 0 }) =>
      matchesApi.getMatchesPaginated({
        page: pageParam,
        status,
        limit: 20,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length : undefined,
    initialPageParam: 0,
  });
};
```

**Usage**:
```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteMatches('upcoming');

const matches = data?.pages.flatMap(page => page.matches) ?? [];
```

### 8.2 Implement Optimistic Updates

**File**: `src/hooks/mutations/use-predictions.ts`

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { predictionsApi } from '@/services/api/predictions';

export const useCreatePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: predictionsApi.create,

    // Optimistic update - update UI immediately
    onMutate: async (newPrediction) => {
      await queryClient.cancelQueries({ queryKey: ['predictions', newPrediction.matchId] });

      const previous = queryClient.getQueryData(['predictions', newPrediction.matchId]);

      queryClient.setQueryData(['predictions', newPrediction.matchId], (old: any[]) => [
        ...old,
        { ...newPrediction, id: `temp-${Date.now()}` }
      ]);

      return { previous };
    },

    // Rollback on error
    onError: (err, variables, context) => {
      queryClient.setQueryData(
        ['predictions', variables.matchId],
        context?.previous
      );
    },

    // Refetch after success
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['predictions', variables.matchId] });
    },
  });
};
```

### 8.3 Setup Query Prefetching

**File**: `src/hooks/prefetch/use-prefetch-match.ts`

```typescript
import { useQueryClient } from '@tanstack/react-query';
import { matchesApi } from '@/services/api/matches';

export const usePrefetchMatch = () => {
  const queryClient = useQueryClient();

  return (matchId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['matches', matchId],
      queryFn: () => matchesApi.getById(matchId),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
};
```

**Usage in Match Card**:
```typescript
const prefetchMatch = usePrefetchMatch();

<TouchableOpacity
  onPressIn={() => prefetchMatch(match.id)}
  onPress={() => router.push(`/matches/${match.id}`)}
>
  {/* Match card content */}
</TouchableOpacity>
```

### 8.4 Create Query Key Factory

**File**: `src/services/api/query-keys.ts`

Centralize query keys for consistency:

```typescript
export const queryKeys = {
  matches: {
    all: ['matches'] as const,
    lists: () => [...queryKeys.matches.all, 'list'] as const,
    upcoming: () => [...queryKeys.matches.lists(), 'upcoming'] as const,
    live: () => [...queryKeys.matches.lists(), 'live'] as const,
    detail: (id: string) => [...queryKeys.matches.all, 'detail', id] as const,
  },
  predictions: {
    all: ['predictions'] as const,
    byMatch: (matchId: string) => [...queryKeys.predictions.all, 'match', matchId] as const,
    byUser: (userId: string) => [...queryKeys.predictions.all, 'user', userId] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
};
```

**Update hooks to use factory**:
```typescript
export const useUpcomingMatches = () => {
  return useQuery({
    queryKey: queryKeys.matches.upcoming(),
    queryFn: matchesApi.getUpcoming,
  });
};
```

### 8.5 Configure React Native Optimizations

**Update**: `src/store/query-client.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';
import { focusManager, onlineManager } from '@tanstack/react-query';
import { AppState } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// Track online status
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// Refetch on app focus
focusManager.setEventListener((handleFocus) => {
  const subscription = AppState.addEventListener('change', (status) => {
    handleFocus(status === 'active');
  });
  return () => subscription.remove();
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});
```

**Install NetInfo**:
```bash
npx expo install @react-native-community/netinfo
```

### 8.6 Setup Offline Persistence (Optional)

**Install persistence**:
```bash
npm install @tanstack/react-query-persist-client
npm install @tanstack/query-async-storage-persister
```

**Configure**: `src/store/query-client.ts`

```typescript
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 1000,
});
```

**Update**: `src/app/_layout.tsx`

```typescript
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { queryClient, persister } from '@/store/query-client';

export default function RootLayout() {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Slot />
    </PersistQueryClientProvider>
  );
}
```

---

**Phase 8 Complete** ✅

**What We Built**:
- Infinite queries for pagination
- Optimistic updates for instant UI feedback
- Query prefetching for better UX
- Query key factory for consistency
- React Native optimizations (online/focus managers)
- Optional offline persistence

**Key Takeaways**:
- React Query handles 90% of state management needs
- Optimistic updates provide instant feedback
- Prefetching eliminates loading spinners
- Query key factory prevents typos

**Next Steps**:
- Monitor query cache size in production
- Adjust staleTime based on data volatility
## Phase 9 - AI Features Integration (API Integration)
To be defined
## Phase 10 - Code Quality & Development Tools
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
- [x] Phase 5 - API Integration (Existing Backend)
- [x] Phase 6 - Authentication (Clerk or Auth0)
- [x] Phase 7 - Email Infrastructure (API Integration)
- [x] Phase 8 - State Management & Data Fetching (Advanced Patterns)
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
