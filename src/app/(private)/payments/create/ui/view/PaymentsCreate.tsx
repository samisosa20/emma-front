import { Controller } from 'react-hook-form';
import { MdArrowBack, MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from "@/share/helpers";


export default function PaymentsCreate(props: any) {
  const router = useRouter();
  const { Typography, Button, Input, FormControl, AutoComplete } = useComponents();

  const { handleSubmit, onSubmit, control, title, handleDelete, listAccounts, listCategories } = props;

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center space-x-2'>
            <div onClick={() => router.back()}>
              <MdArrowBack />
            </div>
            <Typography variant='h1'>{title}</Typography>
          </div>
          <div>
            {handleDelete && <Button
              onClick={handleDelete}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-300 p-2 rounded shadow-sm text-white"
            >
              <MdDeleteOutline />
              <Typography className="text-white">Eliminar</Typography>
            </Button>}
          </div>
        </div>
      </div>
      <div className='mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Controller
            name={'account'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <AutoComplete
                  label='Cuenta'
                  placeholder='Seleciona una opcion'
                  handleOnChange={(e: any) => {
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
            name={'category'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <AutoComplete
                  label='Categoria'
                  placeholder='Seleciona una opcion'
                  handleOnChange={(e: any) => {
                    onChange(e);
                  }}
                  options={listCategories}
                  iserror={!!fieldState.error}
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
          <Controller
            name={'start_date'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='date'
                  placeholder='Fecha de inicio'
                  label='Fecha de inicio'
                  id='start_date'
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
                  placeholder='Fecha final'
                  label='Fecha final'
                  id='end_date'
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
            name={'specific_day'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='number'
                  placeholder='Dia de la transaccion'
                  label='Dia de la transaccion'
                  id='specific_day'
                  step='1'
                  min='1'
                  max='31'
                  defaultValue={1}
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
};
