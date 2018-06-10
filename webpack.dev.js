import webpack from 'webpack'
import merge from 'webpack-merge'
import path from 'path'
import common from './webpack.common'


export default merge(common, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    historyApiFallback: true,
    hot: true,
  },
  devtool: 'inline-source-map',
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'src'),
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
