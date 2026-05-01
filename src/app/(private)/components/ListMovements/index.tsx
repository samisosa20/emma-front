import React from "react";
import { format } from "date-fns";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import {
  formatCurrency,
  getCurrencyFormatter,
  getIconComponent,
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

export default function ListMovements({
  listMovements,
  meta,
  setPage,
  keyTitle,
}: listMovements) {
  let previousDate: string | null = null;
  const { Typography } = useComponents();
  return (
    <div className="mt-6 max-h-[65vh] overflow-y-auto">
      {listMovements?.map(
        (movement: GetApiMovements200ContentItem, index: number) => {
          const Icon = getIconComponent(movement.category.icon ?? "PiAcorn");
          const currentDate = format(
            new Date(movement.datePurchase),
            "yyyy-MM-dd"
          );
          const isNewDay = currentDate !== previousDate;
          previousDate = currentDate;
          return (
            <React.Fragment key={movement.id}>
              {isNewDay && <Typography>{currentDate}</Typography>}
              <Link href={`/moves/${movement.id}`}>
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
        <Typography
          className="text-center py-6 underline cursor-pointer hover:text-black"
          onClick={() => setPage(meta.nextPage)}
        >
          Haz clic para cargar mas.
        </Typography>
      )}
      {(!listMovements || listMovements?.length === 0) && (
        <Typography className="text-center py-6">Sin resultados</Typography>
      )}
    </div>
  );
}
