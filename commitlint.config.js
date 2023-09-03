module.exports = {
  extends: ['@commitlint/config-conventional'],

  // Étend les règles de validation des messages de commit avec celles définies dans '@commitlint/config-conventional'.

  rules: {
    // La règle 'type-enum' vérifie que le type de commit (comme feat, fix, docs, etc.) est parmi ceux spécifiés dans le tableau.
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
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

    // La règle 'body-leading-blank' vérifie qu'il n'y a pas de ligne vide en début du corps du commit.
    'body-leading-blank': [2, 'never'],

    // La règle 'scope-empty' vérifie que la portée (scope) du commit n'est pas vide.
    'scope-empty': [2, 'never'],

    // La règle 'scope-case' vérifie que la portée (scope) est en minuscules.
    'scope-case': [2, 'always', 'lower-case'],

    // La règle 'header-max-length' vérifie que la ligne d'en-tête (header) du commit ne dépasse pas 50 caractères.
    'header-max-length': [2, 'always', 50],

    // La règle 'header-full-stop' vérifie qu'il n'y a pas de point à la fin de la ligne d'en-tête du commit.
    'header-full-stop': [2, 'never', '.'],

    // La règle 'body-case' vérifie que la première lettre de chaque phrase dans le corps du commit est en casse de phrase (première lettre en majuscule).
    'body-case': [2, 'always', 'sentence-case'],
  },
};
