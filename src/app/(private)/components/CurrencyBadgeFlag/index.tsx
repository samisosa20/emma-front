import { memo } from "react";
import Image from "next/image";

import Typography from "@/share/components/Typography";

type BadgeDetail = {
  code?: string | null;
  flag?: string | null;
  symbol?: string | null;
};

type CurrencyBadgeProps = {
  badge: BadgeDetail;
};

/**
 * ⚡ Bolt Optimization: Memoization of CurrencyBadgeFlag
 * 🎯 Problem: Rendered in every row of transaction lists.
 * 📊 Impact: Skips re-rendering the flag and currency code for each transaction
 *    when the parent list refreshes.
 */
const CurrencyBadgeFlag = memo(({ badge }: CurrencyBadgeProps) => {
  if (!badge?.code || !badge?.flag) {
    return null;
  }

  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/60">
      <Image
        src={badge.flag}
        width={16}
        height={16}
        className="rounded-full w-4 h-4 object-cover"
        style={{ width: "16px", height: "16px" }}
        alt={badge.code}
      />
      <Typography variant="h6" className="text-[10px] font-mono text-slate-300 font-bold">
        {badge.code}
      </Typography>
    </div>
  );
});

export default CurrencyBadgeFlag;
