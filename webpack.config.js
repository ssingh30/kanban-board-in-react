const path = require('path')
module.exports = {
  entry: './public/kanban.js',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          'presets': ['@babel/preset-react',
            '@babel/preset-env'
          ],
          'plugins':[ '@babel/plugin-proposal-class-properties']
        }
      }
    ]
  }
}
