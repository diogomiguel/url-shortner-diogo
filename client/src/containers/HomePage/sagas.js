/**
 * Gets the repositories of the user from Github
 */

import { take, cancel, takeLatest, put, select, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import isEmpty from 'lodash/isEmpty';

import { loadUrls, loadUrlsSuccess, loadUrlsError } from '../../App/actions';
import { LOAD_URLS } from '../../App/constants';
import Client from '../../Client';

import { shortifyUrlSuccess, shortifyUrlError } from './actions';
import { SHORTIFY_URL } from './constants';
import { makeSelectCurUrl } from './selectors';

/**
 * Handles side-effect of shortifyUrl action
 */
function* handleShortifyUrl() {
  try {
    // Get our cur input URL = input value
    const url = yield select(makeSelectCurUrl);

    if (isEmpty(url)) {
      throw new Error('Empty URL');
    }

    // Send through our Client the request to the proxied API
    const response = yield call(Client.shortifyUrl, url);

    if (isEmpty(response) || !response.short_url) {
      throw new Error('Invalid API Response');
    }

    // Flag this was a success and showing the mapped url
    yield put(shortifyUrlSuccess(`${process.env.REACT_APP_SHORTIFY_HOST}${response.short_url}`));

    // Trigger action that retrieves a new URL list
    yield put(loadUrls());
  } catch(error) {
    console.warn(error);

    // Flag this operation as an error
    yield put(shortifyUrlError(error.toString()));
  }
}

/**
 * Handles side-effect of loadUrls action
 */
function* handleLoadUrls() {
  try {
    // Send through our Client the request to the proxied API
    const response = yield call(Client.getUrls);

    if (isEmpty(response) || !response[0].short_url) {
      throw new Error('Invalid API Response');
    }

    // Flag this was a success and set our new list in redux state
    yield put(loadUrlsSuccess(response));
  } catch (error) {
    console.warn(error);

    // Flag this operation as an error
    yield put(loadUrlsError(error.toString()));
  }
}

/**
 * Listens to action shortifyUrl and handles shortification of action's url string
 */
export function* onShortifyUrl() {
  const watcher = yield takeLatest(SHORTIFY_URL, handleShortifyUrl);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/**
 * Listens to action loadUrls and handles retrieving list from API
 */
export function* onLoadUrls() {
  const watcher = yield takeLatest(LOAD_URLS, handleLoadUrls);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onShortifyUrl,
  onLoadUrls,
];