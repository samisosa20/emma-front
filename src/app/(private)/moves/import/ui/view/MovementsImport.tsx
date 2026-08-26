"use client";

import { memo, useRef } from "react";
import Link from "next/link";
import useComponents from "@/share/components";
import { getCurrencyFormatter } from "@/share/helpers";
import { ParsedMovementRow } from "@/share/helpers/movementImportParser";
import { ImportSummary } from "../model/movementsImport.models";

interface MovementsImportProps {
  selectedFile: File | null;
  parseResult: any;
  isParsing: boolean;
  isImporting: boolean;
  importProgress: number;
  defaultAccountId: string;
  defaultCategoryId: string;
  excludedIndices: Set<number>;
  filterStatus: "all" | "valid" | "invalid";
  searchQuery: string;
  importSummary: ImportSummary | null;
  isSuccessModalOpen: boolean;
  accountOptions: Array<{ label: string; value: string }>;
  categoryOptions: Array<{ label: string; value: string }>;
  displayedRows: ParsedMovementRow[];
  rowsToImport: ParsedMovementRow[];
  handleFileSelect: (file: File) => void;
  handleDefaultAccountChange: (id: string) => void;
  handleDefaultCategoryChange: (id: string) => void;
  toggleRowExclusion: (index: number) => void;
  setFilterStatus: (status: "all" | "valid" | "invalid") => void;
  setSearchQuery: (query: string) => void;
  handleExecuteImport: () => void;
  handleReset: () => void;
  downloadTemplate: (format: "xlsx" | "csv") => void;
  setIsSuccessModalOpen: (isOpen: boolean) => void;
  router: any;
}

