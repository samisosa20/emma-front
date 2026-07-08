import { memo } from "react";
import Link from "next/link";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { getCurrencyFormatter, driverInvestment } from "@/share/helpers";
import { GetApiInvestments200ContentItem } from "@@@/domain/models";

/**
 * ⚡ Bolt Optimization: Memoization of Investments View
 * 🎯 Problem: Rendering the entire grid of investment cards on every re-render of the parent Page.
 * 📊 Impact: Skips the expensive reconciliation of the investment layout when
 *    the parent component re-renders without prop changes.
 */
const Investments = memo((props: any) => {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div className="space-y-wf-gutter">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-lg">
        <div>
          <TitleHelp
            title="Inversiones"
            onClick={driverInvestment}
            className="text-wf-primary font-wf-headline-lg"
          />
          <Typography className="text-wf-on-surface-variant font-wf-body-regular mt-wf-unit">
            Monitorea el rendimiento y crecimiento de tu portafolio.
          </Typography>
        </div>
        <div>
          <Link
            href={"/investments/create"}
            className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">add</span>
            Crear Inversión
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
        {data &&
          data.content?.map((investment: GetApiInvestments200ContentItem) => (
            <Link
              href={`/investments/${investment.id}`}
              key={investment.id}
              aria-label={`Ver detalles de la inversión ${investment.name}, valor actual: ${investment.badge?.symbol}${getCurrencyFormatter(investment.badge?.code, investment.endAmount)}, valorización: ${investment.valorization}, rendimiento: ${investment.badge?.symbol}${getCurrencyFormatter(investment.badge?.code, investment.totalReturns)}, total: ${investment.totalRate}`}
              className="group relative bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 transition-all hover:shadow-lg hover:border-wf-primary/30 hover:-translate-y-1 flex flex-col gap-wf-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-wf-headline-md text-lg text-wf-on-surface font-semibold group-hover:text-wf-primary transition-colors">
                  {investment.name}
                </h3>
                <CurrencyBadgeFlag badge={investment.badge} />
              </div>

              <div className="space-y-wf-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase tracking-wider font-bold">
                    Valor Actual
                  </span>
                  <Typography
                    className={`font-wf-currency-display text-2xl font-bold ${
                      investment.endAmount > 0
                        ? "text-wf-secondary"
                        : "text-wf-error"
                    }`}
                  >
                    <span className="text-sm opacity-70 mr-1 font-normal">
                      {investment.badge?.symbol}
                    </span>
                    {getCurrencyFormatter(
                      investment.badge?.code,
                      investment.endAmount,
                    )}
                  </Typography>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-wf-sm border-t border-wf-surface-variant/20">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-wf-label-caps text-wf-surface-tint uppercase tracking-tighter">
                      Val.
                    </span>
                    <span className="text-xs font-bold text-wf-on-surface">
                      {investment.valorization}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-wf-label-caps text-wf-surface-tint uppercase tracking-tighter">
                      Rend.
                    </span>
                    <span className="text-xs font-bold text-wf-on-surface">
                      {getCurrencyFormatter(
                        investment.badge?.code,
                        investment.totalReturns,
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-wf-label-caps text-wf-surface-tint uppercase tracking-tighter">
                      Total
                    </span>
                    <span className="text-xs font-bold text-wf-primary">
                      {investment.totalRate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-wf-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-xl opacity-20"></div>
            </Link>
          ))}
      </div>

      {data && data.meta.totalCount === 0 && (
        <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 text-center flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-wf-surface-tint text-6xl mb-4" aria-hidden="true">
            trending_up
          </span>
          <Typography className="text-wf-on-surface-variant font-wf-body-regular italic">
            Sin Inversiones registradas.
          </Typography>
        </div>
      )}
    </div>
  );
});

export default Investments;
