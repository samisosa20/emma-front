## 2025-05-15 - [TitleHelp Component Accessibility]
**Learning:** Generic icon click handlers on non-interactive elements (like `span`) are inaccessible to keyboard and screen reader users. Using a semantic `<button>` with a descriptive `aria-label` and visible focus states (`focus-visible`) is essential for interactive help elements.
**Action:** Always wrap interactive icons in `<button type="button">` and provide `aria-label`. Use `twMerge` in shared components to allow layout flexibility via `className`.
