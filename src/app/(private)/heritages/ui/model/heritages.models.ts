import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetApiV2HeritagesYearSuspense } from "@@@/endpoints/heritage/heritage";

export default function useHeritagesViewModel() {
  const router = useRouter();
  const { isLoading, data, isError, refetch } =
    useGetApiV2HeritagesYearSuspense();

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
