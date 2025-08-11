import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiV2EventsSuspense } from "@@@/endpoints/event/event";

const useEvents = () => {
  const router = useRouter();
  const { isLoading, data, isError, refetch } = useGetApiV2EventsSuspense();

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
