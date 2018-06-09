import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import merge from 'webpack-merge'
import path from 'path'
import common from './webpack.common'


export default merge(common, {
  mode: 'production',
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build/src'),
    publicPath: '/',
  },
  plugins: [new UglifyJSPlugin()],
})
