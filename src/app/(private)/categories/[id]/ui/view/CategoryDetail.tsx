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

type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  sub_categories: number;
  deleted_at: string | null;
};

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
  } = props;
  const router = useRouter();
  const { Typography, Input, Switch, FormControl, Button, AutoComplete } =
    useComponents();
  const { Cards, Filters } = useComponentsLayout();

  return (
    <div>
      <div className="flex items-center justify-between w-full flew-wrap">
        <div className="w-full sm:w-auto">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div onClick={() => router.back()}>
              <MdArrowBack className="h-6" />
            </div>
            <Typography variant="h1">{`Categoría ${data.name}`}</Typography>
          </div>
          <Typography>Detalle de la categoría</Typography>
        </div>
        <div className="flex items-center space-x-2">
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
      <div className="mt-6">
        <Cards
          title="balance"
          data={[
            {
              title: "Promedio mensual",
              values: [formatCurrency.format(Number(data.avg)) + currency],
            },
            {
              title: "Limite inferior",
              values: [
                formatCurrency.format(Number(data.lowerBound)) + currency,
              ],
            },
            {
              title: "Limite superior",
              values: [
                formatCurrency.format(Number(data.upperBound)) + currency,
              ],
            },
          ]}
        />
      </div>
      <div id="fiona-chart_history_category" className="mt-6 bg-white">
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
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.categories
            ?.filter((category: categoryList) => {
              if (search !== "") {
                return isChecked
                  ? !category.deleted_at &&
                      category.name.toUpperCase().includes(search.toUpperCase())
                  : !!category.deleted_at &&
                      category.name
                        .toUpperCase()
                        .includes(search.toUpperCase());
              }
              return isChecked ? !category.deleted_at : !!category.deleted_at;
            })
            .map((category: categoryList) => (
              <Link href={`/categories/${category.id}`} key={category.id}>
                <div className="bg-white rounded shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <Typography variant="h2">{category.name}</Typography>
                    <Typography variant="h4">
                      {category.sub_categories}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="h6">{category.group.name}</Typography>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
