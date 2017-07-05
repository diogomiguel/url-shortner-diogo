import { combineReducers } from 'redux-immutable';

import {
  SHORTIFY_URL,
  SHORTIFY_URL_ERROR,
  SHORTIFY_URL_SUCCESS,
  CHANGE_URL,
} from './constants';


function loading(state = false, action) {
  switch (action.type) {
    case SHORTIFY_URL:
      return true;
    case SHORTIFY_URL_ERROR:
    case SHORTIFY_URL_SUCCESS:
      return false;
    default:
      return state;
  }
}

function error(state = false, action) {
  switch (action.type) {
    case SHORTIFY_URL_ERROR:
      return action.error;
    case SHORTIFY_URL_SUCCESS:
      return false;
    default:
      return state;
  }
}

function url(state = '', action) {
  switch (action.type) {
    case CHANGE_URL:
      return action.url;
    case SHORTIFY_URL_SUCCESS:
      return action.urlShortified;
    default:
      return state;
  }
}

function lastShortified(state = null, action) {
  switch (action.type) {
    case SHORTIFY_URL_SUCCESS:
      return action.urlShortified;
    case CHANGE_URL:
    case SHORTIFY_URL:
    case SHORTIFY_URL_ERROR:
      return null;
    default:
      return state;
  }
}

export default combineReducers({
  loading,
  error,
  url,
  lastShortified,
});
