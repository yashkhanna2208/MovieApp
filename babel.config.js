module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  overrides: [
    {
      test: './node_modules/@tanstack',
      plugins: [['@babel/plugin-transform-private-methods', {loose: true}]],
    },
  ],
};
