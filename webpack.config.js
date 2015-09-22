var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './app/index'
  ],
  output: {
    path: 'C:/jboss/7.4/server/default/deploy/ActixOneModules/ApplicationContainer.war/build/',
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  //   new webpack.optimize.UglifyJsPlugin({
	 //     compress: {
	 //         warnings: false
	 //     }
	 // })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx','.css']
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: /.*\.svg$/,loaders: ['file-loader','svgo-loader?useConfig=svgoConfig1'] },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ]
  },
  svgoConfig1: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}},
      {convertPathData: false}
    ]
  }
};
