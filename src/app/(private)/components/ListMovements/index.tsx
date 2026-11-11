import React, { memo } from "react";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import {
  dateFormatter,
  getCurrencyFormatter,
  ymdFormatter,
} from "@/share/helpers";
import {
  GetApiMovements200ContentItem,
  GetApiMovements200Meta,
} from "@@@/domain/models";

type listMovements = {
  listMovements: GetApiMovements200ContentItem[];
  meta?: GetApiMovements200Meta;
  setPage: any;
  keyTitle: "category" | "event" | "account" | "investment";
};

/**
 * ⚡ Bolt Optimization: Memoization of ListMovements
 * 🎯 Problem: Frequently used in multiple views to list transactions.
 * 📊 Impact: Prevents expensive re-renders of the entire list when
 *    unrelated parent state changes.
 */
const ListMovements = memo(({
  listMovements,
  meta,
  setPage,
  keyTitle,
}: listMovements) => {
  let previousDate: string | null = null;
  const { Typography, Button, CategoryIcon } = useComponents();
  return (
    <div className="mt-6 max-h-[65vh] overflow-y-auto">
      {listMovements?.map(
        (movement: GetApiMovements200ContentItem, index: number) => {
          /**
           * ⚡ Bolt Optimization: Reuse Date object and cached formatters.
           * 🎯 Problem: new Date() was called twice per iteration in the render loop.
           * 📊 Impact: Saves redundant allocations and CPU cycles during list rendering.
           */
          const purchaseDate = new Date(movement.datePurchase);
          const currentDate = ymdFormatter.format(purchaseDate);
          const isNewDay = currentDate !== previousDate;
          previousDate = currentDate;

          const humanDate = dateFormatter.format(purchaseDate);

          return (
            <React.Fragment key={`${movement.id}-${index}`}>
              {isNewDay && (
                <Typography
                  role="heading"
                  aria-level={3}
                  className="sticky top-0 bg-slate-950/90 backdrop-blur-md z-10 py-2 mb-2 px-3 font-semibold text-xs text-slate-400 uppercase tracking-widest font-mono border-b border-slate-800/80 rounded-xl"
                >
                  {humanDate}
                </Typography>
              )}
              <Link
                href={`/moves/${movement.id}`}
                aria-label={`Ver detalles de ${movement[keyTitle].name} por ${movement.account.badge?.symbol}${getCurrencyFormatter(movement.account.badge?.code, movement.amount)}`}
              >
                <div className="shadow-xs bg-slate-900/60 hover:bg-slate-800/70 border border-slate-800/80 hover:border-slate-700/80 rounded-xl py-3 px-3.5 mb-2 transition-all duration-150 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-2.5 w-1/2">
                      <CategoryIcon
                        icon={movement.category?.icon}
                        color={movement.category?.color}
                        size="sm"
                      />
                      <Typography variant="h5" className="text-sm font-medium text-slate-100 group-hover:text-emerald-400 transition-colors">
                        {movement[keyTitle].name}
                      </Typography>
                    </div>
                    <Typography
                      variant="h5"
                      className={`font-mono text-sm font-bold ${
                        movement.amount > 0
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }`}
                    >
                      {movement.account.badge?.symbol}
                      {getCurrencyFormatter(
                        movement.account.badge?.code,
                        movement.amount
                      )}
                      {keyTitle === "account" && (
                        <span className="text-[10px] ml-1 opacity-70">
                          {movement.account.badge?.code}
                        </span>
                      )}
                    </Typography>
                  </div>
                  {movement?.event?.name && (
                    <div className="flex justify-end items-center pt-1">
                      <span className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md font-mono">
                        {movement.event.name}
                      </span>
                    </div>
                  )}
                  {movement.description && (
                    <div className="border-t pt-2 mt-2 border-slate-800/60">
                      <Typography variant="p" className="text-xs text-slate-400">
                        {movement.description}
                      </Typography>
                    </div>
                  )}
                </div>
              </Link>
            </React.Fragment>
          );
        }
      )}
      {meta && !meta?.isLastPage && (
        <div className="flex justify-center py-6">
          <Button
            variant="outlined"
            onClick={() => setPage(meta.nextPage)}
            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 px-8 rounded-xl font-semibold transition-all"
          >
            Cargar más
          </Button>
        </div>
      )}
      {(!listMovements || listMovements?.length === 0) && (
        <Typography className="text-center py-8 text-sm text-slate-500">
          Sin transacciones registradas
        </Typography>
      )}
    </div>
  );
});

export default ListMovements;
