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
