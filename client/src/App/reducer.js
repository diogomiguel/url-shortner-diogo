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
  ADD_URL,
  REMOVE_URL,
} from './constants';

function urls(state = [], action) {
  switch (action.type) {
    case ADD_URL:
      return fromJS(state.push(action.urlMapped));
    case REMOVE_URL:
      return state.filter((item) => item.id !== action.id)
    default:
      return fromJS(state);
  }
}



export default combineReducers({
  urls,
});
