# wab-arcdata-dev-stack

This repo contains a ReactWidgetTemplate folder, a basic starter to write widgets for [Web AppBuilder for ArcGIS (Developer Edition)](https://developers.arcgis.com/web-appbuilder) (WAB) using [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux), [Babel](https://github.com/babel/babel) and [Webpack](https://github.com/webpack/webpack). There is also a ReactGeosearch folder, an example of more complex widget using async actions and state persistance.

### Getting Started

Fork or download this repo and place content of this repo into the root directory of 2D application build by WAB. The supported version of WAB is 2.0.x. Then run `npm install` from the application's root directory to install project dependencies and then `npm start` to start developing or `npm run build` to create a production build of widgets.

### Create your own widget

Copy content of ReactWidgetTemplate folder into your own widget folder (e.g. widgets/YourCustomWidget), update the widgets/YourCustomWidget/manifest.json file to reference your widget and add entry point of your widget to webpack.config.dev.js and webpack.config.prod.js files to process your widget using Babel transpiler and Webpack bundler. Then reference your widget in the application's config.json file to add it to the application's UI and run `npm start` from the application's root directory. Then open up http://localhost:3000 in your browser and you are ready to go.

You can use ES6 features (classes, modules, arrow functions, etc.) to implement your own widget (thanks to [Babel](https://github.com/babel/babel) transpiler).

If you need some third party library in your widget (e.g. lodash), use `npm install --save lodash` and then import the library using ES6 import in your widget's .js files.

Throught developing your widget (running `npm start`), every changes in your widget's .js files are automatically compiled and bundled. In most cases you don't even need to refresh your browser to reflect the changes (thanks to [Webpack HMR](https://webpack.github.io/docs/hot-module-replacement.html) and [React Hot Loader](https://github.com/gaearon/react-hot-loader)).

To create a production build, run `npm run build`. Every widget's source code is compiled and bundled into one Widget.js file in the widget's root directory. All widgets' dependencies (installed by `npm install --save <dependency-name>`) are compiled and bundled into vendors.js file in the application's libs directory. To include the vendors.js file in the application, the original application's **libs/main.js** file has been modified. This is the only change of the original WAB application's files.
