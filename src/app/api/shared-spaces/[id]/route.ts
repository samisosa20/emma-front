import { NextRequest, NextResponse } from "next/server";
import { spacesRegistry, codesIndex } from "../store";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const space = spacesRegistry.get(id);

    if (!space) {
      return NextResponse.json(
        { message: "Espacio no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, space });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al obtener detalle del espacio", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const space = spacesRegistry.get(id);

    if (!space) {
      return NextResponse.json(
        { message: "Espacio no encontrado" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, description, currency, user } = body;

    // Security check: Only owner can edit space metadata
    const userId = user?.id;
    const userEmail = user?.email;
    const isOwner =
      (userId && space.ownerId === userId) ||
      (userEmail &&
        space.members.some(
          (m) =>
            m.role === "owner" &&
            m.email.toLowerCase() === userEmail.toLowerCase()
        ));

    if (!isOwner) {
      return NextResponse.json(
        {
          message:
            "Acción no permitida: Solo el creador/propietario del espacio puede editarlo.",
        },
        { status: 403 }
      );
    }

    if (name && name.trim()) space.name = name.trim();
    if (description !== undefined) space.description = description.trim();
    if (currency) space.currency = currency;

    spacesRegistry.set(id, space);

    return NextResponse.json({
      success: true,
      message: "Espacio actualizado correctamente",
      space,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al actualizar el espacio", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const space = spacesRegistry.get(id);

    if (!space) {
      return NextResponse.json(
        { message: "Espacio no encontrado" },
        { status: 404 }
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const userEmail = searchParams.get("userEmail");

    // Security check: Only owner can delete space
    const isOwner =
      (userId && space.ownerId === userId) ||
      (userEmail &&
        space.members.some(
          (m) =>
            m.role === "owner" &&
            m.email.toLowerCase() === userEmail.toLowerCase()
        ));

    if (!isOwner) {
      return NextResponse.json(
        {
          message:
            "Acción no permitida: Solo el creador/propietario del espacio puede eliminarlo.",
        },
        { status: 403 }
      );
    }

    // Remove code index and space
    codesIndex.delete(space.inviteCode.toUpperCase());
    spacesRegistry.delete(id);

    return NextResponse.json({
      success: true,
      message: "Espacio compartido eliminado",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al eliminar el espacio", error: error.message },
      { status: 500 }
    );
  }
}
