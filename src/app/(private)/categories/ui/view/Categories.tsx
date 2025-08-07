"use client";
import Link from "next/link";
import { MdAddCircleOutline } from "react-icons/md";
import * as PiIcons from "react-icons/pi";

//components
import useComponents from "@/share/components";

// Helpers
import { driverCategory } from "@/share/helpers";

type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  color: string;
  icon: string;
  deletedAt: string | null;
};

function getIconComponent(name: string): React.ElementType {
  return PiIcons[name as keyof typeof PiIcons] || PiIcons["PiAcorn"];
}

export default function Heritages(props: any) {
  const { data, setSearch, handleToggle, search, isChecked } = props;
  const { Typography, Input, Switch, TitleHelp } = useComponents();

  return (
    <div>
      <div>
        <div className="flex items-center justify-between w-full">
          <div>
            <TitleHelp title="Categorías" onClick={driverCategory} />
            <Typography>Listado de categorías</Typography>
          </div>
          <div>
            <Link
              href={"/categories/create"}
              className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
            >
              <MdAddCircleOutline />
              <Typography>Crear categoría</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div
        id="fiona-search"
        className="mt-6 flex space-x-4 items-center justify-end"
      >
        <div className="lg:w-[250px]">
          <Input
            placeholder="Nombre de la categoría"
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
      <div className={`flex flex-wrap justify-between items-start gap-4 mt-6`}>
        {data &&
          data.content
            ?.filter((category: categoryList) => {
              if (search !== "") {
                return isChecked
                  ? !category.deletedAt &&
                      category.name
                        ?.toUpperCase()
                        ?.includes(search.toUpperCase())
                  : !!category.deletedAt &&
                      category.name
                        ?.toUpperCase()
                        ?.includes(search.toUpperCase());
              }
              return isChecked ? !category.deletedAt : !!category.deletedAt;
            })
            .map((category: categoryList) => {
              const Icon = getIconComponent(category.icon ?? "PiAcorn");

              return (
                <Link
                  href={`/categories/${category.id}`}
                  key={category.id}
                  className="flex flex-col items-center w-16"
                >
                  <div
                    className={`rounded-full shadow-sm w-12 h-12 hover:opacity-80 flex justify-center items-center`}
                    style={{
                      background: category.color,
                    }}
                  >
                    <Icon size={30} className="text-gray-200" />
                  </div>
                  <Typography className="text-center leading-3 text-xs">
                    {category.name}
                  </Typography>
                </Link>
              );
            })}
      </div>
      {data && data.length === 0 && (
        <div className="bg-white rounded shadow-sm">
          <Typography className="text-center py-6">Sin Categorías</Typography>
        </div>
      )}
    </div>
  );
}
