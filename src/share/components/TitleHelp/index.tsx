import { memo } from "react";
import { MdHelp } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import Typography from "../Typography";

import { TitleProps } from "./TitleHelp.interface";

/**
 * ⚡ Bolt Optimization: TitleHelp component memoization and conditional merging.
 * 🎯 Problem: TitleHelp is used across many views and can trigger re-renders.
 *    twMerge is expensive to call on every render cycle.
 * 📊 Impact: Skips re-renders when props are stable and reduces CPU overhead
 *    by avoiding twMerge when no custom className is provided.
 */
const TitleHelp = memo((props: TitleProps) => {
  const { title, onClick, variant = "h1", className } = props;

  const finalClassName = className
    ? twMerge("flex items-center gap-x-2", className)
    : "flex items-center gap-x-2";

  return (
    <div id={`fiona-title_${title.replace(/ /g, "_")}`} className="w-max">
      <Typography variant={variant} className={finalClassName}>
        {title}
        {onClick && (
          <button
            type="button"
            id="fiona-btn_help"
            onClick={onClick}
            aria-label={`Ayuda sobre ${title}`}
            className="p-1 hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-colors rounded-full flex items-center justify-center cursor-pointer border-none bg-transparent"
          >
            <MdHelp className="w-4 h-4" />
          </button>
        )}
      </Typography>
    </div>
  );
});

export default TitleHelp;
