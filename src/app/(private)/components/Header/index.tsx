"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdMenu, MdOutlineClose, MdSearch } from "react-icons/md";
import { usePathname } from "next/navigation";

// Assets
import imgLogo from "../../../../../public/img/logo.png";

import { links } from "@/share/helpers";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("Demo");
  const pathname = usePathname();

  const obtenerIniciales = (name: string) => {
    const partesDelNombre = name?.split(" ");
    const iniciales = partesDelNombre?.map((parte) => parte[0]?.toUpperCase());
    return iniciales?.join("");
  };

  useEffect(() => {
    if (localStorage.getItem("fiona-user"))
      setUserName(JSON.parse(localStorage.getItem("fiona-user") ?? "{}").name);
  }, []);

  return (
    <>
      {/* TopAppBar (Web) */}
      <header className="hidden md:flex bg-white/80 backdrop-blur-md text-slate-900 font-manrope antialiased w-full top-0 border-b border-slate-200 shadow-sm sticky z-40 justify-between items-center px-6 py-3">
        <div className="text-xl font-extrabold tracking-tight text-wf-primary">WealthFlow</div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              className="bg-wf-surface-container-low border border-wf-outline-variant focus:border-wf-primary text-wf-on-surface rounded-full py-2 pl-10 pr-4 text-sm w-64 transition-colors outline-none"
              placeholder="Buscar..."
              type="text"
            />
          </div>
          <Link href="/profile">
            <button className="hover:bg-slate-50 transition-colors active:scale-95 duration-150 p-2 rounded-full flex items-center justify-center bg-slate-100">
              <div className="w-8 h-8 bg-wf-primary text-wf-on-primary rounded-full flex items-center justify-center text-xs font-bold">
                {obtenerIniciales(userName)}
              </div>
            </button>
          </Link>
        </div>
      </header>

      {/* Mobile TopBar */}
      <nav className="md:hidden bg-wf-primary px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <Image src={imgLogo} alt="WealthFlow Logo" width={140} height={38} className="h-9 w-auto" />
          </Link>
          <button id="fiona-menu-mobile" onClick={() => setIsOpen(true)}>
            <MdMenu className="text-white w-7 h-7" />
          </button>
        </div>

        <div
          className={`${
            isOpen ? "translate-x-0" : "translate-x-full"
          } fixed inset-0 w-screen h-screen bg-wf-primary px-4 pt-4 transition-transform duration-300 z-[60]`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <Link href="/dashboard" onClick={() => setIsOpen(false)}>
              <Image src={imgLogo} alt="WealthFlow Logo" width={140} height={38} className="h-9 w-auto" />
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <MdOutlineClose className="text-white w-7 h-7" />
            </button>
          </div>
          <ul className="mt-8 flex flex-col gap-2">
            {links
              .filter((v) => v.show)
              .map((link, index) => {
                const Icon = link.icon;
                const isActive = pathname === link.link;
                if (typeof link.link === "string") {
                  return (
                    <Link
                      href={link.link}
                      key={index}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-colors ${
                        isActive ? "bg-white/10 text-wf-secondary" : "text-white"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-manrope font-semibold text-lg">{link.name}</span>
                    </Link>
                  );
                }
                return (
                  <button
                    onClick={() => { link.onClick(); setIsOpen(false); }}
                    key={index}
                    className="flex items-center gap-4 px-4 py-4 rounded-xl text-white active:bg-white/10 text-left"
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-manrope font-semibold text-lg">{link.name}</span>
                  </button>
                );
              })}
            <li className="mt-auto pt-8">
              <Link href={"/profile"} onClick={() => setIsOpen(false)}>
                <div className="bg-white/10 rounded-2xl py-4 px-5 flex items-center border border-white/5">
                  <div className="w-12 h-12 bg-white text-wf-primary rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                    {obtenerIniciales(userName)}
                  </div>
                  <div className="ml-4 flex flex-col overflow-hidden">
                    <span className="text-white font-bold text-base truncate">
                      {userName}
                    </span>
                    <span className="text-white/60 text-xs uppercase tracking-widest font-bold">Ver Perfil</span>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
