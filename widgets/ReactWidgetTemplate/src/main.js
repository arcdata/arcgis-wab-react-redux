import 'babel-polyfill';
import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { configureStore } from './store';
import { activate, deactivate, initialize } from './actions';

// Create a Redux store holding the state of the application and the central dispatcher of actions.
const store = configureStore();

/**
 * Creates a dojo constructor function.
 * Used to create a widget object on-demand by the WAB application.
 * Extending jimu/BaseWidget the widget itself is pluggable into the WAB application's infrastructure provided with config, nls, eventing, etc.
 *
 * @returns {Function} A constructor function used to create a widget object with new keyword.
 */
export default declare([BaseWidget], {
  baseClass: 'react-widget-template',
  /**
   * A WAB widget lifecycle method.
   * Called once during widget creation.
   */
  startup: function startup() {
    const {
      id,
      map,
      config,
      nls,
      domNode
    } = this;

    // Render widget UI using React and attach it to the widget's root DOM node.
    // Wrap the root component (App) inside Redux Provider which makes Redux store available to the connect() calls in the component hierarchy below.
    ReactDOM.render(
      <Provider store={store}>
        <App map={map} />
      </Provider>,
      domNode
    );

    // Initialize the application state with data coming from WAB widget.
    store.dispatch(initialize({
      id,
      map,
      config,
      nls
    }));
  },
  /**
   * A WAB widget lifecycle method.
   * Called on widget open.
   */
  onOpen: function onOpen() {
    // Activate the application.
    store.dispatch(activate());
  },
  /**
   * A WAB widget lifecycle method.
   * Called on widget close.
   */
  onClose: function onClose() {
    // Deactivate the application.
    store.dispatch(deactivate());
  }
});
