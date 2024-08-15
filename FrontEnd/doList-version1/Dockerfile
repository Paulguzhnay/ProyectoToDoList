# Utiliza una imagen base de Node.js para construir la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia todo el código del proyecto al contenedor
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos generados por el build al directorio de Nginx
COPY --from=build /app/dist/doList-version1 /usr/share/nginx/html



# Expone el puerto 80 para acceder a la aplicación
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
