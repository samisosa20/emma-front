import Link from "next/link";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdOutlineCreate, MdArrowBack, MdFilterListOff } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

// Helpers
import { formatCurrency } from "@/share/helpers";

type movements = {
  amount: number;
  id: number;
  category: {
    name: string;
  };
  date_purchase: string;
  event?: {
    name: string;
  };
  description: string;
};

const AccountDetail = (props: any) => {
  const {
    data,
    control,
    handleSubmit,
    onSubmit,
    listEvents,
    handleResetFilters,
    showDelete,
  } = props;
  const router = useRouter();
  const { Typography, Select, FormControl, Input, Button } = useComponents();
  const { Cards, Filters } = useComponentsLayout();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <Typography variant="h1">{`${data?.account?.name} ${data?.account?.currency?.code}`}</Typography>
          </div>
          <Typography>Detalle cuenta</Typography>
        </div>
        <div>
          <Link
            href={`/accounts/${data.account.id}/edit`}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdOutlineCreate />
            <Typography>Editar</Typography>
          </Link>
        </div>
      </div>
      <div className="mt-6 mb-4">
        <Cards title="balance" data={data.balances} />
      </div>
      <div className="flex space-x-4 items-center justify-end">
        {showDelete && (
          <Typography
            className="text-primary cursor-pointer underline"
            onClick={handleResetFilters}
          >
            Borrar filtros
          </Typography>
        )}
        <Filters>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name={"event_id"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Select
                    label="Evento"
                    placeholder="Seleciona una opcion"
                    id="event_id"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    options={listEvents}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={"category"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="text"
                    placeholder="Categoría"
                    label="Categoría"
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
              name={"amount"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="text"
                    placeholder="Monto"
                    label="Monto"
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
              name={"description"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="text"
                    placeholder="Descripcion"
                    label="Descripcion"
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
              name={"start_date"}
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
              name={"end_date"}
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
      </div>
      <div className="mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto">
        {data.movements.data.map((movement: movements) => (
          <Link key={movement.id} href={`/moves/${movement.id}`}>
            <div className="border-b border-gray-300 py-2 px-1">
              <div className="flex justify-between items-center">
                <div className="font-bold">{movement?.category?.name}</div>
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
                <Typography>{movement?.event?.name}</Typography>
              </div>
              {movement.description && (
                <div className="border-t pt-1">
                  <Typography variant="h5">{movement?.description}</Typography>
                </div>
              )}
            </div>
          </Link>
        ))}
        {data.movements.data.length === 0 && (
          <Typography className="text-center py-6">Sin resultados</Typography>
        )}
      </div>
    </div>
  );
};

export default AccountDetail;
