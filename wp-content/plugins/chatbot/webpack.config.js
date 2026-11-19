const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './assets/src/js/main.js', // Adjust as needed
  },
  output: {
    path: path.resolve(__dirname, 'assets/build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new CopyPlugin({
      patterns: [
        { from: 'botmaster.php', to: '../build-temp/' },
        { from: 'includes', to: '../build-temp/includes' },
        { from: 'languages', to: '../build-temp/languages' },
        { from: 'readme.txt', to: '../build-temp/' },
        { from: 'assets/build', to: '../build-temp/assets/build' },
        // Add more if you have folders like classes, templates, etc.
      ],
    }),

    new ZipPlugin({
      path: '../dist',
      filename: 'chatbot.zip',
      pathPrefix: 'chatbot',
      include: [
        /\.php$/, /\.js$/, /\.css$/, /\.json$/, /\.po$/, /\.mo$/, /\.txt$/
      ],
      exclude: [
        /\.map$/, 
        /^node_modules/, 
        /\.gitignore$/, 
        /phpcs(-.*)?\.xml$/, 
        /package(-lock)?\.json$/, 
        /webpack\.config\.js/, 
        /\.git/
      ]
    }),
  ],
};
