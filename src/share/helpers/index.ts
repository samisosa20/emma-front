import {
  MdAttachMoney,
  MdAccountBalanceWallet,
  MdEventNote,
  MdOutlineStackedLineChart,
  MdAccountBalance,
  MdOutlinePayment,
  MdOutlineCategory,
  MdDownload,
  MdAutoFixHigh,
  MdGroupWork
} from 'react-icons/md';

export * from "./driver"
export * from "./pwa"

export const formatCurrency = new Intl.NumberFormat('es-US', {
  style: 'currency',
  currency: 'USD',
});

export function isLogin() {
  const user = localStorage.getItem('emma-user');
  if (!user) {
    localStorage.removeItem("emma-user");
    return false
  }
  return true
}

export function customConfigHeader() {
  const user = localStorage.getItem('emma-user');
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

function handleSendNotification() {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.active) {
        registration.showNotification('¡PWA añadida!', {
          body: 'La PWA ha sido añadida a tu pantalla de inicio.',
          icon: '/icon.png', // Reemplaza con la URL de tu ícono
        });
      } else {
        alert('No se pudo encontrar un Service Worker activo. Asegúrate de que la PWA se está ejecutando.');
      }
    });
  } else {
    alert('La funcionalidad de Service Worker o Push no está habilitada en este navegador.');
  }
};

export function handleAddToHomeScreen() {
  if ('beforeinstallprompt' in window) {
    const beforeInstallPromptEvent = new Event('beforeinstallprompt');
    window.dispatchEvent(beforeInstallPromptEvent);
  }
};

export function handleGoToWpp() {
  window.open(`https://chat.whatsapp.com/${process.env.NEXT_PUBLIC_LINK_WHATSAPP}`, 'blank')
};


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
    show: true,
    icon: MdAttachMoney,
  },
  {
    name: 'Patrimonio',
    link: '/heritages',
    show: true,
    icon: MdAccountBalance,
  },
  {
    name: 'Categorías',
    link: '/categories',
    show: true,
    icon: MdOutlineCategory,
  },
  {
    name: 'Pagos',
    link: '/payments',
    show: true,
    icon: MdOutlinePayment,
  },
  {
    name: 'Herramientas',
    link: '/tools',
    show: true,
    icon: MdAutoFixHigh,
  },
  {
    name: 'Descargar App',
    link: false,
    show: false,
    icon: MdDownload,
    onClick: handleAddToHomeScreen
  },
  {
    name: 'Unirse a whatsapp',
    link: false,
    show: false,
    icon: MdGroupWork,
    onClick: handleGoToWpp
  },
];

export const colors = [
  "#36A2EB",
  "#FF6384",
  "#4BC0C0",
  "#FF9F40",
  "#9966FF",
  "#FFCD56",
  "#C9CBCF",
  "#33FFFF",
  "#9900FF",
  "#FFFF33",
  "#0099FF",
  "#FF33CC",
  "#33CCFF",
  "#CC33FF",
  "#FFCC33",
  "#33FFCC",
  "#CC33CC",
  "#66FF33",
  "#33FF66",
  "#CC6633"
];