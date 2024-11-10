import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { BudgetUseCase } from "@@/application/budget.use-case";
import { BudgetApiAdapter } from "@@/infrastructure/budget-api.adapter";

import { customConfigHeader } from "@/share/helpers";

export default function useBudgetsViewModel() {
  const router = useRouter();
  const { isLoading, data, isError } = useQuery({
    queryKey: ["listYearBudget"],
    queryFn: async () => {
      const { listYearBudget } = new BudgetUseCase(
        new BudgetApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      const result = await listYearBudget();

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push("/login");
      }

      return result;
    },
  });

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
