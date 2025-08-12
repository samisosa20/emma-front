import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../../../components";

// Helpers
import { driverEvent, getCurrencyFormatter } from "@/share/helpers";
import { GetApiV2Events200 } from "@@@/domain/models";

type EventList = {
  id: number;
  name: string;
  balance: { movements: number; currency: string }[];
};

const Events = (props: { data: GetApiV2Events200 }) => {
  const { data } = props;
  const { Typography, TitleHelp } = useComponents();
  const { CurrencyBadgeFlag } = useComponentsLayout();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div>
            <TitleHelp title="Eventos" onClick={driverEvent} />
            <Typography>Listado de eventos</Typography>
          </div>
          <div>
            <Link
              href={"/events/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear evento</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.content.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="bg-white rounded shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <Typography variant="h2">{event.name}</Typography>
                </div>
                {event.balances.map((balance, index) => (
                  <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    {balance.flag !== null && balance.flag !== undefined && (
                      <CurrencyBadgeFlag badge={balance} />
                    )}
                    <Typography
                      key={index}
                      variant="h6"
                      className={
                        Number(balance.balance) < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {balance.symbol}
                      {getCurrencyFormatter(
                        balance.code,
                        Number(balance.balance)
                      )}
                    </Typography>
                  </div>
                ))}
              </div>
            </Link>
          ))}
      </div>
      {data && data.content.length === 0 && (
        <div className="bg-white rounded shadow-sm">
          <Typography className="text-center py-6">Sin Eventos</Typography>
        </div>
      )}
    </div>
  );
};

export default Events;
