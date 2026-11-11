"use client";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { driverBudget, getCurrencyFormatter } from "@/share/helpers";
import { GetApiBudgetsListYear200Item } from "@@@/domain/models";

export default function Budgets(props: any) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <TitleHelp
            title="Presupuestos"
            onClick={driverBudget}
            className="text-emerald-400 font-wf-headline-lg font-bold text-2xl sm:text-3xl tracking-tight"
          />
          <Typography className="text-slate-400 font-wf-body-regular text-sm">
            Gestiona tus metas financieras anuales y planifica tus flujos.
          </Typography>
        </div>
        <Link
          href={"/budgets/create"}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-2.5 px-5 rounded-xl font-mono text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Crear Presupuesto
        </Link>
      </div>

      <div className="space-y-8">
        {data &&
          data.map((budget: GetApiBudgetsListYear200Item) => (
            <div className="space-y-4" key={budget.badge}>
              <div className="flex items-center gap-3 border-b border-slate-800/80 pb-2">
                <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs px-3 py-1 rounded-lg">
                  {budget.badge}
                </span>
                <div className="h-px flex-1 bg-slate-800/60"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {budget.years.map((year) => (
                  <Link
                    href={`/budgets/${year.year}/${year.badge?.id}`}
                    key={year.year + budget.badge}
                    className="group w-full min-w-0"
                  >
                    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 group-hover:-translate-y-1 w-full min-w-0">
                      <div className="flex justify-between items-center mb-4">
                        <Typography className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">
                          {year.year}
                        </Typography>
                        <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                          <Typography className="text-xs font-mono text-slate-400 uppercase font-semibold">
                            Ingresos
                          </Typography>
                          <Typography className="font-mono font-bold text-emerald-400 text-sm">
                            {year.badge?.symbol}
                            {getCurrencyFormatter(
                              year.badge?.code,
                              Number(year.incomes),
                            )}
                          </Typography>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/60">
                          <Typography className="text-xs font-mono text-slate-400 uppercase font-semibold">
                            Egresos
                          </Typography>
                          <Typography className="font-mono font-bold text-rose-400 text-sm">
                            {year.badge?.symbol}
                            {getCurrencyFormatter(
                              year.badge?.code,
                              Number(year.expenses),
                            )}
                          </Typography>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 mt-2">
                          <Typography className="text-xs font-mono text-emerald-400 font-bold uppercase">
                            Utilidad
                          </Typography>
                          <Typography
                            className={`font-mono font-bold text-sm sm:text-base ${Number(year.utility) >= 0 ? "text-emerald-400" : "text-rose-400"}`}
                          >
                            {year.badge?.symbol}
                            {getCurrencyFormatter(
                              year.badge?.code,
                              Number(year.utility),
                            )}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        {data && data.length === 0 && (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-dashed border-slate-800 text-center">
            <span className="material-symbols-outlined text-slate-500 text-5xl mb-3 block">
              savings
            </span>
            <Typography className="text-slate-400 italic font-wf-body-regular text-sm">
              No se encontraron presupuestos registrados.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
