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
  const { FormControl, Button, Input } = useComponents();

  const { handleSubmit, onSubmit, control, title, isSubmitting } = props;

  return (
    <div className="flex-1 flex items-center justify-center w-full min-w-0">
      <div className="bg-wf-surface-container-lowest backdrop-blur-md w-full max-w-2xl rounded-xl p-4 sm:p-6 md:p-8 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30">
        <div className="mb-4 sm:mb-wf-lg flex justify-between items-start">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-wf-surface-container flex items-center justify-center shadow-sm text-wf-primary flex-shrink-0">
              <span
                className="material-symbols-outlined text-2xl sm:text-3xl"
                aria-hidden="true"
              >
                event
              </span>
            </div>
            <div>
              <h2 className="font-wf-headline-lg text-xl sm:text-2xl text-wf-primary mb-1">
                {title}
              </h2>
              <p className="font-wf-body-regular text-xs sm:text-sm text-wf-on-surface-variant">
                Planifica y realiza un seguimiento de tus hitos financieros.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-wf-outline hover:text-wf-primary transition-colors p-1"
            aria-label="Cerrar"
          >
            <span
              className="material-symbols-outlined text-2xl"
              aria-hidden="true"
            >
              close
            </span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-wf-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-wf-gutter">
            {/* Event Name */}
            <div className="md:col-span-2">
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label
                      htmlFor="event-name-create"
                      className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1"
                    >
                      Nombre del Evento
                    </label>
                    <Input
                      {...field}
                      id="event-name-create"
                      type="text"
                      placeholder="ej. Vacaciones de Verano 2024"
                      className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>

            {/* Event Type */}
            <div>
              <Controller
                name={"type"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label
                      htmlFor="event-type-create"
                      className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1"
                    >
                      Tipo de Evento
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full bg-white border ${
                          fieldState.error
                            ? "border-wf-error"
                            : "border-wf-outline-variant"
                        } text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm appearance-none`}
                        id="event-type-create"
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
                      <span
                        className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-wf-outline pointer-events-none text-xl"
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </div>
                  </FormControl>
                )}
              />
            </div>
            {/* Target Date */}
            <div>
              <Controller
                name={"endEvent"}
                control={control}
                render={({ field, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={false}>
                    <label
                      htmlFor="target-date-create"
                      className="font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase tracking-wider block mb-1"
                    >
                      Fecha Objetivo
                    </label>
                    <Input
                      {...field}
                      id="target-date-create"
                      type="date"
                      className="w-full bg-white border border-wf-outline-variant text-wf-on-surface rounded-lg px-wf-md py-3 font-wf-body-regular focus:outline-none focus:border-wf-primary transition-all shadow-sm"
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 sm:pt-wf-md border-t border-wf-surface-variant/30 flex flex-col-reverse sm:flex-row justify-end items-stretch sm:items-center gap-3 mt-6 sm:mt-wf-xl">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg border border-wf-outline text-wf-on-surface font-wf-body-regular hover:bg-wf-surface-container-highest transition-colors text-center"
            >
              Cancelar
            </button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial px-8 py-2.5 rounded-lg bg-wf-primary text-wf-on-primary font-wf-body-regular hover:bg-wf-primary-container shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2 h-auto"
            >
              <span
                className="material-symbols-outlined text-xl"
                aria-hidden="true"
              >
                check_circle
              </span>
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventsCreate;
