/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';

import homePageReducer from './containers/HomePage/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

/**
 * Merge route into the global application state
 * @param {Map=@routeInitialState} state
 * @param {Object} action
 */
function location(state = null, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return fromJS(action.payload);
    default:
      return fromJS(state);
  }
}
const routeReducer = combineReducers({ location });

/**
 * Creates the main reducer
 * @param {Object} asyncReducers
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    homePage: homePageReducer,
    ...asyncReducers,
  });
}
