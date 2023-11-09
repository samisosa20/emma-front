import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export function driverWelcome() {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: window.innerWidth < 1000 ? "#fiona-logo-header" : "#fiona-logo-aside",
        popover: {
          title: "Bienvenid@ a FIONA",
          description:
            "Te dare un recorrido por toda la app, puedes salir del tour cuando tu quieras, Da clic aqui para volver al dashboard.",
          align: "start",
        },
      },
      {
        element: window.innerWidth < 1000 ? "#fiona-menu-mobile" : "aside ul",
        popover: {
          title: "Navegacion",
          description: "Usa las opciones de aca para navegar a otras opciones.",
          align: "start",
          onNextClick:  () => {
            // .. load element dynamically
            // .. and then call
            if(window.innerWidth < 1000) {
              driverObj.moveTo(3);
            } else {
              driverObj.moveNext()
            }
          }
        },
      },
      {
        element:  "#fiona-profile-aside",
        popover: {
          title: "Perfil",
          description:
            "Ingresa aca para cambiar tu informacion de perfil y cerrar sesion",
          align: "start",
        },
      },
      {
        element: "#fiona-btn_movements",
        popover: {
          title: "Movimientos",
          description:
            "Para reportar un ingreso, un gasto o mover plata de una cuenta a otra dale clic aqui.",
          align: "start",
        },
      },
      {
        element: "#fiona-btn_help",
        popover: {
          title: "Ayuda",
          description:
            "Para saber mas sobre cada section de la aplicacion dale clic a este icono.",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  });
  driverObj.drive();
  localStorage.setItem("fiona-doesntShow_help", '1')
}
export function driverDash() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Dashboard",
        popover: {
          title: "Dashboard",
          description:
            "En esta seccion podras ver tu resumen del mes en curso y con tu moneda por defecto.",
          align: "start",
        },
      },
      {
        element: "#fiona-filter",
        popover: {
          title: "Filtros",
          description:
            "Has clic aqui para agregar filtros, como: cambiar la moneda, rango de fecha. Esto es util para ver como vas en el año o como te fue en un mes en especifico",
          align: "start",
        },
      },
      {
        element: "#fiona-card_balance",
        popover: {
          title: "Balance",
          description:
            "Aca veras con cuanta plata comenzaste el periodo, cuanto te ingreso, cuanto gastaste y con cuanto terminaste.",
          align: "start",
        },
      },
      {
        element: "#fiona-chart_incomes",
        popover: {
          title: "Grafico Ingresos",
          description:
            "En esta parte veras un grafico de torta para enteder que fuente de ingreso aporta mas, dale clic al color para tener mas detalle",
          align: "start",
        },
      },
      {
        element: "#fiona-chart_expensives",
        popover: {
          title: "Grafico Egresos",
          description:
            "En esta parte veras un grafico de torta para enteder que gasto impacta mas, dale clic al color para tener mas detalle",
          align: "start",
        },
      },
      {
        element: "#fiona-chart_balances",
        popover: {
          title: "Grafico Balance",
          description:
            "En esta parte veras un grafico de linea que mostrara tu balance dia dia, y entender si en que momentos aumenta y en que momentos disminuye",
          align: "start",
        },
      },
      {
        element: "#fiona-list_cash",
        popover: {
          title: "Listado",
          description:
            "Por ultimo, aca podras ver en forma de listado el total por categoria, para saber mas dale clic a cada categoria para ver los movimientos",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverAccount() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Cuentas",
        popover: {
          title: "Cuentas",
          description:
            "En esta seccion podras ver todas tus cuentas, se considera una cuenta todo lugar donde manejes dinero, ej: Efectivo, cuenta de ahorros, CDT, TC, etc.",
          align: "start",
        },
      },
      {
        element: "#fiona-card_balance",
        popover: {
          title: "Balance",
          description:
            "Aca veras tu balance de forma: mensual, anual y total.",
          align: "start",
        },
      },
      {
        element: "#fiona-search",
        popover: {
          title: "Buscador",
          description:
            "Aca puedes buscar una cuenta por su nombre, tambien ver las cuentas que estan activas e inactivas",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverEvent() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Eventos",
        popover: {
          title: "Eventos",
          description:
            "En esta seccion podras ver todas tus eventos, donde un evento se utiliza para saber cuanto te ingreso o cuanto te valio equis evento ej: paseo - 2023, aniversario - 2022",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverInvestment() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Inversiones",
        popover: {
          title: "Inversiones",
          description:
            "En esta seccion podras ver todas tus inversiones, lleva seguimiento de todas ts inversiones, cuanto rendimientos ha generado y su valorizacion",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverHeritage() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Patrimonio",
        popover: {
          title: "Patrimonio",
          description:
            "En esta seccion podras ver todas tus patimonio por año y por moneda, El patrimonio es la suma de todas tus Inverisones, Efectivo, Muebles e Inmuebles, Creditos. Dale clic a cada tarjeta para ver mas informacion",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverBudget() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Presupuestos",
        popover: {
          title: "Presupuestos",
          description:
            "En esta seccion podras ver todos los presupuestos creados por moneda y año, dale clic a cada presupuesto para ver el cumplimiento de cada categoria",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverCategory() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Categorias",
        popover: {
          title: "Categorias",
          description:
            "En esta seccion podras administrar tus categorias donde una categoria es para segmentar tus ingresos o gastos.",
          align: "start",
        },
      },
      {
        element: "#fiona-search",
        popover: {
          title: "Buscador",
          description:
            "Aca puedes buscar una categoria por su nombre, tambien ver las categorias que estan activas e inactivas",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverPayment() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Pagos",
        popover: {
          title: "Pagos",
          description:
            "En esta seccion podras ver todos tus pagos automaticos, si tienes ingresos periodicos o facturas que se pagan mensualmente, aca podras definir cuanto y cuando quieres que se haga ese movimiento.",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverTool() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-title_Herramientas",
        popover: {
          title: "Herramientas",
          description:
            "En esta seccion es para ayudarte a tomar decisiones concientes y razonables.",
          align: "start",
        },
      },
      {
        element: "#fiona-canido",
        popover: {
          title: "Puedo gastarme?",
          description:
            "Preguntame si puedes gastarte equis cantidad de dinero, esto te ayudara a saber que pasaria si te gastas ese dinero.",
          align: "start",
        },
      },
      {
        element: "#fiona-test_project",
        popover: {
          title: "Evaluacion de inversion",
          description:
            "Evalua si una inversion que piensas hacer se justifica o no.",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}

export function driverMovement() {
  driver({
    showProgress: true,
    steps: [
      {
        element: "#fiona-field_type",
        popover: {
          title: "Tipo de movimiento",
          description:
            "Selecciona que tipo de movimiento que piensas realizar, <b>Ingreso: </b> indica que te entro dinero, <b>Egreso: </b> indica que gastaste dinero y <b>Transferencia: </b> es para mover el dinero de una cuenta a otra.",
          align: "start",
        },
      },
      {
        element: "#amount",
        popover: {
          title: "Monto",
          description:
            "indica cuanta plata fue que te gastaste o te ingreso",
          align: "start",
        },
      },
      {
        element: "#date_purchase",
        popover: {
          title: "Fecha del movimiento",
          description:
            "Cuando fue que se hizo ese movimiento.",
          align: "start",
        },
      },
      {
        element: "#event",
        popover: {
          title: "Evento",
          description:
            "Indica si el movimiento pertenece algun evento, este campo es opcional.",
          align: "start",
        },
      },
      {
        element: "#investment",
        popover: {
          title: "Inversion",
          description:
            "Indica si el movimiento pertenece alguna inversion, Si selecionas una inversion indica si ese movimiento es porque fue un retiro/adicion/reinversion, este campo es opcional.",
          align: "start",
        },
      },
      {
        element: "#description",
        popover: {
          title: "Descripciones",
          description:
            "Usa este campo es para poder acordarte el porque se hizo ese movimiento, este campo es opcional.",
          align: "start",
        },
      },
    ],
    nextBtnText: "Siguiente →",
    prevBtnText: "← Atras",
  }).drive();
}