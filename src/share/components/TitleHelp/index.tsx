import { MdHelp } from "react-icons/md";

import Typography from "../Typography";

import { TitleProps } from "./TitleHelp.interface";

export default function TitleHelp(props: TitleProps) {
  const { title, onClick } = props;
  return (
    <div id={`fiona-title_${title}`} className="w-max">
    <Typography variant="h1" className="flex items-center gap-x-2">
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
