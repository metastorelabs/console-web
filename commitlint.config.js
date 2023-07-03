module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['build', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'style', 'test', 'chore', 'config', 'wip', 'revert'],
    ],
    'scope-empty': [2, 'never'],
    'scope-case': [2, 'always', 'upper-case'],
    'scope-enum': async () => [2, 'always', []], // Initially set to empty, will be overridden
    'scope-custom': [2, 'always'],
  },
  plugins: [
    {
      rules: {
        'scope-custom': (parsed) => {
          const { scope } = parsed
          const regex = /^DEV-\d+$/
          if (!regex.test(scope)) {
            return [false, `"${scope}" is not a valid jira issue. Please use a valid jira issue.`]
          }
          return [true]
        },
      },
    },
  ],
}
