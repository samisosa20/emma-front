import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  LineChart,
} from "recharts";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { getCurrencyFormatter, longDateFormatter } from "@/share/helpers";

export default function InvestmentsCreate(props: any) {
  const router = useRouter();
  const { Typography, Button, Input, FormControl, AutoComplete, Modal } =
    useComponents();

  const { Cards } = useComponentsLayout();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    listMovements,
    currencyOptions = [],
    handleDelete,
    handleAppretiation,
    handleClose = () => {},
    isOpen = false,
    onSubmitAppre,
    handleSubmitAppre,
    controlAppre,
    listAppretiations,
    handleEditAppretiation = () => {},
    idAppretiation,
    handleDeleteAppre = () => {},
    metrics = [],
    data,
  } = props;

  return (
    <div className="space-y-wf-lg pb-wf-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-wf-on-primary backdrop-blur-md shadow-sm border border-white/50 flex items-center justify-center text-wf-primary hover:bg-wf-primary hover:text-wf-on-primary transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="font-wf-headline-lg text-[32px] text-wf-primary">
              {title}
            </h1>
            <Typography className="text-wf-on-surface-variant font-wf-body-regular">
              Detalles y evolución de tu activo de inversión.
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-wf-sm">
          {handleAppretiation && (
            <button
              onClick={handleAppretiation}
              className="flex items-center gap-2 bg-wf-secondary text-wf-on-secondary px-wf-lg py-wf-md rounded-xl shadow-md hover:opacity-90 transition-all font-wf-label-caps text-[12px] uppercase tracking-wider font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">
                trending_up
              </span>
              Valorización
            </button>
          )}
          {handleDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 bg-wf-error/10 text-wf-error border border-wf-error/20 px-wf-lg py-wf-md rounded-xl hover:bg-wf-error hover:text-white transition-all font-wf-label-caps text-[12px] uppercase tracking-wider font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">
                delete
              </span>
              Eliminar
            </button>
          )}
        </div>
      </div>

      {handleDelete && (
        <div className="mb-wf-xl">
          <Cards title="Métricas de Rendimiento" data={metrics} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-wf-gutter">
        {/* Main Form Section */}
        <div className="lg:col-span-5 space-y-wf-lg">
          <div className="bg-wf-on-primary backdrop-blur-md p-wf-xl rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
            <h3 className="text-wf-label-caps text-[12px] font-bold text-wf-primary uppercase tracking-widest mb-wf-lg border-b border-wf-surface-variant/20 pb-2">
              Información General
            </h3>
            <form
              id="form-investment"
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-wf-md"
            >
              <Controller
                name={"name"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">
                        Nombre
                      </label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="text"
                        placeholder="Eje: Fondo Mutuo Global"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <Controller
                  name={"initAmount"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <div className="space-y-1">
                        <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">
                          Monto Inicial
                        </label>
                        <input
                          className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                          type="number"
                          step="0.01"
                          onChange={onChange}
                          value={value}
                        />
                      </div>
                    </FormControl>
                  )}
                />

                <Controller
                  name={"badgeId"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <div className="space-y-1">
                        <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">
                          Moneda
                        </label>
                        <AutoComplete
                          placeholder="Seleccionar..."
                          handleOnChange={onChange}
                          options={currencyOptions}
                          value={value}
                        />
                      </div>
                    </FormControl>
                  )}
                />
              </div>

              <Controller
                name={"dateInvestment"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <div className="space-y-1">
                      <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold ml-1">
                        Fecha de Apertura
                      </label>
                      <input
                        className="w-full bg-wf-surface-container-low/50 border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                        type="date"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  </FormControl>
                )}
              />

              <div className="pt-wf-md">
                <button
                  type="submit"
                  className="w-full bg-wf-primary text-wf-on-primary py-3.5 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
                >
                  Guardar Inversión
                </button>
              </div>
            </form>
          </div>

          {/* History List */}
          {listAppretiations && listAppretiations.length > 0 && (
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 overflow-hidden">
              <div className="p-wf-lg border-b border-wf-surface-variant/10 bg-wf-surface-container-low/30">
                <h3 className="text-wf-label-caps text-[12px] font-bold text-wf-primary uppercase tracking-widest">
                  Historial de Valorización
                </h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto divide-y divide-wf-surface-variant/10">
                {listAppretiations.map((appretiation: any) => (
                  <div
                    key={appretiation.id}
                    onClick={() => handleEditAppretiation(appretiation.id)}
                    className="p-wf-md hover:bg-wf-surface-container-low/50 transition-colors cursor-pointer group flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${appretiation.amount > 0 ? "bg-wf-secondary/10 text-wf-secondary" : "bg-wf-error/10 text-wf-error"}`}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {appretiation.amount > 0
                            ? "trending_up"
                            : "trending_down"}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-wf-on-surface">
                          Actualización
                        </p>
                        <p className="text-[10px] text-wf-surface-tint font-wf-label-caps">
                          {appretiation.dateAppreciation.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`font-wf-currency-display font-bold ${appretiation.amount > 0 ? "text-wf-secondary" : "text-wf-error"}`}
                      >
                        {data?.badge?.symbol}
                        {getCurrencyFormatter(
                          data?.badge?.code,
                          appretiation.amount,
                        )}
                      </span>
                      <span className="text-[10px] text-wf-surface-tint font-medium group-hover:text-wf-primary transition-colors">
                        Editar
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Charts & Movements Section */}
        <div className="lg:col-span-7 space-y-wf-lg">
          {listAppretiations && listAppretiations.length > 0 && (
            <div className="bg-wf-on-primary backdrop-blur-md p-wf-lg rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 h-[380px] flex flex-col">
              <div className="flex items-center justify-between mb-wf-md">
                <h3 className="text-wf-label-caps text-[12px] font-bold text-wf-primary uppercase tracking-widest">
                  Curva de Valorización
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-wf-secondary"></div>
                  <span className="text-[10px] font-bold text-wf-surface-tint uppercase">
                    Crecimiento
                  </span>
                </div>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={listAppretiations.map((v: any) => ({
                      amount: v.amount,
                      date: v.dateAppreciation.split("T")[0],
                    }))}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(0,0,0,0.05)"
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#666" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: "#666" }}
                      tickFormatter={(value) =>
                        `$${value >= 1000 ? (value / 1000).toFixed(0) + "k" : value}`
                      }
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        borderRadius: "12px",
                        border: "none",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        backdropBlur: "4px",
                      }}
                      formatter={(value: any) => [
                        getCurrencyFormatter(data?.badge?.code, Number(value)),
                        "Valorización",
                      ]}
                    />
                    <Line
                      type="monotone"
                      dataKey="amount"
                      stroke="#00c853"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#00c853",
                        strokeWidth: 2,
                        stroke: "#fff",
                      }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {listMovements && listMovements.length > 0 && (
            <div className="bg-wf-on-primary backdrop-blur-md rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50 overflow-hidden">
              <div className="p-wf-lg border-b border-wf-surface-variant/10 bg-wf-surface-container-low/30">
                <h3 className="text-wf-label-caps text-[12px] font-bold text-wf-primary uppercase tracking-widest">
                  Movimientos Asociados
                </h3>
              </div>
              <div className="divide-y divide-wf-surface-variant/10 max-h-[500px] overflow-y-auto">
                {listMovements.map((movement: any) => (
                  <div
                    key={movement.id}
                    className="p-wf-lg hover:bg-wf-surface-container-low/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${movement.amount > 0 ? "bg-wf-secondary/10 text-wf-secondary" : "bg-wf-error/10 text-wf-error"}`}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {movement.addWithdrawal
                              ? "sync_alt"
                              : movement.amount > 0
                                ? "add_circle"
                                : "remove_circle"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-wf-on-surface">
                            {movement.category?.name}
                          </p>
                          <p className="text-[10px] text-wf-surface-tint font-wf-label-caps">
                            {longDateFormatter.format(
                              new Date(movement.datePurchase),
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-wf-currency-display font-bold text-lg ${movement.amount > 0 ? "text-wf-secondary" : "text-wf-error"}`}
                        >
                          {movement?.account?.badge?.symbol}
                          {getCurrencyFormatter(
                            movement?.account?.badge?.code,
                            movement.amount,
                          )}
                        </p>
                        <p className="text-[10px] text-wf-surface-tint font-medium">
                          {movement.account?.name}
                        </p>
                      </div>
                    </div>
                    {movement.description && (
                      <p className="text-xs text-wf-on-surface-variant italic bg-wf-surface-container-low/50 p-2 rounded-lg ml-12">
                        "{movement.description}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Valorización Modal */}
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Actualizar Valorización"
      >
        <form
          onSubmit={handleSubmitAppre(onSubmitAppre)}
          className="space-y-wf-lg p-wf-md"
        >
          <div className="bg-wf-surface-container-low p-wf-lg rounded-xl space-y-wf-md">
            <Controller
              name={"amount"}
              control={controlAppre}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <div className="space-y-1">
                    <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                      Monto Actual
                    </label>
                    <input
                      className="w-full bg-white border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                      type="number"
                      step="0.01"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                </FormControl>
              )}
            />
            <Controller
              name={"dateAppreciation"}
              control={controlAppre}
              render={({ field: { onChange, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <div className="space-y-1">
                    <label className="text-[11px] font-wf-label-caps text-wf-surface-tint uppercase font-bold">
                      Fecha
                    </label>
                    <input
                      className="w-full bg-white border border-wf-surface-variant/30 rounded-xl p-3 text-sm focus:ring-2 focus:ring-wf-primary outline-none transition-all"
                      type="date"
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-3 pt-wf-md">
            <button
              type="submit"
              className="w-full bg-wf-primary text-wf-on-primary py-3 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Confirmar Actualización
            </button>
            {idAppretiation !== undefined && (
              <button
                type="button"
                onClick={handleDeleteAppre}
                className="w-full bg-transparent text-wf-error py-2 rounded-xl text-sm font-semibold hover:bg-wf-error/5 transition-all underline"
              >
                Eliminar Registro
              </button>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
}
