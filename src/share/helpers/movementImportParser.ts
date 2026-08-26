import * as XLSX from "xlsx";

export interface ParsedMovementRow {
  index: number;
  date: string;
  description: string;
  amount: number;
  type: "1" | "-1" | "0"; // "1": Ingreso, "-1": Gasto/Egreso, "0": Transferencia
  accountName?: string;
  accountId?: string;
  categoryName?: string;
  categoryId?: string;
  eventName?: string;
  eventId?: string | null;
  investmentName?: string;
  investmentId?: string | null;
  accountEndName?: string;
  accountEndId?: string;
  amountEnd?: number;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  raw: Record<string, any>;
}

export interface ParseResult {
  rows: ParsedMovementRow[];
  totalRows: number;
  validRows: number;
  invalidRows: number;
  totalIncome: number;
  totalExpense: number;
  detectedColumns: string[];
}

/**
 * Normaliza nombres de columnas (sin acentos, minúsculas, sin caracteres especiales)
 */
export function normalizeHeader(header: string): string {
  return String(header || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Mapeo inteligente de nombres de cabecera a campos canónicos
 */
const COLUMN_ALIASES: Record<string, keyof ParsedMovementRow> = {
  // Fecha
  fecha: "date",
  fechacompra: "date",
  fechatransaccion: "date",
  fechamovimiento: "date",
  date: "date",
  purchasedate: "date",
  transactiondate: "date",
  dia: "date",
  day: "date",

  // Descripción
  descripcion: "description",
  detalle: "description",
  concepto: "description",
  nota: "description",
  memo: "description",
  description: "description",
  title: "description",
  titulo: "description",
  movimiento: "description",
  beneficiario: "description",
  comercio: "description",

  // Monto
  monto: "amount",
  valor: "amount",
  importe: "amount",
  cantidad: "amount",
  amount: "amount",
  value: "amount",
  total: "amount",
  precio: "amount",

  // Tipo
  tipo: "type",
  tipomovimiento: "type",
  tipotransaccion: "type",
  type: "type",
  movementtype: "type",
  transactiontype: "type",

  // Cuenta
  cuenta: "accountName",
  cuentaorigen: "accountName",
  banco: "accountName",
  account: "accountName",
  fromaccount: "accountName",
  cuentaorigenid: "accountId",
  accountid: "accountId",

  // Categoría
  categoria: "categoryName",
  category: "categoryName",
  rubro: "categoryName",
  clasificacion: "categoryName",
  categoryid: "categoryId",
  categoriaid: "categoryId",

  // Evento
  evento: "eventName",
  event: "eventName",
  eventoid: "eventId",
  eventid: "eventId",

  // Inversión
  inversion: "investmentName",
  investment: "investmentName",
  inversionid: "investmentId",
  investmentid: "investmentId",

  // Cuenta destino (Transferencias)
  cuantadestino: "accountEndName",
  cuentadestino: "accountEndName",
  cuentafinal: "accountEndName",
  targetaccount: "accountEndName",
  toaccount: "accountEndName",
  accountendname: "accountEndName",
  accountendid: "accountEndId",
  cuentadestinoid: "accountEndId",

  // Monto destino
  montodestino: "amountEnd",
  valordestino: "amountEnd",
  importedestino: "amountEnd",
  amountend: "amountEnd",
};

/**
 * Limpia y convierte strings de montos monetarios a número válido
 */
export function parseAmount(val: any): number {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;

  let str = String(val).trim();

  // Detección de formato negativo con paréntesis ej. "(150.00)"
  const isNegative = str.startsWith("-") || (str.startsWith("(") && str.endsWith(")"));
  str = str.replace(/[()]/g, "");

  // Eliminar símbolos de moneda y espacios
  str = str.replace(/[^0-9,.-]/g, "");

  // Si tiene coma y punto, determinar cuál es el separador decimal
  const lastComma = str.lastIndexOf(",");
  const lastDot = str.lastIndexOf(".");

  if (lastComma > -1 && lastDot > -1) {
    if (lastComma > lastDot) {
      // Formato Europeo/Latino: 1.250,50 -> 1250.50
      str = str.replace(/\./g, "").replace(",", ".");
    } else {
      // Formato US: 1,250.50 -> 1250.50
      str = str.replace(/,/g, "");
    }
  } else if (lastComma > -1) {
    // Si sólo hay coma: ej. "1250,50" -> "1250.50"
    str = str.replace(",", ".");
  }

  const num = parseFloat(str);
  if (isNaN(num)) return 0;
  return isNegative ? -Math.abs(num) : num;
}

/**
 * Parsea y normaliza diferentes formatos de fecha a string YYYY-MM-DD
 */
export function parseDate(val: any): string {
  if (!val) return new Date().toISOString().split("T")[0];

  // Si es un objeto Date
  if (val instanceof Date && !isNaN(val.getTime())) {
    return val.toISOString().split("T")[0];
  }

  // Si es número de serie de Excel (días desde 1900-01-01)
  if (typeof val === "number") {
    try {
      const parsedDate = XLSX.SSF.parse_date_code(val);
      if (parsedDate) {
        const y = parsedDate.y;
        const m = String(parsedDate.m).padStart(2, "0");
        const d = String(parsedDate.d).padStart(2, "0");
        return `${y}-${m}-${d}`;
      }
    } catch {
      // fallback
    }
  }

  const str = String(val).trim();

  // Formato ISO: YYYY-MM-DD o YYYY-MM-DDTHH:mm:ss
  if (/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/.test(str)) {
    const parts = str.split(/[-/.]/);
    const y = parts[0];
    const m = parts[1].padStart(2, "0");
    const d = parts[2].substring(0, 2).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  // Formato Latino / Español: DD/MM/YYYY o DD-MM-YYYY
  if (/^\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/.test(str)) {
    const parts = str.split(/[-/.]/);
    const d = parts[0].padStart(2, "0");
    const m = parts[1].padStart(2, "0");
    const y = parts[2].substring(0, 4);
    return `${y}-${m}-${d}`;
  }

  // Intento general mediante constructor Date
  const dateObj = new Date(str);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toISOString().split("T")[0];
  }

  return new Date().toISOString().split("T")[0];
}

/**
 * Parsea el tipo de movimiento
 */
export function parseType(val: any, amount: number): "1" | "-1" | "0" {
  if (val !== undefined && val !== null) {
    const str = String(val).toLowerCase().trim();
    if (str === "0" || str.includes("transfer") || str.includes("traspaso")) {
      return "0";
    }
    if (
      str === "1" ||
      str.includes("ingreso") ||
      str.includes("income") ||
      str.includes("abono") ||
      str.includes("deposito") ||
      str.includes("haber")
    ) {
      return "1";
    }
    if (
      str === "-1" ||
      str.includes("gasto") ||
      str.includes("egreso") ||
      str.includes("expense") ||
      str.includes("cargo") ||
      str.includes("debito") ||
      str.includes("debe")
    ) {
      return "-1";
    }
  }

  // Si no se especificó tipo o es ambiguo, inferir por el signo del monto
  if (amount > 0) return "1";
  return "-1";
}

export interface MatchOptions {
  accounts?: Array<{ id: string | number; name: string }>;
  categories?: Array<{ id: string | number; name: string }>;
  events?: Array<{ id: string | number; name: string }>;
  investments?: Array<{ id: string | number; name: string }>;
  defaultAccountId?: string;
  defaultCategoryId?: string;
}

/**
 * Parsea un ArrayBuffer o File de XLSX/CSV a lista estructurada de movimientos con validación
 */
export function parseMovementsFile(
  buffer: ArrayBuffer | Uint8Array,
  options: MatchOptions = {}
): ParseResult {
  const workbook = XLSX.read(buffer, {
    type: "array",
    cellDates: true,
    cellNF: true,
  });

  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    return {
      rows: [],
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      totalIncome: 0,
      totalExpense: 0,
      detectedColumns: [],
    };
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rawRows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
    defval: "",
    raw: false,
  });

  if (!rawRows || rawRows.length === 0) {
    return {
      rows: [],
      totalRows: 0,
      validRows: 0,
      invalidRows: 0,
      totalIncome: 0,
      totalExpense: 0,
      detectedColumns: [],
    };
  }

  const detectedColumns = Object.keys(rawRows[0] || {});

  // Mapear cada columna del archivo a su campo canónico
  const columnMap: Record<string, keyof ParsedMovementRow> = {};
  detectedColumns.forEach((col) => {
    const normalized = normalizeHeader(col);
    if (COLUMN_ALIASES[normalized]) {
      columnMap[col] = COLUMN_ALIASES[normalized];
    }
  });

  const parsedRows: ParsedMovementRow[] = [];
  let totalIncome = 0;
  let totalExpense = 0;

  // Mapas de búsqueda rápida para IDs existentes
  const accountByName = new Map<string, string>();
  options.accounts?.forEach((acc) => {
    accountByName.set(normalizeHeader(acc.name), String(acc.id));
  });

  const categoryByName = new Map<string, string>();
  options.categories?.forEach((cat) => {
    categoryByName.set(normalizeHeader(cat.name), String(cat.id));
  });

  const eventByName = new Map<string, string>();
  options.events?.forEach((ev) => {
    eventByName.set(normalizeHeader(ev.name), String(ev.id));
  });

  const investmentByName = new Map<string, string>();
  options.investments?.forEach((inv) => {
    investmentByName.set(normalizeHeader(inv.name), String(inv.id));
  });

  rawRows.forEach((row, idx) => {
    // Si la fila está completamente vacía, saltarla
    const hasValues = Object.values(row).some(
      (v) => v !== "" && v !== null && v !== undefined
    );
    if (!hasValues) return;

    const parsedRow: Partial<ParsedMovementRow> = {
      index: idx + 1,
      raw: row,
      errors: [],
      warnings: [],
    };

    let rawAmount: any = null;
    let rawType: any = null;
    let rawDate: any = null;

    // Asignar campos mapeados
    Object.entries(row).forEach(([colName, colVal]) => {
      const field = columnMap[colName];
      if (field) {
        if (field === "amount") rawAmount = colVal;
        else if (field === "type") rawType = colVal;
        else if (field === "date") rawDate = colVal;
        else {
          (parsedRow as any)[field] = typeof colVal === "string" ? colVal.trim() : colVal;
        }
      }
    });

    // Fallbacks si no se mapeó directamente por cabeceras conocidas
    if (rawAmount === null && (row.amount || row.monto || row.valor || row.importe)) {
      rawAmount = row.amount || row.monto || row.valor || row.importe;
    }
    if (rawDate === null && (row.date || row.fecha || row.dia)) {
      rawDate = row.date || row.fecha || row.dia;
    }
    if (rawType === null && (row.type || row.tipo)) {
      rawType = row.type || row.tipo;
    }
    if (!parsedRow.description && (row.description || row.descripcion || row.detalle || row.concepto)) {
      parsedRow.description = row.description || row.descripcion || row.detalle || row.concepto;
    }

    // Parsing numérico y tipo
    const parsedAmountVal = parseAmount(rawAmount);
    const absAmount = Math.abs(parsedAmountVal);
    const movementType = parseType(rawType, parsedAmountVal);

    parsedRow.amount = absAmount;
    parsedRow.type = movementType;
    parsedRow.date = parseDate(rawDate);
    parsedRow.description = String(parsedRow.description || "Movimiento importado").trim();

    // Resolver AccountId
    if (parsedRow.accountId) {
      parsedRow.accountId = String(parsedRow.accountId);
    } else if (parsedRow.accountName) {
      const matched = accountByName.get(normalizeHeader(parsedRow.accountName));
      if (matched) {
        parsedRow.accountId = matched;
      }
    }
    // Fallback a defaultAccountId
    if (!parsedRow.accountId && options.defaultAccountId) {
      parsedRow.accountId = options.defaultAccountId;
      if (!parsedRow.accountName) {
        const defaultAcc = options.accounts?.find(
          (a) => String(a.id) === options.defaultAccountId
        );
        if (defaultAcc) parsedRow.accountName = defaultAcc.name;
      }
    }

    // Resolver CategoryId
    if (parsedRow.categoryId) {
      parsedRow.categoryId = String(parsedRow.categoryId);
    } else if (parsedRow.categoryName) {
      const matched = categoryByName.get(normalizeHeader(parsedRow.categoryName));
      if (matched) {
        parsedRow.categoryId = matched;
      }
    }
    // Fallback a defaultCategoryId
    if (!parsedRow.categoryId && options.defaultCategoryId) {
      parsedRow.categoryId = options.defaultCategoryId;
      if (!parsedRow.categoryName) {
        const defaultCat = options.categories?.find(
          (c) => String(c.id) === options.defaultCategoryId
        );
        if (defaultCat) parsedRow.categoryName = defaultCat.name;
      }
    }

    // Resolver EventId & InvestmentId
    if (parsedRow.eventName && !parsedRow.eventId) {
      const matchedEvent = eventByName.get(normalizeHeader(parsedRow.eventName));
      if (matchedEvent) parsedRow.eventId = matchedEvent;
    }
    if (parsedRow.investmentName && !parsedRow.investmentId) {
      const matchedInv = investmentByName.get(normalizeHeader(parsedRow.investmentName));
      if (matchedInv) parsedRow.investmentId = matchedInv;
    }

    // Resolver AccountEndId para transferencias
    if (parsedRow.type === "0") {
      if (parsedRow.accountEndName && !parsedRow.accountEndId) {
        const matched = accountByName.get(normalizeHeader(parsedRow.accountEndName));
        if (matched) parsedRow.accountEndId = matched;
      }
      if (!parsedRow.amountEnd) {
        parsedRow.amountEnd = parsedRow.amount;
      }
    }

    // Validaciones por fila
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!parsedRow.amount || parsedRow.amount <= 0) {
      errors.push("El monto debe ser un número mayor a cero");
    }
    if (!parsedRow.date || isNaN(new Date(parsedRow.date).getTime())) {
      errors.push("Fecha inválida");
    }
    if (!parsedRow.accountId) {
      errors.push("Cuenta no especificada o no encontrada");
    }

    if (parsedRow.type !== "0" && !parsedRow.categoryId) {
      warnings.push("Sin categoría asignada");
    }
    if (parsedRow.type === "0" && !parsedRow.accountEndId) {
      errors.push("Cuenta destino requerida para transferencias");
    }

    const isValid = errors.length === 0;

    if (isValid) {
      if (parsedRow.type === "1") {
        totalIncome += parsedRow.amount;
      } else if (parsedRow.type === "-1") {
        totalExpense += parsedRow.amount;
      }
    }

    parsedRows.push({
      ...(parsedRow as ParsedMovementRow),
      errors,
      warnings,
      isValid,
    });
  });

  return {
    rows: parsedRows,
    totalRows: parsedRows.length,
    validRows: parsedRows.filter((r) => r.isValid).length,
    invalidRows: parsedRows.filter((r) => !r.isValid).length,
    totalIncome,
    totalExpense,
    detectedColumns,
  };
}

