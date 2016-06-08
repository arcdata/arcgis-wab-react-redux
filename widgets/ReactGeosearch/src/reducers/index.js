import { combineReducers } from 'redux';
import app from './app';
import geosearch from './geosearch';

export default combineReducers({
  app,
  geosearch
});
