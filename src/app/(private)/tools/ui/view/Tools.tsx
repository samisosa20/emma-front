import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";

// Helpers
import { driverTool } from "@/share/helpers";

export default function Tools(props: any) {
  const {
    currencyOptions = [],
    control,
    onSubmit,
    handleSubmit,
    displayText,
    handleSubmitTest,
    controlTest,
    onSubmitTest,
    isOpen,
    handleClose,
  } = props;
  const { Typography, Input, Select, FormControl, Button, Modal, TitleHelp } =
    useComponents();

  return (
    <div className="space-y-wf-lg pb-wf-xl">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-lg">
        <div>
          <TitleHelp
            title="Herramientas"
            onClick={driverTool}
            className="text-wf-primary font-wf-headline-lg"
          />
          <Typography className="text-wf-on-surface-variant font-wf-body-regular mt-wf-unit">
            Simuladores y calculadoras inteligentes para tus decisiones financieras.
          </Typography>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-wf-gutter">
        {/* Can I spend it? Tool */}
        <div
          id="fiona-canido"
          className="bg-wf-on-primary backdrop-blur-md p-wf-xl rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50"
        >
          <div className="flex items-center gap-3 mb-wf-lg border-b border-wf-surface-variant/20 pb-4">
             <div className="w-10 h-10 rounded-full bg-wf-primary/10 flex items-center justify-center text-wf-primary">
                <span className="material-symbols-outlined text-[24px]">payments</span>
             </div>
             <div>
                <h3 className="font-wf-headline-md text-lg text-wf-on-surface font-semibold">¿Podría gastarme esto?</h3>
                <p className="text-xs text-wf-on-surface-variant">Consulta si un gasto impacta negativamente tu salud financiera actual.</p>
             </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-12 gap-wf-md items-end"
          >
            <div className="md:col-span-5">
              <Controller
                name={"amount"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Monto del Gasto</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        step={0.01}
                        min={0}
                        placeholder="Eje: 500000"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            <div className="md:col-span-4">
              <Controller
                name={"badge_id"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                     <div className="space-y-1">
                        <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Moneda</label>
                        <Select
                          placeholder="Seleccionar..."
                          onChange={onChange}
                          options={currencyOptions}
                          value={value}
                        />
                      </div>
                  </FormControl>
                )}
              />
            </div>
            
            <div className="md:col-span-3">
              <button 
                type="submit"
                className="w-full bg-wf-primary text-wf-on-primary py-3.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Consultar Fiona
              </button>
            </div>
          </form>
        </div>

        {/* Investment Evaluation Tool */}
        <div
          id="fiona-test_project"
          className="bg-wf-on-primary backdrop-blur-md p-wf-xl rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50"
        >
          <div className="flex items-center gap-3 mb-wf-lg border-b border-wf-surface-variant/20 pb-4">
             <div className="w-10 h-10 rounded-full bg-wf-secondary/10 flex items-center justify-center text-wf-secondary">
                <span className="material-symbols-outlined text-[24px]">analytics</span>
             </div>
             <div>
                <h3 className="font-wf-headline-md text-lg text-wf-on-surface font-semibold">Evaluación de Inversión</h3>
                <p className="text-xs text-wf-on-surface-variant">Analiza la viabilidad de un proyecto basándote en flujos proyectados.</p>
             </div>
          </div>
          <form onSubmit={handleSubmitTest(onSubmitTest)} className="space-y-wf-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-wf-md">
              <Controller
                name={"rate"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Tasa Ref. (E.A %)</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        step={0.01}
                        placeholder="Eje: 12.5"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
              <Controller
                name={"periods"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Periodos (Años)</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        step={1}
                        placeholder="Eje: 5"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
              <Controller
                name={"investment"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Inversión Inicial</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        step={0.01}
                        placeholder="Monto de entrada"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-wf-md">
              <Controller
                name={"end_investement"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Valor Final Proyectado</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        placeholder="Valor de salida"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />

              <Controller
                name={"incomes_flow"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Ingresos Promedio</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        placeholder="Flujo anual (+)"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />

              <Controller
                name={"expensives_flow"}
                control={controlTest}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">Egresos Promedio</label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="number"
                        placeholder="Flujo anual (-)"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />
            </div>
            <div className="flex justify-end pt-wf-md">
              <button 
                type="submit"
                className="w-full md:w-auto min-w-[200px] bg-wf-secondary text-wf-on-secondary py-3.5 px-wf-xl rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Analizar Proyecto
              </button>
            </div>
          </form>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} title="Resultado del Análisis">
        <div className="p-wf-md space-y-wf-lg">
           <div className="bg-wf-surface-container-low p-wf-lg rounded-2xl border border-wf-primary/10">
              <div className="flex items-center gap-3 mb-3">
                 <span className="material-symbols-outlined text-wf-primary text-[32px]">smart_toy</span>
                 <Typography className="font-bold text-wf-primary text-lg">FIONA Dice:</Typography>
              </div>
              <Typography className="text-wf-on-surface font-wf-body-regular leading-relaxed text-justify">
                {displayText.message}
              </Typography>
           </div>
           <div className="flex justify-end">
              <button
                onClick={handleClose}
                className="bg-wf-on-surface text-wf-surface py-2 px-wf-lg rounded-xl font-bold hover:bg-wf-on-surface-variant transition-all"
              >
                Cerrar
              </button>
           </div>
        </div>
      </Modal>
    </div>
  );
}

