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
    className: `border rounded-xl w-full h-11 px-3.5 bg-slate-900/70 text-slate-100 border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 outline-none transition-all text-sm ${
      iserror ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/30" : ""
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
        <label htmlFor={id} className="block text-xs font-semibold text-slate-300 font-wf-body-regular mb-1.5">
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
