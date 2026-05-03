"use client";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { getCurrencyFormatter, listEventTypes } from "@/share/helpers";
import { format } from "date-fns";
import { GetApiEvents200ContentItem } from "@@@/domain/models";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";

interface ModelProps {
  search: string;
  setSearch: (search: string) => void;
  debouncedSearch: string;
  filteredEvents: GetApiEvents200ContentItem[];
}

const Events = (props: ModelProps) => {
  const { search, setSearch, debouncedSearch, filteredEvents } = props;
  const { Typography } = useComponents();

  return (
    <div className="flex flex-col gap-wf-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md">
        <div>
          <h1 className="font-wf-headline-lg text-[32px] text-wf-on-background mb-1">
            Eventos
          </h1>
          <p className="font-wf-body-regular text-base text-wf-on-surface-variant">
            Realiza un seguimiento del gasto para proyectos, viajes o hitos
            específicos.
          </p>
        </div>
        <div className="flex items-center gap-wf-sm">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline">
              search
            </span>
            <input
              className="w-full bg-wf-surface-container-highest border-none text-wf-on-surface rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-wf-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none"
              placeholder="Buscar eventos..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href={"/events/create"}>
            <button className="bg-wf-primary text-wf-on-primary px-4 py-2.5 rounded-full font-wf-body-regular text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow-md">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Crear Nuevo Evento
            </button>
          </Link>
        </div>
      </div>

      {/* Active Events Bento Grid */}
      <div>
        <h2 className="font-wf-headline-md text-[24px] text-wf-on-background mb-wf-md">
          Eventos Activos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
          {filteredEvents.map((event, index) => {
            const isLarge = index === 0 && debouncedSearch.length < 3;
            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className={`bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.08)] border border-wf-outline-variant/30 p-wf-md flex flex-col gap-wf-sm hover:border-wf-primary/50 transition-colors duration-300 ${
                  isLarge ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: listEventTypes.find(
                        (t) => t.value === (event?.type || "event"),
                      )?.bgColor,
                      color: listEventTypes.find(
                        (t) => t.value === (event?.type || "event"),
                      )?.textColor,
                    }}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {event.type}
                    </span>
                  </div>
                  <span
                    className="font-wf-label-caps text-[10px] px-2 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: listEventTypes.find(
                        (t) => t.value === (event?.type || "event"),
                      )?.bgColor,
                      color: listEventTypes.find(
                        (t) => t.value === (event?.type || "event"),
                      )?.textColor,
                    }}
                  >
                    {listEventTypes.find((t) => t.value === event.type)?.label}
                  </span>
                </div>
                <div>
                  <h3 className="font-wf-headline-md text-[18px] text-wf-on-background font-semibold">
                    {event.name}
                  </h3>
                  <div className="flex items-center gap-2 text-wf-on-surface-variant text-sm mt-1">
                    <span className="material-symbols-outlined text-[16px]">
                      calendar_today
                    </span>
                    <span>{format(event.endEvent, "MMM d, y")}</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-wf-surface-variant flex flex-col gap-3">
                  {(() => {
                    const expenses = event.balances.filter(
                      (b) => Number(b.balance) < 0,
                    );
                    const incomes = event.balances.filter(
                      (b) => Number(b.balance) >= 0,
                    );

                    return (
                      <>
                        {expenses.length > 0 && (
                          <div>
                            <div className="text-sm text-wf-on-surface-variant mb-1">
                              Gastado
                            </div>
                            <div className="flex flex-col gap-1">
                              {expenses.map((balance, bIndex) => (
                                <div
                                  key={bIndex}
                                  className="font-wf-currency-display text-[22px] text-wf-on-background font-bold flex items-baseline gap-1"
                                >
                                  <span>
                                    {balance.symbol}
                                    {getCurrencyFormatter(
                                      balance.code,
                                      Number(balance.balance),
                                    )}
                                  </span>
                                  <CurrencyBadgeFlag
                                    badge={{
                                      code: balance.code,
                                      flag: balance.flag,
                                      symbol: balance.symbol,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {incomes.length > 0 && (
                          <div>
                            <div className="text-sm text-wf-on-surface-variant mb-1">
                              Ingresado
                            </div>
                            <div className="flex flex-col gap-1">
                              {incomes.map((balance, bIndex) => (
                                <div
                                  key={bIndex}
                                  className="font-wf-currency-display text-[22px] text-wf-on-background font-bold flex items-baseline gap-1"
                                >
                                  <span>
                                    {balance.symbol}
                                    {getCurrencyFormatter(
                                      balance.code,
                                      Number(balance.balance),
                                    )}
                                  </span>
                                  <CurrencyBadgeFlag
                                    badge={{
                                      code: balance.code,
                                      flag: balance.flag,
                                      symbol: balance.symbol,
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </Link>
            );
          })}
          {filteredEvents.length === 0 && (
            <div className="col-span-full bg-wf-surface-container-lowest rounded-xl p-wf-xl text-center border border-dashed border-wf-outline-variant">
              <Typography>No se encontraron eventos</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
