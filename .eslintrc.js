module.exports = {
  root: true,
  extends: ['airbnb'],
  overrides: [
    {
      files: ['**/*.js?(x)'],
      rules: {
        // ******** add ignore rules here *********
        'react/no-unescaped-entities': 'off',
        'react/display-name': 'off',
        'react/prop-types': 'off',
        'react/jsx-filename-extension': 'off',
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'no-console': 'off',
        'import/named': 'off',
        'no-shadow': 'off',
        'react/no-array-index-key': 'off',
        'no-param-reassign': 'off',
      },
    },
  ],
};
