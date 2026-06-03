## 2025-05-14 - Icon Accessibility Pattern
**Learning:** Material icons used alongside text labels (e.g., in Navbar, BottomBar) or inside interactive elements without descriptive text were frequently lacking `aria-hidden="true"` and `aria-label` respectively. This causes screen readers to announce the icon's ligature text (e.g., "account_circle", "add"), which is confusing for users.
**Action:** Always apply `aria-hidden="true"` to decorative icons that have adjacent text, and ensure parent interactive elements have descriptive `aria-label` if the icon is the only content.
