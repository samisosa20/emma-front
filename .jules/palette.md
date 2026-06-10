## 2025-05-14 - Icon Accessibility Pattern
**Learning:** Material icons used alongside text labels (e.g., in Navbar, BottomBar) or inside interactive elements without descriptive text were frequently lacking `aria-hidden="true"` and `aria-label` respectively. This causes screen readers to announce the icon's ligature text (e.g., "account_circle", "add"), which is confusing for users.
**Action:** Always apply `aria-hidden="true"` to decorative icons that have adjacent text, and ensure parent interactive elements have descriptive `aria-label` if the icon is the only content.

## 2025-05-15 - Semantic Buttons for Interactions
**Learning:** Core interactions like "Load more" should be implemented with semantic `Button` components rather than text elements with `onClick` handlers. This ensures keyboard accessibility (Tab focus and Enter/Space triggers) and provides better visual affordance of interactivity.
**Action:** Avoid using `Typography` or generic text elements for primary actions; use the shared `Button` component or semantic `<button>` elements.
