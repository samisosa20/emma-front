import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";

// Helpers
import { formatCurrency } from "@/share/helpers";

export default function HeritagesCreate(props: any) {
  const router = useRouter();
  const { Button, Input, FormControl, AutoComplete } = useComponents();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions = [],
    handleDelete,
  } = props;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-wf-container-margin gap-wf-lg">
      {/* Main Card */}
      <div className="bg-wf-on-primary backdrop-blur-md w-full max-w-2xl rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="mb-wf-lg flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-wf-surface-container flex items-center justify-center shadow-sm text-wf-primary">
              <span className="material-symbols-outlined text-3xl">
                account_balance
              </span>
            </div>
            <div>
              <h2 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary mb-wf-unit">
                {title}
              </h2>
              <p className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant">
                Registra y gestiona tu patrimonio.
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
          {/* Inputs Row 1: Nombre */}
          <div className="grid grid-cols-1 gap-wf-gutter">
            <Controller
              name={"name"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Nombre del patrimonio
                  </label>
                  <Input
                    type="text"
                    placeholder="Ej. Casa en la playa"
                    id="name"
                    onChange={onChange}
                    onBlur={onBlur}
                    iserror={!!fieldState.error}
                    value={value}
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Inputs Row 2: Valor Comercial & Valor Legal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <Controller
              name={"comercialAmount"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Valor comercial
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    id="comercialAmount"
                    step="0.01"
                    onChange={onChange}
                    onBlur={onBlur}
                    iserror={!!fieldState.error}
                    value={value}
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                  />
                </FormControl>
              )}
            />
            <Controller
              name={"legalAmount"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Valor legal
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    id="legalAmount"
                    step="0.01"
                    onChange={onChange}
                    onBlur={onBlur}
                    iserror={!!fieldState.error}
                    value={value}
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                  />
                </FormControl>
              )}
            />
          </div>

          {/* Inputs Row 3: Moneda & Año */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            <Controller
              name={"badgeId"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Moneda
                  </label>
                  <AutoComplete
                    placeholder="Selecciona una opción"
                    id="badgeId"
                    handleOnChange={onChange}
                    options={currencyOptions}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={"year"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={false}>
                  <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                    Año
                  </label>
                  <Input
                    type="number"
                    placeholder="2024"
                    step="1"
                    id="year"
                    minLength={4}
                    onChange={onChange}
                    onBlur={onBlur}
                    iserror={!!fieldState.error}
                    value={value}
                    className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
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
                <span className="material-symbols-outlined text-[18px]">
                  delete
                </span>
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
                className="px-8 py-2.5 rounded-lg bg-wf-primary text-wf-on-primary font-wf-body-regular hover:bg-wf-primary-container shadow-sm transition-all hover:shadow-md flex items-center gap-2 h-auto"
              >
                <span className="material-symbols-outlined text-xl">
                  check_circle
                </span>
                Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Movements Card */}
      {!!listMovements && (
        <div className="bg-wf-on-primary backdrop-blur-md w-full max-w-2xl rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
          <div className="mb-wf-lg flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-wf-surface-container flex items-center justify-center shadow-sm text-wf-primary">
              <span className="material-symbols-outlined text-2xl">
                receipt_long
              </span>
            </div>
            <h3 className="font-wf-headline-sm text-wf-headline-sm text-wf-primary">
              Movimientos
            </h3>
          </div>
          
          <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {listMovements.map((movement: any) => (
              <div
                className="bg-white rounded-lg p-wf-md border border-wf-outline-variant/30 shadow-sm flex flex-col gap-2"
                key={movement.id}
              >
                <div className="flex justify-between items-center">
                  <span className="font-wf-body-strong text-wf-on-surface">
                    {movement.category?.name || "Sin categoría"}
                  </span>
                  <span
                    className={`font-wf-body-strong ${
                      movement.amount > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency.format(movement.amount)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-wf-on-surface-variant">
                  <span>{movement.date_purchase}</span>
                  <span>{movement.account?.name}</span>
                </div>
                {movement.description && (
                  <div className="mt-1 pt-2 border-t border-wf-surface-variant text-sm text-wf-on-surface-variant italic">
                    {movement.description}
                  </div>
                )}
              </div>
            ))}
            {listMovements.length === 0 && (
              <div className="text-center py-8 text-wf-on-surface-variant font-wf-body-regular">
                No hay movimientos registrados.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

