"use client";
import React from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { MdOutlineCreate, MdArrowBack } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

const AccountDetail = (props: any) => {
  const {
    data,
    control,
    handleSubmit,
    onSubmit,
    listEvents,
    handleResetFilters,
    setPage,
    listMovements,
    meta,
  } = props;
  const router = useRouter();
  const { Typography, Select, FormControl, Input, Button } = useComponents();
  const { Cards, Filters, ListMovements } = useComponentsLayout();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <Typography variant="h1">{`${data?.name} ${data?.badge?.code}`}</Typography>
          </div>
          <Typography>Detalle cuenta</Typography>
        </div>
        <div>
          <Link
            href={`/accounts/${data.id}/edit`}
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
        {false && (
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
      <ListMovements
        listMovements={listMovements}
        meta={meta}
        setPage={setPage}
        keyTitle="category"
      />
    </div>
  );
};

export default AccountDetail;
