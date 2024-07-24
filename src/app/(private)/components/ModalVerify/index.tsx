"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

// Components
import useComponents from "@/share/components";

export default function ModalVerify() {
  const router = useRouter()
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false);
  const { Typography, Modal, Button } = useComponents();

  const handleGoProfile = () => {
    setIsOpen(false);
    router.push('/profile')
  };

  useEffect(() => {
    const user = localStorage.getItem("emma-user");
    if (user && pathname !== '/profile') {
      const userjson = JSON.parse(user);
      setIsOpen(!userjson.verify_email);
    }
  }, [pathname]);

  return (
    <Modal isOpen={isOpen} title=''>
      <Typography variant="h4" className="text-justify mb-4">¡Bienvenido/a a <b>EMMA</b>!</Typography>
      <Typography className="text-justify">
        Estamos encantados de tenerte
        con nosotros. Antes de comenzar a explorar todas las increíbles
        funcionalidades que ofrecemos, por favor verifica tu dirección de correo
        electrónico.<br/><br/>Hemos enviado un enlace de verificación a tu email.
        Simplemente haz clic en el enlace para confirmar tu email.<br/><br/>Si no encuentras el correo en tu
        bandeja de entrada, por favor revisa la carpeta de spam o correo no
        deseado.<br/><br/>Gracias por unirte a nosotros. ¡Esperamos que disfrutes de la
        experiencia!
      </Typography>
      <div className="text-center mt-4">
        <Button  onClick={handleGoProfile}>
          Ir al perfil
        </Button>
      </div>
    </Modal>
  );
}
