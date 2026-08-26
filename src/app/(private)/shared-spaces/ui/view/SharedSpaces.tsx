"use client";

import { memo } from "react";
import Link from "next/link";
import useComponents from "@/share/components";
import { SharedSpace, SpaceMember } from "@/share/storage/spaceStore";

interface SharedSpacesProps {
  spaces: SharedSpace[];
  activeSpaceId: string | null;
  selectedSpaceId: string | null;
  currentSpace?: SharedSpace | null;
  isOwner?: boolean;
  isCreateModalOpen: boolean;
  isJoinModalOpen: boolean;
  isInviteModalOpen: boolean;
  isEditModalOpen: boolean;
  name: string;
  description: string;
  currency: string;
  joinCodeInput: string;
  user: any;
  setSelectedSpaceId: (id: string | null) => void;
  setActiveSpaceId: (id: string | null) => void;
  setIsCreateModalOpen: (open: boolean) => void;
  setIsJoinModalOpen: (open: boolean) => void;
  setIsInviteModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setName: (name: string) => void;
  setDescription: (desc: string) => void;
  setCurrency: (currency: string) => void;
  setJoinCodeInput: (code: string) => void;
  handleCreateSpace: (e: React.FormEvent) => void;
  handleUpdateSpace: (e: React.FormEvent) => void;
  handleDeleteSpace: (id: string) => void;
  handleJoinWithCode: (e: React.FormEvent) => void;
  handleLeaveSpace: (id: string) => void;
  handleRemoveMember: (spaceId: string, memberId: string, memberName: string) => void;
  handleCopyInviteLink: (code: string) => void;
  handleShareWhatsApp: (code: string, spaceName: string) => void;
  handleRegenerateCode: (spaceId: string) => void;
  openEditModal: (space: SharedSpace) => void;
}

