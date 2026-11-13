import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useGetApiHeritagesYearSuspense } from "@@@/endpoints/heritage/heritage";

export default function useHeritagesViewModel() {
  const router = useRouter();
  const { isLoading, data: rawData, isError } = useGetApiHeritagesYearSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError, router]);

  const data = useMemo(() => {
    if (!rawData) return rawData;
    return rawData.map((heritage) => ({
      ...heritage,
      balances: (heritage.balances || []).filter(
        (b) =>
          b.amount !== null &&
          b.amount !== undefined &&
          Math.abs(Number(b.amount)) > 0.0001
      ),
    }));
  }, [rawData]);

  return {
    data,
    isLoading,
  };
}
