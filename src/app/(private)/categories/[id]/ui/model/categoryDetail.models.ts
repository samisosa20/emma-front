"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { useGetApiV2CategoriesIdSuspense } from "@@@/endpoints/category/category";
import { useGetApiV2Movements } from "@@@/endpoints/movement/movement";
import { GetApiV2Movements200ContentItem } from "@@@/domain/models";

export default function useCategoryDetailViewModel() {
  const param = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currencyParams = searchParams.get("c");

  const [isChecked, setIsChecked] = useState(true);
  const [search, setSearch] = useState("");
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [filters, setFilters] = useState({
    badge_id: currencyParams,
  });
  const [currency, setCurrency] = useState("");
  const [page, setPage] = useState(1);
  const [listMovements, setListMovement] = useState<
    GetApiV2Movements200ContentItem[]
  >([]);

  const { handleSubmit, control, setValue } = useForm();

  const { isLoading, data, isError } = useGetApiV2CategoriesIdSuspense(
    String(param.id),
    {
      query: {
        queryKey: ["categoryDetail", param.id ?? 0],
      },
    }
  );

  const {
    isLoading: loadingMovement,
    data: dataMovements,
    refetch: refreshMove,
  } = useGetApiV2Movements({
    categoryId: String(param.id),
    page: page.toString(),
  });

  const handleToggle = () => {
    setSearch("");
    setIsChecked(!isChecked);
  };

  const onSubmit = (data: any) => {
    setFilters({ ...data, badge_id: data.badge_id?.value });
    setCurrency(data?.badge_id?.label);
  };

  useEffect(() => {
    refreshMove();
    if (isError) router.push("/login");
  }, [isError, router]);

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

  useEffect(() => {
    const user = localStorage.getItem("fiona-user");
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
      /* setValue(
        "badge_id",
        userjson.currencies.find((v: any) => {
          if (currencyParams) return v.value == currencyParams;
          return v.value == userjson.currency;
        })
      );
      setCurrency(
        userjson.currencies.find((v: any) => {
          if (currencyParams) return v.value == currencyParams;
          return v.value == userjson.currency;
        }).label
      ); */
    }
  }, []);

  return {
    isLoading,
    data,
    setSearch,
    handleToggle,
    search,
    isChecked,
    currencyOptions,
    control,
    onSubmit,
    handleSubmit,
    currency,
    loadingMovement,
    listMovements,
    meta: dataMovements?.meta,
    setPage,
  };
}
