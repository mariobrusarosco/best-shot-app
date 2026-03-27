# Phase 1: Foundation & Environment Setup

**Goal:** Development environment ready, "Hello World" running on all platforms

**Timeline Estimate:** 2-4 hours (depending on download speeds and prior setup)

---

## Prerequisites

- Node.js installed (v18 or newer recommended)
- Git installed
- Physical iOS/Android device OR willingness to use simulators/emulators
- Mac required for iOS development (simulator only)

---

## Part 1: Development Tools Installation

### Task 1.1: Install Xcode (macOS only, ~1-2 hours)

- [x] Open Mac App Store
- [x] Search for "Xcode"
- [x] Download and install Xcode (large download ~10-15 GB)
- [x] Open Xcode once installed to accept license agreements
- [x] Install Xcode Command Line Tools:
  ```bash
  xcode-select --install
  ```
- [ ] Verify installation:
  ```bash
  xcode-select -p
  # Should output: /Applications/Xcode.app/Contents/Developer
  ```

### Task 1.2: Set up iOS Simulator (macOS only)

- [x] Open Xcode
- [x] Go to Xcode → Settings → Platforms
- [x] Download iOS simulator runtime (if not already installed)
- [x] Open Simulator app (Xcode → Open Developer Tool → Simulator)
- [x] Choose a device (e.g., iPhone 15 Pro)
- [x] Verify simulator boots successfully

### Task 1.3: Install Android Studio (~30-60 minutes)

- [x] Download Android Studio from https://developer.android.com/studio
- [x] Run installer and follow setup wizard
- [x] Choose "Standard" installation
- [ ] Wait for Android SDK and tools to download
- [ ] Complete installation and launch Android Studio

### Task 1.4: Configure Android Emulator

- [ ] Open Android Studio
- [ ] Click "More Actions" → "Virtual Device Manager"
- [ ] Click "Create Device"
- [ ] Choose a phone (e.g., Pixel 8)
- [ ] Download a system image (e.g., Android 14 / API 34)
- [ ] Finish emulator creation
- [ ] Launch emulator to verify it works
- [ ] Set environment variables (add to `.bashrc`, `.zshrc`, or equivalent):

  ```bash
  export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
  # OR
  export ANDROID_HOME=$HOME/Android/Sdk  # Linux
  # OR
  export ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk  # Windows

  export PATH=$PATH:$ANDROID_HOME/emulator
  export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```

- [ ] Restart terminal and verify:
  ```bash
  adb --version
  # Should show Android Debug Bridge version
  ```

### Task 1.5: Install Expo Go on Physical Device (Optional but Recommended)

- [ ] On iOS: Open App Store, search "Expo Go", install
- [ ] On Android: Open Google Play Store, search "Expo Go", install
- [ ] Open Expo Go app to verify installation
- [ ] Ensure device is on same Wi-Fi network as development machine

---

## Part 2: Project Setup

### Task 2.1: Create Expo Project with TypeScript

- [x] Navigate to workspace directory:
  ```bash
  cd ~/coding/best-shot-app
  ```
- [x] Create new Expo project with TypeScript template:
  ```bash
  npx create-expo-app@latest mobile --template expo-template-blank-typescript
  ```
- [x] Navigate into project:
  ```bash
  cd mobile
  ```
- [x] Verify project structure created:
  ```bash
  ls -la
  # Should see: app.json, package.json, App.tsx, tsconfig.json, etc.
  ```

### Task 2.2: Start Development Server

- [x] Start Expo development server:
  ```bash
  npx expo start
  ```
- [x] Verify QR code and options appear in terminal
- [x] Leave server running for next tasks

### Task 2.3: Verify App on Physical Device (Expo Go)

- [ ] Open Expo Go app on phone
- [ ] Scan QR code from terminal
- [ ] Wait for app to load
- [ ] Verify "Open up App.tsx to start working" message appears
- [ ] Verify you can see the default Expo template

### Task 2.4: Verify App on iOS Simulator (macOS only)

- [x] With Expo dev server running, press `i` in terminal
- [x] Wait for iOS Simulator to launch and app to install
- [x] Verify app loads with default Expo template
- [x] Try making a change in `App.tsx` (e.g., change text)
- [x] Verify hot reload works (changes appear automatically)

### Task 2.5: Verify App on Android Emulator

- [ ] Ensure Android emulator is running
- [ ] With Expo dev server running, press `a` in terminal
- [ ] Wait for app to install and launch
- [ ] Verify app loads with default Expo template
- [ ] Try making a change in `App.tsx`
- [ ] Verify hot reload works

**Checkpoint:** At this point, you should have the default Expo app running on at least one platform (ideally all three).

---

## Part 3: Configure Core Dependencies

### Task 3.1: Install EAS CLI

- [x] Install EAS CLI globally:
  ```bash
  npm install -g eas-cli
  ```
- [x] Verify installation:
  ```bash
  eas --version
  ```
