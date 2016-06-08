export const APP_INITIALIZE_START = 'APP_INITIALIZE_START';
export const APP_INITIALIZE_STOP = 'APP_INITIALIZE_STOP';
export const APP_ACTIVATE = 'APP_ACTIVATE';
export const APP_DEACTIVATE = 'APP_DEACTIVATE';

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

export function activate() {
  return {
    type: APP_ACTIVATE
  };
}

export function deactivate() {
  return {
    type: APP_DEACTIVATE
  };
}
