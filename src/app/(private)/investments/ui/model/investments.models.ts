import { useEffect, useMemo } from "react";

import { useRouter } from "next/navigation";

import { useGetApiInvestmentsSuspense } from "@@@/endpoints/investment/investment";

export default function useInvestmentsViewModel() {
  const router = useRouter();

  const { isLoading, data, isError } = useGetApiInvestmentsSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError, router]);

  /**
   * ⚡ Bolt Optimization: Stabilize return object reference.
   * 🎯 Problem: Every call to useInvestmentsViewModel returned a new object literal,
   *    causing re-renders in the view component even if data didn't change.
   * 📊 Impact: Ensures stable references for use in memoized view components.
   */
  return useMemo(
    () => ({
      data,
      isLoading,
    }),
    [data, isLoading],
  );
}
