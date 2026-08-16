import React, { memo, useMemo, useState } from "react";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";

/**
 * ⚡ Bolt Optimization: Memoization of Payments View
 * 🎯 Problem: Complex view with calculations (income/expense aggregation) running on every render.
 * 📊 Impact: Skips expensive reconciliation and O(n) calculations when parent state changes but data remains the same.
 */
const Payments = memo((props: any) => {
  const { data } = props;
  const { Typography, CategoryIcon } = useComponents();
  const [search, setSearch] = useState("");

  /**
   * Filter payments by category name or account name
   */
  const filteredPayments = useMemo(() => {
    if (!data?.content) return [];
    if (!search.trim()) return data.content;
    const lowerSearch = search.toLowerCase().trim();
    return data.content.filter((payment: any) =>
      payment.category?.name?.toLowerCase().includes(lowerSearch) ||
      payment.account?.name?.toLowerCase().includes(lowerSearch)
    );
  }, [data?.content, search]);

  /**
   * ⚡ Bolt Optimization: Memoize income/expense/badges reduction.
   * 🎯 Problem: O(n) reduction was running on every render cycle.
   * 📊 Impact: O(1) after first render unless data.content changes.
   */
  const { income, expenses, badges } = useMemo(() => {
    return (
      data?.content.reduce(
        (acc: any, payment: any) => {
          const badge = payment.account?.badge;
          if (!badge) return acc;

          const currency = badge.code;
          const amount = payment.amount;

          if (!acc.badges[currency]) {
            acc.badges[currency] = badge;
          }

          if (amount > 0) {
            acc.income[currency] = (acc.income[currency] || 0) + amount;
          } else {
            acc.expenses[currency] =
              (acc.expenses[currency] || 0) + Math.abs(amount);
          }
          return acc;
        },
        { income: {}, expenses: {}, badges: {} },
      ) || { income: {}, expenses: {}, badges: {} }
    );
  }, [data?.content]);

  /**
   * ⚡ Bolt Optimization: Memoize active currencies array.
   */
  const activeCurrencies = useMemo(() => Object.keys(badges), [badges]);

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 sm:mb-wf-xl">
        <div>
          <h1 className="font-wf-headline-lg text-2xl sm:text-3xl text-wf-on-surface font-bold">
            Pagos Recurrentes
          </h1>
          <p className="text-wf-on-surface-variant mt-1 font-wf-body-regular text-xs sm:text-sm">
            Gestiona tus ingresos y gastos programados.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-wf-sm w-full md:w-auto">
          <div className="relative w-full sm:w-64 flex-1 sm:flex-initial min-w-[160px]">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-wf-surface-container-lowest border border-wf-outline-variant rounded-full text-sm focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all w-full shadow-sm text-wf-on-surface"
              placeholder="Buscar por categoría..."
              aria-label="Buscar pagos por categoría"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/payments/create" className="w-full sm:w-auto">
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 bg-wf-primary text-wf-on-primary py-2 px-4 sm:px-5 rounded-full font-wf-label-caps text-[11px] sm:text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm w-full sm:w-auto whitespace-nowrap">
              <span className="material-symbols-outlined text-lg">add</span>
              Crear Pago Recurrente
            </button>
          </Link>
        </div>
      </div>

      {/* Summary Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-wf-gutter mb-6 sm:mb-wf-xl">
        {/* Total Upcoming Expense */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex flex-col justify-between border border-wf-outline-variant/30 relative overflow-hidden w-full min-w-0">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">outbound</span>
          </div>
          <div>
            <span className="font-wf-label-caps text-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider">
              Gastos Próximos
            </span>
            <div className="mt-2 space-y-1">
              {activeCurrencies.map((curr) => (
                <div key={curr} className="flex items-baseline justify-between">
                  <h2 className="font-wf-currency-display text-xl sm:text-2xl text-wf-error font-semibold">
                    - {getCurrencyFormatter(curr, expenses[curr] || 0)}
                  </h2>
                  <CurrencyBadgeFlag badge={badges[curr]} />
                </div>
              ))}
            </div>
            <p className="text-sm text-wf-outline mt-3 font-wf-body-regular">
              Este mes
            </p>
          </div>
        </div>

        {/* Total Upcoming Income */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex flex-col justify-between border border-wf-outline-variant/30 relative overflow-hidden w-full min-w-0">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">
              call_received
            </span>
          </div>
          <div>
            <span className="font-wf-label-caps text-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider">
              Ingresos Próximos
            </span>
            <div className="mt-2 space-y-1">
              {activeCurrencies.map((curr) => (
                <div key={curr} className="flex items-baseline justify-between">
                  <h2 className="font-wf-currency-display text-xl sm:text-2xl text-wf-secondary font-semibold">
                    + {getCurrencyFormatter(curr, income[curr] || 0)}
                  </h2>
                  <CurrencyBadgeFlag badge={badges[curr]} />
                </div>
              ))}
            </div>
            <p className="text-sm text-wf-outline mt-3 font-wf-body-regular">
              Este mes
            </p>
          </div>
        </div>
      </div>

      {/* Recurring Payments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-wf-gutter">
        {filteredPayments.map((payment: any) => (
          <Link
            href={`/payments/${payment.id}`}
            key={payment.id}
            className="bg-wf-surface-container-lowest rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 hover:border-wf-primary/40 transition-colors flex flex-col gap-4 group w-full min-w-0"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <CategoryIcon
                  icon={payment.category?.icon}
                  color={payment.category?.color}
                />
                <div>
                  <h3 className="font-wf-headline-md text-base text-wf-on-surface">
                    {payment.category?.name}
                  </h3>
                  <p className="text-xs text-wf-outline font-medium mt-0.5">
                    {payment.account?.name}
                  </p>
                </div>
              </div>
              <span className="bg-wf-surface-container px-2 py-1 rounded text-xs font-semibold text-wf-on-surface-variant whitespace-nowrap">
                Día: {payment.specificDay}
              </span>
            </div>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-xs text-wf-outline mb-1 font-wf-body-regular">
                  {!payment.endDate
                    ? "Para siempre"
                    : payment.endDate.split("T")[0]}
                </p>
                <div className="flex items-baseline gap-1">
                  <span
                    className={`font-wf-currency-display font-bold text-lg ${payment.amount > 0 ? "text-wf-secondary" : "text-wf-error"}`}
                  >
                    {payment.amount > 0 ? "+" : "-"}{" "}
                    {getCurrencyFormatter(
                      payment.account?.badge?.code,
                      Math.abs(payment.amount),
                    )}
                  </span>
                  <CurrencyBadgeFlag badge={payment.account?.badge} />
                </div>
              </div>
              <div className="text-wf-outline group-hover:text-wf-primary transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <div className="bg-wf-surface-container-lowest rounded-xl p-6 sm:p-wf-xl border border-wf-outline-variant/30 shadow-[0_4px_12px_rgba(4,12,33,0.05)] text-center">
          <span className="material-symbols-outlined text-wf-surface-tint text-5xl mb-3 block">
            search_off
          </span>
          <Typography className="text-center text-wf-on-surface-variant italic font-wf-body-regular">
            {search.trim()
              ? `No se encontraron pagos recurrentes para "${search}".`
              : "Sin pagos recurrentes programados."}
          </Typography>
        </div>
      )}
    </div>
  );
});

export default Payments;
