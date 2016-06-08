import {
  APP_INITIALIZE_START,
  APP_INITIALIZE_STOP,
  APP_ACTIVATE,
  APP_DEACTIVATE,
} from '../actions';

const initialState = {
  initialized: false,
  error: null,
  id: null,
  config: null,
  nls: null,
  active: false,
  wkid: null
};

export default function app(state = initialState, action) {
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
};
