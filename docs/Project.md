# Explications

Je vous propose ici une explication globale sur la structure du projet afin de bien comprendre ce qu'il se passe.

## commitlint.config.js

Ce fichier est **le fichier de configuration** qui permet de pré-charger une configuration reconnu.
Cela garantit que les messages de commit suivent un format cohérent et facilite la compréhension de l'évolution du code au fil du temps.

Il est utilisé dans le fichier package.json situé à la racine du projet.

```json
{
  // ..du code
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS", // <---------------------- ICI
      "pre-commit": "npm run format && npm run lint && .husky/pre-commit",
      "pre-push": ".husky/pre-push"
    }
  }
  // ... du code
}
```

> `-E HUSKY_GIT_PARAMS` est un argument passé à commitlint. Cela permet à commitlint d'accéder aux paramètres du commit actuel, notamment le message de commit.

Voici le fichier de configuration avec les règles créés:

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Cette règle spécifie les types de commit autorisés
    "type-enum": [
      2,
      "always",
      ["feature", "update", "test", "patch", "hotfix"],
    ],

    // Limite de 100 caractères pour le titre du commit
    "header-max-length": [2, "always", 100],

    /**
     * Cette règle exige que le corps du message de commit ait au moins un caractère.
     * Cela garantit qu'il y a un deuxième -m avec le contenu de la modification.
     */
    "body-min-length": [2, "always", 1],

    // ... Tu peux ajouter d'autres règles personnalisées ici si nécessaire
  },
};
```

## Husky

Indéniablement tu auras compris que Husky fonctionne avec commitlint.
L'avantage de **husky** c'est qu'il va nous permettre de configurer comment sera la sortie avant un quelconque commit.

En effet grâce à lui et une configuration précise, tu exécuteras des scripts juste avant les modifications.
Si bien entendu ton commit respecte la syntaxe demandé.

Ainsi:

```sh
# PAS OK
git commit -m "essai" # Ici le titre n'a pas de mot clé correspondant à la liste précédente.
git commit -m "test" # il manque ici un second -m avec un message.

# OK
git commit -m "feature: Premier commit" -m "Il s'agit d'un tout premier commit"
```

Tu trouveras donc un dossier **.husky** qui contiendra des scripts qui seront directement exécuté dans le package.json.

Rappel du code:

```json
{
  // ..du code
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-commit": "npm run format && npm run lint && .husky/pre-commit", // <---------------------- ICI
      "pre-push": ".husky/pre-push" // <---------------------- ICI
    }
  }
  // ... du code
}
```

Husky est installé à la racine du projet avec eslint afin de pouvoir bénéficier du même type de configuration dans tout le projet.

## prettierrc.js

Ce fichier permet d'imposer une configuration qui sera utilisé dans tout le projet avec prettier.

```js
module.exports = {
  //  Définit la largeur d'une tabulation à 2 espaces.
  tabWidth: 2,

  //  Ajoute automatiquement des points virgules à la fin des lignes.
  semi: true,

  // Utilise des guillemets simples (') pour les chaînes de caractères.
  singleQuote: true,

  // Ajoute une virgule finale dans les tableaux et les objets.
  trailingComma: "all",

  // Ajoute des parenthèses autour des paramètres d'une flèche (=>).
  arrowParens: "always",

  // Ajoute des espaces entre les accolades dans les objets.
  bracketSpacing: true,
};
```

## eslintrc.js (situé dans plusieurs répertoire)

Explication de celui situé dans dans **Projects/api**:

> Ce fichier est une configuration pour ESLint, un outil de linting statique pour identifier et signaler les problèmes de style, d'erreur et de qualité dans le code JavaScript. Chaque ligne de ce fichier définit comment ESLint doit analyser, vérifier et signaler les erreurs dans ton code.

```js
module.exports = {
  // Configuration de l'environnement où le code sera exécuté
  env: {
    browser: true, // Le code s'exécute dans un navigateur
    commonjs: true, // Le code utilise CommonJS (Node.js modules)
    es2021: true, // Le code utilise des fonctionnalités ECMAScript 2021
  },

  // Utilisation d'une configuration ESLint recommandée
  extends: 'eslint:recommended',

  // Configurations spécifiques pour certains fichiers
  overrides: [
    {
      env: {
        node: true, // Le code s'exécute dans un environnement Node.js
      },
      files: ['.eslintrc.{js,cjs}'], // Applique la configuration pour les fichiers .eslintrc.js et .eslintrc.cjs
      parserOptions: {
        sourceType: 'script', // Le code est de type "script"
      },
    },
  ],

  // Options de parsing pour ECMAScript
  parserOptions: {
    ecmaVersion: 'latest', // Utilise la version ECMAScript la plus récente
  },

  // Règles spécifiques pour le linting du code
  rules: {
    indent: ['error', 2], // Utilise une indentation de 2 espaces
    'linebreak-style': ['error', 'unix'], // Utilise des sauts de ligne de style Unix
    quotes: ['error', 'single'], // Utilise des guillemets simples pour les chaînes de caractères
    semi: ['error', 'always'], // Exige des points-virgules à la fin des instructions
  },
};
```

**Pour résumer**, cette configuration détaille comment ton code sera analysé et linté par ESLint.
Elle définit des règles pour l'indentation, le style de saut de ligne, le type de guillemets et la présence de points-virgules.
De plus, elle tient compte des environnements de navigateur et de Node.js, ainsi que des fonctionnalités ECMAScript 2021.

## LICENCE & LICENSE

Nous utilisons ici la licence **ISC** (**_Internet Systems Consortium_**) est une licence logicielle open source permissive.
Elle est souvent considérée comme similaire à la licence MIT en termes de permissions accordées aux utilisateurs et aux développeurs.
La licence ISC est courte, simple et a pour but de minimiser les restrictions imposées aux personnes qui utilisent ou redistribuent le code sous cette licence.

Voici les caractéristiques principales de la licence ISC :

- **Utilisation libre**: La licence ISC permet une utilisation, une modification et une distribution du code source sans frais ni restriction majeure.

- **Notice de droit d'auteur**: Toutefois, comme pour la plupart des licences open source, l'avis de droit d'auteur doit être inclus dans les copies redistribuées.

- **Responsabilité limitée**: La licence ISC limite la responsabilité du titulaire du droit d'auteur ou des contributeurs en ce qui concerne les dommages liés au logiciel.