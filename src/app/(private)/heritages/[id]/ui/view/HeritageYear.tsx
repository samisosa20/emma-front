import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdAddCircleOutline, MdArrowBack } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import { GetApiHeritages200ContentItem } from "@@@/domain/models";

const HeritageYear = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const param = useParams();
  const { Typography } = useComponents();
  const { Cards, CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <Typography
              className="font-wf-headline-lg text-wf-headline-lg text-wf-on-surface cursor-pointer"
              variant="h1"
            >{`${param.id}`}</Typography>
          </div>
          <Typography className="font-wf-body-regular text-wf-body-regular text-wf-on-surface-variant mt-wf-unit">
            Detalle patrimonio
          </Typography>
        </div>
        <div>
          <Link
            href={"/heritages/create"}
            className="flex items-center gap-2 bg-wf-primary text-wf-on-primary py-2 px-5 rounded-full font-wf-label-caps text-[12px] uppercase tracking-wider hover:bg-wf-primary-container transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            Crear Patrimonio
          </Link>
        </div>
      </div>
      <div className="mt-6"></div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data && data.balances?.length > 0 && (
          <div className="mt-6">
            <Cards title="balance" data={data.balances} />
          </div>
        )}
        {data && data.investments?.length > 0 && (
          <div className="mt-6">
            <Cards title="Inversiones" data={data.investments} />
          </div>
        )}
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.content.map((heritage: GetApiHeritages200ContentItem) => (
            <Link href={`/heritages/${heritage.id}/edit`} key={heritage.id}>
              <div className="bg-wf-on-primary backdrop-blur-md shadow-[0_4px_12px_rgba(4,12,33,0.05)] rounded-xl p-wf-lg border border-white/50 w-full">
                <div className="flex items-center justify-between mb-wf-md">
                  <Typography
                    variant="h2"
                    className="font-semibold text-wf-primary uppercase tracking-wider text-[11px]"
                  >
                    {heritage.name}
                  </Typography>
                  <CurrencyBadgeFlag badge={heritage.badge} />
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="font-wf-body-regular text-sm text-wf-on-surface">
                    Comercial
                  </Typography>
                  <Typography
                    className={`font-wf-body-regular font-bold text-sm ${
                      heritage.comercialAmount < 0
                        ? "text-wf-error"
                        : "text-wf-secondary"
                    }`}
                  >
                    <span className="opacity-70 text-[10px] mr-1">
                      {heritage.badge?.symbol}
                    </span>
                    {getCurrencyFormatter(
                      heritage.badge?.code,
                      heritage.comercialAmount,
                    )}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography className="font-wf-body-regular text-sm text-wf-on-surface">
                    Legal
                  </Typography>
                  <Typography
                    className={`font-wf-body-regular font-bold text-sm ${
                      heritage.legalAmount < 0
                        ? "text-wf-error"
                        : "text-wf-secondary"
                    }`}
                  >
                    <span className="opacity-70 text-[10px] mr-1">
                      {heritage.badge?.symbol}
                    </span>
                    {getCurrencyFormatter(
                      heritage.badge?.code,
                      heritage.legalAmount,
                    )}
                  </Typography>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default HeritageYear;
