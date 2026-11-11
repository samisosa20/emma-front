"use client";
import Link from "next/link";

// Controller
import useAccounts from "./controller";

//components
import useComponents from "@/share/components";
import { getCurrencyFormatter, getAccountType } from "@/share/helpers";
import CurrencyBadgeFlag from "../components/CurrencyBadgeFlag";

const Accounts = () => {
  const { SegmentedControl, Loading, TitleHelp } = useComponents();

  const {
    data,
    isLoading,
    handleToggle,
    isChecked,
    search,
    setSearch,
    handleDrive,
    dataBalance,
    filteredAccounts,
  } = useAccounts();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <TitleHelp
            title={isChecked ? "Cuentas Activas" : "Cuentas Inactivas"}
            onClick={handleDrive}
            className="font-wf-headline-lg text-2xl sm:text-3xl text-emerald-400 font-bold tracking-tight mb-1"
          />
          <p className="font-wf-body-regular text-sm text-slate-400">
            Administra y monitorea la distribución de tu patrimonio.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64 flex-1 sm:flex-initial min-w-[160px]">
            <span
              className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <input
              className="pl-10 pr-4 py-2 bg-slate-900/70 border border-slate-800 rounded-xl text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-slate-100 placeholder:text-slate-500 outline-none transition-all w-full shadow-xs"
              placeholder="Buscar cuentas..."
              aria-label="Buscar cuentas"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            <SegmentedControl
              isChecked={isChecked}
              handleToggle={handleToggle}
              activeLabel="Activas"
              inactiveLabel="Inactivas"
              ariaLabel="Filtrar por estado de cuenta"
            />
            <Link href={"/accounts/create"} className="sm:inline-flex">
              <button className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 py-2 px-3.5 sm:px-4 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-500/20 active:scale-[0.98] transition-all whitespace-nowrap">
                <span
                  className="material-symbols-outlined text-[18px] sm:text-[20px]"
                  aria-hidden="true"
                >
                  add
                </span>
                Crear Cuenta
              </button>
            </Link>
          </div>
        </div>
      </div>

      {dataBalance?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {dataBalance
            .filter((balance) => balance.amount != 0)
            .map((balance, index: number) => (
              <div
                key={index}
                className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80"
              >
                <p className="font-mono text-[10px] text-slate-400 uppercase mb-2 tracking-widest font-bold">
                  {balance.title || "Balance"}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl font-bold text-emerald-400">
                    {balance.symbol}
                    {getCurrencyFormatter(balance.code, balance.amount)}
                  </span>
                  <CurrencyBadgeFlag badge={balance} />
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Bento Grid Layout for Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAccounts.map((account) => {
          /**
           * ⚡ Bolt Optimization: Loop Optimization
           * 🎯 Problem: Calling getAccountType multiple times per iteration
           *    in a loop causes redundant processing and object lookups.
           * 📊 Impact: O(1) lookup once per account, improving rendering performance
           *    for large account lists.
           */
          const accountType = getAccountType(account?.type?.name || "");

          return (
            <Link
              href={`/accounts/${account?.id}`}
              key={account?.id}
              aria-label={`Ver detalles de la cuenta ${account?.name}, tipo: ${account?.type?.name}, balance: ${account?.badge?.symbol}${getCurrencyFormatter(account?.badge?.code, account.balance)}`}
              className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] border border-slate-800/80 hover:border-emerald-500/50 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] group relative overflow-hidden flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                    style={{
                      backgroundColor: accountType.bgColor,
                      color: accountType.textColor,
                    }}
                  >
                    <span
                      className="material-symbols-outlined text-[22px]"
                      aria-hidden="true"
                    >
                      {accountType.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-wf-headline-md text-base text-slate-100 font-semibold group-hover:text-emerald-400 transition-colors">
                      {account?.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-0.5">
                      <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                        {account?.type?.name}
                      </p>
                    </div>
                  </div>
                </div>
                <CurrencyBadgeFlag badge={account?.badge} />
              </div>
              <span
                className={`font-mono text-2xl font-bold ${account?.balance < 0 ? "text-rose-400" : "text-emerald-400"}`}
              >
                {account?.badge?.symbol}
                {getCurrencyFormatter(account?.badge?.code, account.balance)}
              </span>
            </Link>
          );
        })}
      </div>

      {filteredAccounts.length === 0 && (
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 text-center border border-dashed border-slate-800 flex flex-col items-center gap-3 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-slate-800/60 flex items-center justify-center text-slate-500 border border-slate-700/60">
            <span
              className="material-symbols-outlined text-[32px]"
              aria-hidden="true"
            >
              account_balance_wallet
            </span>
          </div>
          <div>
            <h3 className="font-wf-headline-md text-lg text-slate-100 font-semibold">
              No se encontraron cuentas
            </h3>
            <p className="font-wf-body-regular text-sm text-slate-400 mt-1">
              {search
                ? `No hay resultados para "${search}"`
                : "Comienza agregando una nueva cuenta bancaria o billetera."}
            </p>
          </div>
          {!search && (
            <Link href={"/accounts/create"} className="mt-2">
              <button className="text-emerald-400 font-semibold text-sm hover:underline flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[18px]"
                  aria-hidden="true"
                >
                  add
                </span>
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
