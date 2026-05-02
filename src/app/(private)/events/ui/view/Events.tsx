"use client";
import Link from "next/link";
import { MdAdd, MdCalendarToday, MdSearch, MdFlightTakeoff, MdHomeRepairService, MdSchool, MdFlight, MdFestival } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../components";

// Helpers
import { driverEvent, getCurrencyFormatter } from "@/share/helpers";
import { GetApiEvents200 } from "@@@/domain/models";

const Events = (props: { data: GetApiEvents200 }) => {
  const { data } = props;
  const { Typography } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  // Mock icons/colors mapping based on event names or types if available
  // In a real scenario, these would come from the API
  const getEventIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("vaca") || n.includes("viaje") || n.includes("trip")) return <MdFlightTakeoff className="text-2xl" />;
    if (n.includes("casa") || n.includes("reno") || n.includes("home")) return <MdHomeRepairService className="text-2xl" />;
    if (n.includes("estudio") || n.includes("school") || n.includes("clase")) return <MdSchool className="text-2xl" />;
    return <MdCalendarToday className="text-2xl" />;
  };

  const activeEvents = data?.content || [];
  const pastEvents = []; // Logic for past events would go here

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-manrope text-3xl font-bold text-wf-on-background mb-1">Eventos</h1>
          <p className="font-inter text-base text-wf-on-surface-variant">Realiza un seguimiento de los gastos de proyectos, viajes o hitos específicos.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline w-5 h-5" />
            <input
              className="w-full bg-wf-surface-container-highest border-none text-wf-on-surface rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-wf-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none"
              placeholder="Buscar eventos..."
              type="text"
            />
          </div>
          <Link href="/events/create">
            <button className="bg-wf-primary text-wf-on-primary px-5 py-2.5 rounded-full font-manrope text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow-md">
              <MdAdd className="text-xl" />
              Crear Evento
            </button>
          </Link>
        </div>
      </div>

      {/* Active Events Section */}
      <div>
        <h2 className="font-manrope text-2xl font-bold text-wf-on-background mb-4">Eventos Activos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeEvents.map((event, idx) => (
            <Link
              href={`/events/${event.id}`}
              key={event.id}
              className={`bg-white rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.08)] border border-wf-outline-variant/30 p-6 flex flex-col gap-4 hover:border-wf-primary/50 transition-all duration-300 group ${idx === 0 ? "md:col-span-2" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-wf-primary-container text-wf-on-primary-container flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {getEventIcon(event.name)}
                </div>
                <span className="bg-wf-primary-container/50 text-wf-on-primary-container font-inter text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Activo
                </span>
              </div>

              <div>
                <h3 className="font-manrope text-xl text-wf-on-background font-bold">{event.name}</h3>
                <div className="flex items-center gap-2 text-wf-on-surface-variant text-sm mt-1">
                  <MdCalendarToday className="text-base" />
                  <span>Configurado recientemente</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-wf-surface-variant">
                <div className="text-xs text-wf-on-surface-variant mb-1 uppercase tracking-widest font-bold">Gastado hasta ahora</div>
                <div className="flex flex-col gap-2">
                  {event.balances.map((balance, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {balance.flag && <CurrencyBadgeFlag badge={balance} />}
                        <span className="text-sm font-bold text-wf-on-surface-variant uppercase">{balance.code}</span>
                      </div>
                      <span className={`font-inter text-xl font-extrabold ${Number(balance.balance) < 0 ? "text-wf-error" : "text-wf-secondary"}`}>
                        {balance.symbol}{getCurrencyFormatter(balance.code, Number(balance.balance))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {activeEvents.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-wf-outline-variant p-12 text-center">
            <p className="text-wf-on-surface-variant font-inter">No tienes eventos activos en este momento.</p>
          </div>
        )}
      </div>

      {/* Past Events Section (Placeholder for now) */}
      <div className="mt-4">
        <h2 className="font-manrope text-2xl font-bold text-wf-on-background mb-4">Eventos Pasados</h2>
        <div className="bg-white rounded-2xl shadow-[0_4px_12px_rgba(4,12,33,0.08)] border border-wf-outline-variant/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-wf-surface-variant bg-wf-surface-container-low/50">
                  <th className="p-5 font-inter text-xs font-bold text-wf-on-surface-variant uppercase tracking-widest">Nombre del Evento</th>
                  <th className="p-5 font-inter text-xs font-bold text-wf-on-surface-variant uppercase tracking-widest hidden sm:table-cell">Rango de Fechas</th>
                  <th className="p-5 font-inter text-xs font-bold text-wf-on-surface-variant uppercase tracking-widest text-right">Gasto Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-wf-surface-variant hover:bg-wf-surface-container-low/30 transition-colors cursor-pointer">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-wf-surface-variant flex items-center justify-center text-wf-on-surface shadow-sm">
                        <MdFlight className="text-xl" />
                      </div>
                      <div>
                        <div className="font-manrope font-bold text-wf-on-background">Viaje a Tokyo</div>
                        <div className="text-xs text-wf-on-surface-variant sm:hidden font-medium">Marzo 2024</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-wf-on-surface-variant hidden sm:table-cell font-medium">10 Mar - 24 Mar, 2024</td>
                  <td className="p-5 text-right font-inter font-bold text-wf-on-background">$3,850.20</td>
                </tr>
                <tr className="hover:bg-wf-surface-container-low/30 transition-colors cursor-pointer">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-wf-surface-variant flex items-center justify-center text-wf-on-surface shadow-sm">
                        <MdFestival className="text-xl" />
                      </div>
                      <div>
                        <div className="font-manrope font-bold text-wf-on-background">Festival de Música</div>
                        <div className="text-xs text-wf-on-surface-variant sm:hidden font-medium">Julio 2023</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-wf-on-surface-variant hidden sm:table-cell font-medium">14 Jul - 16 Jul, 2023</td>
                  <td className="p-5 text-right font-inter font-bold text-wf-on-background">$850.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
