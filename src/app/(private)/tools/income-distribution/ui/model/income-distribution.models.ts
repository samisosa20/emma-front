import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useGetApiReportsIncomeDistributionSuspense } from "@@@/endpoints/report/report";
import { authClient } from "@/share/lib/auth-client";

export default function useIncomeDistributionViewModel() {
  const { data: session } = authClient.useSession();
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [filters, setFilters] = useState<{
    badgeId?: string;
    month: number;
    year: number;
  }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    badgeId: undefined,
  });

  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      badgeId: {},
    },
  });

  // Fetch 50/30/20 report data using the generated suspense hook
  const { data: rawReport } = useGetApiReportsIncomeDistributionSuspense(
    {
      month: filters.month,
      year: filters.year,
      ...(filters.badgeId && { badgeId: filters.badgeId }),
    },
    {
      query: {
        queryKey: ["report", "income-distribution", Object.values(filters)],
      },
    }
  );

  const report = useMemo(() => {
    return (rawReport as any)?.data ?? rawReport ?? null;
  }, [rawReport]);

  const handleChangeSlideStepper = useCallback((
    val: number,
    type: "month" | "year"
  ) => {
    if (type === "month") {
      setMonthIndex(val);
      setFilters((prev) => ({ ...prev, month: val + 1 }));
    }
    if (type === "year") {
      setFilters((prev) => ({ ...prev, year: val }));
    }
  }, []);

  const onSubmit = (data: any) => {
    setFilters((prev) => ({ ...prev, badgeId: data.badgeId?.value }));
  };

  useEffect(() => {
    if (session?.user) {
      const badges = session?.badges || [];
      setCurrencyOptions(
        badges.map((v) => ({
          label: String(v.code),
          value: String(v.id),
        }))
      );
      const badgePreselect = badges.find((v: any) => v.id === session.user.badgeId);
      if (badgePreselect) {
        setValue("badgeId", {
          label: badgePreselect.code,
          value: badgePreselect.id,
        });
        setFilters((prev) => ({ ...prev, badgeId: badgePreselect.id }));
      }
    }
  }, [session, setValue]);

  return {
    report,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    filters,
    monthIndex,
    handleChangeSlideStepper,
  };
}
