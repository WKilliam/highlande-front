# Utiliser une image Node.js comme base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les autres fichiers du projet dans le conteneur
COPY . .

# Exposer le port 4200 (port par défaut de ng serve)
EXPOSE 4200

# Lancer le serveur de développement Angular
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check", "--port", "4200"]
