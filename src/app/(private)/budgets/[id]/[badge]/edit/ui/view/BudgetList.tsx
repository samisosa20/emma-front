import Link from "next/link";
import { MdAddCircleOutline, MdArrowBack, MdEdit } from "react-icons/md";
import { Collapse } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

//components
import useComponents from "@/share/components";

// Helpers
import { formatCurrency } from "@/share/helpers";

export default function BudgetList(props: any) {
  const router = useRouter();

  const { params, data, setSearch, search } = props;
  const { Typography, Input } = useComponents();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()} className="cursor-pointer">
              <MdArrowBack />
            </div>
            <div>
              <Typography variant="h1">Presupuesto</Typography>
              <Typography>
                {params.id} {params.badge}
              </Typography>
            </div>
          </div>
          <div>
            <Link
              href={"/budgets/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-4 items-center justify-end">
        <div className="lg:w-[250px]">
          <Input
            placeholder="Nombre de la categoría"
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event.target.value)
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {data &&
          data
            ?.filter((budget: any) => {
              if (search !== "") {
                return budget.category?.name
                  ?.toUpperCase()
                  ?.includes(search.toUpperCase());
              }
              return budget;
            })
            .map((budget: any) => (
              <Link href={`/budgets/${budget.id}`} key={budget.id}>
                <div className="bg-white rounded shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="min-h-[56px]">
                      <Typography variant="h2">
                        {budget.category?.name}
                      </Typography>
                      {budget.category?.category_father && (
                        <Typography variant="h6">{`(${budget.category?.category_father?.name})`}</Typography>
                      )}
                    </div>
                    <Typography variant="h5">
                      {formatCurrency.format(budget.amount)}
                    </Typography>
                  </div>
                  <div className="flex items-center justify-between">
                    <Typography variant="h6">{budget.period?.name}</Typography>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}
