"use client";
import { useEffect, useState, memo } from "react";
import { Controller } from "react-hook-form";
import {
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  Legend,
  LineChart,
} from "recharts";
import { getISOWeeksInYear } from "date-fns";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

import {
  formatCurrency,
  driverDash,
  getCurrencyFormatter,
  getWeekDateRange,
} from "@/share/helpers";

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

function CustomizedTick(props: any) {
  const { x, y, stroke, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={24} fill="#666">
        <tspan textAnchor="middle">{new Date(payload.value).getDate()}</tspan>
      </text>
    </g>
  );
}

const formatYAxisTick = (value: number) => {
  if (Math.abs(value) >= 1000000000) {
    return (value / 1000000000).toFixed(1) + "B";
  }
  if (Math.abs(value) >= 1000000) {
    return (value / 1000000).toFixed(1) + "M";
  }
  if (Math.abs(value) >= 1000) {
    return (value / 1000).toFixed(1) + "K";
  }
  return value;
};

const currencyFormatter = (value: number, name: string) => {
  // Retorna el valor formateado y el nombre de la serie
  return [getCurrencyFormatter("USD", value), name];
};

/**
 * ⚡ Bolt Optimization: Memoization of Dashboard View
 * 🎯 Problem: Main entry point for the dashboard, containing multiple complex charts and lists.
 * 📊 Impact: Skips the expensive reconciliation of the entire dashboard layout when
 *    the parent Page component re-renders without prop changes.
 */
