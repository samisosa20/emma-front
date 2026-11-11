"use client";

import { memo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSpaceStore } from "@/share/storage/spaceStore";
import { useSession } from "@/share/components/SessionProvider";
import useComponents from "@/share/components";

interface SpaceSwitcherProps {
  variant?: "header" | "menu";
  onNavigate?: () => void;
  onSpaceChange?: () => void;
}

export const SpaceSwitcher = memo(function SpaceSwitcher({
  variant = "header",
  onNavigate,
  onSpaceChange,
}: SpaceSwitcherProps = {}) {
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

  const isMenu = variant === "menu";

  return (
    <>
      <div className={isMenu ? "w-full" : "relative"} ref={dropdownRef}>
      {/* Switcher Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Cambiar espacio de trabajo"
        aria-expanded={isOpen}
        className={
          isMenu
            ? `w-full flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl border transition-all active:scale-[0.99] text-xs font-semibold ${
                activeSpace
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/15"
                  : "bg-slate-900/80 text-slate-200 border-slate-800 hover:border-slate-700 hover:text-white"
              }`
            : `flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all active:scale-95 text-xs font-semibold shadow-xs ${
                activeSpace
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/15"
                  : "bg-slate-900/80 text-slate-200 border-slate-800 hover:border-slate-700 hover:text-white"
              }`
        }
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`shrink-0 flex items-center justify-center ${
              isMenu
                ? `w-8 h-8 rounded-lg ${
                    activeSpace
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-slate-800 text-emerald-400"
                  }`
                : ""
            }`}
          >
            <span className="material-symbols-outlined text-base text-emerald-400">
              {activeSpace ? "group" : "person"}
            </span>
          </div>
          {isMenu ? (
            <div className="flex flex-col items-start min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 leading-none mb-1">
                Espacio activo
              </span>
              <span className="text-xs font-semibold truncate max-w-[155px]">
                {activeSpace ? activeSpace.name : "Espacio Personal"}
              </span>
            </div>
          ) : (
            <span className="max-w-[110px] sm:max-w-[140px] truncate">
              {activeSpace ? activeSpace.name : "Espacio Personal"}
            </span>
          )}
        </div>
        <span
          className={`material-symbols-outlined text-base text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-emerald-400" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown / Menu Accordion */}
      {isOpen && (
        <div
          className={
            isMenu
              ? "mt-2 w-full bg-slate-900/95 rounded-xl border border-slate-800/90 py-2 z-20 animate-in fade-in duration-150"
              : "absolute right-0 mt-2 w-72 bg-slate-900/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-slate-800/90 py-2.5 z-50 animate-in fade-in zoom-in-95 duration-150"
          }
        >
          {!isMenu && (
            <div className="px-3.5 py-2 border-b border-slate-800/80">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono block">
                Espacio Activo
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Alterna entre tus finanzas privadas o las compartidas con tu pareja.
              </p>
            </div>
          )}

          <div className="max-h-56 overflow-y-auto p-1.5 space-y-1 custom-scrollbar">
            {/* Personal Space Option */}
            <button
              type="button"
              onClick={() => {
                setActiveSpaceId(null);
                setIsOpen(false);
                onSpaceChange?.();
                toast.info("Cambiaste a tu Espacio Personal");
              }}
              className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                activeSpaceId === null
                  ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20"
                  : "hover:bg-slate-800/60 text-slate-300"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activeSpaceId === null
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">person</span>
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate">
                    Espacio Personal
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Finanzas privadas
                  </div>
                </div>
              </div>
              {activeSpaceId === null && (
                <span className="material-symbols-outlined text-emerald-400 text-base shrink-0">
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
                    onSpaceChange?.();
                    toast.info(`Espacio activo: ${space.name}`);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/25"
                      : "hover:bg-slate-800/60 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? "bg-emerald-500 text-slate-950 font-bold"
                          : "bg-emerald-500/10 text-emerald-400"
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
                      <div className="text-[10px] text-slate-400 truncate">
                        {space.members.length} {space.members.length === 1 ? "miembro" : "miembros"} • Pareja/Hogar
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <span className="material-symbols-outlined text-emerald-400 text-base shrink-0">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions & Links */}
          <div className="p-1.5 pt-2 border-t border-slate-800/80 space-y-0.5">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsCreateModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base shrink-0">
                add_circle
              </span>
              <span className="truncate">Crear Espacio del Hogar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsJoinModalOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors text-left"
            >
              <span className="material-symbols-outlined text-base shrink-0">
                key
              </span>
              <span className="truncate">Unirme con Código</span>
            </button>

            <Link
              href="/shared-spaces"
              onClick={() => {
                setIsOpen(false);
                onNavigate?.();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
            >
              <span className="material-symbols-outlined text-base shrink-0">
                settings
              </span>
              <span className="truncate">Administrar Espacios</span>
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
          <p className="text-xs text-slate-400">
            Crea un espacio dedicado para gestionar las cuentas, presupuestos, inversiones y gastos del hogar en pareja. Ambos tendrán <strong className="text-emerald-400">permisos totales</strong> de co-administración.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Nombre del Espacio *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Finanzas Pareja, Hogar Gómez, etc."
              value={newSpaceName}
              onChange={(e) => setNewSpaceName(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Moneda Principal
            </label>
            <select
              value={newSpaceCurrency}
              onChange={(e) => setNewSpaceCurrency(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="USD">USD ($ - Dólar)</option>
              <option value="COP">COP ($ - Peso Colombiano)</option>
              <option value="EUR">EUR (€ - Euro)</option>
              <option value="MXN">MXN ($ - Peso Mexicano)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Descripción / Propósito (Opcional)
            </label>
            <textarea
              rows={2}
              placeholder="Ej: Gastos compartidos de la casa, compras del mercado y vacaciones"
              value={newSpaceDescription}
              onChange={(e) => setNewSpaceDescription(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/40 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-98 transition-all"
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
          <p className="text-xs text-slate-400">
            Ingresa el código de 6 caracteres que te compartió tu pareja o compañero de hogar para vincularte a sus cuentas y presupuestos compartidos.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Código de Invitación *
            </label>
            <input
              type="text"
              required
              maxLength={8}
              placeholder="Ej: 7W9X2K o 8KX7Y2"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-center tracking-widest uppercase font-mono text-base font-bold text-emerald-400 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => setIsJoinModalOpen(false)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/40 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-98 transition-all"
            >
              Unirme al Espacio
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
});
