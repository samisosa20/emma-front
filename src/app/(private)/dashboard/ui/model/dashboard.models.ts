import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { ReportUseCase } from "@@/application/report.use-case";
import { ReportApiAdapter } from "@@/infrastructure/report-api.adapter";

import { customConfigHeader, driverWelcome } from "@/share/helpers";

import { useGetApiV2ReportsTypePeriodSuspense } from "@@@/endpoints/report/report";
import { getISOWeek } from "date-fns";
import { useUserStore } from "@/share/storage";

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

  const { handleSubmit, control, setValue } = useForm();

  const { isLoading, data, isError } = useGetApiV2ReportsTypePeriodSuspense(
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

  const onSubmit = (data: any) => {
    setFilters((prev) => ({ ...prev, badgeId: data.badgeId?.value }));
  };

  const getMovements = async (id: number) => {
    if (id) {
      const { getReportCategory } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      /* const result = await getReportCategory({
        ...filters,
        category_id: id.toString(),
      });

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push("/login");
      }

      // @ts-ignore
      setListMovements(result); */
    } else {
      setListMovements([]);
    }
  };

  const getMovementsGroup = async (id: number) => {
    if (id) {
      const { getReportGroup } = new ReportUseCase(
        new ReportApiAdapter({
          baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
          customConfig: customConfigHeader(),
        })
      );

      /* const result = await getReportGroup({
        ...filters,
        group_id: id.toString(),
      });

      if (result.status === 401) {
        localStorage.removeItem("fiona-user");
        router.push("/login");
      }

      // @ts-ignore
      setListMovements(result); */
    } else {
      setListMovements([]);
    }
  };

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
    getMovementsGroup,
    listMovements,
    listOptionsTypeReport,
    typeReport,
    listOptionsPeriodReport,
    periodReport,
    filters,
    monthIndex,
    handleChangeSlideStepper,
    selectedWeek,
  };
}
