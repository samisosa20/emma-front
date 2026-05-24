# Antigravity Developer Agent Skills - Fiona Front (Finanzas Personales)

## Contexto de Negocio & Arquitectura de Dominio

**Fiona** es una aplicación de finanzas personales multidispositivo, optimizada como PWA (Progresive Web App) con soporte offline para registrar transacciones en movilidad. El sistema consolida la salud financiera del usuario mediante los siguientes módulos:

### Módulos de Negocio Core:

1. **Cuentas y Multi-divisa:** Gestión de múltiples cuentas financieras con soporte para diferentes monedas y tipos de cambio concurrentes.
2. **Eventos (Tags de Vida):** Etiquetado dinámico de movimientos vinculados a eventos específicos de la vida real (ej. vacaciones, mudanzas, proyectos) para un análisis agrupado del gasto.
3. **Inversiones (Rendimientos y Valorizaciones):** Monitoreo activo de activos financieros, cálculo de rendimientos, plusvalías y actualizaciones de valor en el tiempo.
4. **Patrimonio Consolidado:** Balance patrimonial global que combina de forma automática el inmovilizado (propiedades, vehículos) con los saldos de las cuentas y el estado de las inversiones.
5. **Presupuestos, Categorías y Pagos Periódicos:** Control de techos de gasto por categorías y automatización/proyección de gastos fijos recurrentes (suscripciones, facturas).
6. **Dashboard de Control:** Vista unificada con indicadores clave de rendimiento (KPIs) de ingresos, egresos, capacidad de ahorro y balances netos.

---

## Patrón de Arquitectura del Proyecto

El proyecto sigue principios de **Clean Architecture / Domain-Driven Design (DDD)** estructurado en las siguientes capas bajo `package/fiona`:

- `domain/`: Reglas de negocio puras, entidades, agregados y contratos de interfaces. Sin dependencias externas.
- `application/`: Casos de uso de la aplicación (ej. calcular balance de patrimonio, procesar transacciones periódicas). Orquesta los flujos de datos.
- `infrastructure/`: Implementaciones técnicas concretas. Clientes de API, persistencia local para PWA, integración con Better Auth y adaptadores de librerías.
- `src/app/` (Next.js App Router): Capa de presentación (UI). Contiene las pantallas, componentes modulares (`share`) y la lógica visual del cliente.

---

## Stack Técnico Core & Dependencias

### Core & Estado

- **Framework & Routing:** Next.js `^16.2.6` (React 19) usando App Router y Middleware nativo para la protección de rutas financieras.
- **Service Worker / PWA:** `@ducanh2912/next-pwa` coordinado con Workbox (`workbox-*.js`, `sw.js`) para estrategias de caché offline y almacenamiento local asíncrono de transacciones.
- **Estado Asíncrono:** TanStack Query `5.100.11` sincronizado mediante **Orval `8.11.0`** (`npm run orval`) desde el contrato OpenAPI de la arquitectura.
- **Estado Local de la UI:** Zustand `^5.0.13` para interactividad inmediata y modales de "Nueva transacción".

### Formularios & Estilos

- **Formularios Estrictos:** `react-hook-form` guiado por esquemas de **Zod `4.4.3`** para blindar la inserción de montos, divisas y datos patrimoniales.
- **Maquetación:** Tailwind CSS `^4.3.0` combinado con `@material-tailwind/react` y `tailwind-merge` para componentes visuales financieros adaptables a móviles.
- **Gráficas:** Recharts `3.8.1` para la analítica de patrimonio, inversiones e ingresos/egresos.

---

## Reglas de Arquitectura y Desarrollo para el Agente

1. **Respeto Estricto de Capas (DDD):** Al crear o modificar lógica, nunca mezcles código de UI (`src/app`) o fetches de infraestructura dentro de la capa de `domain`. Toda lógica de cálculo financiero complejo (como consolidar el patrimonio) debe nacer en un caso de uso dentro de `application`.
2. **Orval First:** No escribas servicios Axios manuales. Si necesitas un endpoint nuevo de transacciones o inversiones, asegúrate de que el backend tenga el endpoint expuesto, ejecuta la skill `npm run orval` y consume el hook autogenerado.
3. **Validación de Formularios:** Todo input monetario o de configuración de pagos periódicos debe estar estrictamente tipado y validado en el frontend con esquemas Zod antes de disparar la mutación de TanStack Query.
