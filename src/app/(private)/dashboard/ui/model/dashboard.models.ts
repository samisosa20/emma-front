import { useEffect, useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { getISOWeek, format, startOfMonth, endOfMonth } from "date-fns";
import { useRouter } from "next/navigation";

import { driverWelcome } from "@/share/helpers";

import {
  useGetApiReportsTypePeriodSuspense,
  useGetApiReportsGeneralBalanceSuspense,
  useGetApiReportsHistorySuspense,
  getApiReportsHistory,
} from "@@@/endpoints/report/report";

import {
  getApiMovements
} from "@@@/endpoints/movement/movement";
import { authClient } from "@/share/lib/auth-client";

export default function useDashboardViewModel() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [currencyOptions, setCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [typeReport, setTypeReport] = useState<"expensive" | "income">(
    "expensive"
  );
  const [periodReport, setPeriodReport] = useState<
    "monthly" | "daily" | "weekly" | "yearly"
  >("monthly");
  const [listMovements, setListMovements] = useState<any[]>([]);
  const [historyBalance, setHistoryBalance] = useState<any>({
    current: [],
    lastYear: [],
    previousPeriod: [],
  });
  const [filters, setFilters] = useState<{
    badgeId?: number;
    month?: number;
    year?: number;
    datePurchase?: string | null;
    weekNumber?: number | null;
  }>({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    datePurchase: null,
    weekNumber: getISOWeek(new Date()),
    badgeId: undefined,
  });
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [selectedWeek, setSelectedWeek] = useState<number | null>(
    getISOWeek(new Date())
  );
  const [isOpen, setIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('');

  /**
   * ⚡ Bolt Optimization: Memoized configuration arrays
   * 🎯 Problem: These arrays were being recreated on every render, causing
   *    memoized children components to re-render due to new object references.
   * 📊 Impact: Stabilizes references for listOptions, preventing unnecessary
   *    re-renders in the Dashboard's navigation buttons.
   */
  const listOptionsTypeReport = useMemo(() => [
    {
      label: "Gastos",
      value: "expensive",
      onClick: () => setTypeReport("expensive"),
    },
    {
      label: "Ingresos",
      value: "income",
      onClick: () => setTypeReport("income"),
    },
  ], []);

  const listOptionsPeriodReport = useMemo(() => [
    {
      label: "Diario",
      value: "daily",
      onClick: () => setPeriodReport("daily"),
    },
    {
      label: "Semanal",
      value: "weekly",
      onClick: () => setPeriodReport("weekly"),
    },
    {
      label: "Mensual",
      value: "monthly",
      onClick: () => setPeriodReport("monthly"),
    },
    {
      label: "Anual",
      value: "yearly",
      onClick: () => setPeriodReport("yearly"),
    },
  ], []);

  const { handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      endDate: new Date(),
      startDate: new Date(),
      badgeId: {},
    },
  });

  const { isLoading, data: rawData, isError } = useGetApiReportsTypePeriodSuspense(
    typeReport,
    periodReport,
    {
      ...(periodReport === "monthly" && {
        month: filters.month,
        year: filters.year,
      }),
      ...(periodReport === "yearly" && { year: filters.year }),
      ...(periodReport === "weekly" && {
        weekNumber: filters.weekNumber,
        year: filters.year,
      }),
      ...(filters.badgeId && { badgeId: String(filters.badgeId) }),
    },
    {
      query: {
        queryKey: ["report", typeReport, periodReport, Object.values(filters)],
      },
    }
  );

  /**
   * ⚡ Bolt Optimization: Memoize report data to ensure stable references
   * for memoized child components like Dashboard and ListItems.
   */
  const data = useMemo(
    () => (Array.isArray(rawData) ? rawData : (rawData as any)?.data ?? []),
    [rawData],
  );

  const { data: rawDataBalance, refetch: refetchBalance } =
    useGetApiReportsGeneralBalanceSuspense();

  const dataBalance = useMemo(
    () =>
      Array.isArray(rawDataBalance)
        ? rawDataBalance
        : (rawDataBalance as any)?.data ?? [],
    [rawDataBalance],
  );

  const today = new Date();

  // Fecha de inicio: el primer día del mes actual
  const firstDayOfMonth = startOfMonth(today);

  // Fecha de fin: el último día del mes actual
  const lastDayOfMonth = endOfMonth(today);

  // Llama a la API con las fechas formateadas
  const { data: rawDataHistory } = useGetApiReportsHistorySuspense({
    ...(filters.badgeId && { badgeId: String(filters.badgeId) }),
    startDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    endDate: format(lastDayOfMonth, "yyyy-MM-dd"),
  });

  /**
   * ⚡ Bolt Optimization: Pre-transform and memoize history data.
   * Moving the .map calls for adding 'day' property out of the render loop
   * of the Dashboard view component.
   */
  const dataHistory = useMemo(() => {
    const raw = (rawDataHistory as any)?.data ?? rawDataHistory;
    if (!raw) return null;

    return {
      current: (raw.current || []).map((v: any, i: number) => ({
        ...v,
        day: i + 1,
      })),
      previousPeriod: (raw.previousPeriod || []).map((v: any, i: number) => ({
        ...v,
        day: i + 1,
      })),
      lastYear: (raw.lastYear || []).map((v: any, i: number) => ({
        ...v,
        day: i + 1,
      })),
    };
  }, [rawDataHistory]);

  const onSubmit = async (data: any) => {
    setFilters((prev) => ({ ...prev, badgeId: data.badgeId?.value }));
    const result = await getApiReportsHistory({
      badgeId: data.badgeId?.value as string,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
    setHistoryBalance(result);
  };

  const getMovements = async (id: string) => {
    if (id) {
      getMovementsGroup(id);
    } else {
      setListMovements([]);
    }
  };

  const getMovementsGroup = async (id: string) => {
    if (id) {
      setCategoryId(id);
      setIsOpen(true);
      const result = await getApiMovements({
        categoryId: id,
        ...(periodReport === "monthly" && {
        month: filters.month,
        year: filters.year,
      }),
      ...(periodReport === "yearly" && { year: filters.year }),
      ...(periodReport === "weekly" && {
        weekNumber: filters.weekNumber,
        year: filters.year,
      }),
        ...(getValues('badgeId')?.value && { badgeId: String(getValues('badgeId')?.value) }),
        size: '50',
      });

      // @ts-ignore
      setListMovements(result?.content || []); 
    } else {
      setListMovements([]);
    }
  };

  /**
   * ⚡ Bolt Optimization: Stabilize SlideStepper callback.
   * 🎯 Problem: Every time the Dashboard re-renders, a new function reference
   *    was passed to SlideStepper, bypassing its memoization.
   * 📊 Impact: Allows SlideStepper to skip re-renders when unrelated state changes.
   */
  const handleChangeSlideStepper = useCallback((
    val: number,
    type: "week" | "month" | "year"
  ) => {
    if (type === "month") {
      setMonthIndex(val);
      setFilters((prev) => ({ ...prev, month: val + 1 }));
    }
    if (type === "year") {
      setFilters((prev) => ({ ...prev, year: val }));
    }
    if (type === "week") {
      setSelectedWeek(val);
      setFilters((prev) => ({ ...prev, weekNumber: val }));
    }
  }, []);

  useEffect(() => {
    refetchBalance();
    if (isError) router.push("/login");
  }, [isError]);

  useEffect(() => {
    if (session?.user) {
      const badges = session?.badges;
      setCurrencyOptions(
        badges?.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        })
      );
      const badgePreselect = badges.find((v: any) => v.id == session.user.badgeId);
      setValue("badgeId", {
        label: badgePreselect?.code,
        value: badgePreselect?.id,
      });
      if (!localStorage.getItem("fiona-doesntShow_help")) {
        driverWelcome();
      }
    }
  }, []);

  return {
    data,
    isLoading,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    getMovements,
    listMovements,
    listOptionsTypeReport,
    typeReport,
    listOptionsPeriodReport,
    periodReport,
    filters,
    monthIndex,
    handleChangeSlideStepper,
    selectedWeek,
    dataBalance,
    dataHistory,
    setIsOpen,
    isOpen,
    categoryId
  };
}
