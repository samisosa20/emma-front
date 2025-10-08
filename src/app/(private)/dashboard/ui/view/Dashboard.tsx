"use client";
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
  Label,
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

export default function Dashboard(props: any) {
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

  const totalWeeks = getISOWeeksInYear(new Date(filters.year, 0, 1));

  return (
    <div>
      <TitleHelp title="Dashboard" onClick={driverDash} />
      <Typography>Aca podrás ver tu información consolidada</Typography>
      <Filters>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={"badgeId"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <AutoComplete
                  label="Moneda"
                  placeholder="Seleciona una opcion"
                  id="badgeId"
                  handleOnChange={(e: any) => {
                    onChange(e);
                  }}
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
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="date"
                  step={0.01}
                  placeholder="Fecha inicial"
                  label="Fecha inicial"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={"endDate"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="date"
                  step={0.01}
                  placeholder="Fecha final"
                  label="Fecha final"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Button type="submit" className="w-full absolute bottom-0">
            Aplicar
          </Button>
        </form>
      </Filters>
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div>
          <div className="flex items-center justify-center gap-4 mb-3">
            {listOptionsTypeReport.map((type: any, index: number) => (
              <Typography
                key={index}
                className={`${
                  type.value === typeReport ? "underline text-black" : ""
                } hover:underline hover:text-black cursor-pointer`}
                onClick={type.onClick}
              >
                {type.label}
              </Typography>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            {listOptionsPeriodReport.map((type: any, index: number) => (
              <Typography
                key={index}
                className={`${
                  type.value === periodReport ? "underline text-black" : ""
                } hover:underline hover:text-black cursor-pointer`}
                onClick={type.onClick}
              >
                {type.label}
              </Typography>
            ))}
          </div>
          <div className="flex items-center justify-center gap-8 mb-4">
            <SlideStepper
              value={filters.year}
              min={new Date().getFullYear() - 10}
              max={new Date().getFullYear()}
              onChange={(val) => handleChangeSlideStepper(val, "year")}
            />
            {periodReport === "monthly" && (
              <SlideStepper
                value={monthIndex}
                min={0}
                max={11}
                onChange={(val) => handleChangeSlideStepper(val, "month")}
                formatValue={(val) => monthNames[val]}
              />
            )}
            {periodReport === "weekly" && (
              <SlideStepper
                value={selectedWeek}
                min={1}
                max={totalWeeks}
                onChange={(val) => handleChangeSlideStepper(val, "week")}
                formatValue={(val) => getWeekDateRange(filters.year, val)}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div id="fiona-chart_incomes" className="bg-white">
            <Typography variant="p" className="px-4 pt-4">
              Movimientos
            </Typography>
            <div className="flex items-center justify-center">
              <PieChart
                width={340}
                height={340}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={130}
                  outerRadius={150}
                  cx="50%"
                  cy="50%"
                >
                  {data &&
                    data.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip
                  formatter={(value) => {
                    return (
                      data[0]?.symbol +
                      getCurrencyFormatter(data[0]?.code, Number(value))
                    );
                  }}
                />
                <Label width={30} position="center">
                  {`${data[0]?.symbol}${getCurrencyFormatter(
                    data[0]?.code,
                    data?.reduce(
                      (sum: number, item: any) => sum + item.amount,
                      0
                    )
                  )}`}
                </Label>
              </PieChart>
            </div>
          </div>
          <ListItems
            title="Consolidado"
            data={data}
            variant="modal"
            showHistory
            currency={data.currency}
            onClickModal={getMovements}
            dataModal={listMovements}
          />
        </div>
      </div>
      {dataBalance?.length > 0 && (
        <div className="mt-6">
          <Cards title="balance" data={dataBalance} />
        </div>
      )}
      {dataHistory && (
        <div id="fiona-chart_incomes" className="bg-white mt-6">
          <Typography variant="p" className="px-4 pt-4">
            Historial balance
          </Typography>
          <div className="flex items-center justify-center w-full h-72">
            <ResponsiveContainer>
              <LineChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  allowDuplicatedCategory={false}
                  type="number"
                />

                <YAxis tickFormatter={formatYAxisTick} />
                <Tooltip formatter={currencyFormatter} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cumulativeBalance"
                  name="Actual"
                  data={dataHistory.current.map((v: any) => {
                    return { ...v, date: new Date(v.date).getDate() };
                  })}
                  stroke="#8884d8"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeBalance"
                  data={dataHistory.previousPeriod.map((v: any) => {
                    return { ...v, date: new Date(v.date).getDate() };
                  })}
                  stroke="#82ca9d"
                  name="Anterior"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeBalance"
                  data={dataHistory.lastYear.map((v: any) => {
                    return { ...v, date: new Date(v.date).getDate() };
                  })}
                  stroke="#8dd1e1"
                  name="Año anterior"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}
