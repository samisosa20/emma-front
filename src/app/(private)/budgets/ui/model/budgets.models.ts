"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiV2BudgetsListYearSuspense } from "@@@/endpoints/budget/budget";

export default function useBudgetsViewModel() {
  const router = useRouter();
  const { isLoading, data, isError } = useGetApiV2BudgetsListYearSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
