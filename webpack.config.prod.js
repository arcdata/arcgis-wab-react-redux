var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  devtool: 'source-map',
  // Every widget has its own entry point with shared libraries bundled in one vendors file.
  entry: {
    // Widget's entry point. The name should be the same as the widget's folder name because it is used to name the widget's output file path.
    ReactWidgetTemplate: [
      // Widget's main entry point
      path.resolve(__dirname, 'widgets/ReactWidgetTemplate/src/main')
    ],
    ReactGeosearch: [
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
    // Provide process.env.NODE_ENV='production' on the client side (e.g. to enable/disable logging in production).
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': "'production'"
      }
    }),
    // Uglify JS bundles.
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
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
        loaders: ['babel'], // Process .js files with babel-loader
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
