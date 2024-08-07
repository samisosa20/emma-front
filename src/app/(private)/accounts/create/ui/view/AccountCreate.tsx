import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import {
  MdArrowBack,
  MdDeleteOutline,
  MdPower,
  MdPowerOff,
} from "react-icons/md";

//components
import useComponents from "@/share/components";

const Accounts = (props: any) => {
  const router = useRouter();
  const { Typography, FormControl, Input, Select, Button, AutoComplete } =
    useComponents();

  const {
    handleSubmit,
    onSubmit,
    control,
    typeOptions,
    currencyOptions,
    title,
    handleDelete,
    handleReActivate,
    isDesactivate,
    watchType,
  } = props;

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <Typography variant="h1">{title}</Typography>
          </div>
          <div className="flex flex-col space-y-2 items-end lg:flex-row lg:items-center lg:space-y-0 space-x-2">
            {isDesactivate && (
              <Button
                onClick={handleReActivate}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-300 p-2 rounded shadow-sm text-white"
              >
                <MdPower />
                <Typography className="text-white">Activar</Typography>
              </Button>
            )}
            {handleDelete && (
              <Button
                onClick={handleDelete}
                className="flex items-center space-x-2 bg-red-500 p-2 rounded shadow-sm text-white hover:bg-red-300"
              >
                {isDesactivate ? <MdDeleteOutline /> : <MdPowerOff />}
                <Typography className="text-white">
                  {isDesactivate ? "Eliminar" : "Desactivar"}
                </Typography>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 bg-white w-full px-6 py-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:grid grid-cols-2 gap-x-8 justify-between"
        >
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Nombre de la cuenta"
                  label="Nombre de la cuenta"
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
            name={"description"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Descripcion (opcional)"
                  label="Descripcion (opcional)"
                  id="description"
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
            name={"type_id"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label="Tipo de cuenta"
                  placeholder="Seleciona una opcion"
                  id="type_id"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  options={typeOptions}
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
            name={"init_amount"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Monto inicial"
                  label="Monto inicial"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          {watchType === "3" && (
            <Controller
              name={"limit"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={0.01}
                    placeholder="Limite trajeta de credito"
                    label="Limite trajeta de credito"
                    id="limit"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
          )}
          {watchType === "6" && (
            <Controller
              name={"interest"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    placeholder="Interes del credito [E.A]"
                    label="Interes del credito [E.A]"
                    id="interest"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
          )}
          <Button
            type="submit"
            className="mt-8 col-span-2 w-full lg:w-[350px] mx-auto"
          >
            Guardar
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Accounts;