- [x] Login to Expo account (create one if needed):
  ```bash
  eas login
  ```
- [x] Initialize EAS in project:
  ```bash
  eas build:configure
  ```
- [x] Verify `eas.json` was created

### Task 3.2: Install and Configure NativeWind (Tailwind CSS)

- [x] Install NativeWind and dependencies:
  ```bash
  npm install nativewind
  npx expo install react-native-safe-area-context
  npm install --save-dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
  ```
- [x] Initialize Tailwind config:
  ```bash
  npx tailwindcss init
  ```
- [x] Update `tailwind.config.js`:
  ```js
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```
- [] Create `global.css` with Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- [] Create or update `metro.config.js`:

  ```js
  const { getDefaultConfig } = require("expo/metro-config");
  const { withNativeWind } = require("nativewind/metro");

  const config = getDefaultConfig(__dirname);

  module.exports = withNativeWind(config, { input: "./global.css" });
  ```

- [x] Update `babel.config.js` for NativeWind:
  ```js
  module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        "nativewind/babel",
      ],
    };
  };
  ```
- [x] Update `app.json` so web also uses the Metro bundler:
  ```json
  {
    "expo": {
      "web": {
        "bundler": "metro"
      }
    }
  }
  ```
- [x] Recommended TypeScript setup: create `nativewind-env.d.ts`
  ```ts
  /// <reference types="nativewind/types" />
  ```
- [x] Usually no extra config is needed after creating the file because TypeScript picks up root-level `.d.ts` files automatically
- [x] If your editor still shows stale errors, restart the TypeScript server in VS Code: Cmd+Shift+P -> "Restart TS Server"
- [x] Import `./global.css` in your top-level component file (`App.tsx` for now)
- [x] Restart Expo dev server (stop and run `npx expo start` again)

### Task 3.3: Install and Configure React Native Reanimated

- [ ] Install Reanimated with Expo-managed versions:
  ```bash
  npx expo install react-native-reanimated react-native-worklets
  ```
- [ ] If Reanimated already came in as a NativeWind peer dependency, running the Expo install step here will align it to Expo-supported versions
- [ ] Note: in current Expo-managed projects, no extra Reanimated Babel plugin step is required
- [ ] Keep using `babel-preset-expo`; Expo configures the Reanimated Babel plugin automatically
- [ ] Clear cache and restart:
  ```bash
  npx expo start -c
  ```

### Task 3.4: Test NativeWind Configuration

- [ ] Update `App.tsx` to use Tailwind classes:

  ```tsx
  import "./global.css";
  import { View, Text } from "react-native";

  export default function App() {
    return (
      <View className="flex-1 items-center justify-center bg-blue-500">
        <Text className="text-white text-2xl font-bold">Hello NativeWind!</Text>
      </View>
    );
  }
  ```

- [ ] Verify blue background and white styled text appears
- [ ] If styles don't apply, check Babel config, Metro config, and `global.css` import, then restart dev server

### Task 3.5: Test Reanimated Configuration

- [ ] Update `App.tsx` with simple animation:

  ```tsx
  import { View, Text, Pressable } from "react-native";
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from "react-native-reanimated";

  export default function App() {
    const offset = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
    }));

    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Animated.View style={animatedStyles}>
          <Text className="text-white text-2xl font-bold mb-4">
            Tap to Animate
          </Text>
        </Animated.View>
        <Pressable
          className="bg-blue-500 px-6 py-3 rounded-lg"
          onPress={() => {
            offset.value = withSpring(offset.value + 50);
          }}
        >
          <Text className="text-white font-semibold">Move Right</Text>
        </Pressable>
      </View>
    );
  }
  ```

- [ ] Verify pressing button animates text to the right
- [ ] If animation doesn't work, restart Expo with a cleared cache and verify Reanimated was installed with `expo install`

---

## Part 4: Project Structure & First Screen

### Task 4.1: Set Up Folder Structure

- [x] Create core directories:
  ```bash
  mkdir -p src/{app,api,assets,configuration,constants,domains,stores,types,ui-system,utils}
  mkdir -p src/domains/dashboard/{components,hooks,screens,server-state}
  mkdir -p src/domains/global/{components,hooks,server-state}
  ```
- [x] Verify structure:
  ```bash
  tree src -L 1
  # Should show all created folders
  ```
- [ ] Note: we are not creating top-level `screens`, `navigation`, `config`, or `store` folders
- [ ] Reason: Expo Router will own route files in `src/app`, and feature code should live in `src/domains`

### Task 4.2: Update TypeScript Path Aliases

- [x] Update `tsconfig.json` to add path aliases:
  ```json
  {
    "extends": "expo/tsconfig.base",
    "compilerOptions": {
      "strict": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["src/*"]
      }
    }
  }
  ```
- [ ] Restart Expo dev server after changing `tsconfig.json`
- [ ] Verify `@/` imports work without adding `babel-plugin-module-resolver`
- [ ] Note: in a standard Expo project, TypeScript path aliases from `tsconfig.json` are supported automatically by Expo CLI

