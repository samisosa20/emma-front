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
    <div className="space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <TitleHelp
            title="Inversiones"
            onClick={driverInvestment}
            className="text-emerald-400 font-wf-headline-lg font-bold text-2xl sm:text-3xl tracking-tight"
          />
          <Typography className="text-slate-400 font-wf-body-regular text-sm mt-1">
            Monitorea el rendimiento y crecimiento de tu portafolio.
          </Typography>
        </div>
        <div>
          <Link
            href={"/investments/create"}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">add</span>
            Crear Inversión
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {data &&
          data.content?.map((investment: GetApiInvestments200ContentItem) => (
            <Link
              href={`/investments/${investment.id}`}
              key={investment.id}
              aria-label={`Ver detalles de la inversión ${investment.name}, valor actual: ${investment.badge?.symbol}${getCurrencyFormatter(investment.badge?.code, investment.endAmount)}, valorización: ${investment.valorization}, rendimiento: ${investment.badge?.symbol}${getCurrencyFormatter(investment.badge?.code, investment.totalReturns)}, total: ${investment.totalRate}`}
              className="group relative bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 hover:-translate-y-1 flex flex-col gap-4 w-full min-w-0"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-wf-headline-md text-base sm:text-lg text-slate-100 font-semibold group-hover:text-emerald-400 transition-colors truncate">
                  {investment.name}
                </h3>
                <CurrencyBadgeFlag badge={investment.badge} />
              </div>

              <div className="space-y-3">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                    Valor Actual
                  </span>
                  <Typography
                    className={`font-mono text-xl sm:text-2xl font-bold ${
                      investment.endAmount > 0
                        ? "text-emerald-400"
                        : "text-rose-400"
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

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Val.
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {investment.valorization}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Rend.
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-200">
                      {getCurrencyFormatter(
                        investment.badge?.code,
                        investment.totalReturns,
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                      Total
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {investment.totalRate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-2xl opacity-60"></div>
            </Link>
          ))}
      </div>

      {data && data.meta.totalCount === 0 && (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-slate-500 text-6xl mb-3" aria-hidden="true">
            trending_up
          </span>
          <Typography className="text-slate-400 font-wf-body-regular italic text-sm">
            Sin Inversiones registradas.
          </Typography>
        </div>
      )}
    </div>
  );
});

export default Investments;
