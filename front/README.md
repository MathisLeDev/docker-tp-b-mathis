# Docker TP Front (Quotopia)

## Table des matières

1. [Scripts de développement](#scripts-de-d%C3%A9veloppement)
    - [Démarrer l’application](#démarrer-l’application)
    - [Lancer les tests](#lancer-les-tests)
    - [Construire l’application](#construire-l’application)
2. [Technologies et outils](#technologies-et-outils)
    - [Axios](#axios)
    - [Tailwind CSS](#tailwind-css)
    - [React Router (v6.4)](#react-router-v64)
    - [RxJS](#rxjs)
3. [Références](#r%C3%A9f%C3%A9rences)

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

```bash
yarn test
```

- Lance le runner de tests en mode interactif.
- Consultez la section [running tests](https://facebook.github.io/create-react-app/docs/running-tests) pour plus d'informations.

---

### Construire l’application

```bash
yarn run build
```

- Construit l'application pour la production dans le dossier `build`.
- Optimise les performances en minifiant le code et incluant des hashes dans les noms de fichiers.
- L’application est prête à être déployée.
- Consultez la section [deployment](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.

---

## Technologies et outils

### Axios

- Une instance Axios est pré-configurée dans le fichier `app/axios/axiosInstance.tsx`.
- Utilisez cette instance pour faire des requêtes vers le backend.

---

### Tailwind CSS

#### Utilisation

- Ajoutez les classes Tailwind CSS à l’attribut `className` des éléments HTML que vous souhaitez styler.
- Consultez la documentation pour démarrer : [Tailwind UI](https://tailwindui.com/components).

#### Styles personnalisés

- Les styles personnalisés peuvent être ajoutés dans la section `theme` du fichier `tailwind.config.js`.
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

## Références

- Documentation Create React App : [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started).
- Documentation React : [React Documentation](https://reactjs.org/).
- Axios : [Documentation Axios](https://axios-http.com/).
- Tailwind CSS : [Documentation Tailwind](https://tailwindcss.com/docs/installation).
- React Router : [Documentation officielle](https://reactrouter.com/en/main/start/overview).
- RxJS : [Documentation RxJS](https://rxjs.dev/).

