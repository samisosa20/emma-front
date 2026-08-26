import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useGetApiAccountsSuspense } from "@@@/endpoints/account/account";
import { useGetApiCategoriesSuspense } from "@@@/endpoints/category/category";
import { useGetApiEventsSuspense } from "@@@/endpoints/event/event";
import { useGetApiInvestmentsSuspense } from "@@@/endpoints/investment/investment";
import {
  parseMovementsFile,
  downloadMovementTemplate,
  ParseResult,
  ParsedMovementRow,
} from "@/share/helpers/movementImportParser";
import { useUserStore } from "@/share/storage";

export interface ImportSummary {
  success: boolean;
  total: number;
  imported: number;
  failed: number;
  errors: Array<{ row: number; description?: string; error: string }>;
}

export default function useMovementsImportViewModel() {
  const router = useRouter();
  const { user } = useUserStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [defaultAccountId, setDefaultAccountId] = useState<string>("");
  const [defaultCategoryId, setDefaultCategoryId] = useState<string>("");
  const [excludedIndices, setExcludedIndices] = useState<Set<number>>(new Set());
  const [filterStatus, setFilterStatus] = useState<"all" | "valid" | "invalid">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [importSummary, setImportSummary] = useState<ImportSummary | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Fetch reference lists from backend
  const { data: dataAccounts } = useGetApiAccountsSuspense();
  const { data: dataCategories } = useGetApiCategoriesSuspense();
  const { data: dataEvents } = useGetApiEventsSuspense();
  const { data: dataInvestments } = useGetApiInvestmentsSuspense();

  const accountsList = useMemo(() => {
    return (dataAccounts?.content || []).map((acc: any) => ({
      id: String(acc.id),
      name: acc.name,
      badge: acc.badge,
    }));
  }, [dataAccounts]);

  const categoriesList = useMemo(() => {
    return (dataCategories?.content || []).map((cat: any) => ({
      id: String(cat.id),
      name: cat.name,
      color: cat.color,
      icon: cat.icon,
    }));
  }, [dataCategories]);

  const eventsList = useMemo(() => {
    return (dataEvents?.content || []).map((ev: any) => ({
      id: String(ev.id),
      name: ev.name,
    }));
  }, [dataEvents]);

  const investmentsList = useMemo(() => {
    return (dataInvestments?.content || []).map((inv: any) => ({
      id: String(inv.id),
      name: inv.name,
    }));
  }, [dataInvestments]);

  // Options for dropdowns
  const accountOptions = useMemo(() => {
    return accountsList.map((acc: any) => ({
      label: acc.name,
      value: String(acc.id),
    }));
  }, [accountsList]);

  const categoryOptions = useMemo(() => {
    return categoriesList.map((cat: any) => ({
      label: cat.name,
      value: String(cat.id),
    }));
  }, [categoriesList]);

  // Re-parse buffer with current match options
  const reparse = useCallback(
    (
      buffer: ArrayBuffer,
      defAccountId = defaultAccountId,
      defCategoryId = defaultCategoryId
    ) => {
      setIsParsing(true);
      try {
        const result = parseMovementsFile(buffer, {
          accounts: accountsList,
          categories: categoriesList,
          events: eventsList,
          investments: investmentsList,
          defaultAccountId: defAccountId || undefined,
          defaultCategoryId: defCategoryId || undefined,
        });
        setParseResult(result);
        setExcludedIndices(new Set());
      } catch (err: any) {
        toast.error("Error al procesar el archivo. Verifique el formato.");
        console.error(err);
      } finally {
        setIsParsing(false);
      }
    },
    [accountsList, categoriesList, eventsList, investmentsList, defaultAccountId, defaultCategoryId]
  );

  // File selection handler
  const handleFileSelect = useCallback(
    async (file: File) => {
      const validExtensions = [".xlsx", ".xls", ".csv"];
      const fileName = file.name.toLowerCase();
      const isValidExt = validExtensions.some((ext) => fileName.endsWith(ext));

      if (!isValidExt) {
        toast.error("Formato no soportado. Por favor suba un archivo .xlsx, .xls o .csv");
        return;
      }

      setSelectedFile(file);
      setIsParsing(true);

      try {
        const buffer = await file.arrayBuffer();
        setFileBuffer(buffer);
        reparse(buffer, defaultAccountId, defaultCategoryId);
      } catch (error) {
        toast.error("No se pudo leer el archivo seleccionado");
        setIsParsing(false);
      }
    },
    [defaultAccountId, defaultCategoryId, reparse]
  );

  // Handle changing default account
  const handleDefaultAccountChange = useCallback(
    (accId: string) => {
      setDefaultAccountId(accId);
      if (fileBuffer) {
        reparse(fileBuffer, accId, defaultCategoryId);
      }
    },
    [fileBuffer, defaultCategoryId, reparse]
  );

  // Handle changing default category
  const handleDefaultCategoryChange = useCallback(
    (catId: string) => {
      setDefaultCategoryId(catId);
      if (fileBuffer) {
        reparse(fileBuffer, defaultAccountId, catId);
      }
    },
    [fileBuffer, defaultAccountId, reparse]
  );

  // Toggle single row exclusion
  const toggleRowExclusion = useCallback((index: number) => {
    setExcludedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }, []);

  // Filtered rows for the preview table
  const displayedRows = useMemo(() => {
    if (!parseResult) return [];

    return parseResult.rows.filter((row) => {
      // Status filter
      if (filterStatus === "valid" && !row.isValid) return false;
      if (filterStatus === "invalid" && row.isValid) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesDesc = row.description.toLowerCase().includes(query);
        const matchesAccount = (row.accountName || "").toLowerCase().includes(query);
        const matchesCategory = (row.categoryName || "").toLowerCase().includes(query);
        const matchesAmount = String(row.amount).includes(query);
        const matchesDate = row.date.includes(query);

        return matchesDesc || matchesAccount || matchesCategory || matchesAmount || matchesDate;
      }

      return true;
    });
  }, [parseResult, filterStatus, searchQuery]);

  // Selected valid rows ready for import
  const rowsToImport = useMemo(() => {
    if (!parseResult) return [];
    return parseResult.rows.filter((r) => r.isValid && !excludedIndices.has(r.index));
  }, [parseResult, excludedIndices]);

  // Execute bulk import
  const handleExecuteImport = useCallback(async () => {
    if (rowsToImport.length === 0) {
      toast.warn("No hay movimientos válidos seleccionados para importar");
      return;
    }

    setIsImporting(true);
    setImportProgress(10);

    try {
      // Prepare JSON payload
      const transferCategory = categoriesList.find(
        (c: any) =>
          c.name?.toLowerCase() === "transferencia" ||
          c.name?.toLowerCase() === "transferencias"
      );

      const movementsPayload = rowsToImport.map((row) => {
        const isTransfer = row.type === "0";
        const resolvedCategoryId = isTransfer
          ? (transferCategory?.id ? String(transferCategory.id) : row.categoryId)
          : row.categoryId;

        return {
          description: row.description || null,
          amount: row.type === "1" ? Math.abs(row.amount) : -Math.abs(row.amount),
          type: isTransfer ? "transfer" : "move",
          datePurchase: new Date(row.date).toISOString(),
          accountId: row.accountId,
          categoryId: resolvedCategoryId,
          eventId: row.eventId || null,
          investmentId: row.investmentId || null,
          amountEnd: isTransfer ? Math.abs(row.amountEnd ?? row.amount) : undefined,
          accountEndId: isTransfer ? row.accountEndId : undefined,
        };
      });

      setImportProgress(40);

      const response = await fetch("/api/movements/import", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movements: movementsPayload }),
      });

      setImportProgress(85);

      const data = await response.json();

      setImportProgress(100);

      if (response.ok && data.success) {
        setImportSummary(data);
        setIsSuccessModalOpen(true);
        toast.success(`¡Se importaron exitosamente ${data.imported} movimientos!`);
      } else {
        toast.error(data.message || "Hubo errores al procesar la importación");
        if (data.errors && data.errors.length > 0) {
          setImportSummary(data);
          setIsSuccessModalOpen(true);
        }
      }
    } catch (error: any) {
      toast.error("Ocurrió un fallo en la conexión al importar movimientos");
      console.error(error);
    } finally {
      setIsImporting(false);
    }
  }, [rowsToImport, categoriesList]);

  // Reset current selection
  const handleReset = useCallback(() => {
    setSelectedFile(null);
    setFileBuffer(null);
    setParseResult(null);
    setExcludedIndices(new Set());
    setSearchQuery("");
    setFilterStatus("all");
    setImportSummary(null);
    setIsSuccessModalOpen(false);
  }, []);

  return {
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
    downloadTemplate: downloadMovementTemplate,
    setIsSuccessModalOpen,
    router,
  };
}
