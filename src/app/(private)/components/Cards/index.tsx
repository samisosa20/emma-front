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
    <div id={`fiona-card_${title}`} key={title}>
      <div className="bg-wf-on-primary backdrop-blur-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] rounded-xl p-wf-lg border border-white/50 w-full">
        <Typography className="mb-wf-md font-semibold text-wf-primary uppercase tracking-wider text-[11px]">
          {title}
        </Typography>
        <div className="space-y-wf-xs">
          {data.map((value, i) => (
            <div
              className={`flex items-center py-wf-sm border-b border-wf-surface-variant/30 last:border-0 ${
                value.variation || value.code || value.title
                  ? "justify-between"
                  : "justify-end"
              }`}
              key={value.code + "-" + i}
            >
              {value.variation !== null && value.variation !== undefined && (
                <div
                  className={`flex items-center gap-1 ${value.variation < 0 ? "text-wf-error" : "text-wf-secondary"}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {value.variation < 0 ? "trending_down" : "trending_up"}
                  </span>
                  <Typography className="font-wf-body-regular text-[11px] font-bold">
                    {value.variation}%
                  </Typography>
                </div>
              )}

              <div className="flex items-center gap-wf-xs">
                {!value.title &&
                  value.flag !== null &&
                  value.flag !== undefined && (
                    <CurrencyBadgeFlag badge={value} />
                  )}

                {value.title !== null && value.title !== undefined && (
                  <Typography className="font-wf-body-regular text-sm text-wf-on-surface">
                    {value.title}
                  </Typography>
                )}
              </div>

              {value.amount !== null && value.amount !== undefined && (
                <Typography
                  className={`font-wf-body-regular font-bold text-sm ${
                    value.amount < 0 ? "text-wf-error" : "text-wf-secondary"
                  }`}
                >
                  <span className="opacity-70 text-[10px] mr-1">
                    {value.symbol}
                  </span>
                  {getCurrencyFormatter(value.code, value.amount)}
                </Typography>
              )}
              {value.text && (
                <Typography className="font-wf-body-regular text-sm text-wf-on-surface-variant">
                  {value.text}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
