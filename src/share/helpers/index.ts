import {
  MdAttachMoney,
  MdWallet,
  MdEventNote,
} from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GoHomeFill } from "react-icons/go";
import * as PiIcons from "react-icons/pi";
import { addWeeks, endOfISOWeek, startOfISOWeek, format } from "date-fns";

export * from "./driver";

export const formatCurrency = new Intl.NumberFormat("es-US", {
  style: "currency",
  currency: "USD",
});

export function isLogin() {
  const user = localStorage.getItem("fiona-user");
  if (!user) {
    localStorage.removeItem("fiona-user");
    return false;
  }
  return true;
}

export function customConfigHeader() {
  const user = localStorage.getItem("fiona-user");
  if (user)
    return {
      headers: {
        Authorization: `Bearer ${JSON.parse(user).token}`,
      },
    };
}

export function getDateString(date?: string) {
  const currentDate = date ? new Date(date) : new Date();
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
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration && registration.active) {
        registration.showNotification("¡PWA añadida!", {
          body: "La PWA ha sido añadida a tu pantalla de inicio.",
          icon: "/icon.png", // Reemplaza con la URL de tu ícono
        });
      } else {
        alert(
          "No se pudo encontrar un Service Worker activo. Asegúrate de que la PWA se está ejecutando."
        );
      }
    });
  } else {
    alert(
      "La funcionalidad de Service Worker o Push no está habilitada en este navegador."
    );
  }
}

export function handleAddToHomeScreen() {
  if ("beforeinstallprompt" in window) {
    const beforeInstallPromptEvent = new Event("beforeinstallprompt");
    window.dispatchEvent(beforeInstallPromptEvent);
  }
}

export function handleGoToWpp() {
  window.open(
    `https://chat.whatsapp.com/${process.env.NEXT_PUBLIC_LINK_WHATSAPP}`,
    "blank"
  );
}

export const links = [
  {
    name: "Cuentas",
    link: "/accounts",
    show: true,
    icon: "account_balance_wallet",
    mobile: false,
  },
  {
    name: "Eventos",
    link: "/events",
    show: true,
    icon: "event",
    mobile: false,
  },
  {
    name: "Inversiones",
    link: "/investments",
    show: true,
    icon: "candlestick_chart",
    mobile: true,
  },
  {
    name: "Presupuesto",
    link: "/budgets",
    show: true,
    icon: "savings",
    mobile: true,
  },
  {
    name: "Patrimonio",
    link: "/heritages",
    show: true,
    icon: "money_bag",
    mobile: true,
  },
  {
    name: "Categorías",
    link: "/categories",
    show: true,
    icon: "category",
    mobile: false,
  },
  {
    name: "Pagos",
    link: "/payments",
    show: true,
    icon: "receipt_long",
    mobile: true,
  },
  {
    name: "Experimentos",
    link: "/tools",
    show: true,
    icon: "experiment",
    mobile: true,
  },
  {
    name: "Descargar App",
    link: false,
    show: false,
    icon: "download",
    mobile: true,
    onClick: handleAddToHomeScreen,
  },
  {
    name: "Unirse a whatsapp",
    link: false,
    show: false,
    icon: "work",
    mobile: true,
    onClick: handleGoToWpp,
  },
  {
    name: "Soporte",
    link: "/support",
    show: false,
    icon: "support",
    mobile: false,
  },
  {
    name: "Blogs",
    link: "/blogs",
    show: false,
    icon: "book",
    mobile: false,
  },
];

export const linksMobile = [
  {
    id: "home",
    name: "Home",
    link: "/dashboard",
    show: true,
    icon: GoHomeFill,
  },
  {
    id: "accounts",
    name: "Cuentas",
    link: "/accounts",
    show: true,
    icon: MdWallet,
  },
  {
    id: "moves",
    name: null,
    link: "/moves",
    show: true,
    icon: MdAttachMoney,
  },
  {
    id: "categories",
    name: "Categorías",
    link: "/categories",
    show: true,
    icon: BiSolidCategoryAlt,
    mobile: false,
  },
  {
    id: "events",
    name: "Eventos",
    link: "/events",
    show: true,
    icon: MdEventNote,
    mobile: false,
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
  "#CC6633",
];

export const getCurrencyFormatter = (
  badgeCode: string = "USD",
  value: number
) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
  }).format(value);
};

export function getIconComponent(name: string): React.ElementType {
  return PiIcons[name as keyof typeof PiIcons] || PiIcons["PiAcorn"];
}

export const isEmptyObject = (obj: any) => {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
};
/**
 * Devuelve el rango de fechas (inicio - fin) de una semana ISO dada.
 * @param year El año (por ejemplo, 2025)
 * @param weekNumber La semana ISO (por ejemplo, 1)
 * @returns Un string como "01/01 - 07/01"
 */
export function getWeekDateRange(year: number, weekNumber: number): string {
  // Empieza desde la semana 1 del año (semana que contiene el 4 de enero)
  const firstWeekStart = startOfISOWeek(new Date(year, 0, 4)); // ISOWeek 1 empieza desde aquí
  const weekStart = addWeeks(firstWeekStart, weekNumber - 1);
  const weekEnd = endOfISOWeek(weekStart);

  return `${format(weekStart, "dd/MM")} - ${format(weekEnd, "dd/MM")}`;
}

export const listEventTypes = [
  { 
    value: "travel", 
    label: "Viaje", 
    bgColor: "#E3F2FD",
    textColor: "#1976D2" 
  },
  { 
    value: "school", 
    label: "Estudio", 
    bgColor: "#F3E5F5",
    textColor: "#7B1FA2" 
  },
  { 
    value: "home_repair_service", 
    label: "Proyecto", 
    bgColor: "#E8F5E9",
    textColor: "#2E7D32" 
  },
  { 
    value: "celebration", 
    label: "Fiesta", 
    bgColor: "#FFF3E0",
    textColor: "#E65100" 
  },
  { 
    value: "work", 
    label: "Trabajo", 
    bgColor: "#EFEBE9",
    textColor: "#5D4037" 
  },
  { 
    value: "health_cross", 
    label: "Salud", 
    bgColor: "#FFEBEE",
    textColor: "#C62828" 
  },
  { 
    value: "event", 
    label: "Otro", 
    bgColor: "#ECEFF1",
    textColor: "#455A64" 
  },
];

export const listAccountTypes = [
  {
    value: "General",
    label: "General",
    icon: "payments",
    bgColor: "#E3F2FD",
    textColor: "#1565C0",
  },
  {
    value: "Cuenta de ahorro",
    label: "Cuenta de ahorro",
    icon: "savings",
    bgColor: "#E8F5E9",
    textColor: "#2E7D32",
  },
  {
    value: "Tarjeta de credito",
    label: "Tarjeta de crédito",
    icon: "credit_card",
    bgColor: "#FFF3E0",
    textColor: "#E65100",
  },
  {
    value: "Inversion",
    label: "Inversión",
    icon: "show_chart",
    bgColor: "#F3E5F5",
    textColor: "#7B1FA2",
  },
  {
    value: "Credito",
    label: "Crédito",
    icon: "account_balance",
    bgColor: "#FFEBEE",
    textColor: "#C62828",
  },
  {
    value: "Efectivo",
    label: "Efectivo",
    icon: "account_balance_wallet",
    bgColor: "#ECEFF1",
    textColor: "#455A64",
  },
];

export const getAccountType = (typeName: string) =>
  listAccountTypes.find((t) => t.value === typeName) ??
  listAccountTypes[listAccountTypes.length - 1];