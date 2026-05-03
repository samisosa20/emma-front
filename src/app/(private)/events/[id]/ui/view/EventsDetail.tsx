"use client";
import React, { useState } from "react";
import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

// Helpers
import { getCurrencyFormatter, listEventTypes } from "@/share/helpers";

const EventsDetail = (props: any) => {
  const { FormControl } = useComponents();
  const { ListMovements } = useComponentsLayout();
  const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    listCategories,
    data,
    onDelete,
  } = props;

  const eventType = listEventTypes.find((t) => t.value === (data?.type || "event"));

  // Calculate totals and breakdown
  const expenses = listCategories?.filter((cat: any) =>
    cat.categories.some((sub: any) => sub.amount < 0)
  ) || [];
  const incomes = listCategories?.filter((cat: any) =>
    cat.categories.some((sub: any) => sub.amount >= 0)
  ) || [];

  const totalExpenses = expenses.reduce((acc: number, curr: any) =>
    acc + curr.categories.reduce((sAcc: number, sCurr: any) => sAcc + (sCurr.amount < 0 ? Math.abs(sCurr.amount) : 0), 0)
  , 0);

  const totalIncomes = incomes.reduce((acc: number, curr: any) =>
    acc + curr.categories.reduce((sAcc: number, sCurr: any) => sAcc + (sCurr.amount >= 0 ? sCurr.amount : 0), 0)
  , 0);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-wf-background -m-wf-container-margin md:-m-wf-xl">
      {/* Center Content Area */}
      <div className="flex-1 p-wf-container-margin md:p-wf-xl space-y-wf-lg overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-xl">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="font-wf-headline-lg text-[32px] text-wf-primary">
                {data?.name || "Cargando..."}
              </h1>
              {eventType && (
                <span
                  className="px-3 py-1 text-wf-label-caps text-[10px] font-semibold rounded-full uppercase tracking-wider"
                  style={{
                    backgroundColor: eventType.bgColor,
                    color: eventType.textColor,
                  }}
                >
                  {eventType.label}
                </span>
              )}
            </div>
            <p className="text-wf-body-regular text-wf-on-surface-variant">
              Seguimiento integral para este evento financiero.
            </p>
          </div>
          <button
            onClick={() => setIsEditPanelOpen(!isEditPanelOpen)}
            className="bg-white border border-wf-outline px-wf-lg py-wf-sm rounded-lg font-semibold text-wf-primary flex items-center gap-2 hover:bg-wf-surface-container-low transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Editar Evento
          </button>
        </div>

        {/* Balanced Section: Expenses & Income */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
          {/* Expenses Breakdown Card */}
          <div className="bg-wf-surface-container-lowest p-wf-lg rounded-xl shadow-sm border border-wf-surface-variant/30 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-wf-label-caps text-[12px] font-semibold text-wf-on-tertiary-container uppercase tracking-wider">
                Desglose de Gastos
              </h3>
              <span className="font-wf-currency-display text-lg font-bold text-wf-primary">
                ${getCurrencyFormatter("USD", totalExpenses)}
              </span>
            </div>
            <div className="space-y-4">
              {expenses.map((category: any) => (
                category.categories.filter((s:any) => s.amount < 0).map((subCategory: any, idx: number) => (
                  <div key={`${category.code}-${idx}`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-wf-on-surface-variant">
                        {subCategory.name}
                      </span>
                      <span className="font-bold text-wf-primary">
                        ${getCurrencyFormatter(category.code, Math.abs(subCategory.amount))}
                      </span>
                    </div>
                    <div className="w-full bg-wf-surface-container-low h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-wf-on-tertiary-container h-full"
                        style={{ width: `${subCategory.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ))}
              {expenses.length === 0 && (
                <p className="text-sm text-wf-on-surface-variant italic">No hay gastos registrados.</p>
              )}
            </div>
          </div>

          {/* Income Breakdown Card */}
          <div className="bg-wf-surface-container-lowest p-wf-lg rounded-xl shadow-sm border border-wf-surface-variant/30 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-wf-label-caps text-[12px] font-semibold text-wf-on-secondary-container uppercase tracking-wider">
                Ingresos Totales
              </h3>
              <span className="font-wf-currency-display text-lg font-bold text-wf-primary">
                ${getCurrencyFormatter("USD", totalIncomes)}
              </span>
            </div>
            <div className="space-y-4">
              {incomes.map((category: any) => (
                category.categories.filter((s:any) => s.amount >= 0).map((subCategory: any, idx: number) => (
                  <div key={`${category.code}-${idx}`}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-wf-on-surface-variant">
                        {subCategory.name}
                      </span>
                      <span className="font-bold text-wf-primary">
                        ${getCurrencyFormatter(category.code, subCategory.amount)}
                      </span>
                    </div>
                    <div className="w-full bg-wf-surface-container-low h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-wf-secondary h-full"
                        style={{ width: `${subCategory.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ))}
              {incomes.length === 0 && (
                <p className="text-sm text-wf-on-surface-variant italic">No hay ingresos registrados.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-wf-surface-container-lowest rounded-xl shadow-sm border border-wf-surface-variant/30 overflow-hidden">
          <div className="p-wf-lg border-b border-wf-surface-variant/30 flex items-center justify-between">
            <h2 className="font-wf-headline-md text-[24px] text-wf-primary">
              Transacciones Recientes
            </h2>
            <span className="text-wf-primary font-semibold text-sm cursor-pointer hover:underline">
              Ver Todo
            </span>
          </div>
          <div className="overflow-x-auto">
            <ListMovements
              listMovements={listMovements}
              setPage={() => {}}
              keyTitle="category"
            />
          </div>
        </div>
      </div>

      {/* Integrated Edit Panel (Right Sidebar) */}
      <aside
        className={`${
          isEditPanelOpen ? "translate-x-0" : "translate-x-full"
        } fixed lg:relative right-0 top-0 h-full w-80 bg-wf-surface-container border-l border-wf-outline-variant p-wf-lg space-y-wf-lg transition-transform duration-300 z-50 flex flex-col shadow-xl lg:shadow-none ${!isEditPanelOpen && "hidden lg:hidden"}`}
      >
        <div className="flex justify-between items-center lg:block">
          <div>
            <h3 className="font-wf-headline-md text-[20px] text-wf-primary mb-1">
              Editar Detalles
            </h3>
            <p className="text-sm text-wf-on-surface-variant">
              Actualiza los parámetros principales del evento.
            </p>
          </div>
          <button
            onClick={() => setIsEditPanelOpen(false)}
            className="lg:hidden p-2 text-wf-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-wf-md flex-1">
          <div>
            <Controller
              name={"name"}
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <div className="flex flex-col gap-1">
                    <label className="block text-wf-label-caps text-[12px] font-semibold text-wf-on-surface-variant uppercase tracking-wider">
                      Nombre del Evento
                    </label>
                    <input
                      className="w-full bg-wf-surface-container-lowest border border-wf-outline-variant rounded-lg p-3 text-sm focus:ring-1 focus:ring-wf-primary focus:border-wf-primary transition-all outline-none"
                      type="text"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                </FormControl>
              )}
            />
          </div>

          <div>
            <Controller
              name={"endEvent"}
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <div className="flex flex-col gap-1">
                    <label className="block text-wf-label-caps text-[12px] font-semibold text-wf-on-surface-variant uppercase tracking-wider">
                      Fecha Objetivo
                    </label>
                    <div className="relative">
                      <input
                        className="w-full bg-wf-surface-container-lowest border border-wf-outline-variant rounded-lg p-3 text-sm focus:ring-1 focus:ring-wf-primary focus:border-wf-primary transition-all outline-none"
                        type="date"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </div>
                </FormControl>
              )}
            />
          </div>

          <div>
            <Controller
              name={"type"}
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <div className="flex flex-col gap-1">
                    <label className="block text-wf-label-caps text-[12px] font-semibold text-wf-on-surface-variant uppercase tracking-wider">
                      Tipo de Evento
                    </label>
                    <div className="relative">
                      <select
                        className="w-full bg-wf-surface-container-lowest border border-wf-outline-variant rounded-lg p-3 text-sm focus:ring-1 focus:ring-wf-primary focus:border-wf-primary transition-all outline-none appearance-none"
                        onChange={onChange}
                        value={value}
                      >
                        <option value="" disabled>
                          Selecciona un tipo
                        </option>
                        {listEventTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-wf-outline pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </FormControl>
              )}
            />
          </div>

          <div className="pt-wf-lg flex flex-col gap-3">
            <button
              type="submit"
              className="w-full bg-wf-primary text-wf-on-primary py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={() => setIsEditPanelOpen(false)}
              className="w-full bg-transparent border border-wf-outline-variant text-wf-on-surface-variant py-3 rounded-lg font-semibold hover:bg-wf-surface-container-low transition-all"
            >
              Cancelar
            </button>
          </div>
          <div className="pt-wf-lg border-t border-wf-outline-variant/30 mt-wf-lg">
            <button
              type="button"
              onClick={onDelete}
              className="w-full bg-transparent border border-wf-error/30 text-wf-error py-3 rounded-lg font-semibold hover:bg-wf-error/5 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">delete</span>
              Eliminar Evento
            </button>
          </div>
        </form>

        {/* Decorative Card at Bottom of Sidebar */}
        <div className="mt-auto p-wf-md rounded-xl bg-white/40 border border-white/60 relative overflow-hidden group min-h-[100px] flex items-end">
          <div className="relative z-10">
            <p className="text-xs font-bold text-wf-primary">Fiona Insight</p>
            <p className="text-[10px] text-wf-on-surface-variant leading-tight">
              Continúa con tu excelente seguimiento. ¡Estás alcanzando tus metas financieras!
            </p>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isEditPanelOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsEditPanelOpen(false)}
        />
      )}
    </div>
  );
};

export default EventsDetail;
