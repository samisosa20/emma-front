import { memo, useId } from "react";
import { twMerge } from "tailwind-merge";
import { TextareaProps } from "./Textarea.interface";

const Textarea = memo((props: TextareaProps) => {
  const { iserror, value, label, id, required, className, ...res } = props;
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={textareaId}
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
      <textarea
        id={textareaId}
        required={required}
        aria-invalid={!!iserror}
        className={twMerge(
          "border rounded-xl w-full min-h-[56px] p-3.5 border-slate-800 bg-slate-900/70 text-slate-100 placeholder:text-slate-500 transition-all outline-none text-sm",
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

Textarea.displayName = "Textarea";

export default Textarea;
