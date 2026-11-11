"use client";
import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdFilterList, MdClose } from "react-icons/md";

//components
import useComponents from "@/share/components";

interface FiltersProps {
  children: ReactNode;
  label?: string;
  buttonClassName?: string;
}

export default function Filters(props: FiltersProps) {
  const { children, label, buttonClassName } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { Typography } = useComponents();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          id="fiona-filter"
          aria-label="Abrir filtros"
          className={
            buttonClassName ??
            "p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 focus-visible:ring-2 focus-visible:ring-emerald-500 outline-none transition-all duration-200"
          }
        >
          <MdFilterList className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          {label && <span>{label}</span>}
        </button>
      </div>

      {isMounted &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[90] transition-opacity duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div
              className={`bg-slate-950/95 backdrop-blur-2xl text-slate-100 h-screen fixed top-0 right-0 px-5 py-6 z-[100] shadow-[0_20px_60px_rgba(0,0,0,0.8)] transition-all duration-300 ease-in-out transform border-l border-slate-800 flex flex-col ${
                isOpen
                  ? "w-screen md:w-[360px] translate-x-0 opacity-100"
                  : "w-screen md:w-[360px] translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-slate-800/80">
                <Typography variant="h2" className="text-emerald-400 font-wf-headline-md font-bold text-lg tracking-wide">
                  Filtros
                </Typography>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar filtros"
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-emerald-400 outline-none transition-all duration-200"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
                {children}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
