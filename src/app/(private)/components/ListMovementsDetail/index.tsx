"use client";
import React from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { GetApiMovements200ContentItem } from "@@@/domain/models";

// components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";
import { getCurrencyFormatter } from "@/share/helpers";

interface ListMovementsDetailProps {
  listMovements: GetApiMovements200ContentItem[];
  handleFilterSubmit?: any;
  onFilterSubmit?: any;
  controlFilters?: any;
  currencyOptions?: any[];
  meta?: any;
  setPage?: any;
  title?: string;
  showFilters?: boolean;
  showCategory?: boolean;
}

const ListMovementsDetail = ({
  listMovements,
  handleFilterSubmit,
  onFilterSubmit,
  controlFilters,
  currencyOptions = [],
  meta,
  setPage,
  title = "Historial de Transacciones",
  showFilters = true,
  showCategory = false,
}: ListMovementsDetailProps) => {
  const { FormControl, AutoComplete, Button } = useComponents();
  const { Filters, CurrencyBadgeFlag, CategoryIcon } = useComponentsLayout();

  return (
    <div className="bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex-1 border border-wf-surface-container flex flex-col overflow-hidden">
      <div className="p-wf-md border-b border-wf-surface-variant flex justify-between items-center bg-wf-surface-container-lowest sticky top-0 z-10">
        <h3 className="font-wf-headline-md text-wf-headline-md text-wf-primary">
          {title}
        </h3>
        {showFilters &&
          handleFilterSubmit &&
          onFilterSubmit &&
          controlFilters && (
            <div className="flex gap-wf-sm">
              <Filters>
                <form
                  onSubmit={handleFilterSubmit(onFilterSubmit)}
                  className="p-4 space-y-4"
                >
                  <Controller
                    name={"badge_id"}
                    control={controlFilters}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <FormControl fieldState={fieldState} withLabel={true}>
                        <AutoComplete
                          label="Moneda"
                          placeholder="Selecciona una opción"
                          id="badge_id"
                          handleOnChange={onChange}
                          options={currencyOptions}
                          iserror={!!fieldState.error}
                          value={value}
                        />
                      </FormControl>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Aplicar
                  </Button>
                </form>
              </Filters>
            </div>
          )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-wf-surface-container-low border-b border-wf-surface-variant">
              <th className="p-wf-md font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint font-semibold">
                FECHA
              </th>
              {showCategory && (
                <th className="p-wf-md font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint font-semibold">
                  CATEGORÍA
                </th>
              )}
              <th className="p-wf-md font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint font-semibold">
                CUENTA
              </th>
              <th className="p-wf-md font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint font-semibold">
                DESCRIPCIÓN
              </th>
              <th className="p-wf-md font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint font-semibold text-right">
                MONTO
              </th>
            </tr>
          </thead>
          <tbody>
            {listMovements?.map(
              (movement: GetApiMovements200ContentItem, index: number) => (
                <tr
                  key={movement.id}
                  className={`border-b border-wf-surface-variant hover:bg-wf-surface-container-low transition-colors ${
                    index % 2 === 1 ? "bg-wf-surface-bright" : ""
                  }`}
                >
                  <td className="p-wf-md font-wf-body-regular text-wf-on-surface whitespace-nowrap text-sm">
                    {format(new Date(movement.datePurchase), "MMM dd, yyyy", {
                      locale: es,
                    })}
                  </td>
                  {showCategory && (
                    <td className="p-wf-md text-sm">
                      <Link
                        href={`/categories/${movement.category?.id}`}
                        className="font-wf-body-regular text-wf-link hover:underline transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <CategoryIcon
                            icon={movement.category?.icon}
                            color={movement.category?.color}
                            size="xs"
                          />
                          {movement.category?.name}
                        </div>
                      </Link>
                    </td>
                  )}
                  <td className="p-wf-md text-sm">
                    <div className="flex items-center gap-wf-xs">
                      <Link
                        href={`/accounts/${movement.account?.id}`}
                        className="font-wf-body-regular text-wf-link hover:underline transition-colors"
                      >
                        {movement.account?.name}
                      </Link>
                    </div>
                  </td>
                  <td className="p-wf-md font-wf-body-regular text-wf-on-surface text-sm">
                    {movement.description}
                  </td>
                  <td
                    className={`p-wf-md text-right font-wf-body-regular font-semibold text-sm ${
                      Number(movement.amount) > 0
                        ? "text-wf-secondary"
                        : "text-wf-error"
                    }`}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <span>
                        {movement.account?.badge?.symbol}
                        {getCurrencyFormatter(
                          movement.account?.badge?.code,
                          Number(movement.amount),
                        )}
                      </span>
                      <CurrencyBadgeFlag
                        badge={{
                          code: movement.account?.badge?.code,
                          flag: movement.account?.badge?.flag,
                          symbol: movement.account?.badge?.symbol,
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ),
            )}
            {listMovements?.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-wf-md text-center text-wf-on-surface-variant text-sm italic"
                >
                  Sin movimientos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {meta && !meta.isLastPage && setPage && (
        <div className="p-4 text-center">
          <button
            onClick={() => setPage((p: number) => p + 1)}
            className="text-wf-primary font-wf-label-caps text-[12px] uppercase tracking-wider hover:underline"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
};

export default ListMovementsDetail;
