import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { ReportUseCase } from "@@/application/report.use-case";
import { ReportApiAdapter } from "@@/infrastructure/report-api.adapter";

import { customConfigHeader, driverWelcome } from "@/share/helpers";

import { useGetApiV2ReportsTypePeriodSuspense } from "@@@/endpoints/report/report";

export default function useDashboardViewModel() {
  const router = useRouter();
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [typeReport, setTypeReport] = useState<"expensive" | "income">(
    "expensive"
  );
  const [periodReport, setPeriodReport] = useState<
    "monthly" | "daily" | "weekly" | "yearly"
  >("monthly");
  const [listMovements, setListMovements] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    datePurchase: null,
    weekNumber: null,
    badgeId: undefined,
  });

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
      ...filters,
    },
    {
      query: {
        queryKey: ["report", typeReport, periodReport],
      },
    }
  );

  const onSubmit = (data: any) => {
    setFilters({ ...data, badgeId: data.badgeId?.value });
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

  useEffect(() => {
    if (isError) router.push("/login");
  }, [isError]);

  useEffect(() => {
    const user = localStorage.getItem("fiona-user");
    if (user) {
      const userjson = JSON.parse(user);
      setCurrencyOptions(
        userjson.badges.map((v: any) => {
          return { label: v.code, value: v.id };
        })
      );
      setValue(
        "badgeId",
        userjson.badges.find((v: any) => v.id == userjson.badgeId)
      );
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
  };
}
