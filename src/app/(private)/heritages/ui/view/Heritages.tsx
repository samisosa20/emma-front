import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";
import Image from "next/image";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../components";

// Helpers
import { getCurrencyFormatter, driverHeritage } from "@/share/helpers";
import { GetApiV2HeritagesYear200Item } from "@@@/domain/models";

export default function Heritages(props: {
  data: GetApiV2HeritagesYear200Item[];
}) {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div>
            <TitleHelp title="Patrimonio" onClick={driverHeritage} />
            <Typography>Patrimonio por año</Typography>
          </div>
          <div>
            <Link
              href={"/heritages/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear patrimonio</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((heritage) => (
            <Link href={`/heritages/${heritage.year}`} key={heritage.year}>
              <div className="bg-white rounded shadow-sm p-4">
                <Typography variant="h2">{heritage.year}</Typography>
                {heritage.balances.map((balance, i) => (
                  <div
                    className="flex items-center justify-between border-b border-gray-300 py-2 px-1"
                    key={i}
                  >
                    <CurrencyBadgeFlag badge={balance} />
                    <Typography
                      variant="h5"
                      className={`text-right ${
                        Number(balance.amount) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {balance.symbol}
                      {getCurrencyFormatter(
                        balance.code,
                        Number(balance.amount)
                      )}
                    </Typography>
                  </div>
                ))}
              </div>
            </Link>
          ))}
      </div>
      {data && data.length === 0 && (
        <div className="bg-white rounded shadow-sm">
          <Typography className="text-center py-6">Sin Patrimonio</Typography>
        </div>
      )}
    </div>
  );
}
