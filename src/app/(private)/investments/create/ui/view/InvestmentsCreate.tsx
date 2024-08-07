import { Controller } from "react-hook-form";
import { MdArrowBack, MdDeleteOutline, MdCarCrash } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  AreaChart,
  Line,
  XAxis,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
} from "recharts";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { formatCurrency } from "@/share/helpers";

export default function InvestmentsCreate(props: any) {
  const router = useRouter();
  const { Typography, Button, Input, FormControl, AutoComplete, Modal } =
    useComponents();

  const { Cards } = useComponentsLayout();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions = [],
    handleDelete,
    handleAppretiation,
    handleClose = () => {},
    isOpen = false,
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
    handleEditAppretiation = () => {},
    idAppretiation,
    handleDeleteAppre = () => {},
    metrics = [],
  } = props;

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <Typography variant="h1">{title}</Typography>
          </div>
          <div className="flex flex-col space-y-2 items-end lg:flex-row lg:items-center lg:space-y-0 space-x-2">
            {handleAppretiation && (
              <Button
                onClick={handleAppretiation}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-300 p-2 rounded shadow-sm text-white"
              >
                <MdCarCrash />
                <Typography className="text-white">Valorizacion</Typography>
              </Button>
            )}
            {handleDelete && (
              <Button
                onClick={handleDelete}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-300 p-2 rounded shadow-sm text-white"
              >
                <MdDeleteOutline />
                <Typography className="text-white">Eliminar</Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
      {handleDelete && (
        <div className="mt-6">
          <Cards title="balance" data={metrics} />
        </div>
      )}
      <div className="mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto">
        <form
          id="form-investment"
          key={1}
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Nombre de la inversión"
                  label="Nombre de la inversión"
                  id="name"
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
            name={"init_amount"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="number"
                  placeholder="Monto inicial"
                  label="Monto inicial"
                  id="init_amount"
                  step="0.01"
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
          <Controller
            name={"date_investment"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="date"
                  placeholder="Fecha de apertura"
                  label="Fecha de apertura"
                  id="date_investment"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className="text-center">
            <Button
              type="submit"
              className="mt-8 col-span-2 w-full lg:w-[350px]"
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
      {listAppretiations && (
        <div className="mt-6 bg-white">
          <Typography variant="p" className="p-4">
            Historico
          </Typography>
          <ResponsiveContainer minWidth={300} aspect={3.25}>
            <AreaChart
              data={listAppretiations
                .map((v: any) => {
                  return {
                    amount: v.amount,
                    date: v.date_appreciation,
                    init_amount: v.investment,
                  };
                })
                .slice(0, 10)}
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
                formatter={(value, name) => {
                  return [
                    formatCurrency.format(Number(value)),
                    name === "amount" ? "Apreciación" : "Inversión",
                  ];
                }}
              />
              <Area
                type="monotone"
                dataKey="init_amount"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorPv)"
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
      )}
      {listAppretiations && (
        <Typography variant="h2" className="my-4">
          Historico valorizacion
        </Typography>
      )}
      <div className="mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto">
        {listAppretiations &&
          listAppretiations.map((appretiation: any) => (
            <div
              className="border-b border-gray-300 py-2 px-1 cursor-pointer"
              key={appretiation.id}
              onClick={() => handleEditAppretiation(appretiation.id)}
            >
              <div className="flex justify-between items-center">
                <Typography
                  variant="h4"
                  className={
                    appretiation.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {formatCurrency.format(appretiation.amount)}
                </Typography>
                <Typography>{appretiation.date_appreciation}</Typography>
              </div>
            </div>
          ))}
        {listAppretiations && listAppretiations.length === 0 && (
          <Typography className="text-center py-6">Sin resultados</Typography>
        )}
      </div>
      {!!listMovements && (
        <Typography variant="h2" className="my-4">
          Movimientos
        </Typography>
      )}
      <div className="mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto">
        {listMovements &&
          listMovements.map((movement: any) => (
            <div
              className="border-b border-gray-300 py-2 px-1"
              key={movement.id}
            >
              <div className="flex justify-between items-center">
                <div className="font-bold">
                  {movement.category?.name}{" "}
                  {movement.add_withdrawal && " (Retiro/Abono)"}
                </div>
                <div
                  className={
                    movement.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {formatCurrency.format(movement.amount)}
                </div>
              </div>
              <div className="flex justify-between items-center pb-1">
                <Typography>{movement.date_purchase}</Typography>
                <Typography>{movement.account?.name}</Typography>
              </div>
              {movement.description && (
                <div className="border-t pt-1">
                  <Typography variant="h5">{movement.description}</Typography>
                </div>
              )}
            </div>
          ))}
        {listMovements && listMovements.length === 0 && (
          <Typography className="text-center py-6">Sin resultados</Typography>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Actualizacion del valor de la inversión"
      >
        <form
          id="form-appretiation"
          key={2}
          onSubmit={handleSubmitAppre(onSubmitAppre)}
          className="w-full"
        >
          <Controller
            name={"amount"}
            control={controlAppre}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="number"
                  placeholder="Monto actual"
                  label="Monto actual"
                  id="amount"
                  step="0.01"
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
            name={"date_appreciation"}
            control={controlAppre}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="date"
                  placeholder="Fecha de la valorizacion"
                  label="Fecha de la valorizacion"
                  id="date_appreciation"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className="text-center">
            <Button
              type="submit"
              className="mt-8 col-span-2 w-full lg:w-[350px]"
            >
              Guardar
            </Button>
            {idAppretiation !== undefined && (
              <Typography
                className="mt-8 underline cursor-pointer"
                onClick={handleDeleteAppre}
              >
                Eliminar
              </Typography>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
