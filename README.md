# Docker TP - Projet Quotopia

## Table des matières

1. [Installation des dépendances](#installation-des-d%C3%A9pendances)
2. [Docker](#docker)
  - [Lancer le conteneur](#lancer-le-conteneur)
  - [Commandes utiles](#commandes-utiles)
3. [Gestion des migrations](#gestion-des-migrations)
4. [Scripts de développement](#scripts-de-d%C3%A9veloppement)
  - [Démarrer l’application](#d%C3%A9marrer-l’application)
  - [Lancer les tests](#lancer-les-tests)
  - [Construire l’application](#construire-l’application)
5. [Technologies et outils](#technologies-et-outils)
  - [Axios](#axios)
  - [Tailwind CSS](#tailwind-css)
  - [React Router (v6.4)](#react-router-v64)
  - [RxJS](#rxjs)
6. [Notes et bonnes pratiques](#notes-et-bonnes-pratiques)
7. [Références](#r%C3%A9f%C3%A9rences)
8. [Remarques](#remarques)

---

## Installation des dépendances
Le projet est séparé en trois services : `back`, `front` et `MailHog`.

Seules back et front nécessitent des dépendances.
### Dépendances du back
```bash
cd ./back; yarn
```

### Dépendances du front
```bash
cd ./front; yarn
```

---

## Docker

### Lancer le conteneur

**Production**
```bash
docker compose -f docker/compose.yaml -f docker/compose.prod.yaml up --build
```

**Développement**
```bash
docker compose -f docker/compose.yaml -f docker/compose.dev.yaml up --build
```

Ensuite :
```bash
yarn start
```

### Commandes utiles

- **Lister les conteneurs exécutés** :
  ```bash
  docker ps
  ```

- **Lister les images Docker** :
  ```bash
  docker images
  ```

- **Accéder à un conteneur** :
  ```bash
  docker exec -it <nom_du_conteneur> bash
  ```

---

## Gestion des migrations

- Ajouter les fichiers du dossier `back/migrations` dans la clé `migrations` du fichier `back/app-data-source.ts`.

---

## Scripts de développement

### Démarrer l’application

```bash
yarn start
```

- Démarre l'application en mode développement.
- Accédez à [http://localhost:3000](http://localhost:3000) dans le navigateur.
- La page se rechargera automatiquement lors des modifications du code.
- Les erreurs de linting seront affichées dans la console.

---

### Lancer les tests

Pour le backend :
```bash
cd back && yarn start
```
Puis dans un autre terminal :
```bash
cd back && yarn test
```

Pour le frontend :
```bash
cd front && yarn test
```

---

### Construire l’application

Pour le frontend :
```bash
cd front && yarn run build
```

- Construit l'application pour la production dans le dossier `front/build`.
- Optimise les performances en minifiant le code et incluant des hashes dans les noms de fichiers.
- Consultez la section [deployment](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

---

## Technologies et outils

### Axios

- Une instance Axios est pré-configurée dans le fichier `front/src/app/axios/axiosInstance.tsx`.
- Utilisez cette instance pour faire des requêtes vers le backend.

---

### Tailwind CSS

#### Utilisation

- Ajoutez les classes Tailwind CSS à l’attribut `className` des éléments HTML que vous souhaitez styler.
- Consultez la documentation pour démarrer : [Tailwind UI](https://tailwindui.com/components).

#### Styles personnalisés

- Les styles personnalisés peuvent être ajoutés dans la section `theme` du fichier `front/tailwind.config.js`.
- Documentation : [Ajouter des styles personnalisés](https://tailwindcss.com/docs/adding-custom-styles).

---

### React Router (v6.4)

- Documentation : [React Router](https://reactrouter.com/en/main/start/overview).

---

### RxJS

#### Service d’authentification

- Le service d’authentification empêche l’accès aux routes protégées si l’utilisateur n’est pas connecté.
- Plus d’informations : [React RxJS](https://react-rxjs.org/docs/getting-started).

---

## Notes et bonnes pratiques

- **Rebuild des images** :
  ```bash
  docker compose up --build
  ```

- **Vérifier la configuration Docker Compose** :
  ```bash
  docker compose config
  ```

- **Utilisation des secrets** :
  Toujours utiliser des secrets pour protéger les données sensibles.

- **Réseaux avancés** :
  Consultez les exemples avancés de configuration de réseau pour Docker Compose si nécessaire.

---

## Références

- Documentation officielle Docker : https://docs.docker.com
- Guide sur Docker Compose : https://docs.docker.com/compose/
- TypeORM : https://typeorm.io
- Documentation Create React App : [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started).
- Documentation React : [React Documentation](https://reactjs.org/).
- Axios : [Documentation Axios](https://axios-http.com/).
- Tailwind CSS : [Documentation Tailwind](https://tailwindcss.com/docs/installation).
- React Router : [Documentation officielle](https://reactrouter.com/en/main/start/overview).
- RxJS : [Documentation RxJS](https://rxjs.dev/).

---

## Remarques

- **Difficultés rencontrées** :
  - Configuration des fichiers de migration avec TypeORM.
  - Gestion des environnements de développement et de production avec Docker Compose.

- **Commentaires** :
  - Il est recommandé d’utiliser un gestionnaire de secrets pour les variables sensibles comme les clés API ou mots de passe.
  - Vérifiez toujours la compatibilité des versions des outils utilisés (Docker, Node.js, etc.).

