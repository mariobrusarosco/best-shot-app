# Architecture

## Short Answer

We are going to keep the same mental model that Best Shot already uses on the web:

- `domains/*` own feature logic
- shared code lives in clearly named top-level folders
- routing is file-based

The main difference is that on mobile, **Expo Router owns the routing layer**. That means:

- route files live in `src/app`
- layout files use `_layout.tsx`
- pathless groups use `(group-name)`
- dynamic params use `[id].tsx`

So the mobile app should feel very similar to the web app architecturally, but it should follow **Expo Router conventions** instead of trying to copy TanStack Router file names 1:1.

## Why We Are Choosing This

There are three reasons for this decision:

1. Best Shot already has a web app with a domain-driven structure, so keeping that shape lowers the mental overhead when moving between projects.
2. Expo officially recommends keeping routes in `app` or `src/app`, and its router features are built around that convention.
3. The cleanest scalable setup is to keep route files thin and move real feature logic into domain folders.

In practice, this gives us the best of both worlds:

- the **web app's domain structure**
- the **mobile app's native Expo routing conventions**

## What Expo Recommends

Expo does recommend a routing structure, but not a full business-layer architecture.

The most important conventions are:

- all routes go in `app` or `src/app`
- non-route code should live outside `src/app`
- changing the router root away from `app` or `src/app` is discouraged
- `_layout.tsx` defines layout and navigation wrappers
- route groups like `(auth)` or `(tabs)` do not appear in the URL

This means Expo is opinionated about **where routing files live**, but it does not tell us how to organize domains like `league`, `match`, or `tournament`. That part is our architecture decision.

## What React Native Recommends

React Native itself does not give us a strong official app-folder architecture.

Its architecture documentation is mostly about framework internals, not how an application team should organize screens, services, and features.

So for app architecture, we should treat React Native as flexible, and let:

- Expo define route conventions
- our domain-driven design define feature ownership
- general architecture principles define separation of concerns

## High-Level Rule

**`src/app` is for routes.**

**`src/domains` is for real feature code.**

This is the most important rule in the project.

If a file mainly exists because of URL/navigation structure, it belongs in `src/app`.

If a file mainly exists because of business meaning like authentication, league, tournament, or match, it belongs in `src/domains`.

## Folder Structure

This is the recommended starting structure for the mobile app:

```text
src/
  app/
    _layout.tsx
    index.tsx
    (auth)/
      _layout.tsx
      sign-in.tsx
      register.tsx
    (tabs)/
      _layout.tsx
      index.tsx
      matches.tsx
      predictions.tsx
      profile.tsx
    match/
      [id].tsx

  api/
  assets/
  configuration/
  constants/
  domains/
    authentication/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    dashboard/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    league/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    match/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    member/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    tournament/
      components/
      hooks/
      screens/
      server-state/
      types.ts
    global/
      components/
      hooks/
      types.ts

  stores/
  types/
  ui-system/
  utils/
```

## Why This Structure Works

This structure keeps the mobile app close to the web app without fighting Expo Router.

The web app currently has a strong split between route files and domain folders. On mobile, the same idea becomes:

- `src/routes` on web -> `src/app` on mobile
- `src/domains` on web -> `src/domains` on mobile

So the architecture stays familiar, but the routing syntax changes to match Expo.

## What Goes In Each Folder

### `src/app`

This folder contains route entrypoints only.

Examples:

- screen entry files
- route groups like `(auth)` and `(tabs)`
- `_layout.tsx`
- dynamic route files like `[id].tsx`
- special router files like `+not-found.tsx`

These files should stay light. Ideally they mostly compose layout and delegate the real screen implementation to domain code.

### `src/domains`

This folder contains the real feature architecture.

Each domain should own its own:

- components
- hooks
- screen implementations
- server-state hooks
- feature types

Examples of domains:

- `authentication`
- `league`
- `match`
- `tournament`
- `member`
- `dashboard`

If the web app already has a domain, that is a strong signal we should keep the same domain on mobile unless there is a good reason not to.

### `src/api`

This is for low-level API access and shared API clients.

Examples:

- configured HTTP client
- request helpers
- shared API adapters

This is not where feature-specific query hooks should live. Those should stay close to the relevant domain.

### `src/configuration`

This is for app configuration and environment-driven setup.

Examples:

- app config
- environment readers
- build-time flags
- feature flags

We prefer `configuration` over `config` to stay closer to the web app naming.

### `src/constants`

This folder is for truly shared constants.

Examples:

- route-independent labels
- shared limits
- app-wide keys

If a constant belongs only to one domain, it should live inside that domain instead.

### `src/ui-system`

This is for shared design-system primitives and reusable UI building blocks.

Examples:

- Button
- TextField
- Card
- Badge
- spacing or typography primitives

If a component is reused across multiple domains, it likely belongs here. If it is specific to `league` or `match`, it should stay in that domain.