const Dashboard = memo((props: any) => {
  const {
    data,
    currencyOptions = [],
    control,
    onSubmit,
    handleSubmit,
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
  } = props;
  const {
    Typography,
    Input,
    FormControl,
    Button,
    TitleHelp,
    AutoComplete,
    SlideStepper,
  } = useComponents();
  const { ListItems, Filters, Cards } = useComponentsLayout();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalWeeks = getISOWeeksInYear(new Date(filters.year, 0, 1));

  return (
    <div className="space-y-wf-gutter">
      <div className="flex flex-col gap-wf-xs mb-wf-lg">
        <TitleHelp
          title="Panel de Control"
          onClick={driverDash}
          className="text-wf-primary font-wf-headline-lg"
        />
        <Typography className="text-wf-on-surface-variant font-wf-body-regular">
          Visualiza el estado consolidado de tus finanzas en tiempo real.
        </Typography>
      </div>

      <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md border-b border-wf-surface-variant/30 pb-wf-md mb-wf-md">
          <div className="flex flex-wrap items-center gap-wf-md justify-center lg:justify-start">
            {listOptionsTypeReport.map((type: any, index: number) => (
              <button
                key={index}
                className={`px-wf-md py-wf-xs rounded-full font-wf-label-caps text-[11px] uppercase tracking-wider transition-all ${
                  type.value === typeReport
                    ? "bg-wf-primary text-wf-on-primary shadow-sm"
                    : "text-wf-surface-tint hover:bg-wf-surface-container-low"
                }`}
                onClick={type.onClick}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-wf-sm justify-center lg:justify-start">
            {listOptionsPeriodReport.map((type: any, index: number) => (
              <button
                key={index}
                className={`px-wf-md py-wf-xs rounded-full font-wf-label-caps text-[11px] uppercase tracking-wider transition-all ${
                  type.value === periodReport
                    ? "bg-wf-primary text-wf-on-primary shadow-sm"
                    : "text-wf-surface-tint hover:bg-wf-surface-container-low"
                }`}
                onClick={type.onClick}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-wf-xl py-wf-sm">
          <div className="flex items-center gap-wf-sm bg-wf-surface-container-low/50 px-wf-md py-wf-xs rounded-full border border-white/30">
            <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase">
              Año
            </span>
            <SlideStepper
              value={filters.year}
              min={new Date().getFullYear() - 10}
              max={new Date().getFullYear()}
              onChange={(val) => handleChangeSlideStepper(val, "year")}
            />
          </div>

          {periodReport === "monthly" && (
            <div className="flex items-center gap-wf-sm bg-wf-surface-container-low/50 px-wf-md py-wf-xs rounded-full border border-white/30">
              <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase">
                Mes
              </span>
              <SlideStepper
                value={monthIndex}
                min={0}
                max={11}
                onChange={(val) => handleChangeSlideStepper(val, "month")}
                formatValue={(val) => monthNames[val]}
              />
            </div>
          )}

          {periodReport === "weekly" && (
            <div className="flex items-center gap-wf-sm bg-wf-surface-container-low/50 px-wf-md py-wf-xs rounded-full border border-white/30">
              <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase">
                Semana
              </span>
              <SlideStepper
                value={selectedWeek}
                min={1}
                max={totalWeeks}
                onChange={(val) => handleChangeSlideStepper(val, "week")}
                formatValue={(val) => getWeekDateRange(filters.year, val)}
              />
            </div>
          )}

          <div className="w-full flex justify-center md:justify-end md:w-auto md:ml-auto">
            <Filters>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-wf-md p-wf-md"
              >
                <Controller
                  name={"badgeId"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <AutoComplete
                        label="Moneda"
                        placeholder="Selecciona moneda"
                        id="badgeId"
                        instanceId="badge-select"
                        handleOnChange={onChange}
                        options={currencyOptions}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={"startDate"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <Input
                        type="date"
                        label="Desde"
                        onChange={onChange}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={"endDate"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <Input
                        type="date"
                        label="Hasta"
                        onChange={onChange}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    </FormControl>
                  )}
                />
                <Button type="submit" className="w-full">
                  Aplicar Filtros
                </Button>
              </form>
            </Filters>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-wf-gutter">
        <div className="lg:col-span-7 bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
          <div className="flex justify-between items-center mb-wf-lg">
            <Typography className="font-wf-headline-md text-wf-primary">
              Distribución de Movimientos
            </Typography>
            <div className="px-wf-sm py-1 bg-wf-surface-container rounded-md text-[10px] font-wf-label-caps text-wf-surface-tint">
              TOTAL: {data[0]?.symbol}
              {getCurrencyFormatter(
                data[0]?.code,
                data?.reduce((sum: number, item: any) => sum + item.amount, 0),
              )}
            </div>
          </div>

          <div className="h-[380px] w-full relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={4}
                    cx="50%"
                    cy="50%"
                  >
                    {Array.isArray(data) &&
                      data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={(value) => [
                      `${data[0]?.symbol}${getCurrencyFormatter(data[0]?.code, Number(value))}`,
                      "Monto",
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
              <div className="h-full w-full bg-wf-surface-container-lowest/50 animate-pulse rounded-lg" />
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <ListItems
            title="Consolidado por Categoría"
            data={data}
            variant="modal"
            showHistory
            onClickModal={getMovements}
            dataModal={listMovements}
          />
        </div>
      </div>

      {dataBalance?.length > 0 && (
        <div className="mt-wf-xl">
          <Cards title="balance" data={dataBalance} />
        </div>
      )}

      {dataHistory && (
        <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 mt-wf-xl">
          <div className="flex justify-between items-center mb-wf-lg">
            <Typography className="font-wf-headline-md text-wf-primary">
              Historial de Balance
            </Typography>
            <div className="flex gap-wf-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
                <span className="text-[10px] text-wf-surface-tint">Actual</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
                <span className="text-[10px] text-wf-surface-tint">
                  Anterior
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-[#ffc658]"></div>
                <span className="text-[10px] text-wf-surface-tint">
                  Año Pasado
                </span>
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(0,0,0,0.05)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#888" }}
                    type="number"
                    domain={[1, 31]}
                  />
                  <YAxis
                    tickFormatter={formatYAxisTick}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#888" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      backdropFilter: "blur(8px)",
                    }}
                    formatter={currencyFormatter}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Actual"
                    data={dataHistory.current.map((v: any, i: number) => ({
                      ...v,
                      day: i + 1,
                    }))}
                    stroke="#8884d8"
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Anterior"
                    data={dataHistory.previousPeriod.map(
                      (v: any, i: number) => ({
                        ...v,
                        day: i + 1,
                      }),
                    )}
                    stroke="#82ca9d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Año Pasado"
                    data={dataHistory.lastYear.map((v: any, i: number) => ({
                      ...v,
                      day: i + 1,
                    }))}
                    stroke="#ffc658"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-wf-surface-container-lowest/50 animate-pulse rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default Dashboard;
