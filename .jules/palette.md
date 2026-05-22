## 2025-05-15 - [TitleHelp Component Accessibility]
**Learning:** Generic icon click handlers on non-interactive elements (like `span`) are inaccessible to keyboard and screen reader users. Using a semantic `<button>` with a descriptive `aria-label` and visible focus states (`focus-visible`) is essential for interactive help elements.
**Action:** Always wrap interactive icons in `<button type="button">` and provide `aria-label`. Use `twMerge` in shared components to allow layout flexibility via `className`.

## 2026-05-21 - [Search Input and Interactive Heading Accessibility]
**Learning:** Standard search inputs and headings with click handlers are often missed by accessibility tools. Providing explicit `aria-label` for inputs and `role="button"` with keyboard listeners for interactive headings ensures a consistent experience for all users.
**Action:** Always provide `aria-label` to inputs that rely solely on placeholders. For interactive non-semantic elements, ensure `tabIndex`, `role`, and keyboard event listeners are present.
