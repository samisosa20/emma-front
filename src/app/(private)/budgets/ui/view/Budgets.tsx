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
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div>
            <TitleHelp title="Presupuestos" onClick={driverBudget} />
            <Typography>Listado de presupuestos anuales</Typography>
          </div>
          <div>
            <Link
              href={"/budgets/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear Presupuesto</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {data &&
          data.map((budget: GetApiBudgetsListYear200Item) => (
            <div className="mb-4" key={budget.badge}>
              <div className="flex items-center justify-between">
                <Typography variant="h2">{budget.badge}</Typography>
              </div>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2`}
              >
                {budget.years.map((year) => (
                  <Link
                    href={`/budgets/${year.year}/${year.badge?.id}`}
                    key={year.year + budget.badge}
                  >
                    <div className="bg-white rounded shadow-sm p-4">
                      <Typography variant="h2">{year.year}</Typography>
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" className="font-semibold">
                          Ingresos:
                        </Typography>
                        <Typography variant="h6" className={"text-green-500"}>
                          {year.badge?.symbol}
                          {getCurrencyFormatter(
                            year.badge?.code,
                            Number(year.incomes)
                          )}
                        </Typography>
                      </div>
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" className="font-semibold">
                          Egresos:
                        </Typography>
                        <Typography variant="h6" className={"text-red-500"}>
                          {year.badge?.symbol}
                          {getCurrencyFormatter(
                            year.badge?.code,
                            Number(year.expenses)
                          )}
                        </Typography>
                      </div>
                      <div className="flex items-center justify-between">
                        <Typography variant="h5" className="font-semibold">
                          Utilidad:
                        </Typography>
                        <Typography
                          variant="h6"
                          className={
                            Number(year.utility) >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {year.badge?.symbol}
                          {getCurrencyFormatter(
                            year.badge?.code,
                            Number(year.utility)
                          )}
                        </Typography>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        {data && data.length === 0 && (
          <div className="bg-white rounded shadow-sm">
            <Typography className="text-center py-6">
              Sin Presupuestos
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}
