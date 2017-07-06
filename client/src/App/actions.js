/*
 * App Actions
 *
 * Actions change things in your application
 * Since this uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 */

import {
  LOAD_URLS,
  LOAD_URLS_SUCCESS,
  LOAD_URLS_ERROR,
} from './constants';

/**
 * This action triggers saga responsible to retrieve list of saved URLs from API
 *
 * @return {object} An action object with a type of LOAD_URLS
 */
export function loadUrls() {
  return {
    type: LOAD_URLS,
  };
}

/**
 * Action will save to state all the urls returned by API
 *
 * @param {number} id
 * @return {object} An action object with a type of LOAD_URLS_SUCCESS
 */
export function loadUrlsSuccess(urls) {
  return {
    type: LOAD_URLS_SUCCESS,
    urls,
  };
}

/**
 * Action will flag that API returned an error at retrieving the URL list
 *
 * @param {string} error
 * @return {object} An action object with a type of LOAD_URLS_ERROR
 */
export function loadUrlsError(error) {
  return {
    type: LOAD_URLS_ERROR,
    error,
  };
}

