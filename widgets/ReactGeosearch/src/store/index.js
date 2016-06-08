import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';
import rootReducer from '../reducers';

export function configureStore() {
  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middleware)
  );

  store.subscribe(throttle(() => {
    saveState({
      geosearch: store.getState().geosearch
    });
  }, 1000));

  return store;
}
