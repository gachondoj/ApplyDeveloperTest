# Usar imagen base oficial de Node
FROM node:20

# Crear y usar directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

RUN npm run build

# Exponer el puerto que usa Nest
EXPOSE 3000

# Comando para iniciar la app


CMD ["npm", "run", "start:prod"]