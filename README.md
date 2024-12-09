# **TP Final DevOps**  
### **Auteurs : Saada Jugurtha & Boudjema Samy**

---

## **Méthodologie Git adoptée : Gitflow**  
Voici les différents types de branches et leur rôle :  

---

### **1. Branches principales :**
- **`main`** :
  - Branche stable représentant la version de production
  - Tout déploiement en production est basé sur cette branche
  - Aucune modification directe n'est autorisée

- **`develop`** :  
  - Branche d'intégration où les nouvelles fonctionnalités sont fusionnées
  - Sert de base pour les tests avant de passer en production

---

### **2. Branches secondaires :**
#### **`feature/<nom-de-la-fonctionnalité>`**  
- Utilisée pour le développement de nouvelles fonctionnalités
- Créée à partir de `develop`
- Exemple :  
  ```bash
  git checkout -b feature/gestion-utilisateurs develop
  ```

#### **`hotfix/<nom-du-hotfix>`**  
- Utilisée pour corriger rapidement un bug critique en production
- Créée à partir de `main` et fusionnée à la fois dans `main` et `develop`
- Exemple :  
  ```bash
  git checkout -b hotfix/correction-404 main
  ```

#### **`release/<version>`**  
- Utilisée pour préparer une nouvelle version à livrer
- Permet des tests finaux et des ajustements mineurs avant la fusion dans `main` et `develop`
- Exemple :  
  ```bash
  git checkout -b release/v1.0 develop
  ```

