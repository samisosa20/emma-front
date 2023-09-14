import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { MdAddCircleOutline, MdArrowBack, MdOutlineCreate } from "react-icons/md";

//components
import useComponents from "@/share/components";


type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  sub_categories: number;
  deleted_at: string | null;
};

export default function HeritageYear(props: any) {
  const { data, setSearch, handleToggle, search, isChecked } = props;
  const router = useRouter();
  const param = useParams();
  const { Typography, Input, Switch } = useComponents();

  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div>
          <div className="flex items-center space-x-2">
            <div onClick={() => router.back()}>
              <MdArrowBack />
            </div>
            <Typography variant="h1">{`Categoria ${data.name}`}</Typography>
          </div>
          <Typography>Detalle de la categoria</Typography>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            href={`/categories/${data.id}/edit`}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdOutlineCreate />
            <Typography>Editar categoria</Typography>
          </Link>
          <Link
            href={"/categories/create"}
            className="flex items-center space-x-2 bg-white p-2 rounded shadow-sm"
          >
            <MdAddCircleOutline />
            <Typography>Crear categoria</Typography>
          </Link>
        </div>
      </div>
      <div className='mt-6 flex space-x-4 items-center justify-end'>
        <div className='lg:w-[250px]'>
          <Input
            placeholder='Nombre de la categoria'
            value={search}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(event.target.value)
            }
          />
        </div>
        <Switch
          isChecked={isChecked}
          handleCheckboxChange={handleToggle}
          label={isChecked ? 'Activos' : 'Inactivos'}
        />
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {data &&
          data.categories
            ?.filter((category: categoryList) => {
              if (search !== '') {
                return isChecked
                  ? !category.deleted_at &&
                      category.name.toUpperCase().includes(search.toUpperCase())
                  : !!category.deleted_at &&
                      category.name
                        .toUpperCase()
                        .includes(search.toUpperCase());
              }
              return isChecked ? !category.deleted_at : !!category.deleted_at;
            })
            .map((category: categoryList) => (
              <Link href={`/categories/${category.id}`} key={category.id}>
                <div className='bg-white rounded shadow-sm p-4'>
                  <div className='flex items-center justify-between'>
                    <Typography variant='h2'>{category.name}</Typography>
                    <Typography variant='h4'>
                      {category.sub_categories}
                    </Typography>
                  </div>
                  <div className='flex items-center justify-between'>
                    <Typography variant='h6'>{category.group.name}</Typography>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

