import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineCreate, MdArrowBack } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../../components";

// Helpers
import { formatCurrency } from "@/share/helpers";

type movements = {
  amount: number;
  id: number;
  category: {
    name: string;
  };
  date_purchase: string;
  event?: {
    name: string;
  };
  description: string;
};

const AccountDetail = (props: any) => {
  const { data } = props;
  const router = useRouter();
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
        <div className='flex items-center space-x-2'>
          <div onClick={() => router.back()}>
            <MdArrowBack />
          </div>
          <Typography variant="h1">{`${data.account.name} ${data.account.currency.code}`}</Typography>
        </div>
          <Typography>Detalle cuenta</Typography>
        </div>
        <div>
          <Link
            href={`/accounts/${data.account.id}/edit`}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdOutlineCreate />
            <Typography>Editar</Typography>
          </Link>
        </div>
      </div>
      <div className="mt-6">
        <Cards data={data.balances} />
      </div>
      <div className="mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto">
        {data.movements.data.map((movement: movements) => (
          <div className="border-b border-gray-300 py-2 px-1" key={movement.id}>
            <div className="flex justify-between items-center">
              <div className="font-bold">{movement.category.name}</div>
              <div
                className={
                  movement.amount > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {formatCurrency.format(movement.amount)}
              </div>
            </div>
            <div className="flex justify-between items-center pb-1">
              <Typography>{movement.date_purchase}</Typography>
              <Typography>{movement.event?.name}</Typography>
            </div>
            {movement.description && (
              <div className="border-t pt-1">
                <Typography variant="h5">{movement.description}</Typography>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountDetail;
