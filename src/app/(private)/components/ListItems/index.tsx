"use client";
import { memo } from "react";

//components
import useComponents from "@/share/components";

// Interface
import { ListItems as ListItemsProps } from "./ListItems.interface";
import {
  driverListGroupExpensive,
  getCurrencyFormatter,
} from "@/share/helpers";

/**
 * ⚡ Bolt Optimization: Memoization of ListDefault
 * 🎯 Problem: Part of the ListItems suite used in dashboards.
 * 📊 Impact: Prevents re-renders of simple category lists during parent updates.
 */
const ListDefault = memo((props: ListItemsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all w-full min-w-0">
      <Typography className="mb-3 font-bold text-emerald-400 uppercase tracking-widest text-xs font-mono">
        {title}
      </Typography>
      <div className="h-[243px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          <div
            className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/60 flex justify-between items-center transition-all hover:bg-slate-800/60 hover:border-slate-700"
            key={"ListDefault" + index}
          >
            <Typography className="font-wf-body-regular text-sm text-slate-200">
              {card.category}
            </Typography>
            <Typography
              className={`font-wf-body-regular font-bold font-mono text-sm ${
                card.amount >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {getCurrencyFormatter("USD", card.amount)}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * ⚡ Bolt Optimization: Memoization of ListUtil
 * 🎯 Problem: Displays utilization bars which can be expensive to recalculate/render.
 * 📊 Impact: Skips re-rendering when metrics are unchanged.
 */
const ListUtil = memo((props: ListItemsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all w-full min-w-0">
      <Typography className="mb-3 font-bold text-emerald-400 uppercase tracking-widest text-xs font-mono">
        {title}
      </Typography>
      <div className="h-[243px] overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          <div className="space-y-1.5" key={"ListUtil" + index}>
            <div className="flex justify-between items-center">
              <Typography className="font-wf-body-regular text-sm font-semibold text-slate-200">
                {card.title} {card.father ? ` (${card.father})` : ""}
              </Typography>
              <Typography className="font-wf-body-regular text-[11px] text-slate-400 font-mono">
                Límite: {getCurrencyFormatter("USD", card.limit ?? 0)}
              </Typography>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <Typography className="font-wf-body-regular text-slate-400 font-mono">
                {getCurrencyFormatter("USD", card.value)}
              </Typography>
              <Typography
                className={`font-bold font-mono ${Math.abs(card.percentage ?? 0) > 90 ? "text-rose-400" : "text-emerald-400"}`}
              >
                {Math.abs(card.percentage ?? 0)}%
              </Typography>
            </div>
            <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,0,0,0.2)] ${
                  Math.abs(card.percentage ?? 0) > 100
                    ? "bg-rose-500"
                    : Math.abs(card.percentage ?? 0) > 80
                      ? "bg-amber-400"
                      : "bg-gradient-to-r from-emerald-500 to-teal-400"
                }`}
                style={{
                  width: `${
                    Math.abs(card.percentage ?? 0) > 100
                      ? 100
                      : Math.abs(card.percentage ?? 0)
                  }%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * ⚡ Bolt Optimization: Memoization of ListModal
 * 🎯 Problem: Contains complex interaction logic and modals.
 * 📊 Impact: Prevents re-renders of the interactive list items when parent state changes.
 */
const ListModal = memo((props: ListItemsProps) => {
  const {
    data,
    title,
    onClickModal,
    tooltip,
    tooltipVariant,
  } = props;
  const { Typography, TitleHelp, CategoryIcon } = useComponents();

  const handleSelectItem = async (id: string) => {
    onClickModal && (await onClickModal(id));
  };

  const handleOnDrive = (type?: string) => {
    if (type === "group") {
      driverListGroupExpensive();
    }
  };

  return (
    <div className="bg-slate-900/60 backdrop-blur-xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-all w-full min-w-0">
      <TitleHelp
        title={title}
        variant="p"
        className="mb-3 font-bold text-emerald-400 uppercase tracking-widest text-xs font-mono"
        onClick={tooltip ? () => handleOnDrive(tooltipVariant) : undefined}
      />
      <div className="max-h-[500px] overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          <div
            className="group p-2.5 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer border border-transparent hover:border-slate-700/80"
            key={"ListModal" + index}
            onClick={() => handleSelectItem(card.categoryId)} // TODO: check if this is the correct ID
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3 w-1/2">
                <CategoryIcon icon={card.icon} color={card.color} size="sm" />
                <Typography className="font-wf-body-regular text-sm text-slate-200 truncate">
                  {card.category}
                </Typography>
              </div>
              <div className="flex items-center gap-x-4">
                <Typography className="font-wf-body-regular text-xs text-slate-400 font-mono">
                  {card.participation}%
                </Typography>
                <Typography
                  className={`font-wf-body-regular font-bold font-mono text-sm text-right min-w-[80px] ${
                    card.amount >= 0 ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {card.symbol}
                  {getCurrencyFormatter("USD", card.amount)}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

/**
 * ⚡ Bolt Optimization: Memoization of ListItems
 * 🎯 Problem: Main entry point for various list displays in dashboards.
 * 📊 Impact: Ensures stable rendering across different list variants.
 */
const ListItems = memo((props: ListItemsProps) => {
  const {
    data,
    title,
    variant = "default",
    onClickModal,
    dataModal = [],
    showHistory = false,
    currency,
    tooltip = false,
    tooltipVariant,
  } = props;

  if (variant === "default") {
    return <ListDefault data={data} title={title} />;
  } else if (variant === "utilization") {
    return <ListUtil data={data} title={title} />;
  } else if (variant === "modal") {
    return (
      <ListModal
        data={data}
        title={title}
        onClickModal={onClickModal}
        dataModal={dataModal}
        showHistory={showHistory}
        currency={currency}
        tooltip={tooltip}
        tooltipVariant={tooltipVariant}
      />
    );
  }
});

export default ListItems;
