"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";

const AccountCreate = (props: any) => {
  const router = useRouter();
  const { Typography, FormControl, Button, AutoComplete, Input } = useComponents();

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
    isSubmitting,
  } = props;

  return (
    <div className="flex-1 flex items-center justify-center p-wf-container-margin bg-wf-surface-bright">
      <div className="bg-wf-on-primary backdrop-blur-md w-full max-w-2xl rounded-xl p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
        <div className="mb-wf-lg flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-wf-surface-container flex items-center justify-center shadow-sm text-wf-primary">
              <span className="material-symbols-outlined text-3xl">
                account_balance_wallet
              </span>
            </div>
            <div>
              <h2 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary mb-wf-unit">
                {title}
              </h2>
              <p className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant">
                Configura los detalles de tu cuenta financiera.
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            {/* Account Name */}
            <div className="md:col-span-2">
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Nombre de la Cuenta
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="ej. Cuenta de Ahorros"
                      className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Controller
                name={"description"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Descripción <span className="text-wf-outline font-normal lowercase">(Opcional)</span>
                    </label>
                    <Input
                      {...field}
                      type="text"
                      placeholder="ej. Fondos para el hogar"
                      className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Account Type */}
            <div>
              <Controller
                name={"typeId"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Tipo de Cuenta
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full bg-white border ${
                          fieldState.error ? "border-wf-error" : "border-wf-outline-variant"
                        } text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm appearance-none`}
                        id="typeId"
                        onChange={onChange}
                        value={value}
                      >
                        <option value="" disabled>
                          Selecciona tipo
                        </option>
                        {typeOptions?.map((type: any) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-wf-outline pointer-events-none text-xl">
                        expand_more
                      </span>
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* Currency */}
            <div>
              <Controller
                name={"badgeId"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Moneda
                    </label>
                    <AutoComplete
                      placeholder="Selecciona moneda..."
                      handleOnChange={onChange}
                      options={currencyOptions}
                      iserror={!!fieldState.error}
                      value={value}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Initial Amount */}
            <div className={watchType === "3" || watchType === "6" ? "" : "md:col-span-2"}>
              <Controller
                name={"initAmount"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                      Monto Inicial
                    </label>
                    <Input
                      {...field}
                      type="number"
                      step={0.01}
                      placeholder="0.00"
                      className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Credit Limit */}
            {watchType === "3" && (
              <div>
                <Controller
                  name={"limit"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={false}>
                      <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                        Límite de Crédito
                      </label>
                      <Input
                        {...field}
                        type="number"
                        step={0.01}
                        placeholder="0.00"
                        className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                        iserror={!!fieldState.error}
                      />
                    </FormControl>
                  )}
                />
              </div>
            )}

            {/* Interest Rate */}
            {watchType === "6" && (
              <div>
                <Controller
                  name={"interest"}
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={false}>
                      <label className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1">
                        Interés [E.A]
                      </label>
                      <Input
                        {...field}
                        type="number"
                        step={0.01}
                        min={0}
                        placeholder="0.00 %"
                        className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                        iserror={!!fieldState.error}
                      />
                    </FormControl>
                  )}
                />
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="pt-wf-md border-t border-wf-surface-variant flex justify-between items-center mt-wf-xl">
            <div className="flex gap-2">
              {isDesactivate && (
                <button
                  type="button"
                  onClick={handleReActivate}
                  className="px-4 py-2 rounded-lg border border-wf-success text-wf-success font-wf-body-regular hover:bg-wf-success-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">power</span>
                  Activar
                </button>
              )}
              {handleDelete && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg border border-wf-error text-wf-error font-wf-body-regular hover:bg-wf-error-container transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isDesactivate ? "delete" : "power_off"}
                  </span>
                  {isDesactivate ? "Eliminar" : "Desactivar"}
                </button>
              )}
            </div>

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
                <span className="material-symbols-outlined text-xl">
                  check_circle
                </span>
                Guardar Cuenta
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountCreate;
