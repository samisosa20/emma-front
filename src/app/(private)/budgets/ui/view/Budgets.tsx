"use client";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

//components
import useComponents from "@/share/components";

// Helpers
import { driverBudget, getCurrencyFormatter } from "@/share/helpers";
import { GetApiBudgetsListYear200Item } from "@@@/domain/models";

export default function Budgets(props: any) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();

  return (
    <div className="space-y-wf-gutter">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-lg">
        <div className="flex flex-col gap-wf-xs">
          <TitleHelp
            title="Presupuestos"
            onClick={driverBudget}
            className="text-wf-primary font-wf-headline-lg"
          />
          <Typography className="text-wf-on-surface-variant font-wf-body-regular">
            Gestiona tus metas financieras anuales y planifica tus flujos.
          </Typography>
        </div>
        <Link
          href={"/budgets/create"}
          className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Crear Presupuesto
        </Link>
      </div>

      <div className="space-y-wf-xl">
        {data &&
          data.map((budget: GetApiBudgetsListYear200Item) => (
            <div className="space-y-wf-md" key={budget.badge}>
              <div className="flex items-center gap-wf-sm border-b border-wf-surface-variant/30 pb-wf-xs">
                <span className="bg-wf-surface-container px-3 py-1 rounded-md text-xs font-bold text-wf-primary">
                  {budget.badge}
                </span>
                <div className="h-px flex-1 bg-wf-surface-variant/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
                {budget.years.map((year) => (
                  <Link
                    href={`/budgets/${year.year}/${year.badge?.id}`}
                    key={year.year + budget.badge}
                    className="group"
                  >
                    <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 transition-all hover:shadow-lg hover:border-wf-primary/30 group-hover:-translate-y-1">
                      <div className="flex justify-between items-center mb-wf-md">
                        <Typography className="text-2xl font-bold text-wf-primary">
                          {year.year}
                        </Typography>
                        <div className="w-8 h-8 rounded-full bg-wf-surface-container flex items-center justify-center text-wf-surface-tint group-hover:bg-wf-primary group-hover:text-wf-on-primary transition-colors">
                          <span className="material-symbols-outlined text-[18px]">
                            arrow_forward
                          </span>
                        </div>
                      </div>

                      <div className="space-y-wf-sm">
                        <div className="flex items-center justify-between p-wf-sm rounded-lg bg-wf-secondary-container/10">
                          <Typography className="text-xs font-wf-label-caps text-wf-surface-tint uppercase">
                            Ingresos
                          </Typography>
                          <Typography className="font-bold text-wf-secondary text-sm">
                            {year.badge?.symbol}
                            {getCurrencyFormatter(
                              year.badge?.code,
                              Number(year.incomes),
                            )}
                          </Typography>
                        </div>

                        <div className="flex items-center justify-between p-wf-sm rounded-lg bg-wf-error-container/10">
                          <Typography className="text-xs font-wf-label-caps text-wf-surface-tint uppercase">
                            Egresos
                          </Typography>
                          <Typography className="font-bold text-wf-error text-sm">
                            {year.badge?.symbol}
                            {getCurrencyFormatter(
                              year.badge?.code,
                              Number(year.expenses),
                            )}
                          </Typography>
                        </div>

                        <div className="flex items-center justify-between p-wf-sm rounded-lg bg-wf-primary-container/10 border-t border-wf-surface-variant/20 pt-wf-md mt-wf-sm">
                          <Typography className="text-xs font-wf-label-caps text-wf-primary font-bold uppercase">
                            Utilidad
                          </Typography>
                          <Typography
                            className={`font-bold text-base ${Number(year.utility) >= 0 ? "text-wf-secondary" : "text-wf-error"}`}
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
          <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 text-center">
            <span className="material-symbols-outlined text-wf-surface-tint text-5xl mb-wf-md block">
              savings
            </span>
            <Typography className="text-wf-on-surface-variant italic font-wf-body-regular">
              No se encontraron presupuestos registrados.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
