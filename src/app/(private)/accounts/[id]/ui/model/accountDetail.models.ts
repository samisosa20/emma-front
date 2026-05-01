import { useEffect, useState } from "react";
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
  const [listEvents, setListEvents] = useState<any[]>([]);
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

  const onSubmit = (data: any) => {
    setPage(1);
    setFilters(data);
  };

  const handleResetFilters = () => {
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
  };

  useEffect(() => {
    refreshMove();
    refetchBalance();
    if (isError || isErrorEvents) router.push("/login");
  }, [isError, isErrorEvents, router]);

  useEffect(() => {
    if (dataListEvents && Array.isArray(dataListEvents?.content)) {
      setListEvents(
        dataListEvents?.content.map((event) => {
          return { label: event.name, value: event.id };
        })
      );
    }
  }, [dataListEvents]);

  useEffect(() => {
    if (!dataMovements?.content) {
      return;
    }

    const combinedUniqueMovements = new Set([
      ...(page > 1 ? listMovements : []),
      ...dataMovements.content,
    ]);

    setListMovement(Array.from(combinedUniqueMovements));
  }, [dataMovements?.content]);

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
