## 2025-05-15 - [TitleHelp Component Accessibility]
**Learning:** Generic icon click handlers on non-interactive elements (like `span`) are inaccessible to keyboard and screen reader users. Using a semantic `<button>` with a descriptive `aria-label` and visible focus states (`focus-visible`) is essential for interactive help elements.
**Action:** Always wrap interactive icons in `<button type="button">` and provide `aria-label`. Use `twMerge` in shared components to allow layout flexibility via `className`.

## 2026-05-21 - [Search Input and Interactive Heading Accessibility]
**Learning:** Standard search inputs and headings with click handlers are often missed by accessibility tools. Providing explicit `aria-label` for inputs and `role="button"` with keyboard listeners for interactive headings ensures a consistent experience for all users.
**Action:** Always provide `aria-label` to inputs that rely solely on placeholders. For interactive non-semantic elements, ensure `tabIndex`, `role`, and keyboard event listeners are present.

## 2025-05-22 - [Stateful Buttons and Accessible Steppers]
**Learning:** ASCII-based controls (like ◀, ▶) and toggle buttons without state indicators are inaccessible. Using proper icons, aria-pressed for selection state, and aria-live for dynamic value updates ensures a delightful and accessible UX.
**Action:** Replace text-based controls with semantic icons. Use aria-pressed for toggle/segmented buttons. Wrap dynamic values in aria-live regions.

## 2025-05-24 - [Sidebar Transitions and Semantic Buttons]
**Learning:** Using the `hidden` class (`display: none`) prevents CSS transitions from firing. To achieve smooth sidebar entries, use `opacity` and `translate` classes with `pointer-events-none` when closed. Additionally, wrapping raw icons in semantic `<button>` elements with `aria-label` is critical for both accessibility and consistent hover/focus styling.
**Action:** Replace `hidden` with opacity/transform transitions for UI panels. Always use `<button>` wrappers for interactive icons.

## 2026-05-27 - [Smooth Modal Transitions and Enhanced Accessibility]
**Learning:** Using the `hidden` class on modals prevents entry/exit transitions. Replacing it with `opacity-0 pointer-events-none` allows for delightful CSS transitions like scaling and fading. Additionally, adding `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` significantly improves the screen reader experience, while an overlay click-to-close handler fulfills a standard user expectation.
**Action:** Use opacity and pointer-events for toggling visibility of overlay-based components to enable transitions. Always implement standard ARIA modal patterns and outside-click-to-close.

## 2026-06-01 - [Transaction Form Accessibility and Semantics]
**Learning:** Custom toggle buttons and high-impact inputs (like transaction amounts) often lack the necessary ARIA attributes and semantic labels for a robust screen reader experience. Using `role="group"` for logical button sets and explicit `<label>` elements for inputs ensures clarity and focus control.
**Action:** Group related action toggles with `role="group"`. Use `aria-pressed` to communicate active selection state on buttons. Always link labels to inputs using `htmlFor` and `id` to provide a larger tap target and clear accessible names.