const SharedSpaces = memo(
  ({
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
  }: SharedSpacesProps) => {
    const { Modal } = useComponents();

    const isPersonalSelected = selectedSpaceId === null;
    const isPersonalActive = activeSpaceId === null;

    return (
      <main className="flex-1 flex flex-col items-center relative w-full min-w-0 pb-12">
        <div className="w-full max-w-5xl space-y-6">
          {/* Header Card */}
          <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20 shadow-xs">
                <span className="material-symbols-outlined text-2xl">group</span>
              </div>
              <div>
                <h1 className="font-wf-headline-md text-wf-on-surface text-xl sm:text-2xl font-bold">
                  Finanzas en Pareja / Hogar Compartido
                </h1>
                <p className="text-xs sm:text-sm text-wf-on-surface-variant">
                  Gestiona cuentas, presupuestos, inversiones y transacciones familiares de manera conjunta.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsJoinModalOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-wf-surface-container text-wf-on-surface border border-wf-outline-variant/30 hover:bg-wf-surface-container-high transition-all active:scale-95 shadow-xs"
              >
                <span className="material-symbols-outlined text-base">key</span>
                <span>Unirme con Código</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setName("");
                  setDescription("");
                  setIsCreateModalOpen(true);
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-wf-primary text-wf-on-primary hover:opacity-90 transition-all active:scale-95 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>Nuevo Espacio</span>
              </button>
            </div>
          </div>

          {/* Active Space Banner / Switcher Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Spaces List */}
            <div className="lg:col-span-1 space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-wf-surface-tint uppercase tracking-wider font-wf-label-caps">
                  Tus Espacios ({spaces.length + 1})
                </span>
              </div>

              {/* Personal Space Button */}
              <div
                onClick={() => setSelectedSpaceId(null)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isPersonalSelected
                    ? "bg-wf-surface-container-lowest border-wf-primary/50 shadow-md ring-1 ring-wf-primary/20"
                    : "bg-wf-surface-container-lowest border-wf-outline-variant/30 hover:bg-wf-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isPersonalActive
                        ? "bg-wf-primary text-wf-on-primary shadow-xs"
                        : "bg-wf-surface-container text-wf-on-surface-variant"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">person</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-wf-headline-md text-sm font-bold text-wf-on-surface">
                      Espacio Personal
                    </div>
                    <div className="text-xs text-wf-on-surface-variant truncate">
                      Finanzas privadas individuales
                    </div>
                  </div>
                </div>

                {isPersonalActive ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-wf-primary text-wf-on-primary uppercase font-wf-label-caps shrink-0">
                    Activo
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSpaceId(null);
                      setSelectedSpaceId(null);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-wf-surface-container text-wf-on-surface hover:bg-wf-primary hover:text-wf-on-primary border border-wf-outline-variant/30 transition-all shrink-0"
                  >
                    Activar
                  </button>
                )}
              </div>

              {/* Shared Spaces List */}
              {spaces.map((space) => {
                const isActive = activeSpaceId === space.id;
                const isSelected = selectedSpaceId === space.id;
                return (
                  <div
                    key={space.id}
                    onClick={() => setSelectedSpaceId(space.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? "bg-wf-surface-container-lowest border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20"
                        : "bg-wf-surface-container-lowest border-wf-outline-variant/30 hover:bg-wf-surface-container-low"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isActive
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">group</span>
                        </div>
                        <div className="min-w-0">
                          <div className="font-wf-headline-md text-sm font-bold text-wf-on-surface truncate">
                            {space.name}
                          </div>
                          <div className="text-xs text-wf-on-surface-variant">
                            {space.members.length} {space.members.length === 1 ? "miembro" : "miembros"} • {space.currency}
                          </div>
                        </div>
                      </div>

                      {isActive ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase font-wf-label-caps shrink-0">
                          Activo
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveSpaceId(space.id);
                            setSelectedSpaceId(space.id);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-wf-surface-container text-wf-on-surface hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 border border-wf-outline-variant/30 transition-all shrink-0"
                        >
                          Activar
                        </button>
                      )}
                    </div>

                    {space.description && (
                      <p className="text-xs text-wf-on-surface-variant line-clamp-2">
                        {space.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right: Selected Space Detail & Collaboration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {isPersonalSelected || !currentSpace ? (
                /* Personal Space Detail Panel */
                <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-wf-outline-variant/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-wf-primary/10 text-wf-primary flex items-center justify-center border border-wf-primary/20">
                        <span className="material-symbols-outlined text-2xl">person</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-wf-headline-md text-lg sm:text-xl font-bold text-wf-on-surface">
                            Mi Espacio Personal (Privado)
                          </h2>
                        </div>
                        <p className="text-xs text-wf-on-surface-variant mt-0.5">
                          Tus cuentas bancarias, presupuestos y movimientos personales. Solo tú tienes acceso a estos datos.
                        </p>
                      </div>
                    </div>

                    {isPersonalActive ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-wf-primary text-wf-on-primary uppercase font-wf-label-caps self-start sm:self-auto">
                        Espacio Activo
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveSpaceId(null);
                          setSelectedSpaceId(null);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-wf-primary text-wf-on-primary hover:opacity-90 transition-all active:scale-95 shadow-sm self-start sm:self-auto"
                      >
                        Activar Espacio Personal
                      </button>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-wf-surface-container-low border border-wf-outline-variant/20 space-y-3">
                    <h3 className="font-wf-headline-md text-sm font-bold text-wf-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-wf-primary">
                        info
                      </span>
                      ¿Cómo funcionan los Espacios Compartidos?
                    </h3>
                    <p className="text-xs text-wf-on-surface-variant leading-relaxed">
                      Al crear o unirte a un espacio de <strong>Finanzas en Pareja / Hogar</strong>, ambos miembros pueden ver y registrar transacciones, consultar saldos de cuentas conjuntas y administrar presupuestos del hogar sin mezclar tus gastos privados.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setName("");
                        setDescription("");
                        setIsCreateModalOpen(true);
                      }}
                      className="flex-1 min-w-[180px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-wf-primary text-wf-on-primary text-xs font-bold hover:opacity-90 shadow-sm transition-all"
                    >
                      <span className="material-symbols-outlined text-base">add_circle</span>
                      <span>Crear Espacio Compartido</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsJoinModalOpen(true)}
                      className="flex-1 min-w-[180px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-wf-surface-container text-wf-on-surface text-xs font-semibold hover:bg-wf-surface-container-high border border-wf-outline-variant/30 transition-all"
                    >
                      <span className="material-symbols-outlined text-base">key</span>
                      <span>Unirme con Código</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Shared Space Detail Panel */
                <div className="bg-wf-surface-container-lowest rounded-2xl shadow-sm border border-wf-outline-variant/30 p-5 sm:p-6 space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-wf-outline-variant/20">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-wf-headline-md text-lg sm:text-xl font-bold text-wf-on-surface">
                          {currentSpace.name}
                        </h2>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-wf-label-caps">
                          {currentSpace.currency}
                        </span>
                        {activeSpaceId === currentSpace.id && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase font-wf-label-caps">
                            Activo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-wf-on-surface-variant mt-1">
                        {currentSpace.description || "Espacio compartido de finanzas familiares."}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeSpaceId !== currentSpace.id && (
                        <button
                          type="button"
                          onClick={() => setActiveSpaceId(currentSpace.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-xs"
                        >
                          Activar Espacio
                        </button>
                      )}

                      {isOwner ? (
                        <>
                          <button
                            type="button"
                            onClick={() => openEditModal(currentSpace)}
                            className="p-2 rounded-xl text-wf-on-surface-variant hover:text-wf-primary hover:bg-wf-surface-container transition-all border border-wf-outline-variant/30"
                            title="Editar información del espacio (Solo Creador/Propietario)"
                          >
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSpace(currentSpace.id)}
                            className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-rose-200 dark:border-rose-900/40"
                            title="Eliminar espacio (Solo Creador/Propietario)"
                          >
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleLeaveSpace(currentSpace.id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-rose-200 dark:border-rose-900/40 flex items-center gap-1"
                          title="Salir de este espacio compartido"
                        >
                          <span className="material-symbols-outlined text-base">logout</span>
                          <span>Salir del espacio</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Quick Invitation Box */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider font-wf-label-caps flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">link</span>
                        Invitar a tu Pareja o Familiar
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-wf-on-surface-variant">Código de acceso:</span>
                        <span className="font-mono text-base font-black px-2.5 py-0.5 rounded-lg bg-wf-surface text-wf-on-surface border border-emerald-500/40 shadow-xs tracking-widest">
                          {currentSpace.inviteCode}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleCopyInviteLink(currentSpace.inviteCode)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-wf-surface text-wf-on-surface border border-wf-outline-variant/30 hover:bg-wf-surface-container transition-all active:scale-95 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-base text-wf-primary">
                          content_copy
                        </span>
                        <span>Copiar Enlace</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareWhatsApp(currentSpace.inviteCode, currentSpace.name)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#25D366] text-white hover:opacity-90 transition-all active:scale-95 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-base">
                          share
                        </span>
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {/* Members List */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-wf-headline-md text-sm font-bold text-wf-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-emerald-600 dark:text-emerald-400">
                          diversity_3
                        </span>
                        Miembros con Acceso ({currentSpace.members.length})
                      </h3>
                      <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                        Permisos Totales Co-Admin
                      </span>
                    </div>

                    <div className="divide-y divide-wf-outline-variant/20 border border-wf-outline-variant/20 rounded-2xl overflow-hidden bg-wf-surface">
                      {currentSpace.members.map((member) => (
                        <div
                          key={member.userId}
                          className="p-4 flex items-center justify-between gap-3 hover:bg-wf-surface-container-low/40 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm border border-emerald-500/30">
                              {member.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-wf-headline-md text-xs sm:text-sm font-bold text-wf-on-surface">
                                {member.name}
                              </div>
                              <div className="text-[11px] text-wf-on-surface-variant">
                                {member.email || "Miembro registrado"} • Co-administrador
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
                              <span className="material-symbols-outlined text-xs">verified_user</span>
                              {member.role === "owner" ? "Propietario" : "Co-Administrador"}
                            </span>

                            {isOwner && member.role !== "owner" && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(currentSpace.id, member.userId, member.name)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                title="Remover miembro"
                              >
                                <span className="material-symbols-outlined text-base">person_remove</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Crear Espacio */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Crear Espacio de Finanzas Compartidas"
        >
          <form onSubmit={handleCreateSpace} className="space-y-4 pt-1">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-wf-on-surface mb-1">
                Moneda Principal
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

        {/* Modal Editar Espacio */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Editar Espacio Compartido"
        >
          <form onSubmit={handleUpdateSpace} className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-semibold text-wf-on-surface mb-1">
                Nombre del Espacio *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-wf-on-surface mb-1">
                Moneda Principal
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
                Descripción / Propósito
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-wf-surface-container border border-wf-outline-variant/30 rounded-xl px-3 py-2 text-xs text-wf-on-surface focus:outline-none focus:border-wf-primary resize-none"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-wf-outline-variant/30 text-xs font-semibold text-wf-on-surface-variant hover:bg-wf-surface-container"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2.5 rounded-xl bg-wf-primary text-wf-on-primary text-xs font-bold hover:opacity-90 shadow-sm"
              >
                Guardar Cambios
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
          <form onSubmit={handleJoinWithCode} className="space-y-4 pt-1">
            <p className="text-xs text-wf-on-surface-variant">
              Ingresa el código de 6 caracteres que te compartió tu pareja o compañero de hogar para vincularte a sus cuentas y presupuestos compartidos con <strong>permisos totales</strong>.
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
                value={joinCodeInput}
                onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
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
      </main>
    );
  }
);

SharedSpaces.displayName = "SharedSpaces";
export default SharedSpaces;
