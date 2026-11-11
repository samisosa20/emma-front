"use client";
import React, { memo } from "react";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";
import { getCurrencyFormatter } from "@/share/helpers";

interface MetricCardProps {
  title: string;
  metrics?: { amount: number; code: string; flag: string; symbol: string }[];
}

/**
 * ⚡ Bolt Optimization: Memoization of MetricCard
 * 🎯 Problem: Displays key metrics in dashboards, often repeated for different currencies.
 * 📊 Impact: Skips re-rendering when metrics haven't changed.
 */
const MetricCard = memo(({ title, metrics = [] }: MetricCardProps) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-slate-700/80 transition-all border border-slate-800/80 w-full min-w-0">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-slate-400 mb-3 font-bold">
        {title}
      </h3>
      <div className="flex flex-col gap-3">
        {metrics?.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b border-slate-800/60 last:border-0 pb-2.5 last:pb-0"
          >
            <div className="flex flex-col">
              <span className="font-mono text-xl font-extrabold text-emerald-400 tracking-tight">
                {m.symbol}
                {getCurrencyFormatter(m.code, m.amount)}
              </span>
            </div>
            <CurrencyBadgeFlag badge={m} />
          </div>
        ))}
        {metrics?.length === 0 && (
          <span className="text-xs text-slate-500 italic">
            Sin datos
          </span>
        )}
      </div>
    </div>
  );
});

export default MetricCard;
