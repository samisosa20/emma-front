"use client";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { colors } from "@/share/helpers";

//components
import useComponents from "@/share/components";

export default function CategoryCreate(props: any) {
  const router = useRouter();
  const { Button, Input, FormControl, Select, Textarea } = useComponents();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    groupsOptions = [],
    handleDelete,
    watch,
    setValue,
  } = props;

  const selectedColor = watch("color") || "#6bfe9c";
  const selectedIcon = watch("icon") || "category";

  const colorOptions = colors;

  const iconOptions = [
    // General & Shopping
    "category",
    "shopping_cart",
    "shopping_bag",
    "payments",
    "credit_card",
    "receipt_long",
    "savings",
    "account_balance",
    "work",
    "more_horiz",
    // Food & Home
    "restaurant",
    "local_cafe",
    "home",
    "checkroom",
    "laundry",
    "cleaning_services",
    // Services & Tech
    "wifi",
    "public",
    "electric_bolt",
    "water_drop",
    "gas_meter",
    "tv",
    "subscriptions",
    "devices",
    // Transport & Travel
    "commute",
    "directions_car",
    "directions_bus",
    "train",
    "flight",
    "hotel",
    // Health & Sports
    "medical_services",
    "pill",
    "fitness_center",
    "sports_soccer",
    "directions_run",
    "self_improvement",
    // Leisure & Education
    "movie",
    "sports_esports",
    "celebration",
    "theater_comedy",
    "pets",
    "school",
    "menu_book",
    "history_edu",
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-wf-container-margin">
      <div className="bg-wf-background/70 backdrop-blur-md w-full max-w-2xl rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="mb-wf-lg flex justify-between items-start">
          <div>
            <h2 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary mb-wf-unit">
              {title}
            </h2>
            <p className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant">
              Modifica los detalles de esta categoría de gastos.
            </p>
          </div>
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm"
            style={{ backgroundColor: selectedColor }}
          >
            <span className="material-symbols-outlined filled text-wf-on-secondary-fixed">
              {selectedIcon}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-wf-lg">
          {/* Basic Info Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <div className="space-y-wf-xs">
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Nombre de la Categoría
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nombre de la Categoría"
                      className="w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>
            <div className="space-y-wf-xs">
              <Controller
                name={"groupId"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Grupo de Categoría
                    </label>
                    <Select
                      {...field}
                      placeholder="Selecciona un grupo"
                      options={groupsOptions}
                      className="w-full"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-wf-xs">
            <Controller
              name={"description"}
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Descripción <span className="text-wf-outline font-normal lowercase">(Opcional)</span>
                  </label>
                  <Textarea
                    {...field}
                    placeholder="Descripción"
                    className="w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm resize-none"
                    rows={2}
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Visuals - Color (Full Width) */}
          <div className="space-y-wf-sm">
            <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block">
              Seleccionar Color
            </label>
            <div className="flex flex-wrap gap-2 bg-wf-surface-container-low p-4 rounded-xl border border-wf-outline-variant max-h-32 overflow-y-auto custom-scrollbar">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className={`w-8 h-8 rounded-full transition-all shrink-0 ${
                    selectedColor === color
                      ? "ring-2 ring-wf-primary ring-offset-2 scale-110"
                      : "hover:scale-110"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Visuals - Icon (Full Width) */}
          <div className="space-y-wf-sm">
            <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block">
              Seleccionar Ícono
            </label>
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 bg-wf-surface-container-low p-4 rounded-xl border border-wf-outline-variant max-h-48 overflow-y-auto custom-scrollbar">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setValue("icon", icon)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                    selectedIcon === icon
                      ? "bg-white border-2 border-wf-primary text-wf-primary shadow-md scale-110 z-10"
                      : "text-wf-outline hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-wf-md border-t border-wf-surface-variant flex justify-between items-center mt-wf-xl">
            {handleDelete ? (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-lg border border-wf-error text-wf-error font-wf-body-regular hover:bg-wf-error-container transition-colors flex items-center space-x-2"
              >
                <span className="material-symbols-outlined text-[18px]">delete</span>
                <span>Eliminar</span>
              </button>
            ) : (
              <div />
            )}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 rounded-lg border border-wf-outline text-wf-on-surface font-wf-body-regular hover:bg-wf-surface-container-highest transition-colors"
              >
                Cancelar
              </button>
              <Button
                type="submit"
                className="px-8 py-2.5 rounded-lg bg-wf-primary text-wf-on-primary font-wf-body-regular hover:bg-wf-primary-container shadow-sm transition-all hover:shadow-md h-auto"
              >
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
