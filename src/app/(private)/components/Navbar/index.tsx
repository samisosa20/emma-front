"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

// Components
import useComponents from "@/share/components";

import { links } from "@/share/helpers";
import { authClient } from "@/share/lib/auth-client";

export default function Navbar() {
  const { Typography } = useComponents();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const user = session?.user || { name: "", image: "" };


  const obtenerIniciales = (name: string) => {
    const partesDelNombre = name?.split(" ");
    const iniciales = partesDelNombre?.map((parte) => parte[0]?.toUpperCase());
    return iniciales?.join("");
  };

  return (
    <aside className="hidden lg:block bg-primary p-4">
      <div id="fiona-logo-aside">
        <Link href="/dashboard">
          <Image src={imgLogo} alt="Logo fiona" />
        </Link>
      </div>
      <ul className="mt-4 text-white">
        {links
          .filter((v) => v.show)
          .map((link, index) => {
            const Icon = link.icon;
            if (typeof link.link === "string") {
              return (
                <Link
                  href={link.link}
                  key={index}
                  className={!link.mobile ? "hidden lg:block" : ""}
                >
                  <li
                    className={`${
                      pathname === link.link ? "text-secondary" : "text-white"
                    } mb-2 flex space-x-4 items-center hover:text-secondary`}
                  >
                    <Icon />
                    <Typography
                      variant="h3"
                      className={`${
                        pathname === link.link ? "text-secondary" : "text-white"
                      } hover:text-secondary`}
                    >
                      {link.name}
                    </Typography>
                  </li>
                </Link>
              );
            }
            return (
              <div onClick={link.onClick} key={index}>
                <li
                  className={`text-white mb-2 flex space-x-4 items-center hover:text-secondary cursor-pointer`}
                >
                  <Icon />
                  <Typography
                    variant="h3"
                    className={`text-white hover:text-secondary`}
                  >
                    {link.name}
                  </Typography>
                </li>
              </div>
            );
          })}
        <li>
          <Link href={"/profile"}>
            <div
              className="bg-neutral-700 rounded py-2 px-3 fixed bottom-8 flex items-center w-[168px]"
              id="fiona-profile-aside"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-base font-semibold shrink-0 overflow-hidden">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  obtenerIniciales(user.name ?? "")
                )}
              </div>
              <span className="ml-2 text-white font-medium text-sm truncate">
                {user.name}
              </span>
            </div>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
