import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiInvestmentsSuspense } from "@@@/endpoints/investment/investment";

export default function useInvestmentsViewModel() {
  const router = useRouter();

  const { isLoading, data, isError, refetch } =
    useGetApiInvestmentsSuspense();

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
