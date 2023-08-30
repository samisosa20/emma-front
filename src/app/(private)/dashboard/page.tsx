//components
import useComponents from '@/components';
import useComponentsLayout from "../components";

const Dashboard = () => {
  const { Typography } = useComponents();
  const { Cards, ListItems } = useComponentsLayout();

  const data = [
    {
      title: 'Balance inicial',
      values: ['9.891.590,00']
    },
    {
      title: 'Ingresos',
      values: ['9.891.590,00']
    },
    {
      title: 'Egresos',
      values: ['9.891.590,00']
    },
    {
      title: 'Balance final',
      values: ['9.891.590,00']
    }
  ]
  const dataList = [
    {
      title: 'Ingresos',
      value: 12546526
    },
    {
      title: 'Gastos Fijos',
      value: -12546526
    },
    {
      title: 'Gastos Personales',
      value: -12546526
    },
    {
      title: 'Ahorros',
      value: 12546526
    }
  ]
  return (
    <div>
      <Typography variant='h1'>Dashboard</Typography>
      <Typography>Aca podras ver tu informacion consolidada</Typography>
      <div className="mt-6">
        <Cards data={data}/>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ListItems title='Movimientos por grupo' data={dataList}/>
        <ListItems title='Lista de ingresos' data={dataList}/>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <ListItems title='Lista de egresos' data={dataList} variant='modal'/>
        <ListItems title='Utilización de tarjeta de crédito' data={dataList} variant="utilization"/>
      </div>
    </div>
  );
};

export default Dashboard;
