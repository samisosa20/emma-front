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

import useComponentsLayout from "@/app/(private)/components";

/**
 * ⚡ Bolt Optimization: Memoization of ListDefault
 * 🎯 Problem: Part of the ListItems suite used in dashboards.
 * 📊 Impact: Prevents re-renders of simple category lists during parent updates.
 */
const ListDefault = memo((props: ListItemsProps) => {
  const { data, title } = props;
  const { Typography } = useComponents();
  return (
    <div className="bg-wf-on-primary backdrop-blur-md p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] rounded-xl border border-white/50">
      <Typography className="mb-wf-md font-semibold text-wf-primary uppercase tracking-wider text-xs">
        {title}
      </Typography>
      <div className="h-[243px] overflow-y-auto space-y-wf-sm pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          <div
            className="p-wf-sm rounded-lg bg-white/20 border border-white/30 flex justify-between items-center transition-all hover:bg-white/40"
            key={"ListDefault" + index}
          >
            <Typography className="font-wf-body-regular text-sm text-wf-on-surface">
              {card.category}
            </Typography>
            <Typography
              className={`font-wf-body-regular font-bold text-sm ${
                card.amount >= 0 ? "text-wf-secondary" : "text-wf-error"
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
    <div className="bg-wf-on-primary backdrop-blur-md p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] rounded-xl border border-white/50">
      <Typography className="mb-wf-md font-semibold text-wf-primary uppercase tracking-wider text-xs">
        {title}
      </Typography>
      <div className="h-[243px] overflow-y-auto space-y-wf-md pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          <div className="space-y-wf-xs" key={"ListUtil" + index}>
            <div className="flex justify-between items-center">
              <Typography className="font-wf-body-regular text-sm font-semibold text-wf-on-surface">
                {card.title} {card.father ? ` (${card.father})` : ""}
              </Typography>
              <Typography className="font-wf-body-regular text-[11px] text-wf-surface-tint">
                Límite: {getCurrencyFormatter("USD", card.limit ?? 0)}
              </Typography>
            </div>
            <div className="flex justify-between items-center text-[12px]">
              <Typography className="font-wf-body-regular text-wf-on-surface-variant">
                {getCurrencyFormatter("USD", card.value)}
              </Typography>
              <Typography
                className={`font-bold ${Math.abs(card.percentage ?? 0) > 90 ? "text-wf-error" : "text-wf-secondary"}`}
              >
                {Math.abs(card.percentage ?? 0)}%
              </Typography>
            </div>
            <div className="w-full bg-wf-surface-container-high rounded-full h-2 overflow-hidden border border-white/20 shadow-inner">
              <div
                className={`h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(0,0,0,0.1)] ${
                  Math.abs(card.percentage ?? 0) > 100
                    ? "bg-wf-error"
                    : Math.abs(card.percentage ?? 0) > 80
                      ? "bg-wf-warning"
                      : "bg-wf-secondary"
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
    <div className="bg-wf-on-primary backdrop-blur-md p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] rounded-xl border border-white/50">
      <TitleHelp
        title={title}
        variant="p"
        className="mb-wf-md font-semibold text-wf-primary uppercase tracking-wider text-xs"
        onClick={tooltip ? () => handleOnDrive(tooltipVariant) : undefined}
      />
      <div className="max-h-[500px] overflow-y-auto space-y-wf-xs pr-1 custom-scrollbar">
        {data?.map((card, index) => (
          /**
           * ⚡ Bolt Optimization: Dead code removal in render loop.
           * 🎯 Problem: getIconComponent was called on every iteration but the Icon was unused.
           * 📊 Impact: Saves O(1) lookup and variable allocation for every list item.
           */
          <div
            className="group p-wf-sm rounded-lg hover:bg-white/40 transition-all cursor-pointer border border-transparent hover:border-white/50"
            key={"ListModal" + index}
            onClick={() => handleSelectItem(card.categoryId)} // TODO: check if this is the correct ID
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-3 w-1/2">
                <CategoryIcon icon={card.icon} color={card.color} size="sm" />
                <Typography className="font-wf-body-regular text-sm text-wf-on-surface truncate">
                  {card.category}
                </Typography>
              </div>
              <div className="flex items-center gap-x-4">
                <Typography className="font-wf-body-regular text-xs text-wf-surface-tint">
                  {card.participation}%
                </Typography>
                <Typography
                  className={`font-wf-body-regular font-bold text-sm text-right min-w-[80px] ${
                    card.amount >= 0 ? "text-wf-secondary" : "text-wf-error"
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
