import Link from "next/link";
//components
import useComponents from '@/share/components';
import useComponentsLayout from '../components';

const Accounts = () => {
  const { Typography } = useComponents();
  const { Cards } = useComponentsLayout();

  const formatoMoneda = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
  });

  const data = [
    {
      title: 'Balance del mes actual',
      values: ['9.891.590,00 COP', '-523,56 USD'],
    },
    {
      title: 'Balance del año actual',
      values: ['9.891.590,00 COP', '856,52 USD'],
    },
    {
      title: 'Balance total',
      values: ['9.891.590,00 COP', '1.026,22 USD'],
    },
  ];

  const accounts = [
    {
        "id": 1,
        "name": "Efectivo",
        "description": "dsfgsdfgsdfgsdf",
        "badge_id": 1,
        "init_amount": 52000,
        "limit": "0.00",
        "type_id": 1,
        "created_at": "2020-03-02 03:09:00",
        "updated_at": "2023-08-30 19:15:39",
        "deleted_at": null,
        "balance": 18000,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 2,
        "name": "Itau",
        "description": null,
        "badge_id": 1,
        "init_amount": 121726,
        "limit": null,
        "type_id": 2,
        "created_at": "2020-03-03 00:12:00",
        "updated_at": "2023-05-02 00:46:26",
        "deleted_at": null,
        "balance": 55469.07,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 3,
        "name": "Nequi",
        "description": null,
        "badge_id": 1,
        "init_amount": 10964,
        "limit": null,
        "type_id": 2,
        "created_at": "2020-03-03 02:55:00",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": null,
        "balance": 420578,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 4,
        "name": "Fiducuenta",
        "description": null,
        "badge_id": 1,
        "init_amount": 857636,
        "limit": null,
        "type_id": 4,
        "created_at": "2020-03-12 16:33:03",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": null,
        "balance": 15399368.35,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 5,
        "name": "iTPM",
        "description": null,
        "badge_id": 1,
        "init_amount": 70300,
        "limit": null,
        "type_id": 4,
        "created_at": "2020-03-19 02:19:00",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": null,
        "balance": 539661.5,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 6,
        "name": "Renta Balanceado",
        "description": null,
        "badge_id": 1,
        "init_amount": 0,
        "limit": null,
        "type_id": 4,
        "created_at": "2020-05-08 14:08:52",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": "2023-04-21 00:00:00",
        "balance": 1,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 7,
        "name": "Tarjeta credito",
        "description": null,
        "badge_id": 1,
        "init_amount": 0,
        "limit": "18000000.00",
        "type_id": 3,
        "created_at": "2020-06-21 17:20:44",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": null,
        "balance": -1975927,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 8,
        "name": "Libre inversion",
        "description": null,
        "badge_id": 1,
        "init_amount": -2003676,
        "limit": null,
        "type_id": 6,
        "created_at": "2020-10-17 11:58:24",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": "2023-04-21 00:00:00",
        "balance": 2567337.32,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 9,
        "name": "MIT",
        "description": null,
        "badge_id": 1,
        "init_amount": 0,
        "limit": null,
        "type_id": 4,
        "created_at": "2021-12-16 16:17:00",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": "2023-04-21 00:00:00",
        "balance": 601.72,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 10,
        "name": "Utoppia",
        "description": null,
        "badge_id": 2,
        "init_amount": 48,
        "limit": null,
        "type_id": 2,
        "created_at": "2023-01-06 15:18:00",
        "updated_at": "2023-05-02 00:47:12",
        "deleted_at": null,
        "balance": 3028.22,
        "currency": {
            "id": 2,
            "code": "USD",
            "name": "Dolar Americano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 11,
        "name": "AFC",
        "description": null,
        "badge_id": 1,
        "init_amount": 0,
        "limit": null,
        "type_id": 5,
        "created_at": "2023-02-24 14:16:00",
        "updated_at": "2023-04-21 05:00:00",
        "deleted_at": null,
        "balance": 100404.13,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    },
    {
        "id": 19,
        "name": "Triirenta",
        "description": null,
        "badge_id": 1,
        "init_amount": 0,
        "limit": "0.00",
        "type_id": 4,
        "created_at": "2023-08-07 08:51:00",
        "updated_at": "2023-08-07 08:51:00",
        "deleted_at": null,
        "balance": 63090,
        "currency": {
            "id": 1,
            "code": "COP",
            "name": "Peso Colombiano",
            "created_at": "2023-04-18T20:00:00.000000Z",
            "updated_at": "2023-04-18T20:00:00.000000Z",
            "deleted_at": null
        }
    }
]
  return (
    <div>
      <Typography variant='h1'>Cuentas</Typography>
      <Typography>Listado de cuentas</Typography>
      <div className='mt-6'>
        <Cards data={data} />
      </div>
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6`}
      >
        {accounts.map(account => <Link href={`/accounts/${account.id}`}>
          <div className='bg-white rounded shadow-sm p-4'>
            <div className='flex items-center justify-between'>
              <Typography variant='h2'>{account.name}</Typography>
              <Typography variant='p'>{account.currency.code}</Typography>
            </div>
              <Typography variant='h6' className="h-[40px]">{account.description}</Typography>
              <Typography variant='p' className={`text-right ${
                account.balance + account.init_amount >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>{formatoMoneda.format(account.balance + account.init_amount)}</Typography>
          </div>
        </Link>)}
      </div>
    </div>
  );
};

export default Accounts;
