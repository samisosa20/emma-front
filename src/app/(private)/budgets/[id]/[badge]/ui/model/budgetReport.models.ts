import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useRouter, useParams } from "next/navigation";
import { BudgetUseCase } from "@@/application/budget.use-case";
import { BudgetApiAdapter } from "@@/infrastructure/budget-api.adapter";

import { customConfigHeader } from "@/share/helpers";

export default function useBudgetReportViewModel() {
  const router = useRouter();
  const params = useParams();

  const [openCollapse, setOpenCollapse] = useState("");

  const { isLoading, data, isError } = useQuery({
    queryKey: ["ReportBudget", params],
    queryFn: async () => {
      const { getReporttPerYear } = new BudgetUseCase(
        new BudgetApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      const year = Array.isArray(params.id)
        ? parseInt(params.id[0])
        : parseInt(params.id);

      const badge = Array.isArray(params.badge)
        ? params.badge[0]
        : params.badge;

      const user = localStorage.getItem("fiona-user");

      if (user) {
        const badge_id = JSON.parse(user).currencies.filter(
          (v: any) => v.label === badge
        )[0].value;
        const result = await getReporttPerYear({
          year: year,
          badge_id: badge_id,
        });
        if (result.status === 401) {
          localStorage.removeItem("fiona-user");
          router.push("/login");
        }

        return result;
      }
    },
  });

  const handleOpen = (id: string) => {
    if (openCollapse === id) setOpenCollapse("");
    else setOpenCollapse(id);
  };

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
    params,
    handleOpen,
    openCollapse,
  };
}
