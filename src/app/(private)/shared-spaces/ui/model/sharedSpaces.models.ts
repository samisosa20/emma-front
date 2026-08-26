import { useState, useMemo, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useSpaceStore, SharedSpace } from "@/share/storage/spaceStore";
import { useSession } from "@/share/components/SessionProvider";

export default function useSharedSpacesViewModel() {
  const { session } = useSession();
  const searchParams = useSearchParams();
  const user = session?.user;

  const {
    activeSpaceId,
    spaces,
    setActiveSpaceId,
    fetchUserSpaces,
    createSpace,
    updateSpace,
    deleteSpace,
    joinSpaceWithCode,
    leaveSpace,
    removeMember,
    regenerateInviteCode,
  } = useSpaceStore();

  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(activeSpaceId);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [joinCodeInput, setJoinCodeInput] = useState("");

  // Fetch only the spaces where this authenticated user is an owner or member
  useEffect(() => {
    if (user?.id || user?.email) {
      fetchUserSpaces(user);
    }
  }, [user, fetchUserSpaces]);

  // Sync selected space when active space changes or on mount
  useEffect(() => {
    setSelectedSpaceId(activeSpaceId);
  }, [activeSpaceId]);

  // Handle invitation link parameter ?join=CODE
  useEffect(() => {
    const codeParam = searchParams.get("join");
    if (codeParam) {
      setJoinCodeInput(codeParam.toUpperCase());
      setIsJoinModalOpen(true);
    }
  }, [searchParams]);

  const currentSpace = useMemo(() => {
    if (!selectedSpaceId) return null;
    return spaces.find((s) => s.id === selectedSpaceId) || null;
  }, [spaces, selectedSpaceId]);

  // Check if current user is the owner of the selected space
  const isOwner = useMemo((): boolean => {
    if (!currentSpace || !user) return false;
    const userId = user.id;
    const userEmail = user.email;

    return Boolean(
      (userId && currentSpace.ownerId === userId) ||
      (userEmail &&
        currentSpace.members.some(
          (m) =>
            m.role === "owner" &&
            m.email.toLowerCase() === userEmail.toLowerCase()
        ))
    );
  }, [currentSpace, user]);

  const handleCreateSpace = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim()) {
        toast.error("Ingresa un nombre para el espacio");
        return;
      }

      try {
        const created = await createSpace(name, description, currency, user);
        setSelectedSpaceId(created.id);
        setActiveSpaceId(created.id);
        setIsCreateModalOpen(false);
        setName("");
        setDescription("");
        toast.success(`Espacio "${created.name}" creado y activado (Código: ${created.inviteCode})`);
      } catch (err) {
        toast.error("No se pudo crear el espacio compartido");
      }
    },
    [createSpace, description, name, currency, user, setActiveSpaceId]
  );

  const handleUpdateSpace = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!currentSpace || !name.trim()) return;

      try {
        await updateSpace(currentSpace.id, name, description, currency, user);
        setIsEditModalOpen(false);
        toast.success("Información del espacio actualizada");
      } catch (err: any) {
        toast.error(err.message || "Error al actualizar el espacio");
      }
    },
    [currentSpace, description, name, currency, updateSpace, user]
  );

  const handleDeleteSpace = useCallback(
    async (spaceId: string) => {
      if (confirm("¿Estás seguro de eliminar este espacio compartido? Los datos compartidos se desvincularán para todos los miembros.")) {
        try {
          await deleteSpace(spaceId, user);
          setSelectedSpaceId(null);
          setActiveSpaceId(null);
          toast.info("Espacio compartido eliminado. Has vuelto a tu Espacio Personal.");
        } catch (err: any) {
          toast.error(err.message || "Error al eliminar el espacio");
        }
      }
    },
    [deleteSpace, setActiveSpaceId, user]
  );

  const handleJoinWithCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!joinCodeInput.trim()) {
        toast.error("Ingresa el código de invitación");
        return;
      }

      const res = await joinSpaceWithCode(joinCodeInput, user);
      if (res.success) {
        toast.success(res.message);
        if (res.space) {
          setSelectedSpaceId(res.space.id);
          setActiveSpaceId(res.space.id);
        }
        setIsJoinModalOpen(false);
        setJoinCodeInput("");
      } else {
        toast.error(res.message);
      }
    },
    [joinCodeInput, joinSpaceWithCode, user, setActiveSpaceId]
  );

  const handleLeaveSpace = useCallback(
    async (spaceId: string) => {
      if (confirm("¿Deseas salir de este espacio compartido? Dejarás de tener acceso a las cuentas y presupuestos compartidos.")) {
        await leaveSpace(spaceId, user);
        setSelectedSpaceId(null);
        setActiveSpaceId(null);
        toast.info("Has salido del espacio compartido.");
      }
    },
    [leaveSpace, user, setActiveSpaceId]
  );

  const handleRemoveMember = useCallback(
    (spaceId: string, memberId: string, memberName: string) => {
      if (!isOwner) {
        toast.error("Solo el creador del espacio puede remover miembros");
        return;
      }
      if (confirm(`¿Deseas remover a "${memberName}" del espacio?`)) {
        removeMember(spaceId, memberId);
        toast.info(`Miembro "${memberName}" removido`);
      }
    },
    [isOwner, removeMember]
  );

  const handleCopyInviteLink = useCallback((code: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const inviteLink = `${origin}/shared-spaces?join=${code}`;
    const shareText = `¡Hola! Te invito a compartir nuestro espacio de finanzas del hogar en Fiona. Únete con este enlace:\n${inviteLink}\nO usa el código: ${code}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      toast.success("¡Enlace y código de invitación copiados al portapapeles!");
    } else {
      toast.info(`Código de invitación: ${code}`);
    }
  }, []);

  const handleShareWhatsApp = useCallback((code: string, spaceName: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const inviteLink = `${origin}/shared-spaces?join=${code}`;
    const message = encodeURIComponent(
      `¡Hola! Te invito a unirte a nuestro espacio "${spaceName}" para gestionar juntos las cuentas y finanzas del hogar en Fiona ✨.\n\nÚnete aquí: ${inviteLink}\nCódigo de acceso: ${code}`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
  }, []);

  const handleRegenerateCode = useCallback(
    (spaceId: string) => {
      if (!isOwner) {
        toast.error("Solo el propietario puede regenerar el código de invitación");
        return;
      }
      const newCode = regenerateInviteCode(spaceId);
      toast.success(`Nuevo código generado: ${newCode}`);
    },
    [isOwner, regenerateInviteCode]
  );

  const openEditModal = useCallback((space: SharedSpace) => {
    setName(space.name);
    setDescription(space.description || "");
    setCurrency(space.currency || "USD");
    setIsEditModalOpen(true);
  }, []);

  return {
    spaces,
    activeSpaceId,
    selectedSpaceId,
    currentSpace,
    isOwner,
    isCreateModalOpen,
    isJoinModalOpen,
    isInviteModalOpen,
    isEditModalOpen,
    name,
    description,
    currency,
    joinCodeInput,
    user,
    setSelectedSpaceId,
    setActiveSpaceId,
    setIsCreateModalOpen,
    setIsJoinModalOpen,
    setIsInviteModalOpen,
    setIsEditModalOpen,
    setName,
    setDescription,
    setCurrency,
    setJoinCodeInput,
    handleCreateSpace,
    handleUpdateSpace,
    handleDeleteSpace,
    handleJoinWithCode,
    handleLeaveSpace,
    handleRemoveMember,
    handleCopyInviteLink,
    handleShareWhatsApp,
    handleRegenerateCode,
    openEditModal,
  };
}
