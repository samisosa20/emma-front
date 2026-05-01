import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiEventsSuspense } from "@@@/endpoints/event/event";

const useEvents = () => {
  const router = useRouter();
  const { isLoading, data, isError, refetch } = useGetApiEventsSuspense();

  useEffect(() => {
    refetch();
    if (isError) router.push("/login");
  }, [isError]);

  return {
    data,
    isLoading,
  };
};

export default useEvents;
