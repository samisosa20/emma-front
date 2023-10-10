import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdEventNote,
  MdOutlineStackedLineChart,
  MdAccountBalance,
  MdOutlinePayment,
  MdOutlineCategory,
} from 'react-icons/md';

export const formatCurrency = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
});

export function isLogin() {
  const user = localStorage.getItem('user');
  if (!user) {
    localStorage.clear();
    return false
  }
  return true
}

export function customConfigHeader() {
  const user = localStorage.getItem('user');
  if (user)
    return {
      headers: {
        Authorization: `Bearer ${JSON.parse(user).token}`,
      },
    };
}

export function getDateString() {
  const currentDate = new Date();
  const timeZoneOffsetMinutes = currentDate.getTimezoneOffset();

  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffsetMinutes);

  return currentDate.toISOString().slice(0, 16);
}

export function formatDateISOToYMDHIS(dateStr: string) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const links = [
  {
    name: 'Cuentas',
    link: '/accounts',
    show: true,
    icon: MdAccountBalanceWallet,
  },
  {
    name: 'Eventos',
    link: '/events',
    show: true,
    icon: MdEventNote,
  },
  {
    name: 'Inversiones',
    link: '/investments',
    show: true,
    icon: MdOutlineStackedLineChart,
  },
  {
    name: 'Presupuesto',
    link: '/budgets',
    show: false,
    icon: MdAttachMoney,
  },
  {
    name: 'Patrimonio',
    link: '/heritages',
    show: true,
    icon: MdAccountBalance,
  },
  {
    name: 'Categorias',
    link: '/categories',
    show: true,
    icon: MdOutlineCategory,
  },
  {
    name: 'Pagos',
    link: '/payments',
    show: false,
    icon: MdOutlinePayment,
  },
];