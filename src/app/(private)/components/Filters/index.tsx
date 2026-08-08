"use client";
import { useState, useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import { MdFilterList, MdClose } from "react-icons/md";

//components
import useComponents from "@/share/components";

interface FiltersProps {
  children: ReactNode;
}

export default function Filters(props: FiltersProps) {
  const { children } = props;
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
          className="p-2 rounded-full hover:bg-wf-surface-container-high focus-visible:ring-2 focus-visible:ring-wf-primary outline-none transition-all duration-200"
        >
          <MdFilterList className="w-6 h-6 text-wf-on-surface-variant" />
        </button>
      </div>

      {isMounted &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[90] transition-opacity duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <div
              className={`bg-white dark:bg-slate-900 text-wf-on-surface h-screen fixed top-0 right-0 px-4 py-6 z-[100] shadow-2xl transition-all duration-300 ease-in-out transform border-l border-wf-outline-variant/30 flex flex-col ${
                isOpen
                  ? "w-screen md:w-[360px] translate-x-0 opacity-100"
                  : "w-screen md:w-[360px] translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-wf-outline-variant/20">
                <Typography variant="h2" className="text-wf-on-surface font-wf-headline-md font-bold text-lg">
                  Filtros
                </Typography>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar filtros"
                  className="p-2 rounded-full hover:bg-wf-surface-container-high text-wf-on-surface-variant hover:text-wf-primary outline-none transition-all duration-200"
                >
                  <MdClose className="w-6 h-6" />
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
