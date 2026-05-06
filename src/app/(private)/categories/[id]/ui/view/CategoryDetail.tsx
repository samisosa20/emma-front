"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";
import { formatCurrency, getCurrencyFormatter } from "@/share/helpers";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";
import { GetApiMovements200ContentItem } from "@@@/domain/models";
import ListMovementsDetail from "@/app/(private)/components/ListMovementsDetail";

export default function CategoryDetail(props: any) {
  const {
    data,
    currencyOptions = [],
    controlFilters,
    controlEdit,
    onFilterSubmit,
    handleFilterSubmit,
    listMovements,
    meta,
    page,
    setPage,
    dataBalance,
    watch,
    setValue,
    onEditSubmit,
    handleEditSubmit,
    handleDelete,
  } = props;
  const router = useRouter();
  const {
    Typography,
    FormControl,
    Button,
    AutoComplete,
    Input,
    Select,
    Textarea,
  } = useComponents();
  const { Filters } = useComponentsLayout();

  const selectedColor = watch("color") || data.color || "#6bfe9c";
  const selectedIcon = watch("icon") || data.icon || "category";

  return (
    <div className="flex flex-col gap-wf-gutter">
      {/* Page Header */}
      <div className="flex justify-between items-end pb-wf-md border-b border-wf-surface-variant">
        <div>
          <h1 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary flex items-center gap-wf-sm">
            <span
              className="material-symbols-outlined text-[32px] text-wf-surface-tint filled"
              style={{ color: data.color }}
            >
              {data.icon && !data.icon.startsWith("Pi")
                ? data.icon
                : "category"}
            </span>
            Categoría: {data.name}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-wf-xs px-wf-md py-wf-sm bg-wf-surface-container-highest text-wf-primary rounded-lg font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            VOLVER
          </button>
          <Link
            href={`/categories/${data.id}/edit`}
            className="flex items-center gap-wf-xs px-wf-md py-wf-sm bg-wf-surface-container-highest text-wf-primary rounded-lg font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-surface-variant transition-colors lg:hidden"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            EDITAR
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-wf-gutter">
        {/* Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-wf-gutter">
          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-wf-gutter">
            <MetricCard
              title="PROMEDIO MENSUAL"
              amount={
                dataBalance?.[0]?.avgMonthlyIncome > 0
                  ? dataBalance[0].avgMonthlyIncome
                  : dataBalance?.[0]?.avgMonthlyExpense
              }
              code={dataBalance?.[0]?.code}
            />
            <MetricCard
              title="LÍMITE INFERIOR"
              amount={
                dataBalance?.[0]?.incomeLowerLimit > 0
                  ? dataBalance[0].incomeLowerLimit
                  : dataBalance?.[0]?.expenseLowerLimit
              }
              code={dataBalance?.[0]?.code}
            />
            <MetricCard
              title="LÍMITE SUPERIOR"
              amount={
                dataBalance?.[0]?.incomeUpperLimit > 0
                  ? dataBalance[0].incomeUpperLimit
                  : dataBalance?.[0]?.expenseUpperLimit
              }
              code={dataBalance?.[0]?.code}
            />
          </div>

          <ListMovementsDetail
            listMovements={listMovements}
            handleFilterSubmit={handleFilterSubmit}
            onFilterSubmit={onFilterSubmit}
            controlFilters={controlFilters}
            currencyOptions={currencyOptions}
            meta={meta}
            setPage={setPage}
          />
        </div>

        {/* Side Panel (Edit Form) - Visible on Desktop */}
        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-wf-surface-container-lowest rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-surface-container sticky top-24">
            <h3 className="font-wf-headline-md text-wf-headline-md text-wf-primary mb-wf-lg border-b border-wf-surface-variant pb-wf-sm">
              Editar Categoría
            </h3>
            <form
              onSubmit={handleEditSubmit(onEditSubmit)}
              className="flex flex-col gap-wf-md"
            >
              <Controller
                name="name"
                control={controlEdit}
                render={({ field, fieldState }) => (
                  <div className="space-y-wf-xs">
                    <label
                      className="block font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint"
                      htmlFor="cat-name"
                    >
                      NOMBRE DE LA CATEGORÍA
                    </label>
                    <Input
                      {...field}
                      className="w-full bg-wf-surface-container-low border border-wf-outline-variant rounded-lg p-wf-sm font-wf-body-regular text-wf-on-surface focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all"
                      id="cat-name"
                      iserror={!!fieldState.error}
                    />
                  </div>
                )}
              />

              <Controller
                name="description"
                control={controlEdit}
                render={({ field, fieldState }) => (
                  <div className="space-y-wf-xs">
                    <label
                      className="block font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint"
                      htmlFor="cat-desc"
                    >
                      DESCRIPCIÓN (OPCIONAL)
                    </label>
                    <Textarea
                      {...field}
                      className="w-full bg-wf-surface-container-low border border-wf-outline-variant rounded-lg p-wf-sm font-wf-body-regular text-wf-on-surface focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all"
                      id="cat-desc"
                      rows={2}
                      iserror={!!fieldState.error}
                    />
                  </div>
                )}
              />

              <div className="grid grid-cols-2 gap-wf-md">
                {/* Color Picker placeholder to match design */}
                <div>
                  <label className="block font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint mb-wf-xs">
                    COLOR
                  </label>
                  <div className="flex items-center gap-wf-sm">
                    <div
                      className="w-10 h-10 rounded-full shadow-inner border-2 border-wf-surface-container-lowest cursor-pointer"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                    <button
                      onClick={() => router.push(`/categories/${data.id}/edit`)}
                      className="text-wf-surface-tint hover:text-wf-primary font-wf-body-regular text-sm underline"
                      type="button"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
                {/* Icon Selection placeholder to match design */}
                <div>
                  <label className="block font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint mb-wf-xs">
                    ÍCONO
                  </label>
                  <div className="flex items-center gap-wf-sm">
                    <div className="w-10 h-10 rounded-lg bg-wf-surface-container flex items-center justify-center text-wf-surface-tint border border-wf-outline-variant cursor-pointer hover:bg-wf-surface-variant transition-colors">
                      <span className="material-symbols-outlined">
                        {selectedIcon}
                      </span>
                    </div>
                    <button
                      onClick={() => router.push(`/categories/${data.id}/edit`)}
                      className="text-wf-surface-tint hover:text-wf-primary font-wf-body-regular text-sm underline"
                      type="button"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-wf-sm mt-wf-md pt-wf-md border-t border-wf-surface-variant">
                <div className="flex gap-wf-sm">
                  <Button
                    type="button"
                    variant="h5"
                    className="flex-1 py-wf-sm px-wf-md bg-wf-surface-container text-wf-primary rounded-lg hover:bg-wf-surface-variant transition-colors h-auto"
                    onClick={() => router.back()}
                  >
                    CANCELAR
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 py-wf-sm px-wf-md bg-wf-primary text-wf-on-primary rounded-lg hover:bg-wf-primary/90 transition-colors h-auto"
                  >
                    GUARDAR
                  </Button>
                </div>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-wf-sm px-wf-md border border-wf-error text-wf-error font-wf-label-caps text-[12px] rounded-lg hover:bg-wf-error-container transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    delete
                  </span>
                  ELIMINAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  amount,
  code,
}: {
  title: string;
  amount?: number;
  code?: string;
}) {
  return (
    <div className="bg-wf-surface-container-lowest rounded-xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] hover:shadow-[0_8px_24px_rgba(4,12,33,0.08)] transition-shadow border border-wf-surface-container">
      <h3 className="font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint mb-wf-sm">
        {title}
      </h3>
      <div className="flex flex-col gap-wf-xs">
        <div className="flex items-baseline gap-wf-xs">
          <span className="font-wf-currency-display text-wf-currency-display text-wf-primary">
            {amount ? formatCurrency.format(amount) : "0"}
          </span>
          <span className="font-wf-label-caps text-[12px] text-wf-surface-tint">
            {code}
          </span>
        </div>
      </div>
    </div>
  );
}
