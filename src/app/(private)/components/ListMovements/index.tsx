import React, { memo } from "react";
import { format } from "date-fns";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import {
  dateFormatter,
  formatCurrency,
  getCurrencyFormatter,
  getIconComponent,
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
  const { Typography, Button } = useComponents();
  return (
    <div className="mt-6 max-h-[65vh] overflow-y-auto">
      {listMovements?.map(
        (movement: GetApiMovements200ContentItem, index: number) => {
          const Icon = getIconComponent(movement.category.icon ?? "PiAcorn");

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
                  className="sticky top-0 bg-white/80 backdrop-blur-md z-10 py-2 mb-2 px-2 font-semibold text-wf-surface-tint border-b border-wf-outline-variant/30 rounded-t-lg"
                >
                  {humanDate}
                </Typography>
              )}
              <Link
                href={`/moves/${movement.id}`}
                aria-label={`Ver detalles de ${movement[keyTitle].name} por ${movement.account.badge?.symbol}${getCurrencyFormatter(movement.account.badge?.code, movement.amount)}`}
              >
                <div className="shadow-sm bg-white rounded py-2 px-2 mb-2">
                  <div className="flex justify-between items-center">
                    <div className={`flex items-center gap-x-2 w-1/2`}>
                      <div
                        className={`rounded-full shadow-sm w-8 h-8 hover:opacity-80 flex justify-center items-center`}
                        style={{
                          background: movement.category.color,
                        }}
                      >
                        <Icon size={16} className="text-gray-200" />
                      </div>
                      <Typography variant="h5" className="text-sm">
                        {movement[keyTitle].name}
                      </Typography>
                    </div>
                    <Typography
                      variant="h5"
                      className={
                        movement.amount > 0
                          ? "text-green-500 text-sm"
                          : "text-red-500 text-sm"
                      }
                    >
                      {movement.account.badge?.symbol}
                      {getCurrencyFormatter(
                        movement.account.badge?.code,
                        movement.amount
                      )}
                      {keyTitle === "account" && (
                        <span className="text-[10px]">
                          {movement.account.badge?.code}
                        </span>
                      )}
                    </Typography>
                  </div>
                  <div className="flex justify-end items-center pb-1">
                    <Typography>{movement?.event?.name}</Typography>
                  </div>
                  {movement.description && (
                    <div className="border-t pt-1 border-gray-300">
                      <Typography variant="h5">
                        {movement?.description}
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
            className="border-wf-primary text-wf-primary hover:bg-wf-surface-container px-8"
          >
            Cargar más
          </Button>
        </div>
      )}
      {(!listMovements || listMovements?.length === 0) && (
        <Typography className="text-center py-6">Sin resultados</Typography>
      )}
    </div>
  );
});

export default ListMovements;
