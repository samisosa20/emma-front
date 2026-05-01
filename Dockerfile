# --- Etapa 1: Dependencias ---
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# --- Etapa 2: Build ---
FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Argumentos de build (Variables públicas)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- Etapa 3: Runner (Imagen Final Ligera) ---
# ESTA ES LA PARTE QUE FALTABA
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3030
ENV NEXT_TELEMETRY_DISABLED=1

# Instalar PM2 en la imagen limpia
RUN npm install -g pm2

# Copiamos SOLO lo necesario desde el builder
# 1. Public assets (iconos, robots.txt, etc)
COPY --from=builder /app/public ./public
# 2. El servidor standalone (incluye node_modules mínimos)
COPY --from=builder /app/.next/standalone ./
# 3. Los estáticos generados (JS/CSS)
COPY --from=builder /app/.next/static ./.next/static
# 4. Configuración de procesos
COPY ecosystem.config.js ./

EXPOSE 3030

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
