import { memo, useId } from "react";
import { CheckboxProps } from "./Checkbox.interface";

const Checkbox = memo((props: CheckboxProps) => {
  const { handleCheckboxChange, isChecked, label, id } = props;
  const generatedId = useId();
  const finalId = id || generatedId;

  return (
    <label htmlFor={finalId} className="fiona-container-checkbox">
      {label}
      <input
        id={finalId}
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="peer"
      />
      <span className="checkmark peer-focus-visible:ring-2 peer-focus-visible:ring-wf-primary/50 ring-offset-2"></span>
    </label>
  );
});

export default Checkbox;
