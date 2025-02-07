# HomeScreen - Application Mobile

## Description
Ce projet est une application mobile développée en **React Native** utilisant **Expo**. Il s'agit d'une interface utilisateur complète pour un écran d'accueil (`HomeScreen`), intégrant un fil d'actualité avec des posts, un système de commentaires et une barre de navigation interactive.

## Fonctionnalités
### 1. **Fil d'actualité (Posts)**
- Affichage de publications contenant du texte et/ou des images.
- Informations de l'utilisateur ayant publié le post (nom, photo de profil).
- Options d'interaction :
  - **Like** : Possibilité d'aimer une publication.
  - **Commentaire** : Affichage et ajout de commentaires aux posts.

### 2. **Commentaires**
- Chaque publication peut contenir plusieurs commentaires affichés sous forme de liste.
- Interface permettant aux utilisateurs de saisir un commentaire via un champ de texte et un bouton d'envoi.

### 3. **Navigation**
- Barre de navigation située en bas de l'écran permettant d'accéder à différentes sections :
  - **Accueil** (`HomeScreen`)
  - **Recherche** (`SearchScreen`)
  - **Communautés** (`CommunitiesScreen`)
  - **Notifications** (`NotificationsScreen`)
  - **Profil** (`ProfileScreen`)

### 4. **Mode Anonyme**
- Un bouton interactif permet d'activer ou désactiver le mode anonyme, affichant une animation lors du basculement.

## Technologies utilisées
- **React Native** : Framework principal pour le développement mobile.
- **Expo** : Outil facilitant le développement et le test de l'application.
- **React Navigation** : Gestion de la navigation entre les écrans.
- **React Native Gesture Handler** : Gestion avancée des interactions tactiles.
- **Icons et animations** :
  - `react-native-vector-icons` pour les icônes.
  - `react-native-animatable` pour les animations.

## Installation et exécution
### Prérequis
- Node.js installé
- Expo CLI installé (`npm install -g expo-cli`)

### Étapes
1. **Cloner le projet**
   ```sh
   git clone https://github.com/votre-repo.git
   cd votre-repo
   ```

2. **Installer les dépendances**
   ```sh
   npm install
   ```

3. **Lancer l'application**
   ```sh
   expo start
   ```
   Scanner le QR code avec Expo Go sur votre téléphone ou exécuter via un émulateur.

## Structure du projet
```
/root
├── components/
│   ├── PostCard.js  # Composant affichant un post
│   ├── CommentSection.js  # Composant pour les commentaires
│   ├── NavigationBar.js  # Barre de navigation
│
├── screens/
│   ├── HomeScreen.js  # Écran principal avec le fil d'actualité
│   ├── SearchScreen.js  # Écran de recherche
│   ├── ProfileScreen.js  # Écran de profil
│
├── assets/
│   ├── images/  # Images utilisées dans l'application
│
├── App.js  # Fichier principal de l'application
└── package.json  # Liste des dépendances et configuration
```

## Améliorations futures
- Ajout d'un système de connexion/déconnexion.
- Intégration d'une base de données (Firebase, Supabase) pour stocker les posts et les commentaires.
- Notifications push pour les interactions sur les posts.

---

📌 **Auteur** : Razafitsalama kylian

