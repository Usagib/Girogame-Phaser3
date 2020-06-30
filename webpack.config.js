const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(ogg|mp3|png|svg|jpe?g|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 8080
  },
};
