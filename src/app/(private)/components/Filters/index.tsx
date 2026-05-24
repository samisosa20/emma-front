import { useState, ReactNode } from "react";
import { MdFilterList, MdClose } from "react-icons/md";

//components
import useComponents from "@/share/components";

interface FiltersProps {
  children: ReactNode;
}

export default function Filters(props: FiltersProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { Typography } = useComponents();

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

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`bg-white h-screen fixed top-0 right-0 px-4 py-6 z-50 shadow-xl transition-all duration-300 ease-in-out transform ${
          isOpen
            ? "w-screen md:w-[350px] translate-x-0 opacity-100"
            : "w-screen md:w-[350px] translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h2" className="text-wf-on-surface">
            Filtros
          </Typography>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar filtros"
            className="p-2 rounded-full hover:bg-wf-surface-container-high focus-visible:ring-2 focus-visible:ring-wf-primary outline-none transition-all duration-200"
          >
            <MdClose className="w-6 h-6 text-wf-on-surface-variant" />
          </button>
        </div>
        <div className="relative h-[calc(100%-80px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
