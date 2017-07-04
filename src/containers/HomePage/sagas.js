/**
 * Gets the repositories of the user from Github
 */

import { take, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { SET_SHORTIFY_ERROR } from './constants';
/**
 * Displays errors handling with shortifying URLs
 */
export function* handleSetShortifyError() {
}

/**
 * Root saga manages watcher lifecycle
 */
export function* onSetShortifyError() {
  const watcher = yield takeLatest(SET_SHORTIFY_ERROR, handleSetShortifyError);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onSetShortifyError,
];