### `src/stores`

This folder is optional and should stay small.

Use it only for true client-side global state.

Examples:

- auth session snapshot
- local UI preferences
- temporary cross-screen state that is not server state

Do not put fetched server data here by default. Server data belongs in domain-level server-state/query hooks.

### `src/types`

This is for truly shared types only.

If a type belongs to one domain, keep it inside that domain first. Promote it to `src/types` only if it becomes shared across multiple domains.

### `src/utils`

This folder is for shared helpers that are not domain-specific.

If a helper only makes sense for one domain, keep it inside that domain.

## What We Are Explicitly Not Doing

We are **not** creating a top-level `src/navigation` folder as a primary pattern.

Why:

- Expo Router already is the navigation system
- `_layout.tsx` files handle route composition
- route groups handle the structural grouping we need

We are also **not** creating a top-level `src/screens` folder as the main home for screens.

Why:

- route entry files belong in `src/app`
- screen implementations should live inside domains

So instead of this:

```text
src/
  navigation/
  screens/
```

we prefer this:

```text
src/
  app/
  domains/
```

## How Route Files Should Work

Route files should be thin.

A good route file usually does one of these:

- render a screen component from a domain
- connect route params to a domain screen
- define a layout wrapper

Example:

```tsx
export { LeagueListScreen as default } from '@/domains/league/screens/LeagueListScreen';
```

The `@/` import style in these examples assumes we later configure a `src` path alias. Until then, regular relative imports are fine.

Or:

```tsx
import { useLocalSearchParams } from 'expo-router';
import { MatchDetailScreen } from '@/domains/match/screens/MatchDetailScreen';

export default function MatchRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <MatchDetailScreen matchId={id} />;
}
```

This keeps navigation concerns in the route file and business concerns in the domain.

## Mapping From TanStack Router To Expo Router

The ideas are similar, but the file names are different.

Examples:

- TanStack `routes/__root.tsx` -> Expo `src/app/_layout.tsx`
- TanStack `_auth.tsx` -> Expo `src/app/(auth)/_layout.tsx`
- TanStack `_auth.leagues.tsx` -> Expo `src/app/(tabs)/league/index.tsx`
- TanStack `$id` -> Expo `[id]`

So yes, the mental model is close, but Expo does **not** use arbitrary underscore route files like `_auth.tsx` as pathless routes. In Expo, pathless grouping is done with `(group-name)` plus `_layout.tsx`.

## How To Create New Features

When adding a new feature, follow this order:

1. Decide whether it is a new route, a new domain concern, or both.
2. If it is navigable, add a route entry file in `src/app`.
3. Put the real UI and behavior in the relevant `src/domains/<feature>` folder.
4. Keep API/query logic close to the feature in `server-state`.
5. Move code to shared folders only when it is truly shared.

## How To Decide Between Domain And Shared

A simple rule:

- if only one feature needs it, keep it in the domain
- if multiple features need it, consider promoting it to shared code

This helps avoid premature abstractions.

## Notes On Server State

If we later add TanStack Query on mobile, the most natural place for feature queries is inside each domain's `server-state` folder.

That keeps fetched data logic close to the feature that owns it.

Examples:

- `src/domains/league/server-state/useLeagues.ts`
- `src/domains/match/server-state/useMatch.ts`

This is closer to how the web app already thinks, and it scales better than one giant global queries folder.

## Naming Conventions

- use `src/app` for routes
- use `domains/*` for feature ownership
- use `configuration` instead of `config`
- use `stores` instead of `store`
- use singular or plural domain names based on the clearest business meaning
- keep filenames explicit and descriptive

For Expo Router specifically:

- `_layout.tsx` defines layouts
- `(group)` defines pathless route groups
- `[id].tsx` defines dynamic params
- `index.tsx` defines the default route for a folder

## References

These references support the decisions above and are grouped here so they are easy to revisit later.

### Expo

- [Top-level `src` directory](https://docs.expo.dev/router/reference/src-directory/)
- [Expo Router core concepts](https://docs.expo.dev/router/basics/core-concepts/)
- [Expo Router notation](https://docs.expo.dev/router/basics/notation/)
- [Create your first app](https://docs.expo.dev/tutorial/create-your-first-app/)

### TanStack Router

- [TanStack Router file-based routing](https://tanstack.com/router/v1/docs/framework/react/routing/file-based-routing)

### React Native / Meta

- [React Native Architecture Overview](https://reactnative.dev/architecture/overview)

### Google / Android

- [Guide to app architecture](https://developer.android.com/topic/architecture)

### Apple

- [Managing user interface state](https://developer.apple.com/documentation/swiftui/managing-user-interface-state/)
- [Model data](https://developer.apple.com/documentation/swiftui/model-data)
- [Model-View-Controller (archived)](https://developer.apple.com/library/archive/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html)


