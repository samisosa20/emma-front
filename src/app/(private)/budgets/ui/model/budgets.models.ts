"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiV2BudgetsListYearSuspense } from "@@@/endpoints/budget/budget";

export default function useBudgetsViewModel() {
  const router = useRouter();
  const { isLoading, data, isError, refetch } =
    useGetApiV2BudgetsListYearSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
    refetch();
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