/**
 * Genera y descarga un archivo plantilla de Excel (.xlsx) o CSV (.csv) con ejemplos
 */
export function downloadMovementTemplate(formatType: "xlsx" | "csv" = "xlsx") {
  const sampleData = [
    {
      Fecha: "2026-08-20",
      Descripcion: "Compra Supermercado Éxito",
      Monto: 145000,
      Tipo: "Gasto",
      Cuenta: "Bancolombia Ahorros",
      Categoria: "Mercado / Alimentación",
      Evento: "",
      Inversion: "",
    },
    {
      Fecha: "2026-08-21",
      Descripcion: "Pago Salario Quincenal",
      Monto: 3500000,
      Tipo: "Ingreso",
      Cuenta: "Bancolombia Ahorros",
      Categoria: "Salario",
      Evento: "",
      Inversion: "",
    },
    {
      Fecha: "2026-08-22",
      Descripcion: "Suscripción Netflix",
      Monto: 45900,
      Tipo: "Gasto",
      Cuenta: "Tarjeta Crédito Nu",
      Categoria: "Entretenimiento",
      Evento: "",
      Inversion: "",
    },
    {
      Fecha: "2026-08-23",
      Descripcion: "Traspaso a cuenta de ahorros",
      Monto: 200000,
      Tipo: "Transferencia",
      Cuenta: "Bancolombia Ahorros",
      Categoria: "Transferencias",
      Evento: "",
      Inversion: "",
      CuentaDestino: "Nu Ahorros",
      MontoDestino: 200000,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  // Ancho automático de columnas para mejor visualización
  worksheet["!cols"] = [
    { wch: 12 }, // Fecha
    { wch: 32 }, // Descripcion
    { wch: 14 }, // Monto
    { wch: 15 }, // Tipo
    { wch: 24 }, // Cuenta
    { wch: 26 }, // Categoria
    { wch: 16 }, // Evento
    { wch: 16 }, // Inversion
    { wch: 20 }, // CuentaDestino
    { wch: 14 }, // MontoDestino
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Movimientos");

  const fileName = `plantilla_importacion_movimientos.${formatType}`;

  if (formatType === "csv") {
    XLSX.writeFile(workbook, fileName, { bookType: "csv" });
  } else {
    XLSX.writeFile(workbook, fileName, { bookType: "xlsx" });
  }
}
