"use client";

import { usePathname } from "next/navigation";

export default function ConditionalWrapper({
  children,
  Header,
  Footer,
}: {
  children: React.ReactNode;
  Header: React.ComponentType;
  Footer: React.ComponentType;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div>
      {!isLoginPage && <Header />}
      {children}
      {!isLoginPage && <Footer />}
    </div>
  );
}
