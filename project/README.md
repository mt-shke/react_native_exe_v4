```js
// La Manu startup lab est un nouveau programme lancé par La Manu pour promouvoir l’esprit
// entrepreneuriale de ses étudiants.

// Le startup lab a pour objectif d’accompagner des projets entrepreneuriaux en phase d’idéation
// ou de conception afin d’aboutir à la création d’un MVP (Minimum Viable Product).
// Pour cette première édition, vous avez été sélectionné pour développer des projets en lien
// avec les thématiques suivantes :

// 1. Tourisme responsable
// 2. Mobilité de demain
// 3. Culture et numérique
// 4. Consommation et développement durable
// 5. E-santé

// Ce qu’il faut faire

// Trouver une idée d’application qui répond à un besoin utilisateur parmi les thématiques
// choisies.
// Concevoir et développer l’interface utilisateur de l’application en intégrant les recommandations
// de sécurité.
// Concevoir et développer la partie fonctionnelle de l’application et la persistance de données.
// Développer les fonctionnalités spécifiques de l’application.

// Spécifications fonctionnelles :

// L’application développée doit persister les données des utilisateurs en local ou sur un serveur.
// Elle doit permettre aux utilisateurs d’utiliser les composants natifs du téléphone telles que la
// caméra, la géolocalisation, lecteurs biométriques, etc...
// L’utilisateur doit pouvoir créer un compte et accéder à son espace personnel

// Spécifications techniques :

// L’application doit être développée avec react-native cli et en typescript.
// Le système de navigation de l’application doit utiliser react-navigation 6.
```

<details>
<summary>Fonts</summary>

react-native.config.js

```js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};
```

</details>

<details>
<summary>AvoidKeyboardPush</summary>

AndroidManifest.xl

```js
android: windowSoftInputMode = 'adjustPan';
```

</details>
