# Etapa de compilación
FROM node:18-alpine AS build

# Establecer directorio de trabajo
WORKDIR /total-virus-api/

# Instalar pnpm
RUN npm install -g pnpm@8.14.3

# Instalar dependencias
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# Copiar el resto de los archivos de la aplicación
COPY . .

# Construir la aplicación
RUN pnpm run build:docker

# Etapa de ejecución
FROM node:18-alpine

WORKDIR /total-virus-api

# Instalar pnpm en la imagen de runtime
RUN npm install -g pnpm

# Copiar el build del paso anterior
COPY --from=build /total-virus-api/dist/apps/backend ./dist
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Instalar solo las dependencias de producción
RUN pnpm install --prod

# Exponer el puerto que tu app utiliza
EXPOSE 3000

CMD ["node", "dist/main.js"]
