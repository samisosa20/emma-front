"use client";
import { memo } from "react";

interface SegmentedControlProps {
  isChecked: boolean;
  handleToggle: () => void;
  activeLabel?: string;
  inactiveLabel?: string;
  ariaLabel?: string;
}

/**
 * ⚡ Bolt Optimization: Memoize SegmentedControl.
 * 🎯 Problem: Re-renders on every parent state change even if its own props are stable.
 * 📊 Impact: Prevents unnecessary DOM reconciliation.
 */
const SegmentedControl = memo(({
  isChecked,
  handleToggle,
  activeLabel = "Activos",
  inactiveLabel = "Inactivos",
  ariaLabel,
}: SegmentedControlProps) => {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex items-center gap-2 bg-wf-surface-container-high p-1 rounded-full"
    >
      <button
        type="button"
        aria-pressed={isChecked}
        onClick={() => !isChecked && handleToggle()}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          isChecked
            ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface"
            : "text-wf-on-surface-variant hover:text-wf-on-surface"
        }`}
      >
        {activeLabel}
      </button>
      <button
        type="button"
        aria-pressed={!isChecked}
        onClick={() => isChecked && handleToggle()}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
          !isChecked
            ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface"
            : "text-wf-on-surface-variant hover:text-wf-on-surface"
        }`}
      >
        {inactiveLabel}
      </button>
    </div>
  );
});

export default SegmentedControl;
