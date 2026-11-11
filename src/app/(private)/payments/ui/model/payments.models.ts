import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useGetApiPlannedPaymentsSuspense } from "@@@/endpoints/planned-payment/planned-payment";

export default function usePaymentsViewModel() {
  const router = useRouter();
  const { isLoading, data, isError } = useGetApiPlannedPaymentsSuspense();

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError, router]);

  return {
    data,
    isLoading,
  };
}
