export const APP_INITIALIZE_START = 'APP_INITIALIZE_START';
export const APP_INITIALIZE_STOP = 'APP_INITIALIZE_STOP';
export const APP_ACTIVATE = 'APP_ACTIVATE';
export const APP_DEACTIVATE = 'APP_DEACTIVATE';

/**
 * Initializes the application state.
 *
 * @param {Object} options Properties coming from WAB Widget {id, map, config, nls}.
 *
 * @return {Function} Because this action is async, returns function to be processed by redux-thunk middleware.
 */
export function initialize(options) {
  return (dispatch) => {
    const {
      id,
      map,
      config,
      nls
    } = options;

    dispatch({
      type: APP_INITIALIZE_START
    });

    // TODO:  Provide better validation.
    if (id && map && config && nls) {
      if (map.loaded) {
        dispatch({
          type: APP_INITIALIZE_STOP,
          id: id,
          config: config,
          nls: nls,
          wkid: map.spatialReference.wkid
        });
      } else {
        map.on('load', () => {
          dispatch({
            type: APP_INITIALIZE_STOP,
            id: id,
            config: config,
            nls: nls,
            wkid: map.spatialReference.wkid
          });
        });
      }
    } else {
      dispatch({
        type: APP_INITIALIZE_STOP,
        error: new Error('Widget initialization has failed.')
      });
    }
  };
}

/**
 * Activates the app.
 * Usually called when WAB widget is opened.
 *
 * @returns {Object} An action object.
 */
export function activate() {
  return {
    type: APP_ACTIVATE
  };
}

/**
 * Dectivates the app.
 * Usually called when WAB widget is closed.
 *
 * @returns {Object} An action object.
 */
export function deactivate() {
  return {
    type: APP_DEACTIVATE
  };
}
