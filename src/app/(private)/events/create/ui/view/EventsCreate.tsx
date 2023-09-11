import { Controller } from 'react-hook-form';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/navigation';

//components
import useComponents from '@/share/components';

// Helpers
import { formatCurrency } from "@/share/helpers";


const EventsCreate = (props: any) => {
  const router = useRouter();
  const { Typography, Button, Input, FormControl } = useComponents();

  const { handleSubmit, onSubmit, control, title, listMovements } = props;

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
        </div>
      </div>
      <div className='mt-6 bg-white w-full px-6 py-4 max-w-[640px] mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
          <Controller
            name={'name'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='text'
                  placeholder='Nombre del evento'
                  label='Nombre del evento'
                  id='name'
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
            name={'end_event'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <Input
                  type='date'
                  placeholder='Fin evento'
                  label='Fin evento'
                  id='end_event'
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
      {!!listMovements && <Typography variant="h2" className="my-4">Movimientos</Typography>}
      <div className="mt-6 bg-white rounded shadow-sm max-h-[65vh] overflow-y-auto">
        {listMovements && listMovements.map((movement: any) => (
          <div className="border-b border-gray-300 py-2 px-1" key={movement.id}>
            <div className="flex justify-between items-center">
              <div className="font-bold">{movement.category.name}</div>
              <div
                className={
                  movement.amount > 0 ? "text-green-500" : "text-red-500"
                }
              >
                {formatCurrency.format(movement.amount)}
              </div>
            </div>
            <div className="flex justify-between items-center pb-1">
              <Typography>{movement.date_purchase}</Typography>
              <Typography>{movement.account?.name}</Typography>
            </div>
            {movement.description && (
              <div className="border-t pt-1">
                <Typography variant="h5">{movement.description}</Typography>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsCreate;
