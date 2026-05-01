import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiPlannedPaymentsSuspense } from "@@@/endpoints/planned-payment/planned-payment";

export default function usePaymentsViewModel() {
  const router = useRouter();
  const { isLoading, data, isError, refetch } =
    useGetApiPlannedPaymentsSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
    refetch();
  }, [isError]);

  return {
    data,
    isLoading,
  };
}
