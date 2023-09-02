module.exports = {
  extends: ['@commitlint/config-conventional'],

  // Écrasement des règles selon une demande particulière.
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'],
    ],
    'scope-enum': [
      2,
      'always',
      ['core', 'ui', 'backend', 'frontend', 'devops'],
    ],
    'subject-case': [2, 'always', 'sentence-case'],
    'body-max-line-length': [2, 'always', 500],
    'body-leading-blank': [2, 'always'],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'header-max-length': [2, 'always', 50],
    'header-full-stop': [2, 'never', '.'],
    'body-case': [2, 'always', 'sentence-case'],
  },
};
