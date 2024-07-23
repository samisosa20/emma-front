import { Controller } from "react-hook-form";

//components
import useComponents from "@/share/components";

// Helpers
import { driverSupport } from "@/share/helpers";

export default function Support(props: any) {
  const { control, onSubmit, handleSubmit, isLoading } = props;
  const { Typography, Input, Textarea, FormControl, Button, TitleHelp } =
    useComponents();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <TitleHelp title="Soporte" onClick={driverSupport} />
        </div>
      </div>
      <div
        id="emma-getintouch"
        className="mt-6 bg-white rounded shadow-sm py-6 px-4"
      >
        <Typography variant="h2">Contactanos</Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="gap-x-8">
          <Controller
            name={"subject"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Asunto"
                  label="Asunto"
                  id="subject"
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
            name={"message"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Textarea
                  rows={5}
                  placeholder="Deja aqui tu mensaje..."
                  label="Mensaje"
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className="text-right lg: text-left">
            {!isLoading ? (
              <Button type="submit">Enviar</Button>
            ) : (
              <Typography>Enviando....</Typography>
            )}
          </div>
        </form>
        <div id="emma-notes">
          <Typography variant="p">
            Una vez enviado el mensjae te llegara una copia del soporte, con
            asunto <b>EMMA- Soporte creado</b>, recuerda revisar spam.
          </Typography>
          <Typography variant="p">
            Todos los correos se envian baje el correo
            notificaciones@finanzaspersonalesemma.com.
          </Typography>
        </div>
      </div>
    </div>
  );
}
