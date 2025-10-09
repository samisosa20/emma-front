"use client";
import { useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import { useGetApiV2BudgetsSuspense } from "@@@/endpoints/budget/budget";

export default function useBudgetReportViewModel() {
  const router = useRouter();
  const params = useParams();

  const [openCollapse, setOpenCollapse] = useState("");

  const { isLoading, data, isError } = useGetApiV2BudgetsSuspense({
    badgeId: String(params.badge),
    year: Number(params.id),
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
