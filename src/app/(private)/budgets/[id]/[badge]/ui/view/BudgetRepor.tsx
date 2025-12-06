"use client";
import Link from "next/link";
import { MdAddCircleOutline, MdArrowBack, MdEdit } from "react-icons/md";
import React from "react";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import { GetApiV2Budgets200Item } from "@@@/domain/models";

export default function BudgetRepor(props: any) {
  const router = useRouter();

  const { params, data } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()}>
              <MdArrowBack />
            </div>
            <div>
              <Typography variant="h1">Presupuesto</Typography>
              <Typography>
                {params.id} {data[0]?.badge?.code}
              </Typography>
            </div>
          </div>
          <div className="flex flex-col space-y-2 items-end lg:flex-row lg:items-center lg:space-y-0 space-x-2">
            <Link
              href={"/budgets/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 mt-6">
        {/* list Incomes */}
        <div className="col-span-1">
          <div className="p-4 mb-3 pt-3">
            {data?.map((budget: GetApiV2Budgets200Item, key: number) => {
              const porcentage =
                Math.abs(budget.executed / budget.planned) * 100;
              const color =
                porcentage > 90
                  ? "bg-green-400"
                  : porcentage > 65
                  ? "bg-yellow-400"
                  : "bg-amber-400";

              return (
                <React.Fragment key={budget.id}>
                  <Link href={`/budgets/${budget.id}/edit`}>
                    <div className="shadow-sm bg-white rounded py-2 px-2 mb-2">
                      <div className="flex justify-between items-center">
                        <div className={`flex items-center gap-x-2 w-1/2`}>
                          <Typography variant="h5" className="text-sm">
                            {budget.category.name}
                          </Typography>
                        </div>
                      </div>
                      <div className="flex justify-between items- center">
                        <Typography variant="p" className={`text-right`}>
                          {budget?.badge?.symbol}
                          {getCurrencyFormatter(
                            budget.badge?.code,
                            budget.planned
                          )}
                        </Typography>
                        <Typography variant="p" className={`text-right`}>
                          {budget?.badge?.symbol}
                          {getCurrencyFormatter(
                            budget.badge?.code,
                            budget.executed
                          )}
                        </Typography>
                      </div>
                      <div className="w-full bg-gray-200 rounded">
                        <div
                          className={`h-4 ${color} rounded`}
                          style={{
                            width: `${porcentage > 100 ? 100 : porcentage}%`,
                          }}
                        >
                          <Typography
                            variant="p"
                            className={`text-white text-xs text-center font-semibold`}
                          >{`${porcentage.toFixed(2)}%`}</Typography>
                        </div>
                      </div>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
