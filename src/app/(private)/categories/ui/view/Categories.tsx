"use client";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { driverCategory } from "@/share/helpers";

type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  color: string;
  icon: string;
  deletedAt: string | null;
};

export default function Categories(props: any) {
  const { data, setSearch, handleToggle, search, isChecked } = props;
  const { Typography } = useComponents();

  const filteredCategories = data?.content?.filter((category: categoryList) => {
    const matchesSearch = category.name
      ?.toLowerCase()
      ?.includes(search.toLowerCase());
    return isChecked
      ? !category.deletedAt && matchesSearch
      : !!category.deletedAt && matchesSearch;
  });

  return (
    <div className="space-y-wf-xl">
      {/* Page Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md">
        <div>
          <h1
            className="font-wf-headline-lg text-wf-headline-lg text-wf-on-surface cursor-pointer"
            onClick={driverCategory}
          >
            Categorías
          </h1>
          <p className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant mt-wf-unit">
            Manage and organize your transaction categories.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-wf-md">
          {/* Search Input */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline">
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-wf-surface-container-lowest border border-wf-outline-variant rounded-full text-sm focus:border-wf-primary focus:ring-1 focus:ring-wf-primary outline-none transition-all w-64 shadow-sm"
              placeholder="Search categories..."
              type="text"
              value={search}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(event.target.value)
              }
            />
          </div>
          {/* Toggle */}
          <div className="flex items-center gap-2 bg-wf-surface-container-high p-1 rounded-full">
            <button
              onClick={() => !isChecked && handleToggle()}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isChecked
                  ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface"
                  : "text-wf-on-surface-variant hover:text-wf-on-surface"
              }`}
            >
              Activos
            </button>
            <button
              onClick={() => isChecked && handleToggle()}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isChecked
                  ? "bg-wf-surface-container-lowest shadow-sm text-wf-on-surface"
                  : "text-wf-on-surface-variant hover:text-wf-on-surface"
              }`}
            >
              Inactivos
            </button>
          </div>
          {/* Create Button */}
          <Link
            href={"/categories/create"}
            className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Create Category
          </Link>
        </div>
      </div>

      {/* Bento Grid - Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-wf-gutter">
        {filteredCategories?.map((category: categoryList) => (
            <Link
              href={`/categories/${category.id}`}
              key={category.id}
              className="bg-wf-surface-container-lowest rounded-xl p-wf-md flex flex-col items-center justify-center gap-wf-sm shadow-[0_4px_12px_rgba(4,12,33,0.05)] hover:translate-y-[-2px] hover:shadow-[0_8px_24px_rgba(4,12,33,0.08)] transition-all cursor-pointer border border-wf-surface-container-high group relative overflow-hidden aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-wf-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${category.color}20`, color: category.color }}
              >
                <span className="material-symbols-outlined text-3xl filled">
                  {category.icon && !category.icon.startsWith('Pi') ? category.icon : "category"}
                </span>
              </div>
              <h3 className="font-wf-headline-md text-base text-wf-on-surface text-center px-2 line-clamp-2">
                {category.name}
              </h3>
              <span className="text-xs text-wf-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">
                 Ver detalles
              </span>
            </Link>
          ))}

        {/* Add New Category Placeholder */}
        <Link
          href="/categories/create"
          className="bg-wf-surface-container border-2 border-dashed border-wf-outline-variant rounded-xl p-wf-md flex flex-col items-center justify-center gap-wf-sm hover:border-wf-primary hover:bg-wf-primary-fixed/30 cursor-pointer transition-all group aspect-square"
        >
          <div className="w-12 h-12 rounded-full bg-wf-surface-container-lowest flex items-center justify-center text-wf-on-surface-variant group-hover:text-wf-primary transition-colors shadow-sm">
            <span className="material-symbols-outlined text-2xl">add</span>
          </div>
          <span className="font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-on-surface-variant group-hover:text-wf-primary transition-colors mt-2">
            New Category
          </span>
        </Link>
      </div>

      {filteredCategories?.length === 0 && (
        <div className="bg-wf-surface-container-lowest rounded-xl shadow-sm border border-wf-surface-container-high p-12 flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-wf-outline-variant text-6xl mb-4">
             category
          </span>
          <Typography className="text-center text-wf-on-surface-variant">
            Sin Categorías
          </Typography>
        </div>
      )}
    </div>
  );
}
