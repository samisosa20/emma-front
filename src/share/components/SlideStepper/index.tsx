import React from "react";
import Typography from "../Typography";

type SlideStepperProps = {
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  formatValue?: (val: number) => string;
};

const SlideStepper: React.FC<SlideStepperProps> = ({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  formatValue,
}) => {
  const handleDecrease = () => {
    const newValue = value - step;
    if (newValue >= min) onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = value + step;
    if (newValue <= max) onChange(newValue);
  };

  return (
    <div className="flex items-center gap-4 w-fit">
      <button
        onClick={handleDecrease}
        disabled={value <= min}
        className="text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed text-lg"
      >
        ◀
      </button>

      <Typography className="font-medium text-sm min-w-[60px] text-center">
        {formatValue ? formatValue(value) : value}
      </Typography>

      <button
        onClick={handleIncrease}
        disabled={value >= max}
        className="text-gray-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed text-lg"
      >
        ▶
      </button>
    </div>
  );
};

export default SlideStepper;
