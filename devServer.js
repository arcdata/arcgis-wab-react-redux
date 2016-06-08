var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.dev');

var port = 3000;
var host = 'localhost';
var serverOptions = {
  contentBase: './',
  hot: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true }
};

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, serverOptions);

server.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info('Listening on port %s. Open up http://%s:%s/ in your browser.', port, host, port);
  }
});
