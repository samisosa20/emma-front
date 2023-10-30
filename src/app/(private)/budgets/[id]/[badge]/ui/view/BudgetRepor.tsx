import Link from 'next/link';
import { MdAddCircleOutline, MdArrowBack, MdEdit } from 'react-icons/md';
import { Collapse } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

export default function BudgetRepor(props: any) {
  const router = useRouter();

  const { params, data, handleOpen, openCollapse } = props;
  const { Typography } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center space-x-2'>
          <div onClick={() => router.back()}>
            <MdArrowBack />
          </div>
          <div>
            <Typography variant='h1'>Presupuesto</Typography>
            <Typography>
              {params.id} {params.badge}
            </Typography>
          </div>
          </div>
          <div className='flex flex-col space-y-2 items-end lg:flex-row lg:items-center lg:space-y-0 space-x-2'>
            <Link
              href={`/budgets/${params.id}/${params.badge}/edit`}
              className='flex items-center space-x-2 bg-green-500 hover:bg-green-300 text-white p-2 rounded shadow-sm'
            >
              <MdEdit />
              <Typography className="text-white">Editar</Typography>
            </Link>
            <Link
              href={'/budgets/create'}
              className='flex items-center space-x-2 bg-white p-2 rounded shadow-sm'
            >
              <MdAddCircleOutline />
              <Typography>Crear</Typography>
            </Link>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        {/* list Incomes */}
        <div className='col-span-1'>
          <div className='p-4 bg-white rounded shadow-md mb-3 pt-3'>
            <small className='text-gray-500 block mb-1'>Ingresos</small>
            {data.incomes?.map((category: any, key: number) => {
              const real = category.movements.reduce(
                (acc: any, prev: any) => acc + prev,
                0
              );
              const budget =
                category.budgets.reduce(
                  (acc: any, prev: any) => (prev ? acc + prev?.amount : acc),
                  0
                ) ?? 0;

              const prercent =
                budget === 0 ? 100 : ((real / budget) * 100).toFixed(2);
              const prercentWidth =
                real / budget > 1 ? 100 : ((real / budget) * 100).toFixed(2);
              const color =
                Number(prercent) * 1 > 90
                  ? 'green'
                  : Number(prercent) > 65
                  ? 'yellow'
                  : 'red';

              return (
                <div
                  key={key}
                  className='py-4 px-3 border-b cursor-pointer'
                  onClick={() => handleOpen(`#collapseIncome${key}`)}
                >
                  <Typography variant='h5'>{category.name}</Typography>
                  <div className={`mb-2 pt-2`}>
                    <div className='flex justify-between items- center'>
                      <Typography variant='p' className={`text-right`}>
                        {formatCurrency.format(real)}
                      </Typography>
                      <Typography variant='p' className={`text-right`}>
                        {formatCurrency.format(budget)}
                      </Typography>
                    </div>

                    <div className='w-full bg-gray-200 rounded'>
                      <div
                        className={`h-4 bg-${color}-400 rounded`}
                        style={{
                          width: `${prercentWidth}%`,
                        }}
                      >
                        <Typography
                          variant='p'
                          className={`text-white text-xs text-center`}
                        >{`${prercent}%`}</Typography>
                      </div>
                    </div>
                  </div>
                  {category.sub_categories.map(
                    (subCategory: any, subKey: number) => {
                      const real = subCategory.movements;
                      const budget = subCategory.budget
                        ? subCategory.budget.amount
                        : 0;

                      const prercent =
                        budget === 0 ? 100 : ((real / budget) * 100).toFixed(2);
                      const prercentWidth =
                        real / budget > 1
                          ? 100
                          : ((real / budget) * 100).toFixed(2);
                      const color =
                        Number(prercent) * 1 > 90
                          ? 'green'
                          : Number(prercent) > 65
                          ? 'yellow'
                          : 'red';
                      return (
                        <Collapse
                          open={openCollapse === `#collapseIncome${key}`}
                          key={subKey}
                        >
                          <div className='py-4 px-3 border-bottom'>
                            <Typography variant='p'>
                              {subCategory.name}
                            </Typography>
                            <div className={`mb-2 pt-2`}>
                              <div className='flex justify-between items- center'>
                                <Typography
                                  variant='p'
                                  className={`text-right`}
                                >
                                  {formatCurrency.format(real)}
                                </Typography>
                                <Typography
                                  variant='p'
                                  className={`text-right`}
                                >
                                  {formatCurrency.format(budget)}
                                </Typography>
                              </div>

                              <div className='w-full bg-gray-200 rounded'>
                                <div
                                  className={`h-4 bg-${color}-400 rounded`}
                                  style={{
                                    width: `${prercentWidth}%`,
                                  }}
                                >
                                  <Typography
                                    variant='p'
                                    className={`text-white text-xs text-center`}
                                  >{`${prercent}%`}</Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* list Expensives */}
        <div className='col-span-1'>
          <div className='p-4 bg-white rounded shadow-md mb-3 pt-3'>
            <small className='text-gray-500 block mb-1'>Egresos</small>
            {data.expensives?.map((category: any, key: number) => {
              const real = Math.abs(
                category.movements.reduce(
                  (acc: any, prev: any) => acc + prev,
                  0
                )
              );
              const budget =
                category.budgets.reduce(
                  (acc: any, prev: any) => (prev ? acc + prev?.amount : acc),
                  0
                ) ?? 0;
              const prercent =
                budget === 0 ? 100 : ((real / budget) * 100).toFixed(2);
              const prercentWidth =
                real / budget > 1 ? 100 : ((real / budget) * 100).toFixed(2);
              const color =
                Number(prercent) * 1 > 90
                  ? 'red'
                  : Number(prercent) > 65
                  ? 'yellow'
                  : 'green';
              return (
                <div
                  key={key}
                  className='py-4 px-3 border-b cursor-pointer'
                  onClick={() => handleOpen(`#collapseExpensive${key}`)}
                >
                  <Typography variant='h5'>{category.name}</Typography>
                  <div className={`mb-2 pt-2`}>
                    <div className='flex justify-between items- center'>
                      <Typography variant='p' className={`text-right`}>
                        {formatCurrency.format(Math.abs(real))}
                      </Typography>
                      <Typography variant='p' className={`text-right`}>
                        {formatCurrency.format(budget)}
                      </Typography>
                    </div>

                    <div className='w-full bg-gray-200 rounded'>
                      <div
                        className={`h-4 bg-${color}-400 rounded`}
                        style={{
                          width: `${prercentWidth}%`,
                        }}
                      >
                        <Typography
                          variant='p'
                          className={`text-white text-xs text-center`}
                        >{`${prercent}%`}</Typography>
                      </div>
                    </div>
                  </div>
                  {category.sub_categories.map(
                    (subCategory: any, subKey: number) => {
                      const real = Math.abs(subCategory.movements);
                      const budget = subCategory.budget
                        ? subCategory.budget.amount
                        : 0;

                      const prercent =
                        budget === 0 ? 100 : ((real / budget) * 100).toFixed(2);
                      const prercentWidth =
                        real / budget > 1
                          ? 100
                          : ((real / budget) * 100).toFixed(2);
                      const color =
                        Number(prercent) * 1 > 90
                          ? 'red'
                          : Number(prercent) > 65
                          ? 'yellow'
                          : 'green';
                      return (
                        <Collapse
                          open={openCollapse === `#collapseExpensive${key}`}
                          key={subKey}
                        >
                          <div className='py-4 px-3 border-bottom'>
                            <Typography variant='p'>
                              {subCategory.name}
                            </Typography>
                            <div className={`mb-2 pt-2`}>
                              <div className='flex justify-between items- center'>
                                <Typography
                                  variant='p'
                                  className={`text-right`}
                                >
                                  {formatCurrency.format(real)}
                                </Typography>
                                <Typography
                                  variant='p'
                                  className={`text-right`}
                                >
                                  {formatCurrency.format(budget)}
                                </Typography>
                              </div>

                              <div className='w-full bg-gray-200 rounded'>
                                <div
                                  className={`h-4 bg-${color}-400 rounded`}
                                  style={{
                                    width: `${prercentWidth}%`,
                                  }}
                                >
                                  <Typography
                                    variant='p'
                                    className={`text-white text-xs text-center`}
                                  >{`${prercent}%`}</Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                      );
                    }
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* list Utility */}
        <div className='col-span-1'>
          <div className='p-4 bg-white rounded shadow-md mb-3 pt-3'>
            <small className='text-gray-500 block mb-1'>Utilidad</small>
            <div className='py-4 px-3 border-b'>
              <Typography variant="h5">Utilidad</Typography>
              <div className={`mb-2 pt-2`}>
                <div className='flex justify-between items- center'>
                  <Typography variant='p' className={`text-right`}>
                    {formatCurrency.format(data.totalMovements)}
                  </Typography>
                  <Typography variant='p' className={`text-right`}>
                    {formatCurrency.format(data.totalBudgets)}
                  </Typography>
                </div>

                <div className='w-full bg-gray-200 rounded'>
                  <div
                    className='h-4 bg-red-400 rounded'
                    style={{
                      width: `${
                        data.totalMovements / data.totalBudgets > 1
                          ? 100
                          : (
                              (data.totalMovements / data.totalBudgets) *
                              100
                            ).toFixed(2)
                      }%`,
                    }}
                  >
                    <Typography
                      variant='p'
                      className={`text-white text-xs text-center`}
                    >{`${(
                      (data.totalMovements / data.totalBudgets) *
                      100
                    ).toFixed(2)}%`}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
