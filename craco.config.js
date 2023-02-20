const webpack = require('webpack');

module.exports = {
  babel: {
    presets: ['@babel/preset-react'],
    plugins: [
      '@babel/plugin-proposal-export-namespace-from',
      'react-native-reanimated/plugin',
    ],
  },
  webpack: {
    alias: {'react-native$': 'react-native-web'},
    plugins: {
      add: [
        new webpack.DefinePlugin({
          __DEV__: process.env.NODE_ENV !== 'production',
        }),
      ],
    },
  },
  eslint: {
    enable: false,
  },
};
