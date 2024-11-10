import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { CategoryUseCase } from "@@/application/category.use-case";
import { CategoryApiAdapter } from "@@/infrastructure/category-api.adapter";

import { customConfigHeader } from "@/share/helpers";

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

  const { handleSubmit, control, setValue } = useForm();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["categoryDetail", filters],
    queryFn: async () => {
      const { getCategoryDetail } = new CategoryUseCase(
        new CategoryApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );
      if (param.id) {
        const id = Array.isArray(param.id)
          ? parseInt(param.id[0])
          : parseInt(param.id);
        const result = await getCategoryDetail(id, filters);

        if (result.status === 401) {
          localStorage.removeItem("fiona-user");
          router.push("/login");
        }

        return result;
      }
    },
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
    if (isError) router.push("/login");
  }, [isError, router]);

  useEffect(() => {
    const user = localStorage.getItem("fiona-user");
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(userjson.currencies);
      setValue(
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
      );
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
  };
}
