import { combineReducers } from 'redux-immutable';

import {
  SET_SHORTIFY_ERROR,
  SET_SHORTIFY_SUCCESS,
} from './constants';


function error(state = false, action) {
  switch (action.type) {
    case SET_SHORTIFY_ERROR:
      return action.error;
    case SET_SHORTIFY_SUCCESS:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  error,
});
