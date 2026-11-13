import { memo } from "react";

//components
import useComponents from "@/share/components";

// Interface
import { CardsProps } from "./Cards.interface";
import { getCurrencyFormatter, getRateColor } from "@/share/helpers";
import CurrencyBadgeFlag from "../CurrencyBadgeFlag";

/**
 * ⚡ Bolt Optimization: Memoization of Cards
 * 🎯 Problem: Used extensively in dashboards to show financial summaries.
 * 📊 Impact: Skips re-rendering when parent state changes but the card data
 *    is unchanged.
 */
const Cards = memo((props: CardsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();

  return (
    <div id={`fiona-card_${title}`} key={title} className="w-full min-w-0">
      <div className="bg-slate-900/60 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-2xl p-4 sm:p-5 border border-slate-800/80 hover:border-slate-700/80 transition-all w-full min-w-0">
        <Typography className="mb-3 font-bold text-emerald-400 uppercase tracking-widest text-[11px] font-mono">
          {title}
        </Typography>
        <div className="space-y-1">
          {data.map((value, i) => (
            <div
              className={`flex items-center py-2 border-b border-slate-800/60 last:border-0 ${
                value.variation || value.code || value.title
                  ? "justify-between"
                  : "justify-end"
              }`}
              key={value.code + "-" + i}
            >
              {value.variation !== null && value.variation !== undefined && (
                <div
                  className={`flex items-center gap-1 ${value.variation < 0 ? "text-rose-400" : "text-emerald-400"}`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {value.variation < 0 ? "trending_down" : "trending_up"}
                  </span>
                  <Typography className="font-wf-body-regular text-[11px] font-bold font-mono">
                    {value.variation}%
                  </Typography>
                </div>
              )}

              <div className="flex items-center gap-2">
                {!value.title &&
                  value.flag !== null &&
                  value.flag !== undefined && (
                    <CurrencyBadgeFlag badge={value} />
                  )}

                {value.title !== null && value.title !== undefined && (
                  <Typography className="font-wf-body-regular text-sm text-slate-200">
                    {value.title}
                  </Typography>
                )}
              </div>

              {value.amount !== null && value.amount !== undefined && (
                <Typography
                  className={`font-wf-body-regular font-bold text-sm font-mono ${
                    value.amount < 0 ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  <span className="opacity-70 text-[10px] mr-1">
                    {value.symbol}
                  </span>
                  {getCurrencyFormatter(value.code, value.amount)}
                </Typography>
              )}
              {value.text && (
                <Typography
                  className={`font-wf-body-regular font-bold text-sm font-mono ${
                    value.className ?? getRateColor(value.text, "text-slate-400")
                  }`}
                >
                  {value.text}
                </Typography>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Cards;
