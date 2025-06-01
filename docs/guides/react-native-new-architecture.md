# Understanding React Native's New Architecture (Fabric & TurboModules)

**Date**: 2024-07-27

**Context**: This guide explains React Native's New Architecture, focusing on Fabric and TurboModules. While Expo abstracts many direct interactions, understanding these concepts is crucial for any experienced React Native developer to appreciate performance improvements and make informed decisions if custom native development is required.

## The "Why": From the Old Architecture to the New

Previously, React Native used an asynchronous "bridge" to communicate between JavaScript and the native (iOS/Android) sides. This bridge, while functional, had limitations:

- Asynchronous Bottleneck: All communication was async, meaning JS couldn't directly and synchronously call native methods or update UI. This could lead to UI stutters or delays in certain scenarios.
- Serialization Overhead: Data sent over the bridge had to be serialized (to JSON) and deserialized, adding overhead.
- Type Unsafe: Less type safety between JS and native code.

The New Architecture addresses these with a few core components:

### 1. JSI (JavaScript Interface)

- **What it is**: JSI is the cornerstone. It's a lightweight, general-purpose C++ API that allows JavaScript to hold direct references to C++ objects and invoke methods on them (and vice-versa).
- **How it works**: It enables true synchronous communication between JS and the native side. Instead of sending messages over a bridge, JS can directly call C++ functions that can, in turn, interact with the native platform (Java/Kotlin on Android, Objective-C/Swift on iOS).
- **Benefit for us**: This is the enabler for Fabric and TurboModules. It means faster, more efficient communication, reducing overhead and enabling more responsive applications. We don't directly write JSI code often, but we benefit from libraries and React Native itself using it.

### 2. Fabric (The New Rendering System)

- **What it is**: Fabric is the new rendering system that replaces the legacy UIManager.
- **How it works**:
  - It leverages JSI to allow JavaScript to create and manipulate native UI components more directly and synchronously.
  - It enables React to render directly to native views without going through the asynchronous bridge for every update.
  - It supports React's concurrent features (like Suspense for UI) more effectively.
- **How we work with it (in an Expo context)**:
  - **Largely Transparent**: For the most part, when you write React components (`<View>`, `<Text>`, etc.), React Native (with Fabric enabled) handles rendering them efficiently. You continue to write React components as usual.
  - **Performance Gains**: You should see smoother animations, faster screen transitions, and better responsiveness, especially in complex UIs, without changing your component code.
  - **Fabric Native Components**: If you were to build highly custom, performance-critical native UI components (e.g., a complex mapping view or a custom video player that needs to be controlled from JS), you would define them as "Fabric Native Components." This involves writing a JavaScript spec (often in TypeScript or Flow) that defines the component's props and events. React Native's Codegen tool then generates C++ boilerplate that you implement natively.
  - **Expo's Role**: Expo's own UI components (from `expo-gl`, `expo-camera`, etc.) are increasingly built to be Fabric-compatible or are Fabric-native. By using the Expo SDK, you're getting these benefits.

### 3. TurboModules (The New Native Module System)

- **What it is**: TurboModules are the next generation of Native Modules.
- **How it works**:
  - They also leverage JSI for direct, synchronous (or asynchronous, if designed that way) calls from JS to native code.
  - **Type Safety**: They require a JavaScript specification (TypeScript or Flow) that defines the module's interface (methods, constants). Codegen uses this spec to generate native interface code (C++, Java, Objective-C).
  - **Lazy Loading**: Native modules are loaded into memory only when they are actually used by your JavaScript code, improving app startup time.
- **How we work with them (in an Expo context)**:
  - **Using Existing Modules**: Many core React Native modules and popular third-party libraries are being migrated or created as TurboModules. When you use them, you benefit from their improved performance and type safety.
  - **Creating Custom Native Modules (if needed)**:
    - **Expo Modules First**: If you need to write custom native code, your first stop in an Expo project should be the Expo Modules API. It provides a simpler, more idiomatic way to create native modules (Swift/Kotlin) that are compatible with the New Architecture and integrate smoothly with Expo's tooling (expo-module-scripts). This is generally the recommended approach.
    - **"Pure" TurboModule**: If you need to go beyond what Expo Modules offer, or are working in a bare React Native project (after ejecting, or if you started bare), you would:
      - Write a JavaScript spec (e.g., `MyModuleSpec.ts`) detailing the functions and constants your native module will expose.
      - Run Codegen to generate the C++ and platform-specific native interface stubs.
      - Implement the native logic in Java/Kotlin for Android and Objective-C/Swift for iOS.
- **Benefit**: Faster calls to native functionality, better app startup, and increased confidence due to type checking between JS and native.

## Impact on Our "Best Shot" Expo Project:

- **Stay Updated with Expo SDK**: By using the latest stable Expo SDK, we automatically get versions of React Native that have the New Architecture enabled (or components that are compatible). Expo handles the configuration.
- **Focus on Expo Modules**: If we need to write custom native code (e.g., for a very specific device feature not covered by an existing library), we'd preferentially use the Expo Modules API. This simplifies the process while still giving us New Architecture benefits.
- **Indirect Benefits**: We'll primarily experience the New Architecture through improved performance, smoother UI, and faster interactions with native APIs used by Expo and third-party libraries.
- **No Direct Codegen Initially**: It's unlikely we'll be running Codegen manually or writing JSI glue code in the early phases, especially with Expo's managed workflow.
