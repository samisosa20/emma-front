"use client";
import Link from "next/link";

// Controller
import useAccounts from "./controller";

//components
import useComponents from "@/share/components";
import { getCurrencyFormatter } from "@/share/helpers";
import CurrencyBadgeFlag from "../components/CurrencyBadgeFlag";

const Accounts = () => {
  const { Switch, Loading, TitleHelp } = useComponents();

  const {
    data,
    isLoading,
    handleToggle,
    isChecked,
    search,
    setSearch,
    handleDrive,
    dataBalance,
  } = useAccounts();

  if (isLoading) {
    return <Loading />;
  }

  const filteredAccounts = data?.content?.filter((account) => {
    const matchesSearch = search === "" ||
      account?.name?.toUpperCase()?.includes(search?.toUpperCase());

    const matchesStatus = isChecked ? !account?.deletedAt : !!account?.deletedAt;

    return matchesSearch && matchesStatus;
  }) || [];

  const getAccountIcon = (typeId: string | number) => {
    switch (String(typeId)) {
      case "1": return "payments"; // Checking
      case "2": return "savings"; // Savings
      case "3": return "credit_card"; // Credit
      case "4": return "show_chart"; // Investment
      case "5": return "account_balance"; // Loan
      case "6": return "account_balance_wallet"; // Cash
      default: return "account_balance_wallet";
    }
  };

  return (
    <div className="flex flex-col gap-wf-xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md">
        <div>
          <TitleHelp
            title={isChecked ? "Cuentas Activas" : "Cuentas Inactivas"}
            onClick={handleDrive}
            className="font-wf-headline-lg text-[32px] text-wf-on-background mb-1"
          />
          <p className="font-wf-body-regular text-base text-wf-on-surface-variant">
            Administra y monitorea la distribución de tu patrimonio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-wf-sm">
          <div className="relative flex-1 min-w-[200px] md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-wf-outline text-[20px]">
              search
            </span>
            <input
              className="w-full bg-wf-surface-container-highest border-none text-wf-on-surface rounded-full py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-wf-primary transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] outline-none"
              placeholder="Buscar cuentas..."
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Switch
            isChecked={isChecked}
            handleCheckboxChange={handleToggle}
            label={isChecked ? "Activas" : "Inactivas"}
          />
          <Link href={"/accounts/create"}>
            <button className="bg-wf-primary text-wf-on-primary px-6 py-2.5 rounded-full font-wf-body-regular text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap shadow-md">
              <span className="material-symbols-outlined text-[20px]">add</span>
              Crear Cuenta
            </button>
          </Link>
        </div>
      </div>

      {dataBalance?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-wf-gutter">
          {dataBalance.map((balance: any, index: number) => (
            <div key={index} className="bg-wf-surface-container-lowest rounded-xl p-wf-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30">
               <p className="font-wf-label-caps text-[10px] text-wf-on-surface-variant uppercase mb-2 tracking-wider">
                {balance.title || "Balance"}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-wf-currency-display text-[24px] font-bold text-wf-on-surface">
                  {balance.symbol}{getCurrencyFormatter(balance.code, balance.amount)}
                </span>
                <CurrencyBadgeFlag badge={balance} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bento Grid Layout for Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-wf-gutter">
        {filteredAccounts.map((account) => (
          <Link
            href={`/accounts/${account?.id}`}
            key={account?.id}
            className="bg-wf-surface-container-lowest rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 hover:border-wf-primary/50 transition-all hover:shadow-[0_8px_24px_rgba(4,12,33,0.08)] group relative overflow-hidden flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-wf-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-wf-primary-fixed flex items-center justify-center text-wf-on-primary-fixed">
                  <span className="material-symbols-outlined text-[22px]">
                    {getAccountIcon(account?.type?.id || 1)}
                  </span>
                </div>
                <div>
                  <h3 className="font-wf-headline-md text-base text-wf-on-surface font-semibold">
                    {account?.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <p className="font-wf-label-caps text-[10px] text-wf-on-surface-variant uppercase tracking-tighter">
                      {account?.type?.name} • {account?.badge?.code}
                    </p>
                  </div>
                </div>
              </div>
              <CurrencyBadgeFlag badge={account?.badge} />
            </div>

            <div className="flex-1 flex flex-col justify-end mt-auto">
              <div className="mb-wf-md">
                <span className="font-wf-currency-display text-[28px] text-wf-on-surface font-bold block leading-tight">
                  {account?.badge?.symbol}
                  {getCurrencyFormatter(account?.badge?.code, account?.balance)}
                </span>
                <div className={`flex items-center gap-1 mt-1 ${account?.balance >= 0 ? "text-wf-secondary" : "text-wf-error"}`}>
                  <span className="material-symbols-outlined text-sm">
                    {account?.balance >= 0 ? "trending_up" : "trending_down"}
                  </span>
                  <span className="font-wf-body-regular text-xs">
                    {account?.balance >= 0 ? "Saldo positivo" : "Saldo negativo"}
                  </span>
                </div>
              </div>

              {/* Decorative sparkline placeholder */}
              <div className="h-12 w-full rounded-md overflow-hidden bg-wf-surface-container-low/50 relative">
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path
                      d={account?.balance >= 0
                        ? "M0 25 L20 20 L40 22 L60 10 L80 15 L100 5"
                        : "M0 5 L20 10 L40 8 L60 20 L80 18 L100 25"}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={account?.balance >= 0 ? "text-wf-secondary" : "text-wf-error"}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="bg-wf-surface-container-lowest rounded-xl p-wf-xl text-center border border-dashed border-wf-outline-variant flex flex-col items-center gap-wf-sm shadow-sm">
          <div className="w-16 h-16 rounded-full bg-wf-surface-container flex items-center justify-center text-wf-outline-variant">
            <span className="material-symbols-outlined text-[32px]">
              account_balance_wallet
            </span>
          </div>
          <div>
            <h3 className="font-wf-headline-md text-lg text-wf-on-surface font-semibold">
              No se encontraron cuentas
            </h3>
            <p className="font-wf-body-regular text-sm text-wf-on-surface-variant mt-1">
              {search ? `No hay resultados para "${search}"` : "Comienza agregando una nueva cuenta bancaria o billetera."}
            </p>
          </div>
          {!search && (
            <Link href={"/accounts/create"} className="mt-2">
              <button className="text-wf-primary font-semibold text-sm hover:underline flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">add</span>
                Crear mi primera cuenta
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Accounts;
