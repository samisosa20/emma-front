"use client";
import Image from "next/image";
import Link from "next/link";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

// Components
import useComponents from "@/share/components";

const Header = () => {
  const { Button } = useComponents();

  return (
    <div className="w-full h-[80px] py-2 px-8 bg-primary">
      <nav className="max-w-[1280px] mx-auto  flex items-center justify-between">
        <Link href="/">
          <Image
            src={imgLogo}
            alt="Logo Emma"
            loading="lazy"
            width={148}
            height={40}
          />
        </Link>
        <div className="gap-8 flex items-center justify-between">
          <Link
            href="/blogs"
            className="hidden md:block text-white hover:text-yellow-400"
          >
            Blogs
          </Link>
          <Link href="/login">
            <Button variant="outlined">Iniciar sesión</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
