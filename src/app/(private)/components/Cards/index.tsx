//components
import useComponents from "@/share/components";

// Interface
import { CardsProps } from "./Cards.interface";

const Cards = (props: CardsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();

  return (
    <div
      id={`emma-card_${title}`}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
        data?.length ?? 0
      } gap-4`}
    >
      {data?.map((card) => (
        <div className="bg-white shadow-sm rounded py-4 px-3" key={card.title}>
          <Typography variant="h5">{card.title}</Typography>
          {card.values.map((value, i) => (
            <div className={`flex items-center ${card.variations ? "justify-between" : "justify-end"}`} key={value}>
              {card.variations && (
                <Typography variant="h6" className={`${card.variations[i] < 0  ? "text-red-500" : "text-green-500"}`}>
                  {card.variations[i]}%
                </Typography>
              )}
              <Typography variant="h2">
                {value}
              </Typography>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Cards;
