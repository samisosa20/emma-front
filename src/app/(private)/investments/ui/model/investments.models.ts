import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiV2InvestmentsSuspense } from "@@@/endpoints/investment/investment";

export default function useInvestmentsViewModel() {
  const router = useRouter();

  const { isLoading, data, isError, refetch } =
    useGetApiV2InvestmentsSuspense();

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
