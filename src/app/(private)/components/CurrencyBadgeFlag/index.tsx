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

export default function CurrencyBadgeFlag({ badge }: CurrencyBadgeProps) {
  if (!badge.code || !badge.flag) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        src={badge.flag}
        width={20}
        height={20}
        className="rounded-full w-5 h-5 object-cover"
        alt={badge.code}
      />
      <Typography variant="h6" className="text-[10px]">
        {badge.code}
      </Typography>
    </div>
  );
}
