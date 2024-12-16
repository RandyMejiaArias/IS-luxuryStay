# Dockerfile
FROM node:18

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código de la aplicación
COPY . .

# Exponer el puerto en el que se ejecuta la app
EXPOSE 4001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
