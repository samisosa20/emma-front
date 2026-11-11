"use client";
import { useEffect, useState, memo, useMemo, useCallback } from "react";
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
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

import {
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
    setIsOpen,
    isOpen,
    categoryId,
  } = props;
  const {
    Typography,
    Input,
    FormControl,
    Button,
    TitleHelp,
    AutoComplete,
    SlideStepper,
    Modal,
  } = useComponents();
  const { ListItems, Filters, Cards, ListMovementsDetail } =
    useComponentsLayout();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  /**
   * ⚡ Bolt Optimization: Memoize derived dashboard metrics.
   * Prevents recalculating total weeks and total amounts on every re-render.
   */
  const totalWeeks = useMemo(
    () => getISOWeeksInYear(new Date(filters.year, 0, 1)),
    [filters.year],
  );

  const totalAmount = useMemo(
    () =>
      Array.isArray(data)
        ? data.reduce((sum: number, item: any) => sum + item.amount, 0)
        : 0,
    [data],
  );

  /**
   * ⚡ Bolt Optimization: Stabilize formatValue functions for SlideStepper.
   * 🎯 Problem: Inline arrow functions in props bypass React.memo.
   */
  const formatMonth = useCallback((val: number) => monthNames[val], []);
  const formatWeek = useCallback(
    (val: number) => getWeekDateRange(filters.year, val),
    [filters.year],
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col gap-1 mb-2 sm:mb-6">
        <TitleHelp
          title="Panel de Control"
          onClick={driverDash}
          className="text-emerald-400 font-wf-headline-lg font-bold text-2xl sm:text-3xl tracking-tight"
        />
        <Typography className="text-slate-400 font-wf-body-regular text-xs sm:text-sm">
          Visualiza el estado consolidado de tus finanzas en tiempo real.
        </Typography>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-3.5 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 w-full min-w-0 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 sm:gap-4 border-b border-slate-800/80 pb-3.5 sm:pb-4">
          <div className="grid grid-cols-2 sm:inline-flex items-center bg-slate-950/70 p-1 rounded-full border border-slate-800/80 w-full sm:w-auto gap-1">
            {listOptionsTypeReport.map((type: any, index: number) => (
              <button
                key={index}
                type="button"
                aria-pressed={type.value === typeReport}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-wider transition-all font-semibold text-center ${
                  type.value === typeReport
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
                onClick={type.onClick}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-4 sm:inline-flex items-center bg-slate-950/70 p-1 rounded-full border border-slate-800/80 w-full sm:w-auto gap-1">
            {listOptionsPeriodReport.map((type: any, index: number) => (
              <button
                key={index}
                type="button"
                aria-pressed={type.value === periodReport}
                className={`px-1.5 sm:px-3.5 py-1.5 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all font-semibold text-center truncate ${
                  type.value === periodReport
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
                onClick={type.onClick}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto] md:flex md:flex-wrap md:items-center gap-2.5 sm:gap-4">
          <div className="flex items-center justify-between md:justify-start gap-2 bg-slate-950/70 px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-xs min-w-0">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider shrink-0">
              Año
            </span>
            <SlideStepper
              value={filters.year}
              min={new Date().getFullYear() - 10}
              max={new Date().getFullYear()}
              onChange={handleChangeSlideStepper}
              type="year"
              decreaseAriaLabel="Disminuir año"
              increaseAriaLabel="Aumentar año"
            />
          </div>

          <div className="md:order-last md:ml-auto flex items-center justify-end">
            <Filters
              label="Filtros"
              buttonClassName="h-[34px] px-3 sm:px-3.5 rounded-full bg-slate-950/70 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 text-slate-300 hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all duration-200 flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider font-semibold"
            >
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

          {periodReport === "monthly" && (
            <div className="col-span-2 md:col-span-1 flex items-center justify-between md:justify-start gap-2 bg-slate-950/70 px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-xs min-w-0">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider shrink-0">
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
          )}

          {periodReport === "weekly" && (
            <div className="col-span-2 md:col-span-1 flex items-center justify-between md:justify-start gap-2 bg-slate-950/70 px-3.5 py-1.5 rounded-full border border-slate-800/80 shadow-xs min-w-0">
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider shrink-0">
                Semana
              </span>
              <SlideStepper
                value={selectedWeek}
                min={1}
                max={totalWeeks}
                onChange={handleChangeSlideStepper}
                type="week"
                formatValue={formatWeek}
                decreaseAriaLabel="Anterior semana"
                increaseAriaLabel="Siguiente semana"
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 w-full min-w-0">
          <div className="flex flex-wrap justify-between items-center gap-2 mb-4 sm:mb-6">
            <Typography className="font-wf-headline-md text-emerald-400 text-sm sm:text-base font-bold">
              Distribución de Movimientos
            </Typography>
            <div className="px-3 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-xs font-mono text-emerald-400 font-bold">
              TOTAL: {data[0]?.symbol}
              {getCurrencyFormatter(data[0]?.code, totalAmount)}
            </div>
          </div>

          <div className="h-[300px] sm:h-[340px] md:h-[380px] w-full min-w-0 relative">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={50}>
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
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid rgba(51, 65, 85, 0.8)",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(12px)",
                      color: "#f8fafc",
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
              <div className="h-full w-full bg-slate-900/50 animate-pulse rounded-lg" />
            )}
          </div>
        </div>

        <div className="lg:col-span-5 w-full min-w-0">
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
        <div className="mt-4 sm:mt-6 w-full min-w-0">
          <Cards title="balance" data={dataBalance} />
        </div>
      )}

      {dataHistory && (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 mt-4 sm:mt-6 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 sm:mb-6">
            <Typography className="font-wf-headline-md text-emerald-400 text-sm sm:text-base font-bold">
              Historial de Balance
            </Typography>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></div>
                <span className="text-[11px] text-slate-400 font-mono">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#06b6d4]"></div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Anterior
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></div>
                <span className="text-[11px] text-slate-400 font-mono">
                  Año Pasado
                </span>
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full min-w-0">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0} debounce={50}>
                <LineChart margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255, 255, 255, 0.06)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                    type="number"
                    domain={[1, 31]}
                  />
                  <YAxis
                    tickFormatter={formatYAxisTick}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      borderRadius: "12px",
                      border: "1px solid rgba(51, 65, 85, 0.8)",
                      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.5)",
                      backdropFilter: "blur(12px)",
                      color: "#f8fafc",
                    }}
                    formatter={currencyFormatter}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Actual"
                    data={dataHistory.current}
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Anterior"
                    data={dataHistory.previousPeriod}
                    stroke="#06b6d4"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeBalance"
                    name="Año Pasado"
                    data={dataHistory.lastYear}
                    stroke="#f59e0b"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-slate-900/50 animate-pulse rounded-lg" />
            )}
          </div>
        </div>
      )}

      <Modal
        title="Listado de movimientos"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="p-wf-lg">
          <ListMovementsDetail
            listMovements={listMovements}
            showFilters={false}
            title={`Movimientos por Categoría`}
          />

          <div className="text-center mt-wf-xl">
            <button
              className="px-wf-xl py-wf-sm rounded-full bg-wf-primary text-wf-on-primary font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary/90 transition-all shadow-md"
              onClick={() =>
                router.push(`categories/${categoryId}?c=${filters?.badgeId}`)
              }
            >
              Ver Historial Completo
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default Dashboard;
