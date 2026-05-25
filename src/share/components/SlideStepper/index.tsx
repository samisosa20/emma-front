import React, { memo } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Typography from "../Typography";

type SlideStepperProps = {
  value: number;
  onChange: (newValue: number, type: any) => void;
  type?: any;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (val: number) => string;
  decreaseAriaLabel?: string;
  increaseAriaLabel?: string;
};

/**
 * ⚡ Bolt Optimization: Memoization of SlideStepper
 * 🎯 Problem: Used in Dashboard and other views for year/month/week selection.
 * 📊 Impact: Prevents re-renders of the stepper controls when unrelated parent state
 *    (like chart data or filters) changes.
 */
const SlideStepper = memo(({
  value,
  onChange,
  type,
  min = -Infinity,
  max = Infinity,
  step = 1,
  formatValue,
  decreaseAriaLabel = "Disminuir",
  increaseAriaLabel = "Aumentar",
}: SlideStepperProps) => {
  const handleDecrease = () => {
    const newValue = value - step;
    if (newValue >= min) onChange(newValue, type);
  };

  const handleIncrease = () => {
    const newValue = value + step;
    if (newValue <= max) onChange(newValue, type);
  };

  return (
    <div className="flex items-center gap-4 w-fit">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={value <= min}
        aria-label={decreaseAriaLabel}
        className="text-wf-outline hover:text-wf-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-wf-primary outline-none rounded-full p-0.5"
      >
        <MdChevronLeft className="w-6 h-6" />
      </button>

      <div aria-live="polite">
        <Typography className="font-medium text-sm min-w-[60px] text-center text-wf-on-surface">
          {formatValue ? formatValue(value) : value}
        </Typography>
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={value >= max}
        aria-label={increaseAriaLabel}
        className="text-wf-outline hover:text-wf-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-wf-primary outline-none rounded-full p-0.5"
      >
        <MdChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
});

export default SlideStepper;
