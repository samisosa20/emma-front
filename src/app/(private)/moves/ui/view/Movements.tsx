import { MdDeleteOutline } from 'react-icons/md';
import { Controller } from 'react-hook-form';

//components
import useComponents from '@/share/components';

export default function Movements(props: any) {
  const {
    handleSubmit,
    onSubmit,
    control,
    listAccounts,
    listCategories,
    listEvents,
    listInvestments,
    title,
    handleDelete,
    typeWatch,
    accountEndWatch,
    accountWatch,
  } = props;
  const { Typography, FormControl, Input, Button, RadioGroup, AutoComplete } =
    useComponents();

  return (
    <div>
      <div>
        <div className='flex items-center justify-between w-full'>
          <div>
            <Typography variant='h1'>{title}</Typography>
            {!handleDelete && (
              <Typography>
                Agrega un movimiento o transfiere de una cuenta a otra
              </Typography>
            )}
          </div>
          <div>
            {handleDelete && (
              <Button
                onClick={handleDelete}
                className='flex items-center space-x-2 bg-red-500 p-2 rounded shadow-sm text-white'
              >
                <MdDeleteOutline />
                <Typography className='text-white'>Eliminar</Typography>
              </Button>
            )}
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
                    },
                  ]}
                  handleRadioChange={(e: any) => {
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
                  onChange={(e: any) => {
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
            name={'account'}
            control={control}
            render={({ field: { onChange, onBlur, value }, fieldState }) => (
              <FormControl fieldState={fieldState} withLabel={true}>
                <AutoComplete
                  label={typeWatch !== '0' ? 'Cuenta' : 'Cuenta saliente'}
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
          {typeWatch !== '0' ? (
            <>
              <Controller
                name={'category'}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
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
                name={'event'}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <AutoComplete
                      label='Evento'
                      placeholder='Seleciona una opcion'
                      handleOnChange={(e: any) => {
                        onChange(e);
                      }}
                      options={listEvents}
                      iserror={!!fieldState.error}
                      value={value}
                    />
                  </FormControl>
                )}
              />
              <Controller
                name={'investment'}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <AutoComplete
                      label='Inversion'
                      placeholder='Seleciona una opcion'
                      handleOnChange={(e: any) => {
                        onChange(e);
                      }}
                      options={listInvestments}
                      iserror={!!fieldState.error}
                      value={value}
                    />
                  </FormControl>
                )}
              />
            </>
          ) : (
            <>
              <Controller
                name={'account_end'}
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState,
                }) => (
                  <FormControl fieldState={fieldState} withLabel={true}>
                    <AutoComplete
                      label='Cuenta destino'
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
              {accountEndWatch && accountWatch && accountEndWatch.badge_id !== accountWatch.badge_id && (
                <Controller
                  name={'amount_end'}
                  control={control}
                  render={({
                    field: { onChange, onBlur, value },
                    fieldState,
                  }) => (
                    <FormControl fieldState={fieldState} withLabel={true}>
                      <Input
                        type='number'
                        placeholder='Monto recibido'
                        label='Monto recibido'
                        id='amount_end'
                        step='0.01'
                        min='0'
                        onChange={(e: any) => {
                          onChange(e);
                        }}
                        iserror={!!fieldState.error}
                        value={value}
                      />
                    </FormControl>
                  )}
                />
              )}
            </>
          )}
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
