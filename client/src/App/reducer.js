/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 */
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';

import {
  LOAD_URLS,
  LOAD_URLS_SUCCESS,
  LOAD_URLS_ERROR,
} from './constants';

function loading(state = false, action) {
  switch (action.type) {
    case LOAD_URLS:
      return true;
    case LOAD_URLS_SUCCESS:
    case LOAD_URLS_ERROR:
      return false;
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case LOAD_URLS_ERROR:
      return action.error;
    case LOAD_URLS:
    case LOAD_URLS_SUCCESS:
      return false;
    default:
      return state;
  }
}

// Stores last retrieved list of shortened URLs
// This only synchs with server storage when a request has been made
function urls(state = [], action) {
  switch (action.type) {
    case LOAD_URLS_SUCCESS:
      return fromJS(action.urls);
    default:
      return fromJS(state);
  }
}

export default combineReducers({
  loading,
  error,
  urls,
});
