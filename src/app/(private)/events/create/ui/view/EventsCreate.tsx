"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";

//components
import useComponents from "@/share/components";

// Helpers
import { listEventTypes } from "@/share/helpers";

const EventsCreate = (props: any) => {
  const router = useRouter();
  const params = useParams();
  const { FormControl } = useComponents();

  const { handleSubmit, onSubmit, control, title } = props;

  return (
    <div className="flex-1 flex flex-col h-full bg-wf-surface-bright">
      {/* Page Header (Sub-header) */}
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-wf-on-surface-variant hover:text-wf-on-surface transition-colors flex items-center gap-2 group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
            arrow_back
          </span>
          <span className="font-wf-body-regular text-base">Volver a Eventos</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1">
        <div className="mb-8">
          <h1 className="font-wf-headline-lg text-[32px] text-wf-on-surface mb-2">
            {title}
          </h1>
          <p className="font-wf-body-regular text-base text-wf-on-surface-variant">
            Planifica y realiza un seguimiento de tus hitos financieros.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-surface-variant p-wf-lg max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Event Name */}
            <div>
              <Controller
                name={"name"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="name"
                        className="block font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider font-semibold"
                      >
                        Nombre del Evento
                      </label>
                      <input
                        className={`w-full bg-wf-surface-container-low border ${
                          fieldState.error
                            ? "border-wf-error"
                            : "border-wf-outline-variant"
                        } rounded-lg px-4 py-3 font-wf-body-regular text-base text-wf-on-surface focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all placeholder:text-wf-outline`}
                        id="name"
                        placeholder="ej. Vacaciones de Verano 2024"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
              {/* Event Type */}
              <div>
                <Controller
                  name={"type"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="type"
                          className="block font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider font-semibold"
                        >
                          Tipo de Evento
                        </label>
                        <div className="relative">
                          <select
                            className={`w-full bg-wf-surface-container-low border ${
                              fieldState.error
                                ? "border-wf-error"
                                : "border-wf-outline-variant"
                            } rounded-lg px-4 py-3 font-wf-body-regular text-base text-wf-on-surface focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all appearance-none`}
                            id="type"
                            onChange={onChange}
                            value={value}
                          >
                            <option value="" disabled>
                              Selecciona un tipo
                            </option>
                            {listEventTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-wf-on-surface-variant pointer-events-none">
                            expand_more
                          </span>
                        </div>
                      </div>
                    </FormControl>
                  )}
                />
              </div>

              {/* End Date */}
              <div>
                <Controller
                  name={"endEvent"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="endEvent"
                          className="block font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider font-semibold"
                        >
                          Fecha Objetivo
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            className={`w-full bg-wf-surface-container-low border ${
                              fieldState.error
                                ? "border-wf-error"
                                : "border-wf-outline-variant"
                            } rounded-lg px-4 py-3 font-wf-body-regular text-base text-wf-on-surface focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all`}
                            id="endEvent"
                            onChange={onChange}
                            value={value}
                          />
                        </div>
                      </div>
                    </FormControl>
                  )}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-wf-surface-variant flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-lg font-wf-body-regular text-base text-wf-on-surface border border-wf-outline-variant hover:bg-wf-surface-container-low transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-wf-body-regular text-base bg-wf-primary text-wf-on-primary hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(4,12,33,0.1)] font-semibold"
              >
                {params?.id ? "Guardar Cambios" : "Crear Evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventsCreate;
