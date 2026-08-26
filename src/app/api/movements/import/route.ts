import { NextRequest, NextResponse } from "next/server";
import { parseMovementsFile, ParsedMovementRow } from "@/share/helpers/movementImportParser";

export const dynamic = "force-dynamic";

interface MovementPayload {
  description?: string | null;
  amount: number;
  type: "move" | "transfer";
  datePurchase: string;
  categoryId?: string;
  accountId: string;
  eventId?: string | null;
  investmentId?: string | null;
  addWithdrawal?: boolean;
  amountEnd?: number;
  accountEndId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!backendUrl) {
      return NextResponse.json(
        { message: "Backend URL not configured" },
        { status: 500 }
      );
    }

    // Forward cookies and headers for authenticated backend communication
    const cookieHeader = request.headers.get("cookie") || "";
    const backendHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
      Timezone: request.headers.get("timezone") || "UTC-05:00",
    };

    const contentType = request.headers.get("content-type") || "";

    let movementsToProcess: MovementPayload[] = [];
    let initialErrors: Array<{ row: number; description?: string; error: string }> = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const defaultAccountId = (formData.get("defaultAccountId") as string) || undefined;
      const defaultCategoryId = (formData.get("defaultCategoryId") as string) || undefined;

      if (!file) {
        return NextResponse.json(
          { message: "No se proporcionó ningún archivo para importar" },
          { status: 400 }
        );
      }

      // Fetch accounts and categories from backend to auto-map by name
      let accounts: Array<{ id: string | number; name: string }> = [];
      let categories: Array<{ id: string | number; name: string }> = [];
      let events: Array<{ id: string | number; name: string }> = [];
      let investments: Array<{ id: string | number; name: string }> = [];

      try {
        const [accRes, catRes, evRes, invRes] = await Promise.allSettled([
          fetch(`${backendUrl}/accounts/`, { headers: backendHeaders }),
          fetch(`${backendUrl}/categories/`, { headers: backendHeaders }),
          fetch(`${backendUrl}/events/`, { headers: backendHeaders }),
          fetch(`${backendUrl}/investments/`, { headers: backendHeaders }),
        ]);

        if (accRes.status === "fulfilled" && accRes.value.ok) {
          const accData = await accRes.value.json();
          accounts = accData.content || accData || [];
        }
        if (catRes.status === "fulfilled" && catRes.value.ok) {
          const catData = await catRes.value.json();
          categories = catData.content || catData || [];
        }
        if (evRes.status === "fulfilled" && evRes.value.ok) {
          const evData = await evRes.value.json();
          events = evData.content || evData || [];
        }
        if (invRes.status === "fulfilled" && invRes.value.ok) {
          const invData = await invRes.value.json();
          investments = invData.content || invData || [];
        }
      } catch (err) {
        // Continue even if lookup fails, IDs might be provided directly
      }

      const fileBuffer = await file.arrayBuffer();
      const parseResult = parseMovementsFile(fileBuffer, {
        accounts,
        categories,
        events,
        investments,
        defaultAccountId,
        defaultCategoryId,
      });

      if (parseResult.totalRows === 0) {
        return NextResponse.json(
          { message: "El archivo está vacío o no contiene filas con datos válidos" },
          { status: 400 }
        );
      }

      // Find transfer category if needed
      const transferCategory = categories.find(
        (c: any) =>
          c.name?.toLowerCase() === "transferencia" ||
          c.name?.toLowerCase() === "transferencias" ||
          c.groupCategory?.name?.toLowerCase() === "transferencia"
      );

      parseResult.rows.forEach((row) => {
        if (!row.isValid) {
          initialErrors.push({
            row: row.index,
            description: row.description,
            error: row.errors.join(", "),
          });
          return;
        }

        const isTransfer = row.type === "0";
        const resolvedCategoryId = isTransfer
          ? (transferCategory?.id ? String(transferCategory.id) : row.categoryId)
          : row.categoryId;

        const payload: MovementPayload = {
          ...(resolvedCategoryId && { categoryId: String(resolvedCategoryId) }),
          type: isTransfer ? "transfer" : "move",
          amount: row.type === "1" ? Math.abs(row.amount) : -Math.abs(row.amount),
          datePurchase: new Date(row.date).toISOString(),
          accountId: String(row.accountId),
          description: row.description || null,
          addWithdrawal: false,
          ...(row.eventId && { eventId: String(row.eventId) }),
          ...(row.investmentId && { investmentId: String(row.investmentId) }),
          ...(isTransfer && {
            amountEnd: Math.abs(row.amountEnd ?? row.amount),
            accountEndId: String(row.accountEndId),
          }),
        };

        movementsToProcess.push(payload);
      });
    } else if (contentType.includes("application/json")) {
      const body = await request.json();
      const items: any[] = Array.isArray(body) ? body : body.movements || [];

      if (items.length === 0) {
        return NextResponse.json(
          { message: "No se proporcionaron movimientos para procesar" },
          { status: 400 }
        );
      }

      items.forEach((item, index) => {
        const isTransfer = item.type === "0" || item.type === "transfer";
        const amountNum = Math.abs(Number(item.amount));

        if (!item.accountId) {
          initialErrors.push({
            row: index + 1,
            description: item.description,
            error: "Cuenta no especificada",
          });
          return;
        }

        if (isNaN(amountNum) || amountNum <= 0) {
          initialErrors.push({
            row: index + 1,
            description: item.description,
            error: "Monto inválido",
          });
          return;
        }

        const dateIso = item.datePurchase || item.date;
        const validDate = dateIso && !isNaN(new Date(dateIso).getTime())
          ? new Date(dateIso).toISOString()
          : new Date().toISOString();

        const payload: MovementPayload = {
          ...(item.categoryId && { categoryId: String(item.categoryId) }),
          type: isTransfer ? "transfer" : "move",
          amount: item.type === "1" || item.amount > 0 ? amountNum : -amountNum,
          datePurchase: validDate,
          accountId: String(item.accountId),
          description: item.description || null,
          addWithdrawal: item.addWithdrawal ?? false,
          ...(item.eventId && { eventId: String(item.eventId) }),
          ...(item.investmentId && { investmentId: String(item.investmentId) }),
          ...(isTransfer && {
            amountEnd: Math.abs(Number(item.amountEnd ?? amountNum)),
            accountEndId: String(item.accountEndId || item.accountEnd),
          }),
        };

        movementsToProcess.push(payload);
      });
    } else {
      return NextResponse.json(
        { message: "Tipo de contenido no soportado. Use multipart/form-data o application/json" },
        { status: 400 }
      );
    }

    // Process movements against backend
    let imported = 0;
    const processingErrors: Array<{ row: number; description?: string; error: string }> = [...initialErrors];

    for (let i = 0; i < movementsToProcess.length; i++) {
      const movement = movementsToProcess[i];
      try {
        const res = await fetch(`${backendUrl}/movements/`, {
          method: "POST",
          headers: backendHeaders,
          body: JSON.stringify(movement),
        });

        if (res.ok) {
          imported++;
        } else {
          let errorMsg = `Error HTTP ${res.status}`;
          try {
            const errData = await res.json();
            errorMsg = errData.message || errorMsg;
          } catch {
            // fallback
          }
          processingErrors.push({
            row: i + 1 + initialErrors.length,
            description: movement.description || undefined,
            error: errorMsg,
          });
        }
      } catch (err: any) {
        processingErrors.push({
          row: i + 1 + initialErrors.length,
          description: movement.description || undefined,
          error: err?.message || "Error de conexión con el servidor",
        });
      }
    }

    const total = movementsToProcess.length + initialErrors.length;
    const failed = processingErrors.length;

    return NextResponse.json({
      success: imported > 0,
      total,
      imported,
      failed,
      errors: processingErrors,
    });
  } catch (error: any) {
    console.error("Error en POST /api/movements/import:", error);
    return NextResponse.json(
      {
        message: "Ocurrió un error inesperado al procesar la importación",
        error: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}
