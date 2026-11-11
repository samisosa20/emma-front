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
const SegmentedControl = memo(
  ({
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
        className="flex items-center gap-1 bg-slate-950/80 border border-slate-800 p-1 rounded-full shadow-inner"
      >
        <button
          type="button"
          aria-pressed={isChecked}
          onClick={() => !isChecked && handleToggle()}
          className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wide transition-all ${
            isChecked
              ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {activeLabel}
        </button>
        <button
          type="button"
          aria-pressed={!isChecked}
          onClick={() => isChecked && handleToggle()}
          className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-semibold font-mono tracking-wide transition-all ${
            !isChecked
              ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {inactiveLabel}
        </button>
      </div>
    );
  },
);

export default SegmentedControl;
