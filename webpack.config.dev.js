var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  devtool: 'source-map',
  // Every widget has its own entry point with shared libraries bundled in one vendors file.
  entry: {
    // Widget's entry point. The name should be the same as the widget's folder name because it is used to name the widget's output file path.
    ReactWidgetTemplate: [
      // Enables web socket connection for HMR.
      'webpack-dev-server/client?http://localhost:3000',
      // To perform HMR in the browser.
      'webpack/hot/only-dev-server',
      // Widget's main entry point.
      path.resolve(__dirname, 'widgets/ReactWidgetTemplate/src/main')
    ],
    ReactGeosearch: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'widgets/ReactGeosearch/src/main')
    ],
    // Vendors entry point (shared libraries).
    vendors: Object.keys(pkg.dependencies)
  },
  output: {
    // Generate UMD module to be compatible with WAB (Dojo) module loader.
    libraryTarget: 'umd',
    path: path.resolve(__dirname, ''),
    publicPath: '/',
    filename: 'widgets/[name]/Widget.js'
  },
  plugins: [
    // Assign the module and chunk ids by occurrence count.
    new webpack.optimize.OccurrenceOrderPlugin(),
    // To generate HMR hot update chunks.
    new webpack.HotModuleReplacementPlugin(),
    // When there are errors while compiling this plugin skips the emitting phase (and recording phase), so there are no assets emitted that include errors.
    new webpack.NoErrorsPlugin(),
    // Compile shared libraries into vendors.js bundle.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'libs/[name].js',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        // Process .js files with babel-loader and then with react-hot-loader (works from right-to-left).
        loaders: ['react-hot', 'babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  },
  externals: [
    // Exclude Dojo, Esri and WAB modules from build process.
    function checkExternal(context, request, callback) {
      var externals = [
        'dojo',
        'dojox',
        'dijit',
        'dgrid',
        'dstore',
        'esri',
        'jimu'
      ];

      var isExternal = externals.reduce(function (prevValue, nextValue) {
        return prevValue || new RegExp('^' + nextValue).test(request);
      }, false);

      isExternal ? callback(null, 'amd ' + request) : callback();
    }
  ]
};