### Task 4.3: Create First Test Screen

- [ ] Create `src/domains/dashboard/screens/HomeScreen.tsx`:

  ```tsx
  import { View, Text } from "react-native";

  export function HomeScreen() {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-3xl font-bold">Best Shot Mobile</Text>
        <Text className="text-slate-400 text-lg mt-2">
          Phase 1 Complete! 🎉
        </Text>
      </View>
    );
  }
  ```

### Task 4.4: Update App.tsx to Use New Screen

- [ ] Update `App.tsx`:

  ```tsx
  import { HomeScreen } from "@/domains/dashboard/screens/HomeScreen";

  export default function App() {
    return <HomeScreen />;
  }
  ```

- [ ] Verify path alias works (no import errors)
- [ ] Verify screen displays correctly
- [ ] Note: once Expo Router is added in Phase 2, route files in `src/app` should render domain screens like this instead of introducing a new top-level `screens` folder

---

## Part 5: Final Verification

### Task 5.1: Test All Platforms

- [ ] iOS Simulator (macOS): Press `i` in Expo terminal, verify app loads
- [ ] Android Emulator: Press `a` in Expo terminal, verify app loads
- [ ] Physical Device: Scan QR code in Expo Go, verify app loads
- [ ] Verify all three show "Best Shot Mobile" and "Phase 1 Complete!"

### Task 5.2: Test Hot Reload

- [ ] Change text in `src/domains/dashboard/screens/HomeScreen.tsx`
- [ ] Verify change appears on all running platforms without manual refresh
- [ ] Change Tailwind classes (e.g., `bg-slate-900` → `bg-purple-900`)
- [ ] Verify style change appears

### Task 5.3: Documentation

- [ ] Create `.env.example` if needed for future API URLs
- [ ] Update project README.md with:
  - How to start the app (`npx expo start`)
  - Available platforms and how to launch them
  - Phase 1 completion checklist
- [ ] Commit Phase 1 work:
  ```bash
  git add .
  git commit -m "feat: Complete Phase 1 - Foundation & Environment Setup"
  ```

---

## Learning Checkpoint

Before moving to Phase 2, ensure you understand:

- [ ] **Expo vs React Native CLI:** Expo abstracts native config, provides managed workflow
- [ ] **Core RN Components:**
  - `<View>` = `<div>` (container)
  - `<Text>` = `<span>` (all text must be in Text component)
  - No DOM, no HTML tags
  - StyleSheet or Tailwind (NativeWind) for styling
- [ ] **Flexbox by Default:** All views use `display: flex` with `flexDirection: 'column'`
- [ ] **Hot Reload:** Changes reflect immediately in dev mode
- [ ] **Platform Differences:** Some components behave differently on iOS vs Android

---

## Deliverable Checklist

- [ ] Xcode installed and iOS Simulator working (macOS only)
- [ ] Android Studio installed and emulator working
- [ ] Expo Go installed on physical device (optional)
- [ ] Expo project created with TypeScript
- [ ] EAS CLI installed and configured
- [ ] NativeWind configured and working
- [ ] Reanimated configured and working
- [ ] Folder structure created
- [ ] Path aliases working (`@/` imports)
- [ ] Test screen created and displaying
- [ ] App runs on iOS Simulator (macOS only)
- [ ] App runs on Android Emulator
- [ ] App runs on physical device via Expo Go
- [ ] Hot reload verified on all platforms

**Status:** ✅ Phase 1 Complete — Ready for Phase 2 (Navigation & Screen Structure)

---

## Troubleshooting

### Issue: NativeWind styles not applying

**Solution:**

- Verify `babel.config.js` includes the NativeWind preset configuration
- Verify `metro.config.js` wraps the config with `withNativeWind(...)`
- Verify `./global.css` is imported from your top-level component file
- Clear cache: `npx expo start -c`
- Check `tailwind.config.js` content paths include your files

### Issue: Reanimated not working

**Solution:**

- Ensure Reanimated was installed with `npx expo install react-native-reanimated react-native-worklets`
- Clear cache: `npx expo start -c`
- Rebuild app (close and relaunch from dev server)

### Issue: Android emulator won't connect

**Solution:**

- Verify emulator is running (`adb devices` should list device)
- Ensure `ANDROID_HOME` environment variable is set
- Try `adb reverse tcp:8081 tcp:8081`

### Issue: iOS Simulator not opening

**Solution:**

- Ensure Xcode Command Line Tools installed: `xcode-select --install`
- Try opening Simulator manually first
- Check Expo output for specific errors

### Issue: Path aliases not working

**Solution:**

- Verify `tsconfig.json` maps `@/*` to `src/*`
- Restart TypeScript server in VS Code: Cmd+Shift+P → "Restart TS Server"
- Restart Expo CLI after changing `tsconfig.json`
