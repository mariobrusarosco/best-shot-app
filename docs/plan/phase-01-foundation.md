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

- [ ] Open Mac App Store
- [ ] Search for "Xcode"
- [ ] Download and install Xcode (large download ~10-15 GB)
- [ ] Open Xcode once installed to accept license agreements
- [ ] Install Xcode Command Line Tools:
  ```bash
  xcode-select --install
  ```
- [ ] Verify installation:
  ```bash
  xcode-select -p
  # Should output: /Applications/Xcode.app/Contents/Developer
  ```

### Task 1.2: Set up iOS Simulator (macOS only)

- [ ] Open Xcode
- [ ] Go to Xcode → Settings → Platforms
- [ ] Download iOS simulator runtime (if not already installed)
- [ ] Open Simulator app (Xcode → Open Developer Tool → Simulator)
- [ ] Choose a device (e.g., iPhone 15 Pro)
- [ ] Verify simulator boots successfully

### Task 1.3: Install Android Studio (~30-60 minutes)

- [ ] Download Android Studio from https://developer.android.com/studio
- [ ] Run installer and follow setup wizard
- [ ] Choose "Standard" installation
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

- [ ] Navigate to workspace directory:
  ```bash
  cd ~/coding/best-shot-app
  ```
- [ ] Create new Expo project with TypeScript template:
  ```bash
  npx create-expo-app@latest mobile --template expo-template-blank-typescript
  ```
- [ ] Navigate into project:
  ```bash
  cd mobile
  ```
- [ ] Verify project structure created:
  ```bash
  ls -la
  # Should see: app.json, package.json, App.tsx, tsconfig.json, etc.
  ```

### Task 2.2: Start Development Server

- [ ] Start Expo development server:
  ```bash
  npx expo start
  ```
- [ ] Verify QR code and options appear in terminal
- [ ] Leave server running for next tasks

### Task 2.3: Verify App on Physical Device (Expo Go)

- [ ] Open Expo Go app on phone
- [ ] Scan QR code from terminal
- [ ] Wait for app to load
- [ ] Verify "Open up App.tsx to start working" message appears
- [ ] Verify you can see the default Expo template

### Task 2.4: Verify App on iOS Simulator (macOS only)

- [ ] With Expo dev server running, press `i` in terminal
- [ ] Wait for iOS Simulator to launch and app to install
- [ ] Verify app loads with default Expo template
- [ ] Try making a change in `App.tsx` (e.g., change text)
- [ ] Verify hot reload works (changes appear automatically)

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

- [ ] Install EAS CLI globally:
  ```bash
  npm install -g eas-cli
  ```
- [ ] Verify installation:
  ```bash
  eas --version
  ```
- [ ] Login to Expo account (create one if needed):
  ```bash
  eas login
  ```
- [ ] Initialize EAS in project:
  ```bash
  eas build:configure
  ```
- [ ] Verify `eas.json` was created

### Task 3.2: Install and Configure NativeWind (Tailwind CSS)

- [ ] Install NativeWind and dependencies:
  ```bash
  npm install nativewind
  npm install --save-dev tailwindcss
  ```
- [ ] Initialize Tailwind config:
  ```bash
  npx tailwindcss init
  ```
- [ ] Update `tailwind.config.js`:
  ```js
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: [
      "./App.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
      "./screens/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  ```
- [ ] Update `babel.config.js` to include NativeWind:
  ```js
  module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: ['nativewind/babel'],
    };
  };
  ```
- [ ] Create `global.css` (or `app.css`) for Tailwind directives (optional for basic setup)
- [ ] Restart Expo dev server (stop and run `npx expo start` again)

### Task 3.3: Install and Configure React Native Reanimated

- [ ] Install Reanimated:
  ```bash
  npx expo install react-native-reanimated
  ```
- [ ] Update `babel.config.js` to include Reanimated plugin (must be last):
  ```js
  module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        'nativewind/babel',
        'react-native-reanimated/plugin', // Must be last!
      ],
    };
  };
  ```
- [ ] Clear cache and restart:
  ```bash
  npx expo start -c
  ```

### Task 3.4: Test NativeWind Configuration

- [ ] Update `App.tsx` to use Tailwind classes:
  ```tsx
  import { View, Text } from 'react-native';

  export default function App() {
    return (
      <View className="flex-1 items-center justify-center bg-blue-500">
        <Text className="text-white text-2xl font-bold">
          Hello NativeWind!
        </Text>
      </View>
    );
  }
  ```
- [ ] Verify blue background and white styled text appears
- [ ] If styles don't apply, check Babel config and restart dev server

### Task 3.5: Test Reanimated Configuration

- [ ] Update `App.tsx` with simple animation:
  ```tsx
  import { View, Text, Pressable } from 'react-native';
  import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
  } from 'react-native-reanimated';

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
- [ ] If animation doesn't work, check Reanimated is last plugin in Babel config

---

## Part 4: Project Structure & First Screen

### Task 4.1: Set Up Folder Structure

- [ ] Create core directories:
  ```bash
  mkdir -p src/{components,screens,navigation,services,hooks,types,utils,constants,config,assets,store}
  ```
- [ ] Verify structure:
  ```bash
  tree src -L 1
  # Should show all created folders
  ```

### Task 4.2: Update TypeScript Path Aliases

- [ ] Update `tsconfig.json` to add path aliases:
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
- [ ] Install Babel module resolver:
  ```bash
  npm install --save-dev babel-plugin-module-resolver
  ```
- [ ] Update `babel.config.js`:
  ```js
  module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './src',
            },
          },
        ],
        'nativewind/babel',
        'react-native-reanimated/plugin',
      ],
    };
  };
  ```

### Task 4.3: Create First Test Screen

- [ ] Create `src/screens/HomeScreen.tsx`:
  ```tsx
  import { View, Text } from 'react-native';

  export function HomeScreen() {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-3xl font-bold">
          Best Shot Mobile
        </Text>
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
  import { HomeScreen } from '@/screens/HomeScreen';

  export default function App() {
    return <HomeScreen />;
  }
  ```
- [ ] Verify path alias works (no import errors)
- [ ] Verify screen displays correctly

---

## Part 5: Final Verification

### Task 5.1: Test All Platforms

- [ ] iOS Simulator (macOS): Press `i` in Expo terminal, verify app loads
- [ ] Android Emulator: Press `a` in Expo terminal, verify app loads
- [ ] Physical Device: Scan QR code in Expo Go, verify app loads
- [ ] Verify all three show "Best Shot Mobile" and "Phase 1 Complete!"

### Task 5.2: Test Hot Reload

- [ ] Change text in `HomeScreen.tsx`
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
- Verify `babel.config.js` includes `'nativewind/babel'`
- Clear cache: `npx expo start -c`
- Check `tailwind.config.js` content paths include your files

### Issue: Reanimated not working
**Solution:**
- Ensure `'react-native-reanimated/plugin'` is LAST in Babel plugins array
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
- Verify both `tsconfig.json` and `babel.config.js` have matching alias config
- Restart TypeScript server in VS Code: Cmd+Shift+P → "Restart TS Server"
- Clear cache and restart Expo
