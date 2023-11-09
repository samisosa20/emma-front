import { Controller } from 'react-hook-form';
import { MdArrowBack, MdDeleteOutline } from 'react-icons/md';
import { useRouter } from 'next/navigation';

//components
import useComponents from '@/share/components';

export default function BudgetCreate(props: any) {
  const router = useRouter();
  const { Typography, Button, Input, FormControl, Select, AutoComplete } =
    useComponents();

  const {
    handleSubmit,
    onSubmit,
    control,
    title,
    currencyOptions = [],
    handleDelete,
    periodsOptions = [],
    listCategories = [],
  } = props;

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
            {handleDelete && (
              <Button
                onClick={handleDelete}
                className='flex items-center space-x-2 bg-red-500 hover:bg-red-300 p-2 rounded shadow-sm text-white'
              >
                <MdDeleteOutline />
                <Typography className='text-white'>Eliminar</Typography>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto'>
        <form
          id='form-investment'
          key={1}
          onSubmit={handleSubmit(onSubmit)}
          className='w-full'
        >
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
            name={'period_id'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Select
                  label='Periodo'
                  placeholder='Seleciona una opcion'
                  id='period_id'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  options={periodsOptions}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <Controller
            name={'year'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='number'
                  min='2000'
                  step='1'
                  placeholder='Año'
                  label='Año'
                  id='year'
                  onChange={(e) => {
                    onChange(e);
                  }}
                  iserror={!!fieldState.error}
                  value={value}
                />
              </FormControl>
            )}
          />
          <div className='text-center'>
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
