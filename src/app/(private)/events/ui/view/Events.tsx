"use client";
import Link from "next/link";

//components
import useComponents from "@/share/components";

// Helpers
import { driverEvent, getCurrencyFormatter } from "@/share/helpers";
import { GetApiEvents200 } from "@@@/domain/models";

const Events = (props: { data: GetApiEvents200 }) => {
  const { data } = props;
  const { Typography } = useComponents();

  const activeEvents = data?.content || [];
  // Mock past events as the API might not distinguish them yet, or we just show a few as past for design demonstration if we had them.
  // For now, I'll treat all as active since that's what we have.

  return (
    <div className="flex flex-col gap-wf-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md">
        <div>
          <h1 className="font-wf-headline-lg text-[32px] text-wf-on-background mb-1">
            Eventos
          </h1>
          <p className="font-wf-body-regular text-base text-wf-on-surface-variant">
            Track spending for specific projects, trips, or milestones.
          </p>
        </div>
        <div className="flex items-center gap-wf-sm">
          <div className="relative flex-1 md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline">
              search
            </span>
            <input
              className="w-full bg-wf-surface-container-highest border-none text-wf-on-surface rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-wf-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none"
              placeholder="Search eventos..."
              type="text"
            />
          </div>
          <Link href={"/events/create"}>
            <button className="bg-wf-primary text-wf-on-primary px-4 py-2.5 rounded-full font-wf-body-regular text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow-md">
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create New Event
            </button>
          </Link>
        </div>
      </div>

      {/* Active Events Bento Grid */}
      <div>
        <h2 className="font-wf-headline-md text-[24px] text-wf-on-background mb-wf-md">
          Active Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
          {activeEvents.map((event, index) => {
            const isLarge = index === 0;
            return (
              <Link
                href={`/events/${event.id}`}
                key={event.id}
                className={`bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.08)] border border-wf-outline-variant/30 p-wf-md flex flex-col gap-wf-sm hover:border-wf-primary/50 transition-colors duration-300 ${
                  isLarge ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="w-12 h-12 rounded-lg bg-wf-primary-container text-wf-on-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">
                      {index % 2 === 0 ? "flight_takeoff" : "home_repair_service"}
                    </span>
                  </div>
                  <span className="bg-wf-primary-container/50 text-wf-on-primary-container font-wf-label-caps text-[10px] px-2 py-1 rounded-full uppercase tracking-wider">
                    {index % 2 === 0 ? "Vacation" : "Project"}
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
                    <span>Active</span>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-wf-surface-variant">
                  {event.balances.map((balance, bIndex) => (
                    <div key={bIndex} className="mb-2">
                      <div className="text-sm text-wf-on-surface-variant mb-1">
                        Spent ({balance.code})
                      </div>
                      <div className="font-wf-currency-display text-[22px] text-wf-on-background font-bold">
                        {balance.symbol}
                        {getCurrencyFormatter(
                          balance.code,
                          Number(balance.balance)
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
          {activeEvents.length === 0 && (
            <div className="col-span-full bg-wf-surface-container-lowest rounded-xl p-wf-xl text-center border border-dashed border-wf-outline-variant">
              <Typography>No hay eventos activos</Typography>
            </div>
          )}
        </div>
      </div>

      {/* Past Events Section */}
      <div className="mt-8">
        <h2 className="font-wf-headline-md text-[24px] text-wf-on-background mb-wf-md">
          Past Events
        </h2>
        <div className="bg-wf-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(4,12,33,0.08)] border border-wf-outline-variant/30 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-wf-surface-variant bg-wf-surface-container-low/50">
                <th className="p-4 font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase">
                  Event Name
                </th>
                <th className="p-4 font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase hidden sm:table-cell">
                  Status
                </th>
                <th className="p-4 font-wf-label-caps text-[12px] text-wf-on-surface-variant uppercase text-right">
                  Total Spend
                </th>
              </tr>
            </thead>
            <tbody>
              {activeEvents.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-wf-on-surface-variant">
                    No hay eventos pasados
                  </td>
                </tr>
              ) : (
                activeEvents.map((event) => (
                   <tr key={event.id} className="border-b border-wf-surface-variant hover:bg-wf-surface-container-low/30 transition-colors cursor-pointer">
                    <td className="p-4">
                      <Link href={`/events/${event.id}`} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-wf-surface-variant flex items-center justify-center text-wf-on-surface">
                          <span className="material-symbols-outlined text-[16px]">
                            event
                          </span>
                        </div>
                        <div>
                          <div className="font-wf-body-regular font-semibold text-wf-on-background">
                            {event.name}
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-wf-on-surface-variant hidden sm:table-cell">
                      Completed
                    </td>
                    <td className="p-4 text-right font-wf-body-regular font-semibold text-wf-on-background">
                      {event.balances[0]?.symbol}{getCurrencyFormatter(event.balances[0]?.code, Number(event.balances[0]?.balance))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
