import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

/**
 * Creates a Redux store.
 * Configures a Redux store with application reducers and middleware.
 *
 * @returns {Object} A Redux store object holding the state of the application and the central dispatcher of actions.
 */
export function configureStore() {
  // Use thunk middleware providing support for async actions.
  const middleware = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    // Use logger middleware to log all application actions to the console (use only in development environment).
    middleware.push(createLogger());
  }
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );

  return store;
}
