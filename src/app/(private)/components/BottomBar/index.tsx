"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

//components
import useComponents from "@/share/components";

import { linksMobile } from "@/share/helpers";

export default function BottomBar() {
  const { Typography } = useComponents();
  const pathname = usePathname();

  return (
    <div className="w-screen h-[72px] bg-primary fixed bottom-0 py-4 px-3 grid grid-cols-5 lg:hidden rounded-t-2xl">
      {linksMobile
        .filter((v) => v.show)
        .map((link, index) => {
          const Icon = link.icon;
          if (index !== 2)
            return (
              <Link
                id={`fiona-menuBottom_${link.id}`}
                href={link.link}
                key={index}
                className="flex flex-col items-center"
              >
                <Icon
                  className={`w-8 h-8 ${
                    pathname === link.link ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
                <Typography
                  className={`${
                    pathname === link.link ? "text-yellow-400" : "text-gray-300"
                  } text-xs`}
                >
                  {link.name}
                </Typography>
              </Link>
            );
          return (
            <Link
              href={link.link}
              key={index}
              className="flex flex-col items-center"
            >
              <div
                id={`fiona-menuBottom_${link.id}`}
                className="absolute -top-6 bg-yellow-400 rounded-full h-[74px] w-[74px] flex items-center justify-center border-4 border-yellow-200"
              >
                <Icon className={`w-8 h-8 text-black`} />
              </div>
            </Link>
          );
        })}
    </div>
  );
}
