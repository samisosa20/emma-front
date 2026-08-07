"use client";
import React, { memo, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

// Components
import useComponents from "@/share/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const IncomeDistribution = memo((props: any) => {
  const {
    report,
    currencyOptions,
    control,
    handleSubmit,
    onSubmit,
    filters,
    monthIndex,
    handleChangeSlideStepper,
  } = props;

  const { Typography, AutoComplete, FormControl, SlideStepper } =
    useComponents();
  const router = useRouter();

  const formatMonth = useCallback((val: number) => monthNames[val], []);

  // Compute chart data for Recharts Pie Chart
  const pieData = useMemo(() => {
    if (!report) return [];
    return [
      {
        name: "Gastos Fijos",
        value: Math.abs(report.fijos.actualAmount),
        color: "#3B82F6",
      }, // Blue
      {
        name: "Gastos Personales",
        value: Math.abs(report.personales.actualAmount),
        color: "#F59E0B",
      }, // Amber
      {
        name: "Inversión / Ahorros",
        value: Math.abs(report.ahorros.actualAmount),
        color: "#10B981",
      }, // Emerald
    ].filter((item) => item.value > 0);
  }, [report]);

  // Determine alert levels for 50/30/20 rule
  const getFijosColorClass = (pct: number) => {
    if (pct <= 50)
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (pct <= 60) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };

  const getPersonalesColorClass = (pct: number) => {
    if (pct <= 30)
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (pct <= 35) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };

  const getAhorrosColorClass = (pct: number) => {
    if (pct >= 20)
      return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (pct >= 10) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-rose-500 bg-rose-500/10 border-rose-500/20";
  };

  const formattedTotalIncome = useMemo(() => {
    if (!report) return "$0.00";
    return `${report.badgeSymbol}${getCurrencyFormatter(report.badgeCode, report.totalIncome)}`;
  }, [report]);

  const formattedTotalExpenses = useMemo(() => {
    if (!report) return "$0.00";
    return `${report.badgeSymbol}${getCurrencyFormatter(report.badgeCode, report.totalExpenses)}`;
  }, [report]);

  return (
    <div className="space-y-wf-gutter pb-wf-xl">
      {/* Header section with back button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-wf-surface-container flex items-center justify-center text-wf-primary hover:bg-wf-primary hover:text-wf-on-primary transition-all active:scale-[0.95]"
            title="Volver"
          >
            <MdArrowBack className="text-[20px]" />
          </button>
          <div>
            <Typography className="text-wf-primary font-wf-headline-lg font-bold">
              Distribución de Ingresos 50/30/20
            </Typography>
            <Typography className="text-wf-on-surface-variant font-wf-body-regular">
              Analiza tus egresos del período clasificados según la regla de
              finanzas personales.
            </Typography>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="flex flex-wrap items-center justify-between gap-wf-md">
          {/* SlideSteppers for Date filtering */}
          <div className="flex flex-wrap items-center gap-wf-md">
            <div className="flex items-center gap-wf-sm bg-wf-surface-container-low/50 px-wf-md py-wf-xs rounded-full border border-white/30">
              <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                Año
              </span>
              <SlideStepper
                value={filters.year}
                min={new Date().getFullYear() - 5}
                max={new Date().getFullYear() + 1}
                onChange={handleChangeSlideStepper}
                type="year"
                decreaseAriaLabel="Disminuir año"
                increaseAriaLabel="Aumentar año"
              />
            </div>

            <div className="flex items-center gap-wf-sm bg-wf-surface-container-low/50 px-wf-md py-wf-xs rounded-full border border-white/30">
              <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                Mes
              </span>
              <SlideStepper
                value={monthIndex}
                min={0}
                max={11}
                onChange={handleChangeSlideStepper}
                type="month"
                formatValue={formatMonth}
                decreaseAriaLabel="Anterior mes"
                increaseAriaLabel="Siguiente mes"
              />
            </div>
          </div>

          {/* Currency Select Filter */}
          <div className="w-full md:w-64">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="badgeId"
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <AutoComplete
                      placeholder="Filtrar por divisa..."
                      id="badgeId"
                      instanceId="badge-select"
                      handleOnChange={(selected: any) => {
                        onChange(selected);
                        onSubmit({ badgeId: selected });
                      }}
                      options={currencyOptions}
                      value={value}
                    />
                  </FormControl>
                )}
              />
            </form>
          </div>
        </div>
      </div>

      {report && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-wf-gutter">
          {/* Main summary values */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-wf-md">
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">
                  trending_up
                </span>
              </div>
              <div>
                <Typography className="text-xs font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                  Ingresos Totales del Mes
                </Typography>
                <Typography className="text-2xl font-bold text-wf-primary">
                  {formattedTotalIncome}
                </Typography>
              </div>
            </div>

            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">
                  trending_down
                </span>
              </div>
              <div>
                <Typography className="text-xs font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                  Egresos Totales Clasificados
                </Typography>
                <Typography className="text-2xl font-bold text-wf-primary">
                  {formattedTotalExpenses}
                </Typography>
              </div>
            </div>
          </div>

          {/* Detailed rule distribution KPI cards */}
          <div className="lg:col-span-7 space-y-wf-md">
            {/* Gastos Fijos (50%) */}
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <Typography className="font-bold text-wf-primary text-base">
                    Gastos Fijos (50%)
                  </Typography>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getFijosColorClass(report.fijos.actualPercentage)}`}
                >
                  {report.fijos.actualPercentage}% del Ingreso
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-wf-surface-container-lowest/30 p-wf-md rounded-xl">
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Ejecutado
                  </span>
                  <span className="font-bold text-wf-primary">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.fijos.actualAmount,
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Objetivo (Límite)
                  </span>
                  <span className="font-bold text-wf-surface-tint">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.fijos.targetAmount,
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full h-3 bg-wf-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min((Math.abs(report.fijos.actualAmount) / (report.fijos.targetAmount || 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Gastos Personales (30%) */}
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <Typography className="font-bold text-wf-primary text-base">
                    Gastos Personales (30%)
                  </Typography>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPersonalesColorClass(report.personales.actualPercentage)}`}
                >
                  {report.personales.actualPercentage}% del Ingreso
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-wf-surface-container-lowest/30 p-wf-md rounded-xl">
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Ejecutado
                  </span>
                  <span className="font-bold text-wf-primary">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.personales.actualAmount,
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Objetivo (Límite)
                  </span>
                  <span className="font-bold text-wf-surface-tint">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.personales.targetAmount,
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full h-3 bg-wf-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min((Math.abs(report.personales.actualAmount) / (report.personales.targetAmount || 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            {/* Inversión / Ahorros (20%) */}
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <Typography className="font-bold text-wf-primary text-base">
                    Inversión / Ahorros (20%)
                  </Typography>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getAhorrosColorClass(report.ahorros.actualPercentage)}`}
                >
                  {report.ahorros.actualPercentage}% del Ingreso
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm bg-wf-surface-container-lowest/30 p-wf-md rounded-xl">
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Ejecutado
                  </span>
                  <span className="font-bold text-wf-primary">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.ahorros.actualAmount,
                    )}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-wf-on-surface-variant block">
                    Objetivo (Mínimo)
                  </span>
                  <span className="font-bold text-wf-surface-tint">
                    {report.badgeSymbol}
                    {getCurrencyFormatter(
                      report.badgeCode,
                      report.ahorros.targetAmount,
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full h-3 bg-wf-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  style={{
                    width: `${Math.min((Math.abs(report.ahorros.actualAmount) / (report.ahorros.targetAmount || 1)) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Pie/Donut Chart container */}
          <div className="lg:col-span-5 bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 flex flex-col justify-between">
            <div>
              <Typography className="font-bold text-wf-primary text-lg mb-2">
                Distribución del Gasto Real
              </Typography>
              <Typography className="text-xs text-wf-on-surface-variant">
                Análisis visual de los egresos actuales clasificados en las 3
                grandes categorías.
              </Typography>
            </div>

            <div className="h-[260px] w-full flex items-center justify-center my-4">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(255, 255, 255, 0.95)",
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(8px)",
                      }}
                      formatter={(value: any) => [
                        `${report.badgeSymbol}${getCurrencyFormatter(report.badgeCode, Number(value))}`,
                        "Gasto Real",
                      ]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center text-wf-on-surface-variant/60">
                  <span className="material-symbols-outlined text-[48px] mb-2">
                    pie_chart_outlined
                  </span>
                  <Typography className="text-xs italic">
                    Sin gastos registrados en el periodo
                  </Typography>
                </div>
              )}
            </div>
          </div>

          {/* Breakdown table of categories */}
          <div className="lg:col-span-12 bg-wf-on-primary backdrop-blur-md rounded-2xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 space-y-4">
            <div>
              <Typography className="font-bold text-wf-primary text-lg">
                Desglose por Categoría de Gasto
              </Typography>
              <Typography className="text-xs text-wf-on-surface-variant mt-1">
                Participación porcentual de cada categoría sobre tus egresos
                totales clasificados.
              </Typography>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-wf-surface-variant/20 pb-2">
                    <th className="py-3 text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                      Categoría
                    </th>
                    <th className="py-3 text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold hidden md:table-cell">
                      Grupo de Regla
                    </th>
                    <th className="py-3 text-right text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                      Monto Total
                    </th>
                    <th className="py-3 text-right text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold w-32 md:w-48">
                      Participación
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wf-surface-variant/10 text-sm">
                  {report.categories.map((cat: any) => {
                    let badgeColor =
                      "bg-blue-500/10 text-blue-500 border-blue-500/20";
                    let badgeLabel = "Fijo";
                    if (cat.ruleGroup === "ahorros") {
                      badgeColor =
                        "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
                      badgeLabel = "Ahorro/Inv";
                    } else if (cat.ruleGroup === "personales") {
                      badgeColor =
                        "bg-amber-500/10 text-amber-500 border-amber-500/20";
                      badgeLabel = "Personal";
                    }

                    return (
                      <tr
                        key={cat.id}
                        className="hover:bg-wf-surface-container-lowest/20 transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: cat.color }}
                            />
                            <div>
                              <span className="font-bold text-wf-primary block">
                                {cat.name}
                              </span>
                              <span className="text-[10px] text-wf-on-surface-variant md:hidden">
                                {badgeLabel}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 hidden md:table-cell">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}
                          >
                            {badgeLabel}
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-wf-primary">
                          {report.badgeSymbol}
                          {getCurrencyFormatter(report.badgeCode, cat.amount)}
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-end gap-2">
                            <div className="w-20 md:w-28 bg-wf-surface-container h-2 rounded-full overflow-hidden hidden sm:block">
                              <div
                                className="h-full transition-all duration-300"
                                style={{
                                  backgroundColor: cat.color || "#6b7280",
                                  width: `${cat.participation}%`,
                                }}
                              />
                            </div>
                            <span className="font-mono text-xs font-semibold text-wf-primary w-12 text-right">
                              {cat.participation}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {report.categories.length === 0 && (
              <div className="text-center py-8 text-wf-on-surface-variant/60 italic">
                No se registraron egresos en el período seleccionado.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

IncomeDistribution.displayName = "IncomeDistribution";
export default IncomeDistribution;
