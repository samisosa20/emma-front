"use client";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";
import { MovementOption } from "../model/movements.models";
import { MovementSchema } from "@/share/validation";

interface MovementsProps {
  handleSubmit: (callback: (data: MovementSchema) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: (data: MovementSchema) => void;
  control: Control<MovementSchema>;
  listAccounts: MovementOption[];
  listCategories: MovementOption[];
  listEvents: MovementOption[];
  listInvestments: MovementOption[];
  handleDelete?: () => void;
  typeWatch: string;
  accountEndWatch?: MovementOption;
  accountWatch?: MovementOption;
  investmentWatch?: MovementOption;
  isSubmitting: boolean;
  errors: FieldErrors<MovementSchema>;
}

export default function Movements({
  handleSubmit,
  onSubmit,
  control,
  listAccounts,
  listCategories,
  listEvents,
  listInvestments,
  handleDelete,
  typeWatch,
  accountEndWatch,
  accountWatch,
  investmentWatch,
  isSubmitting,
  errors,
}: MovementsProps) {
  const router = useRouter();

  const {
    Button,
    AutoComplete,
    Switch,
  } = useComponents();

  const isEdit = !!handleDelete;

  // Helper to format currency display (simple version)
  const formatValue = (val: string) => {
    if (!val) return "";
    const parts = val.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const cleanValue = (val: string) => {
    return val.replace(/,/g, "");
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-wf-container-margin md:p-wf-xl relative min-h-screen">
      {/* Overlay for focused atmosphere */}
      <div className="absolute inset-0 bg-wf-background/90 backdrop-blur-sm z-0"></div>

      <div className="w-full max-w-2xl bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.1)] z-10 border border-wf-outline-variant flex flex-col">
        {/* Header */}
        <div className="px-wf-lg py-wf-md border-b border-wf-surface-variant flex items-center justify-center bg-wf-surface-container-low">
          <h1 className="font-wf-headline-md text-wf-on-surface text-xl md:text-2xl text-center">
            {isEdit ? "Editar Transacción" : "Nueva Transacción"}
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
          {/* Content Area */}
          <div className="p-wf-lg flex flex-col gap-wf-xl">

            {/* Type Toggle */}
            <div className="bg-wf-surface-container rounded-lg p-wf-xs flex gap-wf-xs">
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <button
                      type="button"
                      disabled={isEdit && value === "0"}
                      onClick={() => onChange("-1")}
                      className={`flex-1 py-wf-sm rounded font-wf-label-caps text-xs uppercase transition-all ${
                        value === "-1"
                          ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface border border-wf-outline-variant"
                          : "text-wf-on-surface-variant hover:bg-wf-surface-container-high"
                      }`}
                    >
                      Egreso
                    </button>
                    <button
                      type="button"
                      disabled={isEdit && value === "0"}
                      onClick={() => onChange("1")}
                      className={`flex-1 py-wf-sm rounded font-wf-label-caps text-xs uppercase transition-all ${
                        value === "1"
                          ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface border border-wf-outline-variant"
                          : "text-wf-on-surface-variant hover:bg-wf-surface-container-high"
                      }`}
                    >
                      Ingreso
                    </button>
                    <button
                      type="button"
                      disabled={isEdit && value !== "0"}
                      onClick={() => onChange("0")}
                      className={`flex-1 py-wf-sm rounded font-wf-label-caps text-xs uppercase transition-all ${
                        value === "0"
                          ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface border border-wf-outline-variant"
                          : "text-wf-on-surface-variant hover:bg-wf-surface-container-high"
                      }`}
                    >
                      Transferencia
                    </button>
                  </>
                )}
              />
            </div>

            {/* Amount Input */}
            <div className="flex flex-col items-center gap-wf-xs py-wf-md">
              <span className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Monto</span>
              <div className="flex items-baseline gap-wf-xs">
                <span className="font-wf-currency-display text-2xl text-wf-on-surface-variant">$</span>
                <Controller
                  name="amount"
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <input
                      type="text"
                      placeholder="0.00"
                      className={`w-full max-w-md bg-transparent border-none text-center font-wf-currency-display text-5xl font-semibold text-wf-primary focus:ring-0 placeholder:text-wf-surface-tint p-0 m-0 leading-none outline-none ${fieldState.error ? 'text-wf-error' : ''}`}
                      onChange={(e) => {
                        const val = cleanValue(e.target.value);
                        if (/^\d*\.?\d{0,2}$/.test(val)) {
                          onChange(val);
                        }
                      }}
                      value={formatValue(value ?? "")}
                    />
                  )}
                />
              </div>
              <div className="mt-1">
                <span className="text-wf-on-surface-variant font-wf-label-caps text-xs tracking-widest opacity-70">
                  {accountWatch?.badgeCode ?? 'USD'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
              {/* Account Selection */}
              <div className="flex flex-col gap-wf-xs">
                <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">
                  {typeWatch !== "0" ? "Cuenta" : "Cuenta Saliente"}
                </label>
                <div className="relative">
                  <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-wf-primary-fixed flex items-center justify-center z-10 pointer-events-none">
                    <MdArrowUpward className="text-wf-on-primary-fixed" size={16} />
                  </div>
                  <Controller
                    name="account"
                    control={control}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <AutoComplete
                        placeholder="Selecciona cuenta"
                        handleOnChange={onChange}
                        options={listAccounts}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    )}
                  />
                </div>
              </div>

              {/* Destination Account Selection (Transfer only) */}
              {typeWatch === "0" && (
                <div className="flex flex-col gap-wf-xs">
                  <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Cuenta Destino</label>
                  <div className="relative">
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-wf-secondary-container flex items-center justify-center z-10 pointer-events-none">
                      <MdArrowDownward className="text-wf-on-secondary-container" size={16} />
                    </div>
                    <Controller
                      name="accountEnd"
                      control={control}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <AutoComplete
                          placeholder="Selecciona destino"
                          handleOnChange={onChange}
                          options={listAccounts}
                          iserror={!!fieldState.error}
                          value={value}
                        />
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Category Selection (Non-transfer only) */}
              {typeWatch !== "0" && (
                <div className="flex flex-col gap-wf-xs">
                  <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Categoría</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field: { onChange, value }, fieldState }) => (
                      <AutoComplete
                        placeholder="Selecciona categoría"
                        handleOnChange={onChange}
                        options={listCategories}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    )}
                  />
                </div>
              )}

              {/* Equivalent Amount (Transfer only, if cross-currency) */}
              {typeWatch === "0" && accountEndWatch && accountWatch && accountEndWatch.badgeId !== accountWatch.badgeId && (
                <div className="flex flex-col gap-wf-xs">
                  <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase flex items-center gap-1">
                    Monto Recibido <span className="text-wf-outline font-wf-body-regular text-[11px] normal-case tracking-normal">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-wf-md top-1/2 -translate-y-1/2 text-wf-on-surface-variant">~</span>
                    <Controller
                      name="amountEnd"
                      control={control}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <input
                          type="text"
                          className="w-full bg-wf-surface-container-lowest pl-wf-xl pr-wf-md py-wf-md rounded-lg border border-wf-outline-variant focus:border-wf-primary focus:ring-1 focus:ring-wf-primary font-wf-body-regular text-wf-on-surface outline-none transition-colors placeholder:text-wf-outline"
                          placeholder="Monto equivalente"
                          onChange={(e) => {
                            const val = cleanValue(e.target.value);
                            if (/^\d*\.?\d{0,2}$/.test(val)) {
                              onChange(val);
                            }
                          }}
                          value={formatValue(value ?? "")}
                        />
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Date & Time */}
              <div className="flex flex-col gap-wf-xs">
                <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Fecha</label>
                <Controller
                  name="datePurchase"
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <input
                      type="datetime-local"
                      className="w-full bg-wf-surface-container-lowest text-wf-on-surface border border-wf-outline-variant rounded-lg py-wf-md px-wf-md focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-colors"
                      onChange={onChange}
                      value={value ?? ""}
                    />
                  )}
                />
              </div>

              {/* Event & Investment (Non-transfer only) */}
              {typeWatch !== "0" && (
                <>
                  <div className="flex flex-col gap-wf-xs">
                    <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Evento</label>
                    <Controller
                      name="event"
                      control={control}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <AutoComplete
                          placeholder="Opcional"
                          handleOnChange={onChange}
                          options={listEvents}
                          iserror={!!fieldState.error}
                          value={value}
                        />
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-wf-xs">
                    <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Inversión</label>
                    <Controller
                      name="investment"
                      control={control}
                      render={({ field: { onChange, value }, fieldState }) => (
                        <AutoComplete
                          placeholder="Opcional"
                          handleOnChange={onChange}
                          options={listInvestments}
                          iserror={!!fieldState.error}
                          value={value}
                        />
                      )}
                    />
                  </div>
                </>
              )}

              {/* Investment Switch */}
              {typeWatch !== "0" && !!investmentWatch && (
                <div className="md:col-span-2">
                  <Controller
                    name="addWithdrawal"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        label="¿Es un retiro o una adición/reinversión?"
                        name="addWithdrawal"
                        handleCheckboxChange={onChange}
                        isChecked={value}
                      />
                    )}
                  />
                </div>
              )}

              {/* Description */}
              <div className="flex flex-col gap-wf-xs md:col-span-2">
                <label className="font-wf-label-caps text-xs text-wf-on-surface-variant uppercase">Descripción</label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <textarea
                      className="w-full bg-wf-surface-container-lowest text-wf-on-surface border border-wf-outline-variant rounded-lg py-wf-md px-wf-md focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-colors resize-none placeholder:text-wf-outline"
                      placeholder="Agrega una nota..."
                      rows={2}
                      onChange={onChange}
                      value={value ?? ""}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-wf-lg border-t border-wf-surface-variant bg-wf-surface-container-low flex justify-end gap-wf-md">
            {isEdit && (
              <Button
                onClick={handleDelete}
                className="bg-wf-error hover:bg-wf-error/80 text-white"
                disabled={isSubmitting}
              >
                Eliminar
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => router.back()}
              className="border-wf-primary text-wf-primary hover:bg-wf-surface-container"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-wf-primary text-wf-on-primary hover:bg-wf-primary/90 shadow-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
