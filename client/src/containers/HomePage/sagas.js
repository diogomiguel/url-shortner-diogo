/**
 * Gets the repositories of the user from Github
 */

import { take, cancel, takeLatest, put, select, call } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import normalizeUrl from 'normalize-url';

import isEmpty from 'lodash/isEmpty';

import shortify from '../../utils/shortify';

import { addUrl } from '../../App/actions';
import { makeSelectNextUniqueId } from '../../App/selectors';

import { shortifyUrlSuccess, shortifyUrlError } from './actions';
import { SHORTIFY_URL } from './constants';
import { makeSelectCurUrl } from './selectors';


function* handleShortifyUrl() {
  try {
    // Get our cur input URL = input value
    const url = yield select(makeSelectCurUrl);

    if (isEmpty(url)) {
      throw new Error('Empty URL');
    }

    // Standardise URL format
    const normalizedUrl = normalizeUrl(url);

    // Create a uniq id based on existing list of URLs
    const uniqId = yield select(makeSelectNextUniqueId);

    // Create our hash based on the uniqId
    const hash = yield call(shortify, uniqId);

    const urlMapped = {
      id: uniqId,
      url: normalizedUrl,
      hash,
    };

    // Add mapped object to global state list
    yield put(addUrl(urlMapped));

    // Flag this was a success and showing the mapped url
    yield put(shortifyUrlSuccess(`${process.env.REACT_APP_SHORTIFY_HOST}/${hash}`));
  } catch(error) {
    console.warn(error);

    // Flag this operation as an error
    yield put(shortifyUrlError(error.toString()));
  }
}

export function* onShortifyUrl() {
  const watcher = yield takeLatest(SHORTIFY_URL, handleShortifyUrl);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  onShortifyUrl,
];