"use client";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";

export default function PaymentsCreate(props: any) {
  const router = useRouter();
  const { Button, Input, FormControl, AutoComplete } = useComponents();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    handleDelete,
    listAccounts,
    listCategories,
    isSubmitting,
  } = props;

  return (
    <div className="flex-1 flex items-center justify-center p-wf-container-margin">
      <div className="bg-wf-background/70 backdrop-blur-md w-full max-w-2xl rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="mb-wf-lg flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-wf-surface-container flex items-center justify-center shadow-sm text-wf-primary">
              <span className="material-symbols-outlined text-3xl">published_with_changes</span>
            </div>
            <div>
              <h2 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary mb-wf-unit">
                {title}
              </h2>
              <p className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant">
                Configura una transacción automatizada.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-wf-outline hover:text-wf-primary transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-wf-lg">
          {/* Source & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <Controller
              name="account"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">Cuenta de Origen</label>
                  <AutoComplete
                    placeholder="Selecciona cuenta..."
                    handleOnChange={onChange}
                    options={listAccounts}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="category"
              control={control}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">Categoría</label>
                  <AutoComplete
                    placeholder="Selecciona categoría..."
                    handleOnChange={onChange}
                    options={listCategories}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Amount & Day Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">Monto</label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-wf-outline font-wf-body-regular group-focus-within:text-wf-primary transition-colors">$</span>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-8 w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </div>
                </FormControl>
              )}
            />
            <Controller
              name="specificDay"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">Día del Mes</label>
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Día 1"
                    className="w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm"
                    iserror={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={false}>
                <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                  Descripción <span className="text-wf-outline font-normal lowercase">(Opcional)</span>
                </label>
                <Input
                  {...field}
                  type="text"
                  placeholder="ej., Pago Mensual de Arriendo"
                  className="w-full bg-wf-surface-container-highest border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary focus:ring-1 focus:ring-wf-primary transition-all shadow-sm"
                  iserror={!!fieldState.error}
                />
              </FormControl>
            )}
          />

          {/* Dates Group */}
          <div className="p-wf-md bg-wf-surface-container-low rounded-xl border border-wf-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <Controller
              name="startDate"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">Fecha de Inicio</label>
                  <Input
                    {...field}
                    type="date"
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                    iserror={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
            <Controller
              name="endDate"
              control={control}
              render={({ field, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Fecha Final <span className="text-wf-outline font-normal lowercase">(Opcional)</span>
                  </label>
                  <Input
                    {...field}
                    type="date"
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                    iserror={!!fieldState.error}
                  />
                </FormControl>
              )}
            />
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
                disabled={isSubmitting}
                className="px-8 py-2.5 rounded-lg bg-wf-primary text-wf-on-primary font-wf-body-regular hover:bg-wf-primary-container shadow-sm transition-all hover:shadow-md flex items-center gap-2 h-auto"
              >
                <span className="material-symbols-outlined text-xl">check_circle</span>
                Guardar Pago
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
