"use client";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";

// Assets
import imgLogo from "../../../../../../public/img/logo.png";

//components
import useComponents from "@/share/components";

export default function Login(props: any) {
  const { Button, Typography, Input, FormControl, Checkbox } = useComponents();

  const { handleSubmit, onSubmit, onGoogleLogin, control, isSubmitting } = props;

  return (
    <div className="flex items-center flex-col justify-center min-screen-fiona bg-primary space-y-4">
      <Image
        src={imgLogo}
        alt="Logo fiona"
        className="w-[250px] 2xl:w-[350px]"
        loading="lazy"
        height={94}
        width={350}
      />
      <div className="bg-white rounded-2xl border shadow-x1 py-8 2xl:py-10 px-8 max-w-[90vw] md:max-w-lg">
        <div className="flex flex-col items-center space-y-2 2xl:space-y-4">
          <Typography variant="h1" className="text-center">
            Inicio de sesión
          </Typography>
          <Typography variant="p" className="w-5/6 text-center">
            Hola, por favor ingresa tu email y contraseña para acceder.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Controller
              name={"email"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl fieldState={fieldState}>
                  <Input
                    type="email"
                    placeholder="Email"
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
                <FormControl fieldState={fieldState}>
                  <Input
                    type="password"
                    placeholder="Contraseña"
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
              name={"remind"}
              control={control}
              render={({ field: { onChange, onBlur, value }, fieldState }) => (
                <FormControl withOutHeight fieldState={fieldState}>
                  <div className="mb-4 flex items-start justify-between">
                    <Checkbox
                      label="Recordarme"
                      handleCheckboxChange={(e: any) => {
                        onChange(e);
                      }}
                      isChecked={!!value}
                    />
                    <Link href="/forgot" className="hidden lg:block">
                      <Typography variant="p" className="underline">
                        ¿Has olvidado tu contraseña?
                      </Typography>
                    </Link>
                  </div>
                </FormControl>
              )}
            />
            <Button
              variant="contained"
              block
              type="submit"
              disabled={isSubmitting}
            >
              Iniciar sesión
            </Button>
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
              <p className="mx-4 mb-0 text-center font-semibold text-gray-600">
                O
              </p>
            </div>
            <Button
              variant="outlined"
              block
              type="button"
              onClick={onGoogleLogin}
              disabled={isSubmitting}
              className="flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.25v1.86h2.64c1.55-1.42 2.43-3.5 2.43-5.87z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-1.86c-.73.49-1.66.78-2.64.78-2.85 0-5.27-1.92-6.13-4.51H5.17v2.07C6.98 20.44 9.32 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.87 14.75c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V8.5H5.17C4.42 10 4 11.7 4 13.5s.42 3.5 1.17 5l.7-1.75z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 9.32 1 6.98 3.56 5.17 6.43l3.35 2.59C9.38 6.43 11.15 5.38 12 5.38z"
                />
              </svg>
              <span>Continuar con Google</span>
            </Button>
            <Link href="/forgot" className="lg:hidden">
              <Typography
                variant="p"
                className="my-3 lg:mt-0 text-center underline"
              >
                ¿Has olvidado tu contraseña?
              </Typography>
            </Link>
            <div className="flex space-x-2 lg:mt-3 justify-center items-center">
              <Typography>¿Aun no tienes cuenta?</Typography>
              <Link href={"/register"}>
                <Typography variant="p" className="underline">
                  Registrarme
                </Typography>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
