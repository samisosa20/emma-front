import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdAddCircleOutline, MdArrowBack } from "react-icons/md";

//components
import useComponents from "@/share/components";

// Helpers
import { formatCurrency } from "@/share/helpers";

type HeritageList = {
  id: number;
  name: string;
  comercial_amount: number;
  legal_amount: number;
  currency: {
    code: string;
  }
};

const HeritageYear = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const param = useParams();
  const { Typography } = useComponents();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()}>
              <MdArrowBack />
            </div>
            <Typography variant="h1">{`Patrimonio del ${param.id}`}</Typography>
          </div>
          <Typography>Detalle patrimonio</Typography>
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
      <div className="mt-6"></div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.map((heritage: HeritageList) => (
            <Link href={`/heritages/${heritage.id}/edit`} key={heritage.id}>
              <div className="bg-white rounded shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h2">{heritage.name}</Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography>Comercial</Typography>
                  <Typography
                    variant="h5"
                    className={
                      heritage.comercial_amount > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {formatCurrency.format(heritage.comercial_amount)}{" "}
                    {heritage.currency.code}
                  </Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Typography>Legal</Typography>
                  <Typography
                    variant="h5"
                    className={
                      heritage.legal_amount > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {formatCurrency.format(heritage.legal_amount)}{" "}
                    {heritage.currency.code}
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
