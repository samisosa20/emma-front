"use client";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";

// Controller
import useAccountCreate from "./controller";

//components
import useComponents from "@/share/components";

const Accounts = () => {
  const { Typography, FormControl, Input, Select } = useComponents();

  const { handleSubmit, onSubmit, control, typeOptions } =
    useAccountCreate();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <Link href={"/accounts"}>
            <MdArrowBack />
          </Link>
          <Typography variant="h1">Creacion de Cuentas</Typography>
        </div>
      </div>
      <div className="mt-6 bg-white w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState}>
                <Input
                  type="text"
                  placeholder="Nombre de la cuenta"
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
              <FormControl fieldState={fieldState}>
                <Input
                  type="text"
                  placeholder="Descripcion (opcional)"
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
              <FormControl fieldState={fieldState}>
                <Select
                  type="text"
                  placeholder="Email"
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
            name={"init_amount"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState}>
                <Input
                  type="number"
                  step={0.01}
                  placeholder="Monto inicial"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
        </form>
      </div>
    </div>
  );
};

export default Accounts;
