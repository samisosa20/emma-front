"use client";

import { memo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSpaceStore, SharedSpace } from "@/share/storage/spaceStore";
import { useSession } from "@/share/components/SessionProvider";
import useComponents from "@/share/components";

export const SpaceSwitcher = memo(function SpaceSwitcher() {
  const router = useRouter();
  const { session } = useSession();
  const user = session?.user;

  const {
    activeSpaceId,
    spaces,
    setActiveSpaceId,
    fetchUserSpaces,
    createSpace,
    joinSpaceWithCode,
  } = useSpaceStore();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [newSpaceCurrency, setNewSpaceCurrency] = useState("USD");
  const [newSpaceDescription, setNewSpaceDescription] = useState("");
  const [joinCode, setJoinCode] = useState("");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { Modal } = useComponents();

  const activeSpace = spaces.find((s) => s.id === activeSpaceId);

  // Sync spaces for authenticated user
  useEffect(() => {
    if (user?.id || user?.email) {
      fetchUserSpaces(user);
    }
  }, [user, fetchUserSpaces]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpaceName.trim()) {
      toast.error("Ingresa un nombre para el espacio");
      return;
    }

    try {
      const created = await createSpace(
        newSpaceName,
        newSpaceDescription,
        newSpaceCurrency,
        user
      );
      toast.success(`Espacio "${created.name}" creado con código único: ${created.inviteCode}`);
      setIsCreateModalOpen(false);
      setNewSpaceName("");
      setNewSpaceDescription("");
      setIsOpen(false);
    } catch (err: any) {
      toast.error("No se pudo crear el espacio");
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCode.trim()) {
      toast.error("Ingresa el código de invitación");
      return;
    }

    const res = await joinSpaceWithCode(joinCode, user);
    if (res.success) {
      toast.success(res.message);
      setIsJoinModalOpen(false);
      setJoinCode("");
      setIsOpen(false);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
      {/* Switcher Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar espacio de trabajo"
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-xs font-semibold ${
          activeSpace
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/15"
            : "bg-wf-surface-container text-wf-on-surface border-wf-outline-variant/30 hover:bg-wf-surface-container-high"
        }`}
      >
        <span className="material-symbols-outlined text-base">
          {activeSpace ? "group" : "person"}
        </span>
        <span className="max-w-[110px] sm:max-w-[140px] truncate">
          {activeSpace ? activeSpace.name : "Espacio Personal"}
        </span>
        <span
          className={`material-symbols-outlined text-sm transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-wf-surface rounded-2xl shadow-xl border border-wf-outline-variant/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 border-b border-wf-outline-variant/20">
            <span className="text-[10px] font-bold text-wf-surface-tint uppercase tracking-wider font-wf-label-caps block">
              Espacio Activo
            </span>
            <p className="text-xs text-wf-on-surface-variant mt-0.5">
              Alterna entre tus finanzas privadas o las compartidas con tu pareja.
            </p>
          </div>

          <div className="max-h-60 overflow-y-auto p-1 space-y-1">
            {/* Personal Space Option */}
            <button
              type="button"
              onClick={() => {
                setActiveSpaceId(null);
                setIsOpen(false);
                toast.info("Cambiaste a tu Espacio Personal");
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                activeSpaceId === null
                  ? "bg-wf-primary/10 text-wf-primary font-bold"
                  : "hover:bg-wf-surface-container text-wf-on-surface"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activeSpaceId === null
                      ? "bg-wf-primary text-wf-on-primary"
                      : "bg-wf-surface-container text-wf-on-surface-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">
                    Espacio Personal
                  </div>
                  <div className="text-[10px] text-wf-on-surface-variant truncate">
                    Finanzas privadas
                  </div>
                </div>
              </div>
              {activeSpaceId === null && (
                <span className="material-symbols-outlined text-wf-primary text-base">
                  check
                </span>
              )}
            </button>

            {/* Shared Spaces List */}
            {spaces.map((space) => {
              const isActive = activeSpaceId === space.id;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => {
                    setActiveSpaceId(space.id);
                    setIsOpen(false);
                    toast.info(`Espacio activo: ${space.name}`);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold"
                      : "hover:bg-wf-surface-container text-wf-on-surface"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        group
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate">
                        {space.name}
                      </div>
                      <div className="text-[10px] text-wf-on-surface-variant truncate">
                        {space.members.length} {space.members.length === 1 ? "miembro" : "miembros"} • Pareja/Hogar
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-base">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions & Links */}
          <div className="p-1 pt-2 border-t border-wf-outline-variant/20 space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsCreateModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-wf-primary hover:bg-wf-primary/10 transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                add_circle
              </span>
              <span>Crear Espacio del Hogar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsJoinModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                key
              </span>
              <span>Unirme con Código</span>
            </button>

            <Link
              href="/shared-spaces"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-base">
                settings
              </span>
              <span>Administrar Espacios e Invitaciones</span>
            </Link>
          </div>
        </div>
      )}
      </div>

      {/* Modal Crear Espacio */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Espacio de Finanzas Compartidas"
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-1">
          <p className="text-xs text-wf-on-surface-variant">
            Crea un espacio dedicado para gestionar las cuentas, presupuestos, inversiones y gastos del hogar en pareja. Ambos tendrán <strong>permisos totales</strong> de co-administración.
          </p>

          <div>
            <label className="block text-xs font-semibold text-wf-on-surface mb-1">
              Nombre del Espacio *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Finanzas Pareja, Hogar Gómez, etc."
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-wf-on-surface mb-1">
              Moneda Principal
            </label>
            <select
              value={newSpaceCurrency}
              onChange={(e) => setNewSpaceCurrency(e.target.value)}
              className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary"
            >
              <option value="USD">USD ($ - Dólar)</option>
              <option value="COP">COP ($ - Peso Colombiano)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="MXN">MXN ($ - Peso Mexicano)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-wf-on-surface mb-1">
              Descripción / Propósito (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Gastos compartidos de la casa, compras del mercado y vacaciones"
              value={newSpaceDescription}
              onChange={(e) => setNewSpaceDescription(e.target.value)}
              className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary resize-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-wf-outline-variant/30 text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-wf-primary text-wf-on-primary text-xs font-bold hover:opacity-90 shadow-sm"
            >
              Crear Espacio
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal Unirme con Código */}
      <Modal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        title="Unirme a Espacio Compartido"
      >
        <form onSubmit={handleJoin} className="space-y-4 pt-1">
          <p className="text-xs text-wf-on-surface-variant">
            Ingresa el código de 6 caracteres que te compartió tu pareja o compañero de hogar para vincularte a sus cuentas y presupuestos compartidos.
          </p>

          <div>
            <label className="block text-xs font-semibold text-wf-on-surface mb-1">
              Código de Invitación *
            </label>
            <input
              type="text"
              required
              maxLength={8}
              placeholder="Ej: 7W9X2K o 8KX7Y2"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-center tracking-widest uppercase font-mono text-base font-bold text-wf-on-surface focus:outline-none focus:border-wf-primary"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-wf-outline-variant/30 text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-wf-primary text-wf-on-primary text-xs font-bold hover:opacity-90 shadow-sm"
            >
              Unirme al Espacio
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
});
