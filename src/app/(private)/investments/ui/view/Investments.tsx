import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

//components
import useComponents from "@/share/components";

// Helpers
import { formatCurrency, driverInvestment } from "@/share/helpers";

export default function Investments(props: any) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();

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
          data.investments?.map((investment: any) => (
            <Link href={`/investments/${investment.id}`} key={investment.id}>
              <div className="bg-white rounded shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h2">{investment.name}</Typography>
                  <Typography variant="h5">
                    {investment.currency.code}
                  </Typography>
                </div>
                <Typography
                  variant="h5"
                  className={
                    investment.end_amount > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {formatCurrency.format(investment.end_amount)}
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
                    {formatCurrency.format(investment.returns)}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography variant="h5" className="font-semibold">
                    Total
                  </Typography>
                  <Typography variant="h6">{investment.total_rate}</Typography>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {data && data.investments.length === 0 && (
        <div className="bg-white rounded shadow-sm">
          <Typography className="text-center py-6">Sin Inversiones</Typography>
        </div>
      )}
    </div>
  );
}
