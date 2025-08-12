import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetApiV2HeritagesYearSuspense } from "@@@/endpoints/heritage/heritage";

export default function useHeritagesViewModel() {
  const router = useRouter();
  const { isLoading, data, isError } = useGetApiV2HeritagesYearSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
