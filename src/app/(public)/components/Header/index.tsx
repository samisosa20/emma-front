"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

// Components
import useComponents from "@/share/components";

const Header = () => {
  const { Button } = useComponents();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("fiona-user");
    if (userStr) {
      const user = JSON.parse(userStr);
      // Check for user identity (id or email) instead of token, as token is now secured in HttpOnly cookie
      setIsLogin(!!user?.id || !!user?.email || !!user?.token);
    }
  }, []);

  return (
    <div className="w-full h-[80px] py-2 px-4 sm:px-8 bg-primary">
      <nav className="max-w-[1280px] mx-auto flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src={imgLogo}
            alt="Logo Fiona"
            priority
            width={32}
            height={32}
            className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-wf-headline-md font-extrabold tracking-wider text-xl text-white uppercase">
            Fiona
          </span>
        </Link>
        <div className="gap-8 flex items-center justify-between">
          <Link
            href="/blogs"
            className="hidden md:block text-white hover:text-yellow-400"
          >
            Blogs
          </Link>
          <Link href="/login">
            {isLogin ? (
              <MdAccountCircle className="text-yellow-400 text-4xl" />
            ) : (
              <Button variant="outlined">Iniciar sesión</Button>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
