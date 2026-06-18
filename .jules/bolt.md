## 2025-05-14 - [Intl.NumberFormat Caching and Component Memoization]
**Learning:** Instantiating `Intl.NumberFormat` inside frequently called functions (like those used in list or chart rendering) causes significant performance overhead due to repeated object creation and locale processing. Caching the formatter instance outside the function can lead to orders of magnitude improvement (verified ~60x faster in a tight loop of 100k iterations). Additionally, memoizing core UI components (Button, Input, Typography, FormControl) reduces re-render overhead in complex views like dashboards and forms.
**Action:** Always cache `Intl` formatter instances at the module level when they use static options. Use `React.memo` for atom-level UI components that are used extensively across the application.

## 2025-05-15 - [Build Artifact Awareness: public/sw.js]
**Learning:** In projects using `next-pwa` or similar Service Worker generators, `public/sw.js` and `public/workbox-*.js` files are often automatically updated during the build process with environment-specific asset hashes. Committing these manual changes leads to broken caching in other environments and pollutes PRs.
**Action:** Never commit changes to `public/sw.js` or related Workbox artifacts. Always check `git status` after a build and restore these files before committing.

## 2025-05-16 - [Component Memoization and Hook Stability]
**Learning:** Shared UI components like `SegmentedControl` can cause significant re-render cascades if they are not memoized, especially when used alongside high-frequency state updates like search inputs. Combining `React.memo` for the component with `useCallback` (using functional updates) and `useMemo` for derived data in the parent hook ensures optimal performance.
**Action:** Always memoize shared controls that are used in filtered list views. Use functional updates in `useCallback` to maintain stable function references with empty dependency arrays.

## 2025-05-17 - [Optimized Date Formatting and Icon Lookups]
**Learning:** `Intl.DateTimeFormat` with specific locales like `en-CA` (for `YYYY-MM-DD`) or `en-US` with options (for `MMM d, y`) is significantly faster than `date-fns` `format()` when cached. Additionally, a module-level cache for icon lookups in large libraries (like `react-icons/pi`) eliminates repeated property access overhead during high-frequency list rendering.
**Action:** Replace `date-fns` with cached `Intl` formatters in render loops. Use module-level caches for component references retrieved from large object maps.

## 2025-05-18 - [State Dependency Infinite Loops in useEffect]
**Learning:** Including a state variable in a `useEffect` dependency array while updating that same state variable within the effect (even when attempting to handle uniqueness via `Set`) causes an infinite loop because conversion methods like `Array.from()` or spreads create new object references every time. This triggers referential inequality on every render.
**Action:** Always use functional state updates (e.g., `setList(prev => ...)`) when updating state based on its previous value inside an effect, and remove the state variable itself from the dependency array to prevent infinite loops.

## 2025-05-19 - [Loop Optimization in Render Functions]
**Learning:** Calling lookup functions (like `getAccountType`) multiple times per iteration within a `map` loop in a React component's render body causes unnecessary computation. While often O(1), the overhead adds up in large lists and can trigger repeated object allocations if the lookup returns new objects.
**Action:** Always store the result of lookup functions in a local variable at the start of a loop iteration and reuse that variable for subsequent property accesses.

## 2025-05-20 - [Redundant Object Allocations in Render Loops]
**Learning:** Instantiating objects (like `new Date()`) multiple times within a `map` loop in a React component's render body causes unnecessary GC pressure and memory churn. Even if the allocations are fast, the cumulative overhead in long lists (like transaction histories) can lead to jank during scrolling or updates.
**Action:** Always extract object instantiations to a local variable at the beginning of a loop iteration if the result is used more than once.

## 2026-06-17 - [API Proxy Optimization with Module-Level Hoisting]
**Learning:** Static configurations (sensitive headers, body keys, CSP strings) in a high-traffic API proxy cause significant garbage collection pressure and CPU overhead when re-allocated or re-calculated on every request. Hoisting these to module-level constants and using `Set` for O(1) lookups reduces latency and memory churn. Refactoring recursion to use `for...in` instead of `Object.keys().forEach()` further minimizes temporary object allocations.
**Action:** Always hoist static configuration to the module level in global middleware or proxy handlers. Use `Set` for membership checks in hot paths.
