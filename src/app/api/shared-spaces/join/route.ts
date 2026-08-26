import { NextRequest, NextResponse } from "next/server";
import { spacesRegistry, codesIndex, memberTokensMap, ServerSpaceMember } from "../store";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, user } = body;
    const token = request.cookies.get("backend_token")?.value;

    if (!code || !code.trim()) {
      return NextResponse.json(
        { message: "El código de invitación es obligatorio" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const spaceId = codesIndex.get(cleanCode);

    if (!spaceId || !spacesRegistry.has(spaceId)) {
      return NextResponse.json(
        {
          message: `Código de invitación "${cleanCode}" no encontrado o no existe. Verifica con tu pareja el código correcto.`,
        },
        { status: 404 }
      );
    }

    const space = spacesRegistry.get(spaceId)!;
    const userId = user?.id || `user-${Date.now()}`;
    const userName = user?.name || "Pareja / Co-Administrador";
    const userEmail = user?.email || "";

    if (token) {
      if (userId) memberTokensMap.set(userId, token);
      if (userEmail) memberTokensMap.set(userEmail.toLowerCase(), token);
    }

    // Check if user is already a member
    const existingMember = space.members.find(
      (m) => m.userId === userId || (userEmail && m.email === userEmail)
    );

    if (existingMember) {
      if (token) existingMember.token = token;
      return NextResponse.json({
        success: true,
        message: `Ya perteneces al espacio "${space.name}".`,
        space,
      });
    }

    // Add new member with full co-admin permissions
    const newMember: ServerSpaceMember = {
      userId,
      name: `${userName} (Co-Admin)`,
      email: userEmail,
      role: "admin",
      joinedAt: new Date().toISOString(),
      token: token || "",
    };

    space.members.push(newMember);
    spacesRegistry.set(spaceId, space);

    return NextResponse.json({
      success: true,
      message: `¡Te has unido exitosamente a "${space.name}" con permisos de Co-Administrador!`,
      space,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al procesar la unión al espacio", error: error.message },
      { status: 500 }
    );
  }
}
