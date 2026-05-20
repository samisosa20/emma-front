import { MdHelp } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import Typography from "../Typography";

import { TitleProps } from "./TitleHelp.interface";

export default function TitleHelp(props: TitleProps) {
  const { title, onClick, variant = "h1", className } = props;
  return (
    <div id={`fiona-title_${title.replace(/ /g, "_")}`} className="w-max">
      <Typography
        variant={variant}
        className={twMerge("flex items-center gap-x-2", className)}
      >
        {title}
        {onClick && (
          <button
            type="button"
            id="fiona-btn_help"
            onClick={onClick}
            aria-label={`Ayuda sobre ${title}`}
            className="p-1 hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-500 outline-none transition-colors rounded-full flex items-center justify-center cursor-pointer border-none bg-transparent"
          >
            <MdHelp className="w-4 h-4 text-sky-500" />
          </button>
        )}
      </Typography>
    </div>
  );
}
