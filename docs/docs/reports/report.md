# Docker and CI/CD Setup for Web-Client and Vote-API

## What I Have Done

1. **Git Setup and Workflow**
    - Utilisation du flux **Gitflow** pour gérer les branches et les pull requests. La branche principale est `main` et les fonctionnalités sont développées sur des branches de type `feature/nom_de_la_feature`.
    - Les pull requests sont soumises pour révision (depuis develop par exemple) avant fusion dans la branche `main`.

2. **Docker Configuration**
    - Création de Dockerfiles pour chaque application (`web-client`, `vote-api`, `docs`), respectant les bonnes pratiques de sécurité et d'optimisation :
        - Les images ne sont pas exécutées en tant qu'utilisateur root.
        - Utilisation de **multi-stage builds** pour réduire la taille des images finales.
    - L'image `latest` correspond à la dernière version stable de chaque application.

3. **Docker Compose**
    - Un fichier `docker-compose.yml` a été créé pour faciliter le déploiement des applications `web-client`, `vote-api` avec la base de données (PostgreSQL). Ce fichier permet de **construire** et de **lancer** les conteneurs avec les ports principaux exposés.
    - Aucune configuration supplémentaire n'est nécessaire pour exécuter les applications, tout est pris en charge par Docker Compose.

4. **CI/CD Pipeline (GitHub Actions)**
    - Un pipeline CI/CD a été mis en place avec **GitHub Actions** pour automatiser les tests, la construction des images Docker et le déploiement.
    - Les tests sont exécutés sur chaque pull request et la création des images Docker est lancée automatiquement lors de la fusion dans `main`.

---

## How is it Deployed

1. **Docker Deployment on Azure**
    - Toutes les applications (`web-client`, `vote-api`, `docs`) sont déployées sur une **machine virtuelle Azure** en utilisant **Docker**.
    
    - Les étapes pour déployer le projet sur Azure sont les suivantes :
  
      1. **Configurer la machine virtuelle sur Azure** :
        - Créer une machine virtuelle avec un système d'exploitation compatible (par exemple Ubuntu).
        - Installer Docker sur la machine
      2. **Cloner le repository sur la machine Azure** :
        - Se connecter à la machine via SSH :
           ```bash
           ssh utilisateur@ip_de_la_machine
           ```
        - Cloner le repository contenant le projet :
           ```bash
           git clone <url_du_projet>
           cd <répertoire_du_projet>
           ```

      3. **Construire les images Docker** :
        - Une fois le projet cloné, utiliser Docker Compose pour construire les images pour `web-client`, `vote-api`, et `docs` :
           ```bash
           docker-compose build
           ```

      4. **Lancer les conteneurs Docker** :
        - Pour démarrer les applications, il suffit de lancer les conteneurs Docker en utilisant Docker Compose :
           ```bash
           docker-compose up -d
           ```
        - Les applications seront alors exécutées en arrière-plan. Chaque application sera disponible via le port exposé défini dans le fichier `docker-compose.yml`.
        - **Watchtower** est ensuite ajouté pour surveiller les conteneurs en cours d'exécution. Watchtower va vérifier périodiquement les nouvelles versions des images Docker sur Docker Hub. Si une nouvelle version d'une image est détectée, Watchtower arrête le conteneur actuel, met à jour l'image, puis redémarre le conteneur avec la nouvelle version. Cela permet un déploiement automatique des mises à jour sans intervention manuelle.
            - Lancer Watchtower pour surveiller les conteneurs en cours :
            ```bash
            docker run -d \
                --name watchtower \
                -v /var/run/docker.sock:/var/run/docker.sock \
                containrrr/watchtower
            ```
            - Ainsi, dès qu'une nouvelle version d'une image (par exemple `web-client`, `vote-api`, ou `docs`) est poussée sur Docker Hub par le pipeline CI/CD, **Watchtower** l'appliquera automatiquement sur le serveur de production.

2. **CI/CD Pipeline**
    - Le déploiement via CI/CD sur Azure est également automatisé :
        - Lors de chaque fusion dans la branche `main`, le pipeline CI/CD GitHub Actions construit les nouvelles images Docker et les pousse vers **Docker Hub**.
        - **Watchtower**, qui fonctionne sur la machine de production, vérifie régulièrement Docker Hub pour toute mise à jour des images et applique automatiquement la mise à jour sur les conteneurs en production.

    **Exemple d'un déploiement CI/CD automatisé** :
    - GitHub Actions déclenche le pipeline après chaque fusion dans `main`.
    - Les actions suivantes sont réalisées :
      - Tester l'application.
      - Construire l'image Docker.
      - Pousser l'image vers Docker Hub.
      - Watchtower surveille la mise à jour de l'image et déploie automatiquement la dernière version sur le serveur Azure.

