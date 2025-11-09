# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

*IMPORTANT*

Custom Commands you need to watch:

* "Brace for Compact" - Refer to section "Pre and Post Auto-Compact"
* "Write a Topic" - Refer to section "Create a Garden Topic"

## Pre and Post Auto-Compact
Claude Code CLI auto-compacts conversations due context limitations, it generates a summary that's not the same.
We kind of lose the most crucial converation parts. 

Your job is to: 
1. Summarize the WHOLE conversation 
2. Add the summary as a new entry on the `CLAUDE_COMPACTED_HISTORY.md` 

## Create a Garden Topic
To create a Garnde Topic, you need to access the project named `garden`.
You should have context to it because the engineer must have already added the project via Claude's `/add-dir` command.
Your job is to understand how to create a new topic via .mdx file over there. 
Ask me which part of our work should you focus with. I'll tell you what the name of the topic.
No need to do anything else on that project. 


## Project Overview

Best Shot App is a cross-platform football match guessing game built with Expo, React Native, TypeScript, and Tamagui. The application targets Web, Android, and iOS from a single codebase, consuming a pre-existing API.

## Development Commands

### Running the Application
```bash
npm start                    # Start Expo development server
npm run android              # Run on Android emulator/device
npm run ios                  # Run on iOS simulator/device (macOS only)
npm run web                  # Run on web browser
```

### Code Quality
```bash
npm run lint                 # Run Biome linting and formatting checks
npm run type-check           # Run TypeScript type checking
npm run type-check:watch     # Run type checking in watch mode
```

### Git Hooks
Git hooks are automatically installed via Husky when running `npm install`:
- **Pre-commit**: Runs Biome linting/formatting and type checking on staged files via lint-staged
- **Pre-push**: Runs full type checking across the codebase

## Architecture & Key Decisions

### Technology Stack
- **Framework**: React Native with Expo SDK ~53
- **Language**: TypeScript with strict mode enabled
- **Navigation**: expo-router (file-system based routing, similar to Next.js)
- **UI/Styling**: Tamagui with optimizing compiler for cross-platform consistency
- **State Management**: TanStack Query (React Query) for async/server state
- **Code Quality**: Biome.js (unified linting & formatting, replaces ESLint + Prettier)
- **Git Hooks**: Husky + lint-staged for automated quality gates

### File-System Based Routing
The project uses expo-router which maps files in `src/app/` to routes:
- `src/app/index.tsx` → `/` (root route)
- `src/app/sign-in.tsx` → `/sign-in`
- `src/app/(auth)/home.tsx` → `/home` (grouped route, parentheses don't appear in URL)
- `src/app/_layout.tsx` → Root layout wrapper
- `src/app/+not-found.tsx` → 404 fallback

### Module Path Aliases
TypeScript and Babel are configured with `@/` alias:
```typescript
import { Button } from '@/components/button'  // resolves to src/components/button
```

### Project Structure
```
src/
├── app/              # expo-router screens and layouts (file-system routing)
├── assets/           # Images, fonts, and static resources
├── components/       # Shared/reusable UI components
├── config/           # Environment and app configuration
├── constants/        # Theme colors, global styles, constants
├── hooks/            # Custom React hooks
├── navigation/       # Navigation utilities (minimal with expo-router)
├── screens/          # Screen-level components (if not using app/ directly)
├── services/         # API services and external integrations
├── store/            # State management setup
├── types/            # Shared TypeScript type definitions
└── utils/            # Utility functions and helpers
```

### Coding Conventions (from .cursor/rules)
1. **Import types with `type` keyword**: `import type { User } from '@/types/user'`
2. **File naming**: Use kebab-case (e.g., `user-profile.tsx`, `api-service.ts`)
3. **Do not run git commands** - changes are managed manually

### Documentation Structure
- **ADRs**: `docs/decisions/` - Architectural Decision Records for key technology choices
- **Developer Guides**: `docs/guides/` - Technology-specific implementation guides
- **Development Plan**: `docs/plan/` - Phase-based project planning with task checklists
- **Issue Resolution Log**: `docs/fixing-log/` - Context and solutions for resolved issues

### Biome Configuration
- **Formatter**: Tab indentation, double quotes for JavaScript/TypeScript
- **Linter**: Uses recommended rules
- **Organize Imports**: Automatically enabled
- **Ignored paths**: `.tamagui/`, `node_modules/`, `.expo/`, `dist/`, `build/`

### Tamagui Integration
Tamagui's Babel plugin is configured for optimizing compilation:
- **Development**: Extraction disabled for faster refresh
- **Production**: Full style extraction and optimization enabled
- **Config**: `tamagui.config.ts` at project root

### Cross-Platform Considerations
- This is a universal app - changes should work across Web, iOS, and Android
- Test UI changes on multiple platforms when possible
- Tamagui provides platform-adaptive components and responsive utilities
- expo-router handles deep linking and navigation universally

### React Version
The project uses **React 19.0.0** - be aware of breaking changes from React 18:
- New JSX transform
- Updated hooks behavior
- Improved type definitions

## Common Development Workflows

### Adding a New Screen
1. Create file in `src/app/` (e.g., `src/app/settings.tsx`)
2. Export default React component
3. Route is automatically available at `/settings`
4. Use `<Link href="/settings">` or `router.push('/settings')` for navigation

### Creating a New Component
1. Create component file in `src/components/` with kebab-case naming
2. Import types using `import type { ... }`
3. Use Tamagui components and styling system for cross-platform consistency
4. Export component for use across the app

### API Integration
1. Create service in `src/services/`
2. Use axios for HTTP requests (already configured)
3. Integrate with TanStack Query for caching and state management
4. Handle loading, error, and success states

### Working with Types
1. Place shared types in `src/types/`
2. Use `import type` syntax for type-only imports
3. TypeScript strict mode is enabled - all types must be explicit

## Quality Gates & Pre-commit Checks

When you commit code, the following automated checks run:
1. **Biome linting** - Code style and quality checks with auto-fix
2. **TypeScript compilation** - Type checking on staged files
3. **Import organization** - Automatic import sorting

If checks fail, the commit is blocked. Run `npm run lint` to manually check before committing.

## Important Notes

- **No Prettier or ESLint**: This project uses Biome exclusively
- **React Native New Architecture**: See `docs/guides/react-native-new-architecture.md`
- **Module Resolution**: Babel module-resolver is configured - check `babel.config.cjs` for path aliases
- **Issue Tracking**: When resolving complex issues, document in `docs/fixing-log/` per cursor rules