import Image from "next/image";

//components
import useComponents from "@/share/components";

// Interface
import { CardsProps } from "./Cards.interface";
import { getCurrencyFormatter } from "@/share/helpers";
import CurrencyBadgeFlag from "../CurrencyBadgeFlag";

const Cards = (props: CardsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();

  return (
    <div id={`fiona-card_${title}`} className={`grid grid-cols-1 gap-4`}>
      <div
        className="bg-white shadow-sm rounded py-4 px-3 mx-auto w-[250px]"
        key={title}
      >
        <Typography variant="h5">{title}</Typography>
        {data.map((value, i) => (
          <div
            className={`flex items-center py-2 border-b border-gray-200 ${
              value.variation || value.code || value.title
                ? "justify-between"
                : "justify-end"
            }`}
            key={value.code + "-" + i}
          >
            {value.variation !== null && value.variation !== undefined && (
              <Typography
                variant="h6"
                className={`${
                  value.variation < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {value.variation}%
              </Typography>
            )}
            {!value.title &&
              value.flag !== null &&
              value.flag !== undefined && <CurrencyBadgeFlag badge={value} />}
            {value.title !== null && value.title !== undefined && (
              <Typography variant="h6" className={``}>
                {value.title}
              </Typography>
            )}

            {value.amount !== null && value.amount !== undefined && (
              <Typography
                variant="h6"
                className={`font-medium ${
                  value.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                <span>{value.symbol}</span>
                {getCurrencyFormatter(value.code, value.amount)}
              </Typography>
            )}
            {value.text && (
              <Typography variant="h6" className={`font-medium`}>
                {value.text}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
