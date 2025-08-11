import { Controller } from "react-hook-form";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import Image from "next/image";
import React from "react";

const EventsCreate = (props: any) => {
  const router = useRouter();
  const { Typography, Button, Input, FormControl } = useComponents();
  const { ListMovements } = useComponentsLayout();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    listCategories,
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
        </div>
      </div>
      <div className="mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Nombre del evento"
                  label="Nombre del evento"
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
            name={"endEvent"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="date"
                  placeholder="Fin evento"
                  label="Fin evento"
                  id="endEvent"
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
      {!!listCategories && (
        <Typography variant="h2" className="my-4">
          Categorías
        </Typography>
      )}
      <div className="mt-6  max-h-[65vh] overflow-y-auto">
        {listCategories &&
          listCategories.map((category: any, i: number) => (
            <div
              className="border-b border-gray-300 py-2 px-1 bg-white rounded shadow-sm mb-3"
              key={i}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={category.flag}
                  width={20}
                  height={20}
                  className="rounded-full w-5 h-5 object-cover"
                  alt={String(category.code)}
                />
                <Typography variant="h6" className={`text-[10px]`}>
                  {category.code}
                </Typography>
              </div>
              {category.categories.map((subCategory: any, i: number) => (
                <React.Fragment key={subCategory.name + `-${i}`}>
                  <div className="flex justify-between items-center py-1">
                    <Typography variant="h6" className="font-medium">
                      {subCategory.name}
                    </Typography>
                    <Typography variant="p">
                      {category.symbol}
                      {getCurrencyFormatter(category.code, subCategory.amount)}
                    </Typography>
                  </div>
                  <div className="w-full bg-gray-200 rounded">
                    <div
                      className="h-3 bg-red-500 rounded"
                      style={{
                        width: `${subCategory.percentage}%`,
                      }}
                    ></div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ))}
      </div>
      {!!listMovements && (
        <Typography variant="h2" className="my-4">
          Movimientos
        </Typography>
      )}
      <div className="mt-6 max-h-[65vh] overflow-y-auto">
        <ListMovements
          listMovements={listMovements}
          setPage={() => {}}
          keyTitle="category"
        />
      </div>
    </div>
  );
};

export default EventsCreate;
