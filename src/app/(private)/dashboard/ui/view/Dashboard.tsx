import { Controller } from 'react-hook-form';

//components
import useComponents from '@/share/components';
import useComponentsLayout from '@/app/(private)/components';

export default function Dashboard(props: any) {
  const { data, currencyOptions = [], control, onSubmit, handleSubmit } = props;
  const { Typography, Input, Select, FormControl, Button } = useComponents();
  const { Cards, ListItems, Filters } = useComponentsLayout();

  return (
    <div>
      <Typography variant='h1'>Dashboard</Typography>
      <Typography>Aca podras ver tu informacion consolidada</Typography>
      <Filters>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name={'badge_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Moneda'
                  placeholder='Seleciona una opcion'
                  id='badge_id'
                  onChange={(e) => {
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
          <Button type="submit" className="w-full absolute bottom-0">
            Aplicar
          </Button>
        </form>
      </Filters>
      <div className='mt-6'>
        <Cards data={data.metrics} />
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <ListItems title='Movimientos por grupo' data={data.group_expensive} />
        <ListItems title='Lista de ingresos' data={data.list_incomes} />
      </div>
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <ListItems
          title='Lista de egresos'
          data={data.list_expensives}
          variant='modal'
        />
        <ListItems
          title='Utilización de tarjeta de crédito'
          data={data.credit_carts}
          variant='utilization'
        />
      </div>
    </div>
  );
}
