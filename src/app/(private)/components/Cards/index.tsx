//components
import useComponents from "@/share/components";

// Interface
import { CardsProps } from "./Cards.interface";
import { getCurrencyFormatter } from "@/share/helpers";
import Image from "next/image";

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
              value.variation || value.code ? "justify-between" : "justify-end"
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
            {value.flag !== null && value.flag !== undefined && (
              <div className="flex items-center gap-2">
                <Image
                  src={value.flag}
                  width={20}
                  height={20}
                  className="rounded-full w-5 h-5 object-cover"
                  alt={value.code}
                />
                <Typography variant="h6" className={`text-[10px]`}>
                  {value.code}
                </Typography>
              </div>
            )}

            <Typography
              variant="h6"
              className={`font-medium ${
                value.amount < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              <span>{value.symbol}</span>
              {getCurrencyFormatter(value.code, value.amount)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
