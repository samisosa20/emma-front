import Image from "next/image";

// Assets
import imgLogo from "../../../../../../public/img/logo.png";

//components
import useComponents from "@/share/components";

export default function Verify() {
  const { Typography } = useComponents();

  return (
    <div className="flex items-center flex-col justify-center min-screen-emma bg-primary space-y-4">
      <Image
        src={imgLogo}
        alt="Logo emma"
        className="w-[250px] 2xl:w-[350px]"
        loading="lazy"
        height={94}
        width={350}
      />
      <div className="bg-white rounded-2xl border shadow-x1 py-8 2xl:py-10 px-8 max-w-[90vw] md:max-w-lg">
        <div className="flex flex-col items-center space-y-4">
          <Typography variant="h1" className="text-center">
            Verificacion de correo electronico
          </Typography>
          <Typography variant="p" className="w-5/6 text-center">
            Espera un momento mientras validamos tu correo
          </Typography>
        </div>
      </div>
    </div>
  );
}
