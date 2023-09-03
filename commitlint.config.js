module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',

  // Étend les règles de validation des messages de commit avec celles définies dans '@commitlint/config-conventional'.

  rules: {
    // La règle 'type-enum' vérifie que le type de commit (comme feat, fix, docs, etc.) est parmi ceux spécifiés dans le tableau.
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'revert',
        'ci',
        'build',
      ],
    ],

    // La règle 'scope-enum' vérifie que la portée (scope) du commit est parmi celles spécifiées dans le tableau.
    'scope-enum': [
      2,
      'always',
      ['core', 'ui', 'backend', 'frontend', 'devops'],
    ],

    // La règle 'subject-case' vérifie que la première lettre du sujet du commit est en casse de phrase (première lettre en majuscule).
    'subject-case': [2, 'always', 'sentence-case'],

    // La règle 'body-max-line-length' vérifie que chaque ligne du corps du commit ne dépasse pas 500 caractères.
    'body-max-line-length': [2, 'always', 500],

    // La règle 'scope-empty' vérifie que la portée (scope) du commit n'est pas vide.
    'scope-empty': [2, 'never'],

    // La règle 'scope-case' vérifie que la portée (scope) est en minuscules.
    'scope-case': [2, 'always', 'lower-case'],

    // La règle 'header-max-length' vérifie que la ligne d'en-tête (header) du commit ne dépasse pas 50 caractères.
    'header-max-length': [2, 'always', 100],

    // La règle 'header-full-stop' vérifie qu'il n'y a pas de point à la fin de la ligne d'en-tête du commit.
    'header-full-stop': [2, 'never', '.'],

    // La règle 'body-case' vérifie que la première lettre de chaque phrase dans le corps du commit est en casse de phrase (première lettre en majuscule).
    'body-case': [2, 'always', 'sentence-case'],
  },

  prompt: {
    messages: {
      skip: ':skip',
      max: 'pas plus de %d caractères',
      min: 'au moins %d caractères',
      emptyWarning: 'ne peut être vide',
      upperLimitWarning: 'au-dessus de la limite',
      lowerLimitWarning: 'sous la limite',
    },
    questions: {
      type: {
        description:
          'Choisissez le type de modification que concerne votre commit :',
        enum: {
          feat: {
            description: 'Ajout/mise à jour de fonctionnalité',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Correction de bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Ajout/modif. de documentation',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description:
              'Modifs de style et de mise en forme du code (espacements, virgules, etc.)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description:
              'Modif. des sources n’étant ni un correctif, ni un ajout de fonctionnalité',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Amélioration de la performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Ajout ou correction de tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description:
              'Modif. affectant le "build" ou les dépendances externes (exemples de contextes :  webpack, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description:
              'Modif. de la configuration ou des scripts liés à la CI (Travis, Circle, BrowserStack, SauceLabs, etc.)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description:
              'Autres mises à jour ne modifiant ni les sources, ni les tests',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Annuler (revert) un commit précédent',
            title: 'Revert',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description:
          'Quel est le contexte des modifications (composant, nom de fichier)',
      },
      subject: {
        description: 'Écrivez une description concise, à l’impératif',
      },
      body: {
        description:
          'Renseignez une description plus détaillée des modifications',
      },
      isBreaking: {
        description: 'Y a-il des changements majeurs ("breaking changes") ?',
      },
      breakingBody: {
        description:
          'Un commit cassant la compatibilité ascendante ("breaking changes") nécessite un corps de message. Veuillez renseigner une description plus longue et détaillée que la première ligne du commit.',
      },
      breaking: {
        description: 'Décrivez les "breaking changes"',
      },
      isIssueAffected: {
        description: 'Cela concerne-t-il un ticket existant ?',
      },
      issuesBody: {
        description:
          'Vous devez ajouter un corps au message si ce commit ferme des tickets. Essayez de renseigner une description plus longue et détaillée que la première ligne du commit.',
      },
      issues: {
        description: 'Ajoutez une référence de ticket ("fix #123", "ref #123")',
      },
    },
  },
};
