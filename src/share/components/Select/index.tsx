import { memo } from "react";
import { InputProps } from "./Select.interface";

const Select: React.FC<InputProps> = memo((props) => {
  const {
    iserror,
    label,
    id,
    placeholder,
    options = [],
    value,
    defaultValue,
    className = "",
    ...res
  } = props;

  const selectProps: any = {
    id,
    className: `border rounded-lg w-full h-12 px-4 bg-wf-surface-container-lowest text-wf-on-surface border-wf-outline-variant focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all ${
      iserror ? "border-wf-error" : ""
    } ${className}`,
    ...res,
  };

  if (value !== undefined) {
    selectProps.value = value ?? "";
  } else {
    selectProps.defaultValue = defaultValue ?? "";
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider mb-1">
          {label}
        </label>
      )}
      <select {...selectProps}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
