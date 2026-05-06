"use client";
import React from "react";
import CurrencyBadgeFlag from "@/app/(private)/components/CurrencyBadgeFlag";
import { getCurrencyFormatter } from "@/share/helpers";

interface MetricCardProps {
  title: string;
  metrics?: { amount: number; code: string; flag: string; symbol: string }[];
}

const MetricCard = ({ title, metrics = [] }: MetricCardProps) => {
  return (
    <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] hover:shadow-[0_8px_24px_rgba(4,12,33,0.08)] transition-all border border-white/50">
      <h3 className="font-wf-label-caps text-[12px] uppercase tracking-wider text-wf-surface-tint mb-wf-sm">
        {title}
      </h3>
      <div className="flex flex-col gap-wf-md">
        {metrics?.map((m, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between border-b border-wf-surface-variant/10 last:border-0 pb-2 last:pb-0"
          >
            <div className="flex flex-col">
              <span className="font-wf-currency-display text-lg font-bold text-wf-primary">
                {m.symbol}
                {getCurrencyFormatter(m.code, m.amount)}
              </span>
            </div>
            <CurrencyBadgeFlag badge={m} />
          </div>
        ))}
        {metrics?.length === 0 && (
          <span className="text-xs text-wf-on-surface-variant italic">
            Sin datos
          </span>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
