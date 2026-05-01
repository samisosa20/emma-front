import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetApiHeritagesYearSuspense } from "@@@/endpoints/heritage/heritage";

export default function useHeritagesViewModel() {
  const router = useRouter();
  const { isLoading, data, isError, refetch } =
    useGetApiHeritagesYearSuspense();

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
