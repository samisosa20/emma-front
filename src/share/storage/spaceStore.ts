import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface SpaceMember {
  userId: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
  joinedAt: string;
}

export interface SharedSpace {
  id: string;
  name: string;
  description?: string;
  currency: string;
  ownerId: string;
  ownerName: string;
  inviteCode: string;
  createdAt: string;
  members: SpaceMember[];
}

export interface SpaceInvitation {
  id: string;
  spaceId: string;
  spaceName: string;
  inviterName: string;
  inviteeEmail: string;
  createdAt: string;
}

interface SpaceState {
  activeSpaceId: string | null; // null = Espacio Personal
  spaces: SharedSpace[];
  pendingInvitations: SpaceInvitation[];
  setActiveSpaceId: (spaceId: string | null) => void;
  fetchUserSpaces: (user: any) => Promise<void>;
  createSpace: (name: string, description: string, currency: string, user: any) => Promise<SharedSpace>;
  updateSpace: (id: string, name: string, description?: string, currency?: string, user?: any) => Promise<void>;
  deleteSpace: (id: string, user?: any) => Promise<void>;
  joinSpaceWithCode: (code: string, user: any) => Promise<{ success: boolean; message: string; space?: SharedSpace }>;
  leaveSpace: (spaceId: string, user: any) => Promise<void>;
  removeMember: (spaceId: string, userId: string) => void;
  regenerateInviteCode: (spaceId: string) => string;
}

/**
 * Generates a unique 6-character uppercase code without ambiguous characters
 */
function generateLocalCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let code = "";
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint8Array(6);
    crypto.getRandomValues(arr);
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(arr[i] % chars.length);
    }
  } else {
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  return code;
}

