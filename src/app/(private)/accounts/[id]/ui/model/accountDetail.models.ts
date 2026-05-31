import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useGetApiAccountsIdSuspense } from "@@@/endpoints/account/account";
import { useGetApiMovementsSuspense } from "@@@/endpoints/movement/movement";
import { useGetApiEventsSuspense } from "@@@/endpoints/event/event";
import { useGetApiReportsAccountIdBalanceSuspense } from "@@@/endpoints/report/report";
import { GetApiMovements200ContentItem } from "@@@/domain/models";

const useAccount = () => {
  const param = useParams();

  const router = useRouter();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [listMovements, setListMovement] = useState<
    GetApiMovements200ContentItem[]
  >([]);
  const [filters, setFilters] = useState({
    event_id: null,
    start_date: null,
    end_date: null,
    category: null,
    amount: null,
    description: null,
  });

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    },
  });

  const { isLoading, data, isError } = useGetApiAccountsIdSuspense(
    String(param.id)
  );
  const { data: dataBalance, refetch: refetchBalance } =
    useGetApiReportsAccountIdBalanceSuspense(String(param.id));

  const {
    isLoading: loadingMovement,
    data: dataMovements,
    refetch: refreshMove,
  } = useGetApiMovementsSuspense({
    accountId: String(param.id),
    page: page.toString(),
  });

  const { data: dataListEvents, isError: isErrorEvents } =
    useGetApiEventsSuspense();

  /**
   * ⚡ Bolt Optimization: Stabilize form submission callback.
   */
  const onSubmit = useCallback((data: any) => {
    setPage(1);
    setFilters(data);
  }, []);

  /**
   * ⚡ Bolt Optimization: Stabilize reset callback.
   */
  const handleResetFilters = useCallback(() => {
    reset({
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    });
    setPage(1);
    setFilters({
      event_id: null,
      start_date: null,
      end_date: null,
      category: null,
      amount: null,
      description: null,
    });
  }, [reset]);

  useEffect(() => {
    refreshMove();
    refetchBalance();
    if (isError || isErrorEvents) router.push("/login");
  }, [isError, isErrorEvents, router, refreshMove, refetchBalance]);

  /**
   * ⚡ Bolt Optimization: Memoize events list.
   * 🎯 Problem: Transforming API data in a useEffect causes an extra render cycle.
   * 📊 Impact: Derived data is available immediately when dataListEvents arrives.
   */
  const listEvents = useMemo(() => {
    if (!dataListEvents?.content) return [];
    return dataListEvents.content.map((event) => ({
      label: event.name,
      value: event.id,
    }));
  }, [dataListEvents]);

  /**
   * ⚡ Bolt Optimization: Optimized transaction list synchronization.
   * 🎯 Problem: Adding listMovements to dependencies caused an infinite loop.
   * 📊 Impact: Uses functional updates to append data without re-triggering the effect.
   */
  useEffect(() => {
    if (!dataMovements?.content) {
      return;
    }

    setListMovement((prev) => {
      const combinedUniqueMovements = new Set([
        ...(page > 1 ? prev : []),
        ...dataMovements.content,
      ]);
      return Array.from(combinedUniqueMovements);
    });
  }, [dataMovements?.content, page]);

  return {
    data,
    isLoading,
    search,
    setSearch,
    control,
    handleSubmit,
    onSubmit,
    listEvents,
    handleResetFilters,
    setPage,
    listMovements,
    loadingMovement,
    meta: dataMovements?.meta,
    dataBalance,
  };
};

export default useAccount;
