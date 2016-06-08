import { combineReducers } from 'redux';
import {
  APP_INITIALIZE_START,
  APP_INITIALIZE_STOP,
  APP_ACTIVATE,
  APP_DEACTIVATE
}  from '../actions';

// Initial application state.
const appInitialState = {
  initialized: false,
  error: null,
  id: null,
  config: null,
  nls: null,
  active: false,
  wkid: null
};

/**
 * An application reducer function managing the state of the application.
 *
 * @param {Object} state A last known state managed by the reducer.
 * @param {Object} action An incoming action.
 *
 * @returns {Object} A new state.
 */
function app(state = appInitialState, action) {
  switch (action.type) {
    case APP_INITIALIZE_START:
      return Object.assign({}, state, {
        initialized: false,
        error: null,
        id: null,
        config: null,
        nls: null,
        wkid: null
      });
    case APP_INITIALIZE_STOP:
      if (action.error) {
        return Object.assign({}, state, {
          initialized: false,
          error: action.error
        });
      } else {
        return Object.assign({}, state, {
          initialized: true,
          id: action.id,
          config: action.config,
          nls: action.nls,
          wkid: action.wkid
        });
      }
    case APP_ACTIVATE:
      return Object.assign({}, state, {
        active: true
      });
    case APP_DEACTIVATE:
      return Object.assign({}, state, {
        active: false
      });
    default:
      return state;
  }
}

/**
 * Creates a root reducer function combining all application reducers to create a single state object, whoes keys correspond to the keys of the passed reducer functions.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the passed object, and builds a state object with the same shape.
 */
export default combineReducers({
  app
});
