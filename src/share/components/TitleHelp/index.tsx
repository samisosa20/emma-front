import { MdHelp } from "react-icons/md";

import Typography from "../Typography";

import { TitleProps } from "./TitleHelp.interface";

export default function TitleHelp(props: TitleProps) {
  const { title, onClick, variant = "h1" } = props;
  return (
    <div id={`fiona-title_${title.replace(/ /g, "_")}`} className="w-max">
      <Typography variant={variant} className="flex items-center gap-x-2">
        {title}
        {onClick && (
          <span id="fiona-btn_help">
            <MdHelp
              className="w-4 h-4 text-sky-500 cursor-pointer"
              onClick={onClick}
            />
          </span>
        )}
      </Typography>
    </div>
  );
}
