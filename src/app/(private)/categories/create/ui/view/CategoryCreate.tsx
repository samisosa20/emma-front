"use client";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

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

  const colorOptions = [
    "#6bfe9c",
    "#ffb3b0",
    "#dae2ff",
    "#FFD166",
    "#118AB2",
    "#040c21",
  ];

  const iconOptions = [
    "restaurant",
    "local_cafe",
    "shopping_cart",
    "commute",
    "more_horiz",
    "category",
    "home",
    "payments",
    "directions_car",
    "medical_services",
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
              Modify the details for this spending category.
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
                      Category Name
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Category Name"
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
                      Category Group
                    </label>
                    <Select
                      {...field}
                      placeholder="Select a group"
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
                    Description <span className="text-wf-outline font-normal lowercase">(Optional)</span>
                  </label>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm resize-none"
                    rows={3}
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Visuals Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            {/* Color Selection */}
            <div className="space-y-wf-sm">
              <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block">
                Color
              </label>
              <div className="flex flex-wrap gap-3 bg-wf-surface-container-low p-3 rounded-lg border border-wf-outline-variant">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setValue("color", color)}
                    className={`w-8 h-8 rounded-full transition-all ${
                      selectedColor === color
                        ? "ring-2 ring-wf-primary ring-offset-2 scale-110"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Icon Grid */}
            <div className="space-y-wf-sm">
              <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block">
                Icon
              </label>
              <div className="grid grid-cols-5 gap-2 bg-wf-surface-container-low p-3 rounded-lg border border-wf-outline-variant">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setValue("icon", icon)}
                    className={`w-10 h-10 rounded flex items-center justify-center transition-all ${
                      selectedIcon === icon
                        ? "bg-white border border-wf-primary text-wf-primary shadow-sm"
                        : "text-wf-outline hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
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
