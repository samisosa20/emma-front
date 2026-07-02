import { memo, useId } from "react";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./Input.interface";

const Input = memo((props: InputProps) => {
  const { iserror, value, label, id, required, className, ...res } = props;
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-wf-on-surface-variant"
        >
          {label}
          {required && (
            <span className="text-wf-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId}
        required={required}
        aria-invalid={!!iserror}
        className={twMerge(
          "border rounded-lg w-full h-12 px-4 border-wf-outline-variant bg-wf-surface-container-lowest transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-wf-primary/50 focus-visible:border-wf-primary",
          iserror ? "border-wf-error" : "text-wf-on-surface",
          className
        )}
        value={value ?? ""}
        {...res}
      />
    </div>
  );
});

Input.displayName = "Input";

export default Input;
