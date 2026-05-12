## 2025-05-14 - [Intl.NumberFormat Caching and Component Memoization]
**Learning:** Instantiating `Intl.NumberFormat` inside frequently called functions (like those used in list or chart rendering) causes significant performance overhead due to repeated object creation and locale processing. Caching the formatter instance outside the function can lead to orders of magnitude improvement (verified ~60x faster in a tight loop of 100k iterations). Additionally, memoizing core UI components (Button, Input, Typography, FormControl) reduces re-render overhead in complex views like dashboards and forms.
**Action:** Always cache `Intl` formatter instances at the module level when they use static options. Use `React.memo` for atom-level UI components that are used extensively across the application.

## 2025-05-15 - [Build Artifact Awareness: public/sw.js]
**Learning:** In projects using `next-pwa` or similar Service Worker generators, `public/sw.js` and `public/workbox-*.js` files are often automatically updated during the build process with environment-specific asset hashes. Committing these manual changes leads to broken caching in other environments and pollutes PRs.
**Action:** Never commit changes to `public/sw.js` or related Workbox artifacts. Always check `git status` after a build and restore these files before committing.
