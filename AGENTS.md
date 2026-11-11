# Fiona Frontend (`fiona-front`)

## 1. Contexto de Negocio & Propósito
**Fiona Frontend** es la aplicación cliente web y PWA (Progressive Web App) multidispositivo para el ecosistema de finanzas personales Fiona.
Está diseñada para ofrecer una experiencia fluida tanto en escritorio como en dispositivos móviles, permitiendo el registro ágil de transacciones, monitoreo de patrimonio consolidado, seguimiento de valorizaciones de inversiones, control de presupuestos y analítica visual de salud financiera.

### Módulos de Negocio Core:
1. **Cuentas y Multidivisa:** Gestión de cuentas financieras (bancarias, efectivo, tarjetas) con soporte para múltiples monedas y tipos de cambio concurrentes (TRM).
2. **Movimientos y Eventos (Tags de Vida):** Registro de ingresos, gastos y transferencias con categorización jerárquica y etiquetado por eventos reales (vacaciones, proyectos, mudanzas).
3. **Inversiones (Rendimientos y Valorizaciones):** Monitoreo de activos financieros, aportes, plusvalías y rendimiento histórico.
4. **Patrimonio Consolidado:** Balance patrimonial unificado que combina inmovilizados (inmuebles, vehículos) con los saldos de cuentas e inversiones.
5. **Presupuestos y Pagos Planificados:** Control de techos de gasto mensuales y proyección de pagos periódicos / suscripciones recurrentes.
6. **Dashboard Analítico:** Indicadores clave de rendimiento (KPIs), métricas de ahorro y distribución 50/30/20 con gráficos interactivos.

---

## 2. Patrón de Arquitectura: Clean Architecture / DDD
El código de lógica de negocio y presentación está desacoplado siguiendo arquitectura limpia:

### Capa de Negocio (`package/fiona/`):
- `domain/`: Entidades puras, contratos de interfaces y tipos de negocio. **Completamente independiente de React, UI y librerías externas**.
- `application/`: Casos de uso de la aplicación (ej. consolidar patrimonio, calcular porcentajes de presupuestos).
- `infrastructure/`: Adaptadores técnicos, clientes HTTP, sincronización offline para PWA y persistencia local.

### Capa de Presentación (`src/app/` - Next.js App Router):
- `(public)/`: Vistas públicas no autenticadas (Home, Login, Register).
- `(private)/`: Vistas autenticadas protegidas por sesión (Dashboard, Accounts, Budgets, Movements, Investments, Heritage, Reports).
- `src/share/`: Componentes compartidos reutilizables, stores globales con Zustand (`spaceStore`), proveedores de sesión (`SessionProvider`) y temas (`ThemeProvider`).

---

## 3. Stack Técnico Core
- **Framework & Routing:** Next.js `^16.4.6` con React `19.3.1` (App Router con Turbopack en desarrollo)
- **Compilador:** TypeScript `^7.0.2`
- **Soporte PWA / Offline:** `@ducanh2912/next-pwa` coordinado con Workbox (`sw.js`) para caché y resiliencia offline
- **Estado Asíncrono & Servidor:** TanStack Query `5.107.1` sincronizado automáticamente mediante **Orval `8.47.0`** (`npm run orval`) desde el contrato OpenAPI de `fiona -back`
- **Estado Local / UI:** Zustand `^5.1.0` para estado de navegación, modales y selección de espacios
- **Formularios & Validación:** `react-hook-form` con esquemas estrictos de **Zod `4.6.7`**
- **Estilos & UI:** Tailwind CSS `^4.3.5`, `@material-tailwind/react 2.1.10` y `tailwind-merge 3.7.0`
- **Visualización de Datos:** Recharts `3.10.1` para gráficas de balances, patrimonio e inversiones
- **Linter de Calidad:** `oxlint` (`.oxlintrc.json`), compatible nativamente con TypeScript 7 y reglas estándar de ESLint/React

---

## 4. Reglas Críticas para el Agente

1. **Orval First (Cero endpoints manuales)**:
   - Nunca escribas clientes Axios ni llamadas fetch manuales para consumir la API de Fastify.
   - Cuando se cree o cambie un endpoint en el backend, ejecuta `npm run orval` y consume exclusivamente los hooks autogenerados de TanStack Query (`useGetMovements`, `useCreateMovement`, etc.).
2. **Respeto Estricto de Capas**:
   - Nunca importes componentes de React ni hooks de UI dentro de `package/fiona/domain/`. La lógica de dominio debe permanecer pura y testeable.
3. **Validación Estricta de Formularios**:
   - Todo formulario monetario, de fechas o de configuración debe validarse mediante esquemas Zod con `zodResolver`.
   - Asocia los errores del backend devueltos en `fields` al formulario mediante `setError` de `react-hook-form`.
4. **Optimización para Recharts**:
   - Formatear siempre los arrays de datos antes de pasarlos a Recharts asegurando fechas legibles (usando `date-fns`) y valores numéricos limpios.
5. **Estrategia PWA & Offline**:
   - Al diseñar mutaciones (crear movimientos), considerar la persistencia local de transacciones en cola para sincronizar cuando se recupere la conexión a internet.
6. **Código Limpio (Linter)**:
   - No dejar imports huérfanos ni variables sin usar. Correr `npm run lint` para validar que el código esté limpio.

---

## 5. Comandos de Operación Diaria
- **Servidor de Desarrollo:** `npm run dev` (`next dev --turbopack`)
- **Verificación de Linter:** `npm run lint` (`oxlint`)
- **Corrección Automática de Linter:** `npm run lint:fix` (`oxlint --fix`)
- **Regenerar Contrato OpenAPI / Orval:** `npm run orval`
- **Compilación de Producción:** `npm run build`

