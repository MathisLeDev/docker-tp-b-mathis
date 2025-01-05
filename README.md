# Docker TP - Projet Quotopia

# Table des matières
## 1. [Intructions pour utiliser le projet Docker](#instructions-pour-utiliser-le-projet-docker)
## 2. [Références](#références)
### 2.1. [Configuration des services](#configuration-des-services)
### 2.2. [Configuration du réseau et publication des ports](#configuration-du-réseau-et-publication-des-ports)
### 2.3. [Préparation des environnements](#préparation-des-environnements)
#### 2.3.1. [Liste de ce qui change d'un environnement à l'autre](#liste-de-ce-qui-change-dun-environnement-à-lautre)
#### 2.3.1. [Stratégie de gestion du déploiement](#stratégie-de-gestion-du-déploiement)
### 2.4 [Précautions](#précautions)
### 2.5 [Utiliser le projet](#utiliser-le-projet)
### 2.6 [Exécution correct](#exécution-correcte)
### 2.7 [Setup CI/CD](#setup-cicd)
## 3. [Remarques/Commentaires/Difficultés rencontrées](#remarques-commentaires-et-difficultés-rencontrées)


# Instructions pour utiliser le projet Docker
**Gestionnaire de librairies**
- Ce projet utilise **Yarn** comme gestionnaire de librairies. Je ne garantis pas le bon fonctionnement avec **npm**.

**Variables d'environnement**
- Duppliquer le fichier **.env.example** en **.env** et **.env.prod.example** en **.env.prod**.
- Pour la génération du TOKEN, copier coller [ce string](https://generate.plus/en/base64)
```bash
cp .env.example .env; cp .env.example.prod .env.prod; cp server/.env.example server/.env; cp server/.env.prod.example server/.env.prod; cp client/.env.example client/.env; cp client/.env.prod.example client/.env.prod
 ```
- Il est **fortement recommandé** de modifier les valeurs par défaut des .env.


**Production**
```bash
docker compose --env-file .env.prod -f ./compose.yaml -f ./compose.prod.yaml up --build
```

**Développement**
```bash
docker compose -f ./compose.yaml -f ./compose.dev.yaml up --build --watch
```

---

## Références
### Configuration des services
Ce projet utilise 5 services :
- **client** :
  - description: Client en React.js qui communique avec le serveur.
  - image: node:23-alpine3.20
  - ports: 3000:3000
- **server** :
  - description: Serveur en Node.js qui expose une API REST avec comme framework Express.js.
  - image: node:23-alpine3.20
  - ports: 8080:8080
- **database** :
  - description: Base de données PostgreSQL.
  - image: postgres:17.1-alpine
  - ports: 5432:5432
- **admin** :
  - description: Interface d'administration de la base de données.
  - image: adminer:4.8.1
  - ports: 8081:8080
- **mailcatcher** :
  - description: Service SMTP pour intercepter les emails.
  - image: golang:1.18-alpine
  - ports: 
    - 8025:8025
    - 1025:1025

### Configuration du réseau et publication des ports
- **client** : 3000:3000
- **server** : 8080:8080
- **database** : 5432:5432 uniquement accessible par le server via un réseau interne configuré en **bridge**.

    
### Préparation des environnements

#### Liste de ce qui change d'un environnement à l'autre
##### Développement
- Le service **server** assure une modification des sources sans avoir à reconstruire l'image avec l'argument **--watch**.
- Les variables d'environnement sont chargées depuis le fichier **.env.dev**. Avec des crédentials de bdd dédiés.
- Le service **admin** et **mailcatcher** sont actifs et respectivement disponibles sur le port **8081** et **8025**.

##### Production
- Les conteneurs sont instanciés à partir de leurs images respectives et taguées correctement.
- Les variables d'environnement sont chargées depuis le fichier **.env.prod**. Avec des crédentials de bdd dédiés.
- Pas de service **admin** ni **mailcatcher**.
- Pas d'information de debug affichée sur la sortie, gestionnaire d'exceptions/erreurs avec redirection vers des logs.

##### Stratégie de gestion du déploiement
- La stratégie utilisée sera le merge avec l'argument -f. 

### Précautions
- L'utilisateur du service server est différent de **root**
- Certains dossiers comme node_modules sont ignorés lors de la création des images.


### Utiliser le projet
#### Lancer le projet en environnement de développement:
```bash
docker compose -f ./compose.yaml -f ./compose.dev.yaml up --build --watch
```
#### Build l'image pour la mise en production:
```bash
docker compose --env-file .env.prod -f ./compose.yaml -f ./compose.prod.yaml up --build
```
#### Lancer le projet en environnement de production:
```bash
docker compose -f ./compose.yaml -f ./compose.prod.yaml up
```

### Exécution correcte
- Se rendre sur [le client](http://localhost:3000/login) et se créer un compte.
- Vérifier la réception de l'email après la création d'un compte ou l'ajout d'une citation sur [Mailcatcher](http://localhost:8025) (uniquement en environnement de développement).
- Accéder à l'interface d'administration de la base de données [Adminer](http://localhost:8080) (uniquement en environnement de développement). (admin@admin.com, admin)
- Cliquer sur Add new Server :
  - General :
    - Name: yourEnvDbName,
  - Connection :
    - Host name/address: database,
    - Port: yourEnvPort,
    - Username: yourEnvUser,
    - Password: yourEnvPassword,

### Setup CI/CD
- Mise en place d'une pipeline CI/CD avec Github Actions.
- Le fichier de configuration se trouve dans le dossier **.github/workflows**.
- La pipeline construit l'image du service **server** et la publie [ici](https://hub.docker.com/r/mathisledev/docker-tp-b-mathis/tags).
- Les éxécutions des pipelines sont [ici](https://github.com/MathisLeDev/docker-tp-b-mathis/actions/)

## Remarques commentaires et difficultés rencontrées
- Beaucoup d'attention a été apporté sur la rédaction de ce README pour qu'il permette au mieux de valider les fonctionnalitées attendues du TP.
- La durée approximative de 2h30 a été dépassée avec un total de 16h.
- La partie des watchs a été plus difficile que prévu.
- Le service mailcatcher viens du repo de tyndyll que vous pouvez retrouver [ici](https://github.com/mailhog/MailHog)
- Dans la partie préparations des deux environnements :
Concernant le 4ème point. Le sens de cette phrase peut à la fois indiquer qu'on ne souhaite pas d'information de debug affichée NI de gestionnaire d'exceptions/erreur avec redirection vers les logs.
OU bien que l'on souhaite gardé le gestionnaire d'exceptions/erreurs avec redirection vers les logs.
La décision a été de ne rien afficher sur la sortie en production.
- La derniere partie sur la CI/CD push seulement l'image du serveur. Le serveur ne contenant pas le service database. IL ne pourra pas fonctionner tout seul.

