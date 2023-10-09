import Link from 'next/link';
import { MdAddCircleOutline } from 'react-icons/md';
import { Controller } from 'react-hook-form';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from '@/share/helpers';

type EventList = {
  id: number;
  name: string;
  balance: { movements: number; currency: string }[];
};

export default function Movements(props: any) {
  const { handleSubmit, onSubmit, control, currencyOptions, title, listAccounts } = props;
  const { Typography, FormControl, Input, Select, Button, RadioGroup } = useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>{title}</Typography>
            <Typography>Agrega un movimiento o transfiere de una cuenta a otra</Typography>
          </div>
        </div>
      </div>
      <div className='mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Controller
            name={'type'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <RadioGroup
                  name='type'
                  label='Tipo de movimiento'
                  options={[
                    {
                      label: 'Ingreso',
                      value: '1',
                    },
                    {
                      label: 'Egreso',
                      value: '-1',
                    },
                    {
                      label: 'Transferencia',
                      value: '0',
                    }
                  ]}
                  handleRadioChange={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'amount'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='number'
                  placeholder='Monto'
                  label='Monto'
                  id='amount'
                  step='0.01'
                  min='0'
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
            name={'date_purchase'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='datetime-local'
                  placeholder='Fecha'
                  label='Fecha'
                  id='date_purchase'
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
            name={'account_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Cuenta'
                  placeholder='Seleciona una opcion'
                  id='account_id'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  options={listAccounts}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'category_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Categoria'
                  placeholder='Seleciona una opcion'
                  id='category_id'
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
            name={'event_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Evento'
                  placeholder='Seleciona una opcion'
                  id='event_id'
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
            name={'investment_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Inversion'
                  placeholder='Seleciona una opcion'
                  id='investment_id'
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
            name={'description'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='text'
                  placeholder='Descripcion'
                  label='Descripcion'
                  id='description'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className="text-center">
            <Button
              type='submit'
              className='mt-8 col-span-2 w-full lg:w-[350px]'
            >
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
