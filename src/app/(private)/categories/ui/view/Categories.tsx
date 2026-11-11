"use client";
import React, { memo } from "react";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { driverCategory } from "@/share/helpers/driver";

type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  color: string;
  icon: string;
  deletedAt: string | null;
};

/**
 * ⚡ Bolt Optimization: Memoization of Categories View
 * 🎯 Problem: Rendering the entire grid of category cards on every keystroke in search.
 * 📊 Impact: Skips the expensive reconciliation of the category layout when
 *    the parent Page component re-renders without prop changes.
 */
const Categories = memo((props: any) => {
  const { filteredCategories, setSearch, handleToggle, search, isChecked } =
    props;
  const { Typography, SegmentedControl, CategoryIcon } = useComponents();

  return (
    <div className="space-y-6">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1
            className="font-wf-headline-lg text-2xl sm:text-3xl text-emerald-400 font-bold tracking-tight cursor-pointer focus-visible:outline-emerald-500 rounded-lg transition-all"
            onClick={driverCategory}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                driverCategory();
              }
            }}
            tabIndex={0}
            role="button"
          >
            Categorías
          </h1>
          <p className="font-wf-body-regular text-sm text-slate-400 mt-1">
            Gestiona y organiza tus categorías de transacciones.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64 flex-1 sm:flex-initial min-w-[160px]">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-900/70 border border-slate-800 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder:text-slate-500 outline-none transition-all w-full shadow-xs"
              placeholder="Buscar categorías..."
              aria-label="Buscar categorías"
              type="text"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Toggle */}
            <SegmentedControl
              isChecked={isChecked}
              handleToggle={handleToggle}
              ariaLabel="Filtrar por estado de categoría"
            />
            {/* Create Button */}
            <Link
              href={"/categories/create"}
              className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 py-2 px-4 sm:px-5 rounded-xl font-mono text-[11px] sm:text-xs uppercase font-bold tracking-wider shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-sm font-bold">add</span>
              Crear Categoría
            </Link>
          </div>
        </div>
      </div>

      {/* Bento Grid - Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {filteredCategories?.map((category: categoryList) => (
          <Link
            href={`/categories/${category.id}`}
            key={category.id}
            className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 flex flex-col items-center justify-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-emerald-500/40 transition-all cursor-pointer border border-slate-800/80 group relative overflow-hidden aspect-square"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CategoryIcon
              icon={category.icon}
              color={category.color}
              size="lg"
              className="mb-2 transition-transform group-hover:scale-110"
            />
            <h3 className="font-wf-headline-md text-sm text-slate-100 group-hover:text-emerald-400 transition-colors text-center px-2 line-clamp-2 font-medium">
              {category.name}
            </h3>
            <span className="text-xs text-emerald-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
              Ver detalles
            </span>
          </Link>
        ))}

        {/* Add New Category Placeholder */}
        <Link
          href="/categories/create"
          className="bg-slate-950/40 border-2 border-dashed border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-center gap-2 hover:border-emerald-500/50 hover:bg-slate-900/40 cursor-pointer transition-all group aspect-square"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-800/60 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 border border-slate-700/60 flex items-center justify-center transition-colors shadow-xs">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-slate-400 group-hover:text-emerald-400 transition-colors mt-2 font-semibold">
            Nueva Categoría
          </span>
        </Link>
      </div>

      {filteredCategories?.length === 0 && (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-dashed border-slate-800 p-12 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-slate-500 text-6xl mb-4">
            category
          </span>
          <Typography className="text-center text-slate-400 font-wf-body-regular text-sm">
            Sin Categorías registradas
          </Typography>
        </div>
      )}
    </div>
  );
});

export default Categories;
