"use client";
import React, { memo } from "react";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

/**
 * ⚡ Bolt Optimization: Memoization of AccountDetail View
 * 🎯 Problem: Main view for account details, containing metrics and complex transaction lists.
 * 📊 Impact: Skips the expensive reconciliation of the entire account detail layout when
 *    the parent Page component re-renders (e.g., during navigation or loading states).
 */
const AccountDetail = memo((props: any) => {
  const {
    data,
    control,
    handleSubmit,
    onSubmit,
    listEvents,
    handleResetFilters,
    setPage,
    listMovements,
    meta,
    dataBalance,
  } = props;
  const router = useRouter();
  const { Typography, Select, FormControl, Input, Button, AutoComplete } =
    useComponents();
  const { Filters, ListMovementsDetail, MetricCard, CurrencyBadgeFlag } =
    useComponentsLayout();

  return (
    <div className="flex flex-col gap-wf-gutter">
      {/* Page Header */}
      <div className="flex justify-between items-end pb-wf-md border-b border-wf-surface-variant">
        <div>
          <h1 className="font-wf-headline-lg text-wf-headline-lg text-wf-primary flex items-center gap-wf-sm">
            <span className="material-symbols-outlined text-[32px] text-wf-surface-tint filled">
              account_balance_wallet
            </span>
            Cuenta: {data?.name}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-wf-xs px-wf-md py-wf-sm bg-wf-surface-container-highest text-wf-primary rounded-lg font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_back
            </span>
            VOLVER
          </button>
          <Link
            href={`/accounts/${data?.id}/edit`}
            className="flex items-center gap-wf-xs px-wf-md py-wf-sm bg-wf-surface-container-highest text-wf-primary rounded-lg font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">edit</span>
            EDITAR
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-wf-gutter">
        {/* Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-wf-gutter">
          {/* Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-wf-gutter">
            <MetricCard
              title="BALANCE TOTAL"
              metrics={[
                {
                  amount: dataBalance?.totalAmount,
                  code: dataBalance?.code,
                  symbol: dataBalance?.symbol,
                  flag: dataBalance?.flag,
                },
              ]}
            />
            <MetricCard
              title="BALANCE ANUAL"
              metrics={[
                {
                  amount: dataBalance?.yearlyAmount,
                  code: dataBalance?.code,
                  symbol: dataBalance?.symbol,
                  flag: dataBalance?.flag,
                },
              ]}
            />
            <MetricCard
              title="BALANCE MENSUAL"
              metrics={[
                {
                  amount: dataBalance?.monthlyAmount,
                  code: dataBalance?.code,
                  symbol: dataBalance?.symbol,
                  flag: dataBalance?.flag,
                },
              ]}
            />
          </div>

          <ListMovementsDetail
            listMovements={listMovements}
            meta={meta}
            setPage={setPage}
            showCategory={true}
            showAccount={false}
            showEvent={true}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-wf-lg space-y-wf-md"
            >
              <h4 className="font-wf-label-caps text-[12px] text-wf-surface-tint uppercase tracking-widest border-b border-wf-surface-variant pb-2 mb-4">
                Filtros de Búsqueda
              </h4>
              <Controller
                name={"event_id"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <AutoComplete
                      label="Evento"
                      placeholder="Selecciona un evento"
                      id="event_id"
                      handleOnChange={onChange}
                      options={listEvents}
                      iserror={!!fieldState.error}
                      value={value}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name={"category"}
                control={control}
                render={({ field: { onChange, value }, fieldState }) => (
                  <FormControl
                    fieldState={fieldState}
                    withLabel={true}
                    label="Categoría"
                  >
                    <Input
                      type="text"
                      placeholder="Ej. Comida"
                      onChange={onChange}
                      value={value}
                      iserror={!!fieldState.error}
                    />
                  </FormControl>
                )}
              />
              <div className="grid grid-cols-2 gap-wf-md">
                <Controller
                  name={"start_date"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl
                      fieldState={fieldState}
                      withLabel={true}
                      label="Desde"
                    >
                      <Input
                        type="date"
                        onChange={onChange}
                        value={value}
                        iserror={!!fieldState.error}
                      />
                    </FormControl>
                  )}
                />
                <Controller
                  name={"end_date"}
                  control={control}
                  render={({ field: { onChange, value }, fieldState }) => (
                    <FormControl
                      fieldState={fieldState}
                      withLabel={true}
                      label="Hasta"
                    >
                      <Input
                        type="date"
                        onChange={onChange}
                        value={value}
                        iserror={!!fieldState.error}
                      />
                    </FormControl>
                  )}
                />
              </div>
              <Button type="submit" className="w-full mt-wf-lg">
                Aplicar Filtros
              </Button>
            </form>
          </ListMovementsDetail>
        </div>

        {/* Side Panel - Info / Quick Actions */}
        <aside className="hidden lg:block lg:col-span-4 space-y-wf-gutter h-fit sticky top-wf-gutter">
          <div className="bg-wf-on-primary backdrop-blur-md rounded-xl p-wf-lg shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-white/50">
            <h3 className="font-wf-headline-md text-wf-headline-md text-wf-primary mb-wf-sm">
              Información de la Cuenta
            </h3>
            <div className="space-y-wf-md">
              <div className="flex flex-col gap-1 border-b border-wf-surface-variant/30 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-wf-surface-tint font-bold">
                  NOMBRE
                </span>
                <span className="text-wf-on-surface font-semibold">
                  {data?.name}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-b border-wf-surface-variant/30 pb-3">
                <span className="text-[10px] uppercase tracking-widest text-wf-surface-tint font-bold">
                  DIVISA PRINCIPAL
                </span>
                <div className="flex items-center gap-2">
                  <CurrencyBadgeFlag
                    badge={{
                      code: dataBalance?.code,
                      flag: dataBalance?.flag,
                      symbol: dataBalance?.symbol,
                    }}
                  />
                  <span className="text-wf-on-surface">
                    {dataBalance?.code} ({dataBalance?.symbol})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
});

export default AccountDetail;
