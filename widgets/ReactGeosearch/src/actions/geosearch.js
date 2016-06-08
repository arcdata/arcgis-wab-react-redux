import esriRequest from 'esri/request';
import { v4 } from 'node-uuid';

export const SUGGESTION_FETCH = 'SUGGESTION_FETCH';
export const SUGGESTION_RECEIVE = 'SUGGESTION_RECEIVE';
export const SUGGESTION_SELECT = 'SUGGESTION_SELECT';
export const SUGGESTION_GEOMETRY_FETCH = 'SUGGESTION_GEOMETRY_FETCH';
export const SUGGESTION_GEOMETRY_RECEIVE = 'SUGGESTION_GEOMETRY_RECEIVE';

export function suggest(text) {
  return (dispatch, getState) => {
    const state = getState();
    const geosearchUrl = state.app.config.geosearchUrl;

    dispatch({
      type: SUGGESTION_FETCH,
      text: text
    });

    esriRequest({
      url: geosearchUrl + '/suggest',
      callbackParamName: 'callback',
      handleAs: 'json',
      content: {
        f: 'json',
        text: text
      }
    }).then(result => {
      result && result.suggestions ?
        dispatch({
          type: SUGGESTION_RECEIVE,
          text: text,
          suggestions: result.suggestions.reduce((suggestions, suggestion) => {
            const suggestionId = v4();
            suggestions[suggestionId] = {
              id: suggestionId,
              magicKey: suggestion.magicKey,
              text: suggestion.text,
              type: suggestion.type,
              geometry: null,
              loading: false,
              error: null
            };
            return suggestions;
          }, {})
        }) : dispatch({
          type: SUGGESTION_RECEIVE,
          error: new Error('Invalid result returned by the server.')
        });
    }, error => {
      dispatch({
        type: SUGGESTION_RECEIVE,
        error: error
      });
    });
  };
}

export function select(id) {
  return (dispatch, getState) => {
    const state = getState();
    const selectedSuggestion = state.geosearch.suggestions[id];
    const geosearchUrl = state.app.config.geosearchUrl;

    dispatch({
      type: SUGGESTION_SELECT,
      id: id
    });

    if (!selectedSuggestion.geometry && !selectedSuggestion.loading) {
      dispatch({
        type: SUGGESTION_GEOMETRY_FETCH,
        id: id
      });

      esriRequest({
        url: geosearchUrl + '/find',
        callbackParamName: 'callback',
        handleAs: 'json',
        content: {
          f: 'json',
          magicKey: selectedSuggestion.magicKey,
          text: selectedSuggestion.text,
          outSR: state.app.wkid
        }
      }).then(result => {
        result && Array.isArray(result.locations) && result.locations.length === 1 && result.locations[0].feature && result.locations[0].feature.geometry ?
          dispatch({
            type: SUGGESTION_GEOMETRY_RECEIVE,
            id: id,
            geometry: Object.assign({}, {
              spatialReference: {
                wkid: state.app.wkid
              }
            }, result.locations[0].feature.geometry)
          }) : dispatch({
            type: SUGGESTION_GEOMETRY_RECEIVE,
            id: id,
            error: new Error('Invalid result returned by the server.')
          });
      }, error => {
        dispatch({
          type: SUGGESTION_GEOMETRY_RECEIVE,
          id: id,
          error: error
        });
      });
    }
  };
}
