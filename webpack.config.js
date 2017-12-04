module.exports = {
    entry: `./src/main.js`,
    context: process.cwd(),
    output: {
      path: `${__dirname}/dist`,
      publicPath: 'dist/',
      chunkFilename: '[name].js',
      filename: 'app.js'
    },
    externals: {
      vue: "Vue",
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
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
                    name: '../static/img/[name].[ext]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '../static/font/[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        alias:{
          '~': __dirname
        },
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
