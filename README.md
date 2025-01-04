# Docker TP Back - Mathis Brouard

## Table des matières

1. [Installation des dépendances](#installation-des-d%C3%A9pendances)
2. [Docker](#docker)
    - [Lancer le conteneur](#lancer-le-conteneur)
    - [Commandes utiles](#commandes-utiles)
3. [Gestion des migrations](#gestion-des-migrations)
4. [Lancer les tests](#lancer-les-tests)
5. [Notes et bonnes pratiques](#notes-et-bonnes-pratiques)
6. [Références](#r%C3%A9f%C3%A9rences)
7. [Remarques](#remarques)

---

## Installation des dépendances

```bash
yarn
```

---

## Docker

### Lancer le conteneur

**Production**
```bash
docker compose -f compose.yaml -f compose.prod.yaml up --build
```

**Développement**
```bash
docker compose -f compose.yaml -f compose.dev.yaml up --build
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

- Ajouter les fichiers du dossier `migrations` dans la clé `migrations` du fichier `app-data-source.ts`.

---

## Lancer les tests

Le serveur doit être en cours d'exécution pour lancer les tests :
```bash
yarn start
```
Puis :
```bash
yarn test
```

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

---

## Remarques

- **Difficultés rencontrées** :
    - Configuration des fichiers de migration avec TypeORM.
    - Gestion des environnements de développement et de production avec Docker Compose.

- **Commentaires** :
    - Il est recommandé d’utiliser un gestionnaire de secrets pour les variables sensibles comme les clés API ou mots de passe.
    - Vérifiez toujours la compatibilité des versions des outils utilisés (Docker, Node.js, etc.).

