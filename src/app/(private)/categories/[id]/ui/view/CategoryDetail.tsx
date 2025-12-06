"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  MdAddCircleOutline,
  MdArrowBack,
  MdOutlineCreate,
} from "react-icons/md";
import {
  AreaChart,
  XAxis,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";
import { formatCurrency } from "@/share/helpers";
import { symbol } from "zod";

export default function CategoryDetail(props: any) {
  const {
    data,
    setSearch,
    handleToggle,
    search,
    isChecked,
    currencyOptions = [],
    control,
    onSubmit,
    handleSubmit,
    currency,
    listMovements,
    meta,
    setPage,
    dataBalance,
  } = props;
  const router = useRouter();
  const { Typography, Input, Switch, FormControl, Button, AutoComplete } =
    useComponents();
  const { Cards, Filters, ListMovements } = useComponentsLayout();

  return (
    <div>
      <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between w-full flew-wrap gap-2">
        <div className="w-full sm:w-auto">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div onClick={() => router.back()}>
              <MdArrowBack className="h-6" />
            </div>
            <Typography variant="h1">{`Categoría ${data.name}`}</Typography>
          </div>
          <Typography>Detalle de la categoría</Typography>
        </div>
        <div className="flex items-center space-x-2 justify-end">
          <Link
            href={`/categories/${data.id}/edit`}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdOutlineCreate />
            <Typography>Editar categoría</Typography>
          </Link>
          <Link
            href={"/categories/create"}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdAddCircleOutline />
            <Typography>Crear categoría</Typography>
          </Link>
        </div>
      </div>

      <div className="mt-6 flex space-x-4 items-center justify-end">
        <div className="lg:w-[250px]">
          <Input
            placeholder="Nombre de la categoría"
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event.target.value)
            }
          />
        </div>
        <Switch
          isChecked={isChecked}
          handleCheckboxChange={handleToggle}
          label={isChecked ? "Activos" : "Inactivos"}
        />
        <Filters>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={"badge_id"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <AutoComplete
                    label="Moneda"
                    placeholder="Seleciona una opcion"
                    id="badge_id"
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
            <Button type="submit" className="w-full absolute bottom-0">
              Aplicar
            </Button>
          </form>
        </Filters>
      </div>
      <div className="mt-6 mb-4 flex flex-wrap  gap-3 items-center justify-center lg:justify-between">
        <Cards
          title="Promedio mensual"
          data={dataBalance.map((v: any) => {
            return {
              amount:
                v.avgMonthlyIncome > 0
                  ? v.avgMonthlyIncome
                  : v.avgMonthlyExpense,
              code: v.code,
              symbol: v.symbol,
              flag: v.flag,
            };
          })}
        />
        <Cards
          title="Limite inferior"
          data={dataBalance.map((v: any) => {
            return {
              amount:
                v.incomeLowerLimit > 0
                  ? v.incomeLowerLimit
                  : v.expenseLowerLimit,
              code: v.code,
              symbol: v.symbol,
              flag: v.flag,
            };
          })}
        />
        <Cards
          title="Limite superior"
          data={dataBalance.map((v: any) => {
            return {
              amount:
                v.incomeUpperLimit > 0
                  ? v.incomeUpperLimit
                  : v.expenseUpperLimit,
              code: v.code,
              symbol: v.symbol,
              flag: v.flag,
            };
          })}
        />
      </div>
      {/* <div id="fiona-chart_history_category" className="mt-6 bg-white">
        <Typography variant="p" className="p-4">
          Movimiento historico de la categoria
        </Typography>
        <ResponsiveContainer minWidth={300} aspect={3.25}>
          <AreaChart
            stackOffset="sign"
            data={data.history?.map((history: any) => {
              return {
                date: `${history.year}-${history.month}`,
                amount: Math.abs(history.sum_amount),
              };
            })}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$ ${value / 1000000}M`;
                } else if (value >= 1000) {
                  return `$ ${value / 1000}K`;
                }
                return value;
              }}
            />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              formatter={(value) => {
                return [formatCurrency.format(Number(value)), "Balance"];
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div> */}
      <ListMovements
        listMovements={listMovements}
        meta={meta}
        setPage={setPage}
        keyTitle="account"
      />
    </div>
  );
}
