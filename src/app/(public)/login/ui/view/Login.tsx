"use client";
import Image from "next/image";

// Assets
import imgLogo from "../../../../../../public/img/logo.png";

//components
import useComponents from "@/share/components";

export default function Login(props: any) {
  const { Button, Typography } = useComponents();

  const { onGoogleLogin, isSubmitting } = props;

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
      <div className="bg-white rounded-2xl border shadow-xl py-8 2xl:py-10 px-8 w-full max-w-[90vw] md:max-w-md">
        <div className="flex flex-col items-center space-y-6">
          <div className="space-y-2 text-center">
            <Typography variant="h1">
              Bienvenido
            </Typography>
            <Typography variant="p" className="text-gray-600">
              Gestiona tus finanzas de forma segura. Inicia sesión para continuar.
            </Typography>
          </div>

          <Button
            variant="outlined"
            block
            type="button"
            onClick={onGoogleLogin}
            disabled={isSubmitting}
            className="flex items-center justify-center space-x-3 py-3 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-6 h-6" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-10.5-5.373-10.5-12c0-6.627,3.873-12,10.5-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span className="text-gray-800 font-bold text-base">Iniciar sesión con Google</span>
          </Button>

          <Typography variant="p" className="text-xs text-center text-gray-500 mt-4">
            Al iniciar sesión, aceptas nuestros términos de servicio y política de privacidad.
          </Typography>
        </div>
      </div>
    </div>
  );
}
