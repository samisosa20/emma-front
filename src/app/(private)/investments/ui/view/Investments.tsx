import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { getCurrencyFormatter, driverInvestment } from "@/share/helpers";
import { GetApiV2Investments200ContentItem } from "@@@/domain/models";

export default function Investments(props: any) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div>
            <TitleHelp title="Inversiones" onClick={driverInvestment} />
            <Typography>Listado de inversiones</Typography>
          </div>
          <div>
            <Link
              href={"/investments/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear inversión</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.content?.map((investment: GetApiV2Investments200ContentItem) => (
            <Link href={`/investments/${investment.id}`} key={investment.id}>
              <div className="bg-white rounded shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h2">{investment.name}</Typography>
                  <CurrencyBadgeFlag badge={investment.badge} />
                </div>
                <Typography
                  variant="h5"
                  className={
                    investment.endAmount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {investment.badge?.symbol}
                  {getCurrencyFormatter(
                    investment.badge?.code,
                    investment.endAmount
                  )}
                </Typography>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-semibold">
                    Val.
                  </Typography>
                  <Typography variant="h6">
                    {investment.valorization}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-semibold">
                    Rend.
                  </Typography>
                  <Typography variant="h6">
                    {investment.badge?.symbol}
                    {getCurrencyFormatter(
                      investment.badge?.code,
                      investment.totalReturns
                    )}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-semibold">
                    Total
                  </Typography>
                  <Typography variant="h6">{investment.totalRate}</Typography>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {data && data.meta.totalCount === 0 && (
        <div className="bg-white rounded shadow-sm">
          <Typography className="text-center py-6">Sin Inversiones</Typography>
        </div>
      )}
    </div>
  );
}
