"use client";
import Link from "next/link";
import {MdAddCircleOutline} from "react-icons/md"

// Controller
import useAccounts from "./controller";

//components
import useComponents from "@/share/components";
import useComponentsLayout from "../components";

const Accounts = () => {
  const { Typography, Switch, Input } = useComponents();
  const { Cards } = useComponentsLayout();

  const { data, isLoading, handleToggle, isChecked, search, setSearch } =
    useAccounts();

  const formatoMoneda = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
  });

  if (isLoading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <Typography variant="h1">Cuentas</Typography>
          <Typography>Listado de cuentas</Typography>
        </div>
        <div>
          <Link href={'/accounts/create'} className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm">
          <MdAddCircleOutline/><Typography>Crear cuenta</Typography>
          </Link>
        </div>
      </div>
      <div className="mt-6">{data && <Cards data={data.balances} />}</div>
      <div className="mt-6 flex space-x-4 items-center justify-end">
        <div className="w-[250px]">
          <Input
            placeholder="Nombre de la cuenta"
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event.target.value)
            }
          />
        </div>
        <Switch
          isChecked={isChecked}
          handleCheckboxChange={handleToggle}
          label={isChecked ? "Activos" : "Inactivos"}
        />
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.accounts
            ?.filter((account) => {
              if (search !== "") {
                return isChecked
                  ? !account.deleted_at &&
                      account.name.toUpperCase().includes(search.toUpperCase())
                  : !!account.deleted_at &&
                      account.name.toUpperCase().includes(search.toUpperCase());
              }
              return isChecked ? !account.deleted_at : !!account.deleted_at;
            })
            .map((account) => (
              <Link href={`/accounts/${account.id}`} key={account.id}>
                <div className="bg-white rounded shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <Typography variant="h2">{account.name}</Typography>
                    <Typography variant="p">{account.currency.code}</Typography>
                  </div>
                  <Typography variant="h6" className="h-[40px]">
                    {account.description}
                  </Typography>
                  <Typography
                    variant="p"
                    className={`text-right ${
                      account.balance + account.init_amount >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {formatoMoneda.format(
                      account.balance + account.init_amount
                    )}
                  </Typography>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Accounts;
