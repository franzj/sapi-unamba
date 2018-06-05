const CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  path = require('path');


module.exports = {
  'entry': {'app': './src/app.jsx'},
  'module': {
    'rules': [
      {
        'exclude': /node_modules/,
        'test': /\.(js|jsx)$/,
        'use': {'loader': 'babel-loader'}
      },
      {
        'test': /\.(png|jpg|gif|svg)$/,
        'use': [
          {
            'loader': 'file-loader',
            'options': {
              'name': '[name].[ext]',
              'outputPath': 'images/'
            }
          }
        ]
      },
      {
        'test': /\.(css|scss)$/,
        'use': [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        'loader': 'file-loader',
        'options': {
          'name': '[name].[ext]',
          'outputPath': 'fonts/'
        },
        'test': /\.(woff|woff2|ttf|eot|otf)$/
      }
    ]
  },
  'plugins': [
    new CleanWebpackPlugin([
      'build',
      'dist'
    ]),
    new HtmlWebpackPlugin({
      'chunks': ['app'],
      'filename': 'index.html',
      'template': 'src/index.html'
    })
  ],
  'resolve': {
    'extensions': [
      '.js',
      '.jsx'
    ],
    'modules': [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'static'),
      'node_modules'
    ]
  },
  'target': 'web'
};
