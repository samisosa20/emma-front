import { NextRequest, NextResponse } from "next/server";
import {
  spacesRegistry,
  codesIndex,
  generateUniqueCode,
  memberTokensMap,
  ServerSharedSpace,
} from "./store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";
    const userEmail = searchParams.get("userEmail") || "";
    const token = request.cookies.get("backend_token")?.value;

    if (token) {
      if (userId) memberTokensMap.set(userId, token);
      if (userEmail) memberTokensMap.set(userEmail.toLowerCase(), token);
    }

    // If no user identifier provided, return empty list (privacy protection)
    if (!userId && !userEmail) {
      return NextResponse.json({
        success: true,
        spaces: [],
      });
    }

    const allSpaces = Array.from(spacesRegistry.values());

    // Filter ONLY spaces where the user is an owner or invited member
    const userSpaces = allSpaces.filter((space) => {
      const isOwner =
        (userId && space.ownerId === userId) ||
        (userEmail &&
          space.members.some(
            (m) =>
              m.role === "owner" &&
              m.email.toLowerCase() === userEmail.toLowerCase()
          ));

      const isMember = space.members.some(
        (m) =>
          (userId && m.userId === userId) ||
          (userEmail &&
            m.email &&
            m.email.toLowerCase() === userEmail.toLowerCase())
      );

      // If token present, update member token in registry
      if ((isOwner || isMember) && token) {
        space.members.forEach((m) => {
          if (
            (userId && m.userId === userId) ||
            (userEmail && m.email.toLowerCase() === userEmail.toLowerCase())
          ) {
            m.token = token;
          }
        });
      }

      return isOwner || isMember;
    });

    return NextResponse.json({
      success: true,
      spaces: userSpaces,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al obtener espacios compartidos", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, currency, user } = body;
    const token = request.cookies.get("backend_token")?.value;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { message: "El nombre del espacio es obligatorio" },
        { status: 400 }
      );
    }

    const userId = user?.id || `user-${Date.now()}`;
    const userName = user?.name || "Propietario";
    const userEmail = user?.email || "";

    if (token) {
      if (userId) memberTokensMap.set(userId, token);
      if (userEmail) memberTokensMap.set(userEmail.toLowerCase(), token);
    }

    // Generate guaranteed unique 6-character code
    const inviteCode = generateUniqueCode();
    const spaceId = `space-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newSpace: ServerSharedSpace = {
      id: spaceId,
      name: name.trim(),
      description: description?.trim() || "",
      currency: currency || "USD",
      ownerId: userId,
      ownerName: userName,
      inviteCode,
      createdAt: new Date().toISOString(),
      members: [
        {
          userId,
          name: `${userName} (Propietario)`,
          email: userEmail,
          role: "owner",
          joinedAt: new Date().toISOString(),
          token: token || "",
        },
      ],
    };

    // Store in global registry
    spacesRegistry.set(spaceId, newSpace);
    codesIndex.set(inviteCode.toUpperCase(), spaceId);

    return NextResponse.json({
      success: true,
      message: "Espacio compartido creado exitosamente",
      space: newSpace,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al crear el espacio compartido", error: error.message },
      { status: 500 }
    );
  }
}
