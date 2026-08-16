import Image from "next/image";

// Assets
import imgLogo from "../../../../../../public/img/logo.png";

//components
import useComponents from "@/share/components";

export default function Verify() {
  const { Typography } = useComponents();

  return (
    <div className="flex items-center flex-col justify-center min-screen-fiona bg-primary space-y-4 py-8">
      <Link href="/" className="flex items-center gap-3 group mb-2">
        <Image
          src={imgLogo}
          alt="Logo Fiona"
          className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          priority
          height={40}
          width={40}
        />
        <span className="font-wf-headline-md font-extrabold tracking-wider text-3xl text-white uppercase">
          Fiona
        </span>
      </Link>
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
