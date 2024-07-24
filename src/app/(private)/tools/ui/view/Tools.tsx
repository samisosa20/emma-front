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
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <TitleHelp title="Herramientas" onClick={driverTool} />
        </div>
      </div>
      <div id="emma-canido" className="mt-6 bg-white rounded shadow-sm py-6 px-4">
        <Typography variant="h2">Podria gastarme</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:flex items-center gap-x-8"
        >
          <Controller
            name={"amount"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="number"
                  step={0.01}
                  min={0}
                  placeholder="Monto"
                  label="Monto"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />

          <Controller
            name={"badge_id"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label="Moneda"
                  placeholder="Seleciona una opcion"
                  id="badge_id"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  options={currencyOptions}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className="text-right lg: text-left">
            <Button type="submit">Consultar</Button>
          </div>
        </form>
      </div>
      <div id="emma-test_project" className="mt-6 bg-white rounded shadow-sm py-6 px-4">
        <Typography variant="h2">Evaluacion de inversión</Typography>
        <form onSubmit={handleSubmitTest(onSubmitTest)}>
          <div className="lg:flex items-center gap-x-8">
            <Controller
              name={"rate"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={0.01}
                    min={0}
                    placeholder="Tasa de interes de referencia E.A"
                    label="Tasa de interes de referencia E.A"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={"periods"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={1}
                    min={1}
                    placeholder="Nro de periodos (años)"
                    label="Nro de periodos (años)"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
            <Controller
              name={"investment"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={0.01}
                    min={1}
                    placeholder="Valor de la inversión inicial"
                    label="Valor de la inversión inicial"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="lg:flex items-center gap-x-8">
            <Controller
              name={"end_investement"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={1}
                    min={1}
                    placeholder="Valor final de la inversión"
                    label="Valor final de la inversión"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />

            <Controller
              name={"incomes_flow"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={1}
                    min={0}
                    placeholder="Ingresos promedio"
                    label="Ingresos promedio"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />

            <Controller
              name={"expensives_flow"}
              control={controlTest}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState} withLabel={true}>
                  <Input
                    type="number"
                    step={1}
                    min={0}
                    placeholder="Egresos promedio"
                    label="Egresos promedio"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    iserror={!!fieldState.error}
                    value={value}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="text-right lg: text-left">
            <Button type="submit">Consultar</Button>
          </div>
        </form>
      </div>
      <Modal isOpen={isOpen} title="EMMA:">
        <Typography className="text-justify">{displayText.message}</Typography>
        <div className="text-right">
          <Button variant="outlined" color="dark" onClick={handleClose}>
            Cerrar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
