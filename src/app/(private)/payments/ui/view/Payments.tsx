import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";

export default function Payments(props: any) {
  const { data } = props;
  const { Typography } = useComponents();

  const totals = data?.content.reduce(
    (acc: any, payment: any) => {
      const currency = payment.account?.badge?.code || "USD";
      const amount = payment.amount;
      if (amount > 0) {
        acc.income[currency] = (acc.income[currency] || 0) + amount;
      } else {
        acc.expenses[currency] = (acc.expenses[currency] || 0) + Math.abs(amount);
      }
      return acc;
    },
    { income: {}, expenses: {} }
  ) || { income: {}, expenses: {} };

  const currencies = ["USD", "EUR", "COP"];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-wf-xl">
        <div>
          <h1 className="font-wf-headline-lg text-wf-headline-lg text-wf-on-surface">Pagos Recurrentes</h1>
          <p className="text-wf-on-surface-variant mt-2 font-wf-body-regular text-wf-body-regular">Gestiona tus ingresos y gastos programados.</p>
        </div>
        <Link
          href="/payments/create"
          className="bg-wf-primary text-wf-on-primary hover:bg-wf-primary/90 px-6 py-3 rounded-full font-wf-label-caps text-wf-label-caps uppercase flex items-center justify-center gap-2 transition-colors duration-200 w-full md:w-auto shadow-[0_4px_12px_rgba(4,12,33,0.2)]"
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
            <span className="font-wf-label-caps text-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider">Gastos Próximos</span>
            <div className="mt-2 space-y-1">
              {currencies.map(curr => (
                <div key={curr} className="flex items-baseline justify-between">
                  <h2 className="font-wf-currency-display text-2xl text-wf-error font-semibold">- {getCurrencyFormatter(curr, totals.expenses[curr] || 0)}</h2>
                  <span className="text-xs text-wf-outline font-medium">{curr}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-wf-outline mt-3 font-wf-body-regular">Este mes</p>
          </div>
        </div>

        {/* Total Upcoming Income */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] flex flex-col justify-between border border-wf-surface-variant/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">call_received</span>
          </div>
          <div>
            <span className="font-wf-label-caps text-wf-label-caps text-wf-on-surface-variant uppercase tracking-wider">Ingresos Próximos</span>
            <div className="mt-2 space-y-1">
              {currencies.map(curr => (
                <div key={curr} className="flex items-baseline justify-between">
                  <h2 className="font-wf-currency-display text-2xl text-wf-secondary-fixed-variant font-semibold">+ {getCurrencyFormatter(curr, totals.income[curr] || 0)}</h2>
                  <span className="text-xs text-wf-outline font-medium">{curr}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-wf-outline mt-3 font-wf-body-regular">Este mes</p>
          </div>
        </div>

        {/* Context Image Card */}
        <div className="bg-wf-surface-container-lowest rounded-xl p-0 shadow-[0_4px_12px_rgba(4,12,33,0.05)] overflow-hidden border border-wf-surface-variant/50 hidden md:block">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0uh6X1FZkNq3vT_ZZqeRzkt73A2QMNn0vr1UB2mKjcWbniLcUsVEY3WTiamVQ4j-XdifijwmCcS3jy0veWbYGnXiF62Omim0JasHe83uh9o-RAm_3t-96CLsEhUTLT_jxZaqR4ipp4kGbtQ-Tkdz32NmNdBffiaLEUw0l8tCRsca6otK2M4LO0tMebKLX3RHhUdp5Kw69aZmpKw7skf2Zv5O2fFtgE5BEEtci7BbNBuwxeEJ5E2348_S6nr73cOeuDF6Ctwp3Jyv')" }}
          ></div>
        </div>
      </div>

      {/* Recurring Payments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
        {data && data.content.map((payment: any) => (
          <Link href={`/payments/${payment.id}`} key={payment.id} className="bg-wf-surface-container-lowest rounded-xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-surface-variant/50 hover:border-wf-outline-variant transition-colors flex flex-col gap-4 group">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-wf-primary"
                  style={{ backgroundColor: payment.category?.color ? `${payment.category.color}33` : "var(--color-wf-primary-fixed-dim)" }}
                >
                  <span className="material-symbols-outlined">{payment.category?.icon || "receipt_long"}</span>
                </div>
                <div>
                  <h3 className="font-wf-headline-md text-base text-wf-on-surface">{payment.category?.name}</h3>
                  <p className="text-xs text-wf-outline font-medium mt-0.5">{payment.account?.name}</p>
                </div>
              </div>
              <span className="bg-wf-surface-container px-2 py-1 rounded text-xs font-semibold text-wf-on-surface-variant whitespace-nowrap">Día: {payment.specificDay}</span>
            </div>
            <div className="flex justify-between items-end mt-2">
              <div>
                <p className="text-xs text-wf-outline mb-1">
                  {!payment.endDate ? "Para siempre" : payment.endDate.split("T")[0]}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className={`font-bold text-lg ${payment.amount > 0 ? "text-wf-secondary-fixed-variant" : "text-wf-error"}`}>
                    {payment.amount > 0 ? "+" : "-"} {getCurrencyFormatter(payment.account?.badge?.code, Math.abs(payment.amount))}
                  </span>
                  <span className="text-xs font-medium text-wf-outline">{payment.account?.badge?.code}</span>
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
}
