import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

type categoryList = {
  id: number;
  name: string;
  description: string;
  group: { name: string };
  sub_categories: number;
  deleted_at: string | null;
};

export default function Heritages(props: any) {
  const { data, setSearch, handleToggle, search, isChecked } = props;
  const { Typography, Input, Switch } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>Categorias</Typography>
            <Typography>Listado de categorias</Typography>
          </div>
          <div>
            <Link
              href={'/categories/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear categoria</Typography>
            </Link>
          </div>
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
          data
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
      {data && data.length === 0 && (
        <div className='bg-white rounded shadow-sm'>
          <Typography className='text-center py-6'>Sin Categorias</Typography>
        </div>
      )}
    </div>
  );
}
