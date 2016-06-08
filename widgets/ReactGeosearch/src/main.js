import 'babel-polyfill';
import declare from 'dojo/_base/declare';
import BaseWidget from 'jimu/BaseWidget';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import { configureStore } from './store';
import { activate, deactivate, initialize } from './actions';

const store = configureStore();

export default declare([BaseWidget], {
  baseClass: 'react-geosearch',
  startup: function startup() {
    const {
      id,
      map,
      config,
      nls,
      domNode
    } = this;

    ReactDOM.render(
      <Provider store={store}>
        <App map={map} />
      </Provider>,
      domNode
    );

    store.dispatch(initialize({
      id,
      map,
      config,
      nls
    }));
  },
  onOpen: function onOpen() {
    store.dispatch(activate());
  },
  onClose: function onClose() {
    store.dispatch(deactivate());
  }
});
