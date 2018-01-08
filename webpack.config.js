module.exports = {
  entry: `./src/main.js`,
  output: {
      path: `${__dirname}/dist`,
      filename: 'app.js'
  },
  module: {
      loaders: [
          {
              test: /\.js$/,
              loader: 'babel-loader'
          },
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'url-loader',
            query: {
              limit: 20000,
              name: '/static/font/[name].[ext]'
            }
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          },
          {
              test: /\.(png|gif|jpe?g)$/,
              loader: 'url-loader',
              query: {
                  limit: 10000,
                  name: '/static/img/[name].[ext]'
              }
          }
      ]
  },
  resolve: {
      alias: {
          vue: 'vue/dist/vue.js',
          '~': __dirname
      }
  }
//    plugins: [
//        new webpack.DefinePlugin({
//            'process.env': {
//                NODE_ENV: JSON.stringify('production')
//            }
//        }),
//        new webpack.optimize.UglifyJsPlugin()
//    ],
}
