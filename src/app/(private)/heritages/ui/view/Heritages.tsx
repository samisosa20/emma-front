import Link from "next/link";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../components";

// Helpers
import { getCurrencyFormatter, driverHeritage } from "@/share/helpers";
import { GetApiHeritagesYear200Item } from "@@@/domain/models";

export default function Heritages(props: {
  data: GetApiHeritagesYear200Item[];
}) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div className="space-y-wf-gutter">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-wf-md mb-wf-lg">
        <div className="flex flex-col gap-wf-xs">
          <TitleHelp
            title="Patrimonio"
            onClick={driverHeritage}
            className="text-wf-primary font-wf-headline-lg"
          />
          <Typography className="text-wf-on-surface-variant font-wf-body-regular">
            Evolución de tu riqueza neta consolidada año tras año.
          </Typography>
        </div>
        <Link
          href={"/heritages/create"}
          className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Crear Patrimonio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-wf-gutter">
        {data &&
          data.map((heritage) => (
            <Link
              href={`/heritages/${heritage.year}`}
              key={heritage.year}
              className="group w-full min-w-0"
            >
              <div className="bg-wf-surface-container-lowest backdrop-blur-md rounded-xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 transition-all hover:shadow-lg hover:border-wf-primary/30 group-hover:-translate-y-1 w-full min-w-0">
                <div className="flex justify-between items-center mb-3 sm:mb-wf-lg border-b border-wf-surface-variant/30 pb-2 sm:pb-wf-sm">
                  <Typography className="text-xl sm:text-2xl font-bold text-wf-primary">
                    {heritage.year}
                  </Typography>
                  <div className="w-8 h-8 rounded-full bg-wf-surface-container flex items-center justify-center text-wf-surface-tint group-hover:bg-wf-primary group-hover:text-wf-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[18px]">
                      history
                    </span>
                  </div>
                </div>

                <div className="space-y-wf-sm">
                  {heritage.balances.map((balance, i) => (
                    <div
                      className="flex items-center justify-between p-2 sm:p-wf-sm rounded-lg hover:bg-wf-surface-container-low/50 transition-colors"
                      key={i}
                    >
                      <div className="flex items-center gap-wf-xs">
                        <CurrencyBadgeFlag badge={balance} />
                        <span className="text-[10px] font-wf-label-caps text-wf-surface-tint uppercase">
                          {balance.code}
                        </span>
                      </div>
                      <Typography
                        className={`font-wf-body-regular font-bold text-sm ${
                          Number(balance.amount) > 0
                            ? "text-wf-secondary"
                            : "text-wf-error"
                        }`}
                      >
                        <span className="opacity-70 text-[10px] mr-1">
                          {balance.symbol}
                        </span>
                        {getCurrencyFormatter(
                          balance.code,
                          Number(balance.amount),
                        )}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
      </div>

      {data && data.length === 0 && (
        <div className="bg-wf-surface-container-lowest backdrop-blur-md rounded-xl p-6 sm:p-wf-xl shadow-[0_4px_12px_rgba(4,12,33,0.05)] border border-wf-outline-variant/30 text-center">
          <span className="material-symbols-outlined text-wf-surface-tint text-5xl mb-wf-md block">
            account_balance
          </span>
          <Typography className="text-wf-on-surface-variant italic font-wf-body-regular">
            Aún no has registrado datos de patrimonio.
          </Typography>
        </div>
      )}
    </div>
  );
}
