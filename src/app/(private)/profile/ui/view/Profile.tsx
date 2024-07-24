import { Controller } from "react-hook-form";
import { MdOutlineExitToApp } from "react-icons/md";

//components
import useComponents from "@/share/components";

export default function Profile(props: any) {
  const {
    handleLogout,
    currencyOptions = [],
    control,
    onSubmit,
    handleSubmit,
    isOpen,
    handleClose,
    controlDestroy,
    onSubmitDestroy,
    handleSubmitDestroy,
    emailUser,
    verify,
    handeResendVerify,
    isSubmitting,
  } = props;
  const { Typography, Input, Select, FormControl, Button, Modal } =
    useComponents();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <Typography variant="h1">Perfil</Typography>
          <Typography>Edita tu información</Typography>
        </div>
        <div>
          <Button
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            onClick={handleLogout}
          >
            <MdOutlineExitToApp />
            <Typography>Cerrar sesion</Typography>
          </Button>
        </div>
      </div>
      <div className="mt-6 bg-white rounded shadow-sm py-6 px-4 max-w-[640px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={"name"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder="Nombre"
                  label="Nombre"
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
            name={"password"}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="password"
                  placeholder="Contraseña"
                  label="Contraseña"
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

          {verify && (
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Aplicar cambios
            </Button>
          )}
        </form>
      </div>
      {!verify && <div className="max-w-[640px] mx-auto mt-8">
        <Button
          onClick={() => handeResendVerify()}
          className="w-full bg-green-500 hover:bg-green-300 text-white"
          disabled={isSubmitting}
        >
          Reenviar confirmacion
        </Button>
      </div>}
      <div className="max-w-[640px] mx-auto mt-8">
        <Button
          onClick={() => handleClose()}
          className="w-full bg-red-500 hover:bg-red-300 text-white"
        >
          Eliminar cuenta
        </Button>
      </div>
      <Modal
        title="Confirmación de eliminación de cuenta"
        isOpen={isOpen}
        onClose={() => handleClose()}
      >
        <form onSubmit={handleSubmitDestroy(onSubmitDestroy)}>
          <Typography>
            Nos duele verte partir, pero antes de proceder necesitamos que
            confirmes tu decisión. La eliminación de tu cuenta es irreversible y
            resultará en la pérdida de todos los datos asociados.
          </Typography>
          <Typography className="mb-4">
            Para confirmar dijita <b>{emailUser}</b> y pulsa en eliminar
          </Typography>
          <Controller
            name={"email"}
            control={controlDestroy}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type="text"
                  placeholder={emailUser}
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-300 text-white"
            disabled={isSubmitting}
          >
            Eliminar
          </Button>
        </form>
      </Modal>
    </div>
  );
}
