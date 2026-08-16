"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// components
import useComponents from "@/share/components";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import { GetApiBudgets200Item } from "@@@/domain/models";

export default function BudgetRepor(props: any) {
  const router = useRouter();
  const { params, data } = props;
  const { Typography, CategoryIcon } = useComponents();
  const [search, setSearch] = useState("");

  const firstBadge = data && Array.isArray(data) && data.length > 0 ? data[0]?.badge : null;

  /**
   * Calculate summary metrics
   */
  const totals = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return { planned: 0, executed: 0, percentage: 0 };
    }
    const planned = data.reduce((acc, b) => acc + (Number(b.planned) || 0), 0);
    const executed = data.reduce(
      (acc, b) => acc + Math.abs(Number(b.executed) || 0),
      0,
    );
    const percentage = planned > 0 ? (executed / planned) * 100 : 0;
    return { planned, executed, percentage };
  }, [data]);

  /**
   * Filter budgets by category name
   */
  const filteredBudgets = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    if (!search.trim()) return data;
    const lowerSearch = search.toLowerCase().trim();
    return data.filter((budget: GetApiBudgets200Item) =>
      budget.category?.name?.toLowerCase().includes(lowerSearch),
    );
  }, [data, search]);

  return (
    <div className="space-y-6 sm:space-y-wf-gutter">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Volver a presupuestos"
            className="p-2 rounded-full text-wf-on-surface-variant hover:text-wf-primary hover:bg-wf-surface-container active:scale-95 transition-all duration-150 flex items-center justify-center border border-wf-outline-variant/30 flex-shrink-0"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              arrow_back
            </span>
          </button>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-wf-headline-lg text-2xl sm:text-3xl text-wf-on-surface font-bold">
                Presupuesto {params.id}
              </h1>
              {firstBadge && <CurrencyBadgeFlag badge={firstBadge} />}
            </div>
            <p className="text-wf-on-surface-variant mt-1 font-wf-body-regular text-xs sm:text-sm">
              Monitoreo de ejecución vs planificación de categorías
            </p>
          </div>
        </div>

        {/* Actions & Search */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-wf-sm w-full md:w-auto">
          <div className="relative w-full sm:w-60 flex-1 sm:flex-initial min-w-[160px]">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-wf-surface-container-lowest border border-wf-outline-variant rounded-full text-sm focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all w-full shadow-sm text-wf-on-surface"
              placeholder="Buscar categoría..."
              aria-label="Buscar categoría"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/budgets/create" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-wf-primary text-wf-on-primary py-2 px-4 sm:px-5 rounded-full font-wf-label-caps text-[11px] sm:text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap">
              <span className="material-symbols-outlined text-lg">add</span>
              Crear Presupuesto
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-wf-gutter">
        {/* Total Planned */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 flex flex-col justify-between w-full min-w-0">
          <span className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase tracking-wider">
            Total Planificado
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <h2 className="font-wf-currency-display text-xl sm:text-2xl text-wf-primary font-bold">
              {getCurrencyFormatter(firstBadge?.code, totals.planned)}
            </h2>
          </div>
          <p className="text-xs text-wf-outline mt-2 font-wf-body-regular">
            Meta estimada del año
          </p>
        </div>

        {/* Total Executed */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 flex flex-col justify-between w-full min-w-0">
          <span className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase tracking-wider">
            Total Ejecutado
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <h2
              className={`font-wf-currency-display text-xl sm:text-2xl font-bold ${
                totals.percentage > 100 ? "text-wf-error" : "text-wf-secondary"
              }`}
            >
              {getCurrencyFormatter(firstBadge?.code, totals.executed)}
            </h2>
          </div>
          <p className="text-xs text-wf-outline mt-2 font-wf-body-regular">
            Gasto real acumulado
          </p>
        </div>

        {/* Execution % */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 flex flex-col justify-between w-full min-w-0">
          <div className="flex justify-between items-center">
            <span className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase tracking-wider">
              Ejecución Global
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                totals.percentage > 100
                  ? "bg-wf-error/15 text-wf-error"
                  : totals.percentage > 80
                    ? "bg-amber-500/15 text-amber-500"
                    : "bg-wf-secondary/15 text-wf-secondary"
              }`}
            >
              {totals.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="w-full bg-wf-surface-container rounded-full h-2.5 mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                totals.percentage > 100
                  ? "bg-wf-error"
                  : totals.percentage > 80
                    ? "bg-amber-500"
                    : "bg-wf-secondary"
              }`}
              style={{
                width: `${Math.min(totals.percentage, 100)}%`,
              }}
            />
          </div>
          <p className="text-xs text-wf-outline mt-2 font-wf-body-regular">
            {totals.percentage > 100
              ? "Excedido del presupuesto"
              : `${(100 - totals.percentage).toFixed(1)}% disponible`}
          </p>
        </div>
      </div>

      {/* Categories Budget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-wf-gutter">
        {filteredBudgets.map((budget: GetApiBudgets200Item) => {
          const planned = Number(budget.planned) || 0;
          const executed = Math.abs(Number(budget.executed) || 0);
          const percentage = planned > 0 ? (executed / planned) * 100 : 0;
          const isOverBudget = percentage > 100;
          const badge = budget.badge || firstBadge;

          return (
            <Link
              href={`/budgets/${budget.id}/edit`}
              key={budget.id}
              className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 hover:border-wf-primary/40 hover:shadow-md transition-all flex flex-col justify-between gap-4 group w-full min-w-0"
            >
              {/* Card Header: Category & Edit link */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <CategoryIcon
                    icon={budget.category?.icon}
                    color={budget.category?.color}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <h3 className="font-wf-headline-md text-base text-wf-on-surface font-bold truncate group-hover:text-wf-primary transition-colors">
                      {budget.category?.name}
                    </h3>
                    <span className="text-xs text-wf-outline font-wf-body-regular">
                      {budget.period?.name || "Anual"}
                    </span>
                  </div>
                </div>
                <div className="text-wf-outline group-hover:text-wf-primary transition-colors p-1">
                  <span className="material-symbols-outlined text-lg">edit</span>
                </div>
              </div>

              {/* Amounts Planned vs Executed */}
              <div className="grid grid-cols-2 gap-2 bg-wf-surface-container-low/50 p-2.5 rounded-lg border border-wf-outline-variant/15 text-xs">
                <div>
                  <span className="text-wf-on-surface-variant font-wf-label-caps uppercase text-[10px] block mb-0.5">
                    Planificado
                  </span>
                  <span className="font-bold text-wf-on-surface text-sm">
                    {getCurrencyFormatter(badge?.code, planned)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-wf-on-surface-variant font-wf-label-caps uppercase text-[10px] block mb-0.5">
                    Ejecutado
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      isOverBudget ? "text-wf-error" : "text-wf-secondary"
                    }`}
                  >
                    {getCurrencyFormatter(badge?.code, executed)}
                  </span>
                </div>
              </div>

              {/* Progress Bar & Percentage */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-wf-on-surface-variant font-wf-body-regular">
                    Progreso
                  </span>
                  <span
                    className={`font-bold ${
                      isOverBudget
                        ? "text-wf-error"
                        : percentage > 80
                          ? "text-amber-500"
                          : "text-wf-secondary"
                    }`}
                  >
                    {percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-wf-surface-container rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isOverBudget
                        ? "bg-wf-error"
                        : percentage > 80
                          ? "bg-amber-500"
                          : "bg-wf-secondary"
                    }`}
                    style={{
                      width: `${Math.min(percentage, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBudgets.length === 0 && (
        <div className="bg-wf-surface-container-lowest rounded-xl p-6 sm:p-wf-xl border border-wf-outline-variant/30 shadow-[0_4px_12px_rgba(4,12,33,0.05)] text-center">
          <span className="material-symbols-outlined text-wf-surface-tint text-5xl mb-3 block">
            search_off
          </span>
          <Typography className="text-center text-wf-on-surface-variant italic font-wf-body-regular">
            {search.trim()
              ? `No se encontraron categorías para "${search}".`
              : "No hay categorías presupuestadas para este año."}
          </Typography>
        </div>
      )}
    </div>
  );
}