export const useSpaceStore = create<SpaceState>()(
  persist(
    (set, get) => ({
      activeSpaceId: null, // Default to Personal
      spaces: [], // Clean slate
      pendingInvitations: [],

      setActiveSpaceId: (spaceId: string | null) => {
        set({ activeSpaceId: spaceId });
        if (typeof window !== "undefined") {
          try {
            const { queryClient } = require("@/app/providers");
            queryClient?.invalidateQueries();
            queryClient?.refetchQueries();
          } catch (e) {
            // ignore
          }
        }
      },

      fetchUserSpaces: async (user: any) => {
        if (!user) return;
        const userId = user.id || "";
        const userEmail = user.email || "";

        if (!userId && !userEmail) return;

        try {
          const res = await fetch(
            `/api/shared-spaces?userId=${encodeURIComponent(userId)}&userEmail=${encodeURIComponent(userEmail)}`
          );
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.spaces)) {
              set((state) => {
                const currentActive = state.activeSpaceId;
                const stillExists = currentActive
                  ? data.spaces.some((s: SharedSpace) => s.id === currentActive)
                  : true;

                return {
                  spaces: data.spaces,
                  activeSpaceId: stillExists ? currentActive : null,
                };
              });
            }
          }
        } catch (e) {
          // ignore
        }
      },

      createSpace: async (name: string, description: string, currency: string, user: any) => {
        const userId = user?.id || `user-${Date.now()}`;
        const userName = user?.name || "Propietario";
        const userEmail = user?.email || "";

        let newSpace: SharedSpace;

        try {
          const response = await fetch("/api/shared-spaces", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, currency, user }),
          });

          if (response.ok) {
            const data = await response.json();
            newSpace = data.space;
          } else {
            throw new Error("Fallback local creation");
          }
        } catch (e) {
          const localCode = generateLocalCode();
          newSpace = {
            id: `space-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: name.trim(),
            description: description?.trim() || "Espacio compartido de finanzas",
            currency: currency || "USD",
            ownerId: userId,
            ownerName: userName,
            inviteCode: localCode,
            createdAt: new Date().toISOString(),
            members: [
              {
                userId,
                name: `${userName} (Propietario)`,
                email: userEmail,
                role: "owner",
                joinedAt: new Date().toISOString(),
              },
            ],
          };
        }

        set((state) => ({
          spaces: [...state.spaces.filter((s) => s.id !== newSpace.id), newSpace],
          activeSpaceId: newSpace.id,
        }));

        return newSpace;
      },

      updateSpace: async (id: string, name: string, description?: string, currency?: string, user?: any) => {
        try {
          const res = await fetch(`/api/shared-spaces/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, currency, user }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "No tienes permisos para editar este espacio");
          }
        } catch (e: any) {
          throw e;
        }

        set((state) => ({
          spaces: state.spaces.map((s) =>
            s.id === id
              ? {
                  ...s,
                  name: name.trim() || s.name,
                  description: description !== undefined ? description.trim() : s.description,
                  currency: currency || s.currency,
                }
              : s
          ),
        }));
      },

      deleteSpace: async (id: string, user?: any) => {
        try {
          const userId = user?.id || "";
          const userEmail = user?.email || "";
          const res = await fetch(
            `/api/shared-spaces/${id}?userId=${encodeURIComponent(userId)}&userEmail=${encodeURIComponent(userEmail)}`,
            { method: "DELETE" }
          );

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message || "No tienes permisos para eliminar este espacio");
          }
        } catch (e: any) {
          throw e;
        }

        set((state) => ({
          spaces: state.spaces.filter((s) => s.id !== id),
          activeSpaceId: state.activeSpaceId === id ? null : state.activeSpaceId,
        }));
      },

      joinSpaceWithCode: async (code: string, user: any) => {
        const cleanCode = code.trim().toUpperCase();

        try {
          const res = await fetch("/api/shared-spaces/join", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: cleanCode, user }),
          });

          const data = await res.json();

          if (res.ok && data.success) {
            const joinedSpace: SharedSpace = data.space;

            set((state) => ({
              spaces: [
                ...state.spaces.filter((s) => s.id !== joinedSpace.id),
                joinedSpace,
              ],
              activeSpaceId: joinedSpace.id,
            }));

            return {
              success: true,
              message: data.message || `¡Te has unido exitosamente a "${joinedSpace.name}"!`,
              space: joinedSpace,
            };
          } else {
            return {
              success: false,
              message: data.message || `Código "${cleanCode}" no válido o no encontrado.`,
            };
          }
        } catch (error: any) {
          return {
            success: false,
            message: "Error de conexión al verificar el código de invitación.",
          };
        }
      },

      leaveSpace: async (spaceId: string, user: any) => {
        try {
          await fetch(`/api/shared-spaces/${spaceId}/leave`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
          });
        } catch (e) {
          // continue
        }

        const userId = user?.id;
        const userEmail = user?.email;

        set((state) => ({
          spaces: state.spaces
            .map((s) => {
              if (s.id === spaceId) {
                return {
                  ...s,
                  members: s.members.filter(
                    (m) =>
                      m.userId !== userId &&
                      (!userEmail || m.email.toLowerCase() !== userEmail.toLowerCase())
                  ),
                };
              }
              return s;
            })
            .filter((s) =>
              s.members.some(
                (m) =>
                  m.userId === userId ||
                  (userEmail && m.email.toLowerCase() === userEmail.toLowerCase())
              )
            ),
          activeSpaceId: state.activeSpaceId === spaceId ? null : state.activeSpaceId,
        }));
      },

      removeMember: (spaceId: string, userId: string) => {
        set((state) => ({
          spaces: state.spaces.map((s) =>
            s.id === spaceId
              ? {
                  ...s,
                  members: s.members.filter((m) => m.userId !== userId),
                }
              : s
          ),
        }));
      },

      regenerateInviteCode: (spaceId: string) => {
        const newCode = generateLocalCode();
        set((state) => ({
          spaces: state.spaces.map((s) =>
            s.id === spaceId ? { ...s, inviteCode: newCode } : s
          ),
        }));
        return newCode;
      },
    }),
    {
      name: "fiona-spaces-v2",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.spaces) {
          // Purge legacy HOGAR9 default space from local storage
          state.spaces = state.spaces.filter(
            (s) => s.inviteCode !== "HOGAR9" && s.id !== "space-hogar-default"
          );
          if (state.activeSpaceId === "space-hogar-default") {
            state.activeSpaceId = null;
          }
        }
      },
    }
  )
);
