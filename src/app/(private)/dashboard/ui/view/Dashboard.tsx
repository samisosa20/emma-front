import { Controller } from 'react-hook-form';
import {
  AreaChart,
  XAxis,
  Area,
  Tooltip,
  CartesianGrid,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

//components
import useComponents from '@/share/components';
import useComponentsLayout from '@/app/(private)/components';

import { colors, formatCurrency, driverDash } from '@/share/helpers';

export default function Dashboard(props: any) {
  const {
    data,
    currencyOptions = [],
    control,
    onSubmit,
    handleSubmit,
    getMovements,
    getMovementsGroup,
    listMovements,
  } = props;
  const { Typography, Input, Select, FormControl, Button, TitleHelp, AutoComplete } = useComponents();
  const { Cards, ListItems, Filters } = useComponentsLayout();

  return (
    <div>
      <TitleHelp title="Dashboard" onClick={driverDash} />
      <Typography>Aca podras ver tu informacion consolidada</Typography>
      <Filters>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={'badge_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <AutoComplete
                  label='Moneda'
                  placeholder='Seleciona una opcion'
                  id='badge_id'
                  handleOnChange={(e: any) => {
                    onChange(e);
                  }}
                  options={currencyOptions}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'start_date'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='date'
                  step={0.01}
                  placeholder='Fecha inicial'
                  label='Fecha inicial'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'end_date'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='date'
                  step={0.01}
                  placeholder='Fecha final'
                  label='Fecha final'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Button type='submit' className='w-full absolute bottom-0'>
            Aplicar
          </Button>
        </form>
      </Filters>
      <div className='mt-6'>
        <Cards title="balance" data={data.metrics} />
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div id="fiona-chart_incomes" className='bg-white'>
          <Typography variant='p' className='px-4 pt-4'>
            Ingresos
          </Typography>
          <div className='flex items-center justify-center'>
            <PieChart
              width={340}
              height={340}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Pie
                data={data.incomes}
                dataKey='amount'
                nameKey='category'
                cx='50%'
                cy='50%'
              >
                {data.expensives &&
                  data.expensives.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  return formatCurrency.format(Number(value));
                }}
              />
            </PieChart>
          </div>
        </div>
        <div id="fiona-chart_expensives" className='bg-white'>
          <Typography variant='p' className='px-4 pt-4'>
            Egresos
          </Typography>
          <div className='flex items-center justify-center'>
            <PieChart
              width={340}
              height={340}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <Pie
                data={data.expensives}
                dataKey='amount'
                nameKey='category'
                cx='50%'
                cy='50%'
              >
                {data.expensives &&
                  data.expensives.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
              </Pie>
              <Tooltip
                formatter={(value) => {
                  return formatCurrency.format(Number(value));
                }}
              />
            </PieChart>
          </div>
        </div>
      </div>
      <div id="fiona-chart_balances" className='mt-6 bg-white'>
        <Typography variant='p' className='p-4'>
          Balance
        </Typography>
        <ResponsiveContainer minWidth={300} aspect={3.25}>
          <AreaChart
            data={data.balances}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='date' />
            <YAxis
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$ ${value / 1000000}M`;
                } else if (value >= 1000) {
                  return `$ ${value / 1000}K`;
                }
                return value;
              }}
            />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip
              formatter={(value) => {
                return [formatCurrency.format(Number(value)), 'Balance'];
              }}
            />
            <Area
              type='monotone'
              dataKey='amount'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorUv)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div id="fiona-list_cash" className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <ListItems
          title='Movimientos por grupo'
          data={data.group_expensive}
          variant='modal'
          onClickModal={getMovementsGroup}
          dataModal={listMovements}
        />
        <ListItems
          title='Lista de ingresos'
          data={data.list_incomes}
          variant='modal'
          onClickModal={getMovements}
          dataModal={listMovements}
        />
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <ListItems
          title='Lista de egresos'
          data={data.list_expensives}
          variant='modal'
          onClickModal={getMovements}
          dataModal={listMovements}
        />
        <ListItems
          title='Utilización de tarjeta de crédito'
          data={data.credit_carts}
          variant='utilization'
        />
        <ListItems
          title='Presupuesto'
          data={data.budget}
          variant='utilization'
        />
      </div>
    </div>
  );
}
