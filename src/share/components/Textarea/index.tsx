import { memo, useId } from "react";
import { twMerge } from "tailwind-merge";
import { TextareaProps } from "./Textarea.interface";

const Textarea = memo((props: TextareaProps) => {
  const { iserror, value, label, id, required, className, ...res } = props;
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={textareaId}
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
      <textarea
        id={textareaId}
        required={required}
        aria-invalid={!!iserror}
        className={twMerge(
          "border rounded-lg w-full min-h-[48px] p-4 border-wf-outline-variant bg-wf-surface-container-lowest transition-all outline-none",
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

Textarea.displayName = "Textarea";

export default Textarea;