3. **Gestion de l'environnement de production**
    - La machine virtuelle Azure héberge l'environnement **production**.
    - Les configurations des conteneurs sont définies dans le fichier `docker-compose.yml`, ce qui permet de maintenir l'environnement de production avec une configuration simple et fiable.
    - Si un environnement de préproduction est nécessaire, des modifications simples peuvent être apportées dans le pipeline GitHub Actions ou sur une autre machine Azure, mais dans ce projet, seul l'environnement **production** est mis en place.

---

## Links to Deployed Images and Apps

**Apps** :
- **Web-client** : accessible via [Lien vers l'application web-client déployée](http://52.143.159.207:3000/)
- **Vote-api** : accessible via [Lien vers l'API Vote déployée](https://api-azure.jugurtha.tech/)
- **Docs** : accessible via [Lien vers la documentation du projet](https://docs-azure.jugurtha.tech/)

**Deployed Images** :
- **Web-client** : [Lien vers l'image web-client](https://hub.docker.com/repository/docker/saadajugurtha/web-client/general)
- **Vote-api** : [Lien vers l'image Vote-API](https://hub.docker.com/repository/docker/saadajugurtha/vote-api/general)
- **Documentation** : [Lien vers l'image documentation](https://hub.docker.com/repository/docker/saadajugurtha/docs/general)

---

## How Should a New User Contribute to the Project

1. **Fork le projet**
    - Un utilisateur doit forker ce repository pour commencer à contribuer.

2. **Cloner le repository**
    - Après avoir forké le repository, l'utilisateur doit cloner sa version locale :
        ```bash
        git clone <url_du_fork>
        ```

3. **Créer une branche pour la fonctionnalité**
    - Une fois le projet cloné, l'utilisateur doit créer une branche pour travailler sur une fonctionnalité :
        ```bash
        git checkout -b feature/nouvelle-fonctionnalite
        ```

4. **Commits avec Gitmoji**
    - Lors de la réalisation de commits, l'utilisateur doit utiliser la convention **Gitmoji** pour décrire les changements. Par exemple :
        ```bash
        git commit -m ":sparkles: Ajout d'une nouvelle fonctionnalité"
        ```

5. **Soumettre une Pull Request**
    - Une fois la fonctionnalité terminée, l'utilisateur doit soumettre une pull request pour que les autres membres de l'équipe puissent revoir le code.
    - Les pull requests seront soumises à un processus de révision avant la fusion dans la branche `main`.

6. **Tests et Validation**
    - Avant la fusion, l'utilisateur doit s'assurer que tous les tests passent et que l'application fonctionne correctement en local ou dans un environnement de préproduction.

---

## Issues Encountered and What Failed

Lors de la mise en place du déploiement, j'ai réussi à configurer un **reverse proxy** avec **Nginx** pour rediriger le trafic vers les différents services (web-client, vote-api, et docs) en fonction de leurs domaines respectifs. J'ai également configuré **un nom de domaine** pour gérer les requêtes vers ces services, ce qui a fonctionné correctement pour l'**API** et la partie **docs**.

### Ce qui a fonctionné :
- J'ai pu configurer un nom de domaine et configurer Nginx pour rediriger le trafic vers les bons services. Les applications **vote-api** et **docs** étaient accessibles sans problème via le nom de domaine.
- Pour **vote-api** et **docs**, les requêtes passées par le domaine et le reverse proxy fonctionnaient parfaitement, et il n'y avait pas de problème pour accéder à ces services via le nom de domaine.

### Ce qui a échoué :
- Le problème est survenu avec l'application **web-client**. L'erreur provient de la façon dont le **web-client** fait des requêtes vers l'**API**.
- En effet, l'**web-client** était configuré pour faire des requêtes vers l'**API** en utilisant l'adresse IP de la machine (`<IP_Azure>:<port>`), ce qui signifiait que les requêtes allaient directement vers l'adresse IP et le port du serveur pour l'API.
- Après avoir configuré le **reverse proxy** avec Nginx et l'avoir mappé au nom de domaine, le **web-client** continuait à utiliser l'adresse IP du serveur pour ses requêtes vers l'API. Cependant, une fois les requêtes envoyées, elles étaient mal formées, devenant `http://<nom_de_domaine>:<port>`.
- Cela a entraîné une erreur **404** car le reverse proxy Nginx s'attendait à ce que les requêtes de l'API correspondent à la configuration du domaine, mais comme le client essayait d'accéder au mauvais chemin (`<nom_de_domaine>:<port>`), il y a eu une incohérence dans le routage et une erreur de type 404 a été renvoyée.