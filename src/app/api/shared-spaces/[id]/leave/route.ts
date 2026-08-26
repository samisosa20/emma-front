import { NextRequest, NextResponse } from "next/server";
import { spacesRegistry } from "../../store";

export const dynamic = "force-dynamic";

export async function POST(
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
    const { user } = body;
    const userId = user?.id;
    const userEmail = user?.email;

    // Filter out the member
    space.members = space.members.filter(
      (m) =>
        m.userId !== userId &&
        (!userEmail || m.email.toLowerCase() !== userEmail.toLowerCase())
    );

    spacesRegistry.set(id, space);

    return NextResponse.json({
      success: true,
      message: "Has salido del espacio compartido exitosamente",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al salir del espacio", error: error.message },
      { status: 500 }
    );
  }
}
