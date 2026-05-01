import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdAddCircleOutline, MdArrowBack } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "@/app/(private)/components";

// Helpers
import { getCurrencyFormatter } from "@/share/helpers";
import {
  GetApiHeritages200ContentItem,
  GetApiHeritages200InvestmentsItem,
} from "@@@/domain/models";

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
            <Typography variant="h1">{`${param.id}`}</Typography>
          </div>
          <Typography>Detalle patrimonio</Typography>
        </div>
        <div>
          <Link
            href={"/heritages/create"}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdAddCircleOutline />
            <Typography>Patrimonio</Typography>
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
              <div className="bg-white rounded shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h2">{heritage.name}</Typography>
                  <CurrencyBadgeFlag badge={heritage.badge} />
                </div>
                <div className="flex items-center justify-between">
                  <Typography>Comercial</Typography>
                  <Typography
                    variant="h5"
                    className={
                      heritage.comercialAmount > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {heritage.badge?.symbol}
                    {getCurrencyFormatter(
                      heritage.badge?.code,
                      heritage.comercialAmount
                    )}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography>Legal</Typography>
                  <Typography
                    variant="h5"
                    className={
                      heritage.legalAmount > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {heritage.badge?.symbol}
                    {getCurrencyFormatter(
                      heritage.badge?.code,
                      heritage.legalAmount
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
