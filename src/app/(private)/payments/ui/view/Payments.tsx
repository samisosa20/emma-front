import React, { memo, useMemo } from "react";
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-wf-xl">
        <div>
          <h1 className="font-wf-headline-lg text-wf-headline-lg text-wf-on-surface">
            Pagos Recurrentes
          </h1>
          <p className="text-wf-on-surface-variant mt-2 font-wf-body-regular text-wf-body-regular">
            Gestiona tus ingresos y gastos programados.
          </p>
        </div>
        <Link
          href="/payments/create"
          className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Crear Pago Recurrente
        </Link>
      </div>

      {/* Summary Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-wf-gutter mb-wf-xl">
        {/* Total Upcoming Expense */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex flex-col justify-between border border-wf-surface-variant/50 relative overflow-hidden">
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
                  <h2 className="font-wf-currency-display text-2xl text-wf-error font-semibold">
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
        <div className="bg-wf-surface-container-lowest rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex flex-col justify-between border border-wf-surface-variant/50 relative overflow-hidden">
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
                  <h2 className="font-wf-currency-display text-2xl text-wf-secondary-fixed-variant font-semibold">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
        {data &&
          data.content.map((payment: any) => (
            <Link
              href={`/payments/${payment.id}`}
              key={payment.id}
              className="bg-wf-surface-container-lowest rounded-xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-surface-variant/50 hover:border-wf-outline-variant transition-colors flex flex-col gap-4 group"
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
                      className={`font-wf-currency-display font-bold text-lg ${payment.amount > 0 ? "text-wf-secondary-fixed-variant" : "text-wf-error"}`}
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

      {data && data.content?.length === 0 && (
        <div className="bg-wf-surface-container-lowest rounded-xl p-wf-xl border border-wf-surface-variant/50 shadow-[0_4px_12px_rgba(4,12,33,0.05)]">
          <Typography className="text-center py-6 text-wf-on-surface-variant">
            Sin pagos recurrentes programados.
          </Typography>
        </div>
      )}
    </div>
  );
});

export default Payments;
