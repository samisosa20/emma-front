import { memo, useId } from "react";
import { twMerge } from "tailwind-merge";
import { InputProps } from "./Input.interface";

const Input = memo((props: InputProps) => {
  const { iserror, value, label, id, required, className, ...res } = props;
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-300 font-wf-body-regular"
        >
          {label}
          {required && (
            <span className="text-rose-400 ml-1" aria-hidden="true">
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
          "border rounded-xl w-full h-11 px-3.5 border-slate-800 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 transition-all outline-none text-sm",
          "focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500",
          iserror ? "border-rose-500 focus-visible:ring-rose-500/30 focus-visible:border-rose-500" : "",
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
