import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getISOWeek, format, startOfMonth, endOfMonth } from "date-fns";
import { useRouter } from "next/navigation";

import { driverWelcome } from "@/share/helpers";
import { useUserStore } from "@/share/storage";

import {
  useGetApiReportsTypePeriodSuspense,
  useGetApiReportsGeneralBalanceSuspense,
  useGetApiReportsHistorySuspense,
  getApiReportsHistory,
} from "@@@/endpoints/report/report";

export default function useDashboardViewModel() {
  const router = useRouter();
  const { badges, user } = useUserStore();
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

  const listOptionsTypeReport = [
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
  ];

  const listOptionsPeriodReport = [
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
  ];

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

  const data = Array.isArray(rawData) ? rawData : (rawData as any)?.data ?? [];

  const { data: rawDataBalance, refetch: refetchBalance } =
    useGetApiReportsGeneralBalanceSuspense();

  const dataBalance = Array.isArray(rawDataBalance) ? rawDataBalance : (rawDataBalance as any)?.data ?? [];

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

  const dataHistory = (rawDataHistory as any)?.data ?? rawDataHistory;

  const onSubmit = async (data: any) => {
    setFilters((prev) => ({ ...prev, badgeId: data.badgeId?.value }));
    const result = await getApiReportsHistory({
      badgeId: data.badgeId?.value as string,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    });
    setHistoryBalance(result);
  };

  const getMovements = async (id: number) => {
    if (id) {
      setListMovements([]);
    } else {
      setListMovements([]);
    }
  };

  /* const getMovementsGroup = async (id: number) => {
    if (id) {
      const { getReportGroup } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

     const result = await getReportGroup({
        ...filters,
        group_id: id.toString(),
      });

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push("/login");
      }

      // @ts-ignore
      setListMovements(result); 
    } else {
      setListMovements([]);
    }
  };*/

  const handleChangeSlideStepper = (
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
  };

  useEffect(() => {
    refetchBalance();
    if (isError) router.push("/login");
  }, [isError]);

  useEffect(() => {
    if (user) {
      setCurrencyOptions(
        badges?.map((v) => {
          return {
            label: String(v.code),
            value: String(v.id),
          };
        })
      );
      const badgePreselect = badges.find((v: any) => v.id == user.badgeId);
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
  };
}
