import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useGetApiHeritagesYearSuspense } from "@@@/endpoints/heritage/heritage";

export default function useHeritagesViewModel() {
  const router = useRouter();
  const { isLoading, data, isError } = useGetApiHeritagesYearSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError, router]);

  return {
    data,
    isLoading,
  };
}
