"use client";
import Image from "next/image";
import Link from "next/link";
import { Controller } from "react-hook-form";

// Assets
import imgLogo from "../../public/img/logo.png";

//components
import useComponents from "@/share/components";

import useLogin from "./controller";

const Login = () => {
  const { Button, Typography, Input, FormControl, Checkbox } = useComponents();

  const { handleSubmit, onSubmit, control } = useLogin();

  return (
    <div className="flex items-center flex-col justify-center h-screen bg-primary space-y-4">
      <Image src={imgLogo} alt="Logo fiona" />
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
                    <Link href="/forgot" className="hidden lg:block"><Typography variant="p" className="underline">¿Has olvidado tu contraseña?</Typography></Link>
                  </div>
                </FormControl>
              )}
            />
            <Button variant="contained" block type="submit">
              Iniciar sesión
            </Button>
            <Link href="/forgot" className="lg:hidden"><Typography variant="p" className="my-3 lg:mt-0 text-center underline">¿Has olvidado tu contraseña?</Typography></Link>
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
      <Typography variant="p" className="text-white text-center">
        © Copyright 2023
      </Typography>
    </div>
  );
};

export default Login;
