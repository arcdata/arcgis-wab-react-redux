import {
  SUGGESTION_FETCH,
  SUGGESTION_RECEIVE,
  SUGGESTION_SELECT,
  SUGGESTION_GEOMETRY_FETCH,
  SUGGESTION_GEOMETRY_RECEIVE
} from '../actions';

const initialState = {
  loading: false,
  searchText: '',
  suggestions: null,
  selectedSuggestionId: null,
  error: null
};

export default function geosearch(state = initialState, action) {
  switch (action.type) {
    case SUGGESTION_FETCH:
      return Object.assign({}, state, {
        loading: true,
        searchText: action.text,
        suggestions: null,
        selectedSuggestionId: null,
        error: null
      });
    case SUGGESTION_RECEIVE:
      return Object.assign({}, state, {
        loading: false,
        searchText: action.text,
        suggestions: action.suggestions,
        error: action.error
      });
    case SUGGESTION_SELECT:
      return Object.assign({}, state, {
        selectedSuggestionId: action.id
      });
    case SUGGESTION_GEOMETRY_FETCH:
      return Object.assign({}, state, {
        suggestions: Object.assign({}, state.suggestions, {
          [action.id]: Object.assign({}, state.suggestions[action.id], {
            loading: true,
            error: null,
            geometry: null
          })
        })
      });
    case SUGGESTION_GEOMETRY_RECEIVE:
      return Object.assign({}, state, {
        suggestions: Object.assign({}, state.suggestions, {
          [action.id]: Object.assign({}, state.suggestions[action.id], {
            loading: false,
            error: action.error,
            geometry: action.geometry
          })
        })
      });
    default:
      return state;
  }
};