const MovementsImport = memo(
  ({
    selectedFile,
    parseResult,
    isParsing,
    isImporting,
    importProgress,
    defaultAccountId,
    defaultCategoryId,
    excludedIndices,
    filterStatus,
    searchQuery,
    importSummary,
    isSuccessModalOpen,
    accountOptions,
    categoryOptions,
    displayedRows,
    rowsToImport,
    handleFileSelect,
    handleDefaultAccountChange,
    handleDefaultCategoryChange,
    toggleRowExclusion,
    setFilterStatus,
    setSearchQuery,
    handleExecuteImport,
    handleReset,
    downloadTemplate,
    setIsSuccessModalOpen,
    router,
  }: MovementsImportProps) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { AutoComplete, Modal } = useComponents();

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelect(e.dataTransfer.files[0]);
      }
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    return (
      <main className="flex-1 flex flex-col items-center relative w-full min-w-0 pb-12">
        <div className="w-full max-w-5xl space-y-6">
          {/* Header Card */}
          <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <Link
                href="/moves"
                className="p-2 rounded-xl text-wf-on-surface-variant hover:text-wf-primary hover:bg-wf-surface-container transition-all active:scale-95 border border-wf-outline-variant/30"
                aria-label="Volver a transacciones"
              >
                <span className="material-symbols-outlined text-xl">arrow_back</span>
              </Link>
              <div>
                <h1 className="font-wf-headline-md text-wf-on-surface text-xl sm:text-2xl font-bold">
                  Importación Masiva de Movimientos
                </h1>
                <p className="text-xs sm:text-sm text-wf-on-surface-variant">
                  Carga tus transacciones financieras desde extractos Excel (.xlsx) o archivos CSV.
                </p>
              </div>
            </div>

            {/* Template Download Dropdown / Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => downloadTemplate("xlsx")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-all active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">table_view</span>
                <span>Plantilla Excel</span>
              </button>
              <button
                type="button"
                onClick={() => downloadTemplate("csv")}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-wf-surface-container text-wf-on-surface-variant border border-wf-outline-variant/30 hover:bg-wf-surface-container-high transition-all active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">description</span>
                <span>Plantilla CSV</span>
              </button>
            </div>
          </div>

          {/* Upload Dropzone */}
          {!parseResult ? (
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              onClick={() => fileInputRef.current?.click()}
              className={`bg-wf-surface-container-lowest border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-4 hover:border-wf-primary hover:bg-wf-surface-container-low/50 ${
                isParsing ? "opacity-60 pointer-events-none" : "border-wf-outline-variant/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-wf-primary/10 text-wf-primary flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-3xl sm:text-4xl">
                  {isParsing ? "hourglass_top" : "upload_file"}
                </span>
              </div>

              <div className="space-y-1 max-w-md">
                <h3 className="font-wf-headline-md text-base sm:text-lg font-bold text-wf-on-surface">
                  {isParsing
                    ? "Procesando archivo..."
                    : "Arrastra y suelta tu archivo aquí o haz clic para examinar"}
                </h3>
                <p className="text-xs text-wf-on-surface-variant leading-relaxed">
                  Admite archivos <strong>.xlsx</strong>, <strong>.xls</strong> o <strong>.csv</strong> de hasta 10 MB con formato de extracto bancario o plantilla estándar.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-wf-surface-container text-wf-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">calendar_today</span> Fecha
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-wf-surface-container text-wf-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">payments</span> Monto
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-wf-surface-container text-wf-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">label</span> Descripción
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-wf-surface-container text-wf-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">account_balance_wallet</span> Cuenta
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-wf-surface-container text-wf-on-surface-variant">
                  <span className="material-symbols-outlined text-xs">category</span> Categoría
                </span>
              </div>
            </div>
          ) : (
            /* File Preview & Actions State */
            <div className="space-y-6">
              {/* File Info & Default Fallbacks Bar */}
              <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-4 sm:p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-wf-outline-variant/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center">
                      <span className="material-symbols-outlined text-xl">description</span>
                    </div>
                    <div>
                      <h4 className="font-wf-headline-md text-sm font-bold text-wf-on-surface">
                        {selectedFile?.name}
                      </h4>
                      <p className="text-xs text-wf-on-surface-variant">
                        {selectedFile ? (selectedFile.size / 1024).toFixed(1) + " KB" : ""} • {parseResult.totalRows} filas detectadas
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all self-end sm:self-auto border border-rose-200 dark:border-rose-900/40"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                    <span>Cambiar Archivo</span>
                  </button>
                </div>

                {/* Default Selectors for Unspecified Rows */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-wf-on-surface mb-1.5">
                      Cuenta por Defecto (para filas sin cuenta)
                    </label>
                    <AutoComplete
                      placeholder="Seleccionar cuenta predeterminada"
                      id="defaultAccount"
                      instanceId="default-account-select"
                      handleOnChange={(opt: any) => handleDefaultAccountChange(opt?.value || "")}
                      options={accountOptions}
                      value={accountOptions.find((a) => a.value === defaultAccountId)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-wf-on-surface mb-1.5">
                      Categoría por Defecto (para filas sin categoría)
                    </label>
                    <AutoComplete
                      placeholder="Seleccionar categoría predeterminada"
                      id="defaultCategory"
                      instanceId="default-category-select"
                      handleOnChange={(opt: any) => handleDefaultCategoryChange(opt?.value || "")}
                      options={categoryOptions}
                      value={categoryOptions.find((c) => c.value === defaultCategoryId)}
                    />
                  </div>
                </div>
              </div>

              {/* Statistics Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-wf-surface-container-lowest rounded-2xl border border-wf-outline-variant/30 p-4 shadow-xs">
                  <span className="text-[11px] font-bold text-wf-surface-tint uppercase tracking-wider font-wf-label-caps block mb-1">
                    Total Filas
                  </span>
                  <span className="font-wf-headline-md text-2xl font-extrabold text-wf-on-surface">
                    {parseResult.totalRows}
                  </span>
                </div>

                <div className="bg-wf-surface-container-lowest rounded-2xl border border-emerald-200 dark:border-emerald-800/40 p-4 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-wf-label-caps block mb-1">
                    Válidos Para Importar
                  </span>
                  <span className="font-wf-headline-md text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {rowsToImport.length}
                  </span>
                </div>

                <div className="bg-wf-surface-container-lowest rounded-2xl border border-wf-outline-variant/30 p-4 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-wf-label-caps block mb-1">
                    Total Ingresos
                  </span>
                  <span className="font-wf-headline-md text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 truncate block">
                    +${getCurrencyFormatter("USD", parseResult.totalIncome)}
                  </span>
                </div>

                <div className="bg-wf-surface-container-lowest rounded-2xl border border-wf-outline-variant/30 p-4 shadow-xs">
                  <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider font-wf-label-caps block mb-1">
                    Total Gastos
                  </span>
                  <span className="font-wf-headline-md text-lg sm:text-xl font-bold text-rose-600 dark:text-rose-400 truncate block">
                    -${getCurrencyFormatter("USD", parseResult.totalExpense)}
                  </span>
                </div>
              </div>

              {/* Table / List Controls */}
              <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 overflow-hidden">
                <div className="p-4 border-b border-wf-outline-variant/20 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-wf-surface-container-low/40">
                  {/* Status Filters */}
                  <div className="flex rounded-xl bg-wf-surface-container p-1 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setFilterStatus("all")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        filterStatus === "all"
                          ? "bg-wf-surface text-wf-primary shadow-xs font-bold"
                          : "text-wf-on-surface-variant hover:text-wf-on-surface"
                      }`}
                    >
                      Todos ({parseResult.totalRows})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterStatus("valid")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        filterStatus === "valid"
                          ? "bg-wf-surface text-emerald-600 dark:text-emerald-400 shadow-xs font-bold"
                          : "text-wf-on-surface-variant hover:text-wf-on-surface"
                      }`}
                    >
                      Válidos ({parseResult.validRows})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterStatus("invalid")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        filterStatus === "invalid"
                          ? "bg-wf-surface text-rose-600 dark:text-rose-400 shadow-xs font-bold"
                          : "text-wf-on-surface-variant hover:text-wf-on-surface"
                      }`}
                    >
                      Con Errores ({parseResult.invalidRows})
                    </button>
                  </div>

                  {/* Search Input */}
                  <div className="relative flex-1 max-w-xs">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-surface-tint text-lg">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Buscar por descripción, cuenta..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-wf-surface border border-wf-outline-variant/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-wf-on-surface placeholder:text-wf-on-surface-variant/60 focus:outline-none focus:border-wf-primary"
                    />
                  </div>
                </div>

                {/* Desktop Preview Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-wf-surface-container-low/60 text-wf-surface-tint uppercase font-wf-label-caps text-[11px] border-b border-wf-outline-variant/20">
                      <tr>
                        <th className="py-3 px-4 w-12 text-center">Incluir</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Fecha</th>
                        <th className="py-3 px-4">Descripción</th>
                        <th className="py-3 px-4">Tipo</th>
                        <th className="py-3 px-4 text-right">Monto</th>
                        <th className="py-3 px-4">Cuenta</th>
                        <th className="py-3 px-4">Categoría</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-wf-outline-variant/20 text-wf-on-surface">
                      {displayedRows.map((row) => {
                        const isExcluded = excludedIndices.has(row.index);
                        const isTransfer = row.type === "0";
                        const isIncome = row.type === "1";

                        return (
                          <tr
                            key={row.index}
                            className={`transition-colors ${
                              isExcluded
                                ? "opacity-40 bg-wf-surface-container-low/20"
                                : row.isValid
                                ? "hover:bg-wf-surface-container-low/40"
                                : "bg-rose-50/50 dark:bg-rose-950/20"
                            }`}
                          >
                            <td className="py-3 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={!isExcluded && row.isValid}
                                disabled={!row.isValid}
                                onChange={() => toggleRowExclusion(row.index)}
                                className="w-4 h-4 rounded border-wf-outline-variant text-wf-primary focus:ring-wf-primary"
                              />
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              {row.isValid ? (
                                row.warnings.length > 0 ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200">
                                    <span className="material-symbols-outlined text-xs">warning</span>
                                    Advertencia
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                                    <span className="material-symbols-outlined text-xs">check_circle</span>
                                    Válido
                                  </span>
                                )
                              ) : (
                                <span
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200"
                                  title={row.errors.join(", ")}
                                >
                                  <span className="material-symbols-outlined text-xs">error</span>
                                  {row.errors[0]}
                                </span>
                              )}
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap font-medium font-wf-body-regular">
                              {row.date}
                            </td>

                            <td className="py-3 px-4 font-semibold max-w-[200px] truncate">
                              {row.description}
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase font-wf-label-caps ${
                                  isTransfer
                                    ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                                    : isIncome
                                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                                    : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                                }`}
                              >
                                {isTransfer ? "Transferencia" : isIncome ? "Ingreso" : "Gasto"}
                              </span>
                            </td>

                            <td
                              className={`py-3 px-4 text-right font-bold whitespace-nowrap ${
                                isTransfer
                                  ? "text-sky-600 dark:text-sky-400"
                                  : isIncome
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {isIncome ? "+" : "-"}${getCurrencyFormatter("USD", row.amount)}
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              {row.accountName ? (
                                <span className="inline-flex items-center gap-1 font-medium">
                                  <span className="material-symbols-outlined text-xs text-wf-surface-tint">
                                    account_balance_wallet
                                  </span>
                                  {row.accountName}
                                </span>
                              ) : (
                                <span className="text-rose-500 font-bold italic">No asignada</span>
                              )}
                            </td>

                            <td className="py-3 px-4 whitespace-nowrap">
                              {row.categoryName ? (
                                <span className="inline-flex items-center gap-1 text-wf-on-surface-variant font-medium">
                                  <span className="material-symbols-outlined text-xs text-wf-surface-tint">
                                    category
                                  </span>
                                  {row.categoryName}
                                </span>
                              ) : (
                                <span className="text-amber-600 italic">Sin categoría</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card List View */}
                <div className="md:hidden divide-y divide-wf-outline-variant/20">
                  {displayedRows.map((row) => {
                    const isExcluded = excludedIndices.has(row.index);
                    const isTransfer = row.type === "0";
                    const isIncome = row.type === "1";

                    return (
                      <div
                        key={row.index}
                        className={`p-4 flex flex-col gap-2.5 ${
                          isExcluded
                            ? "opacity-40 bg-wf-surface-container-low/20"
                            : row.isValid
                            ? "bg-wf-surface"
                            : "bg-rose-50/50 dark:bg-rose-950/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={!isExcluded && row.isValid}
                              disabled={!row.isValid}
                              onChange={() => toggleRowExclusion(row.index)}
                              className="w-4 h-4 rounded border-wf-outline-variant text-wf-primary"
                            />
                            <span className="font-wf-body-regular text-xs text-wf-surface-tint">
                              {row.date}
                            </span>
                          </div>

                          <span
                            className={`text-sm font-extrabold ${
                              isTransfer
                                ? "text-sky-600"
                                : isIncome
                                ? "text-emerald-600"
                                : "text-rose-600"
                            }`}
                          >
                            {isIncome ? "+" : "-"}${getCurrencyFormatter("USD", row.amount)}
                          </span>
                        </div>

                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-wf-on-surface">
                            {row.description}
                          </p>
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                              isTransfer
                                ? "bg-sky-50 text-sky-700"
                                : isIncome
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {isTransfer ? "Transfer" : isIncome ? "Ingreso" : "Gasto"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center justify-between text-xs text-wf-on-surface-variant pt-1 border-t border-wf-outline-variant/10">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">account_balance_wallet</span>
                            {row.accountName || "Sin cuenta"}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">category</span>
                            {row.categoryName || "Sin categoría"}
                          </span>
                        </div>

                        {row.errors.length > 0 && (
                          <p className="text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">error</span>
                            {row.errors.join(", ")}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Empty Search State */}
                {displayedRows.length === 0 && (
                  <div className="p-8 text-center text-wf-on-surface-variant">
                    <span className="material-symbols-outlined text-3xl mb-2 text-wf-surface-tint">
                      search_off
                    </span>
                    <p className="text-xs font-semibold">
                      No se encontraron movimientos con los filtros aplicados
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Execution Action Bar */}
              <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 z-20 backdrop-blur-md">
                <div className="text-xs text-wf-on-surface-variant text-center sm:text-left">
                  Se importarán <strong className="text-wf-on-surface">{rowsToImport.length}</strong> de{" "}
                  <strong>{parseResult.totalRows}</strong> transacciones válidas.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={isImporting}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-wf-outline-variant/40 text-xs font-bold text-wf-on-surface-variant hover:bg-wf-surface-container transition-all active:scale-95"
                  >
                    Cancelar
                  </button>

                  <button
                    type="button"
                    onClick={handleExecuteImport}
                    disabled={isImporting || rowsToImport.length === 0}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-wf-primary text-wf-on-primary hover:opacity-90 transition-all active:scale-95 shadow-md disabled:opacity-50"
                  >
                    {isImporting ? (
                      <>
                        <span className="material-symbols-outlined text-base animate-spin">
                          progress_activity
                        </span>
                        <span>Importando ({importProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">cloud_upload</span>
                        <span>Importar {rowsToImport.length} Movimientos</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Success / Error Result Modal */}
        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            if (importSummary?.imported && importSummary.imported > 0) {
              router.push("/dashboard");
            }
          }}
          title="Resultado de la Importación"
        >
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-center">
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  importSummary?.failed === 0
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {importSummary?.failed === 0 ? "check_circle" : "published_with_changes"}
                </span>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-wf-on-surface">
                {importSummary?.imported && importSummary.imported > 0
                  ? "¡Importación Completada!"
                  : "No se pudieron importar movimientos"}
              </h3>
              <p className="text-xs text-wf-on-surface-variant">
                Se procesaron {importSummary?.total} registros en total.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-wf-surface-container-low border border-wf-outline-variant/30 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-wf-label-caps">
                    Exitosos
                  </span>
                </div>
                <span className="text-3xl font-black text-wf-on-surface">
                  {importSummary?.imported || 0}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-wf-surface-container-low border border-wf-outline-variant/30 text-center flex flex-col items-center justify-center shadow-xs">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 mb-1">
                  <span className="material-symbols-outlined text-lg">cancel</span>
                  <span className="text-xs font-bold uppercase tracking-wider font-wf-label-caps">
                    Fallidos
                  </span>
                </div>
                <span className="text-3xl font-black text-wf-on-surface">
                  {importSummary?.failed || 0}
                </span>
              </div>
            </div>

            {importSummary?.errors && importSummary.errors.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-wf-on-surface">Detalle de errores:</h4>
                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {importSummary.errors.map((err, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-wf-surface-container-low border border-rose-500/30 text-xs text-wf-on-surface flex items-start gap-2 shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-rose-500 text-base shrink-0 mt-0.5">
                        error
                      </span>
                      <div>
                        <strong className="text-rose-600 dark:text-rose-400">Fila {err.row}:</strong>{" "}
                        {err.description ? `"${err.description}" — ` : ""}
                        <span className="text-wf-on-surface-variant">{err.error}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  handleReset();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-wf-outline-variant/40 text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container"
              >
                Importar Otro Archivo
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  router.push("/dashboard");
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-wf-primary text-wf-on-primary text-xs font-bold hover:opacity-90 shadow-sm"
              >
                Ir al Dashboard
              </button>
            </div>
          </div>
        </Modal>
      </main>
    );
  }
);

MovementsImport.displayName = "MovementsImport";
export default MovementsImport;
