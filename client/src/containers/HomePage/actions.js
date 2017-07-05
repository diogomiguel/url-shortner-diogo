/*
 * HomePage Actions
 */

import {
  SHORTIFY_URL,
  SHORTIFY_URL_ERROR,
  SHORTIFY_URL_SUCCESS,
  CHANGE_URL,
} from './constants';

/**
 * Sends a full url to be shortified
 *
 * @return {object} An action object with a type of SHORTIFY_URL
 */
export function shortifyUrl() {
  return {
    type: SHORTIFY_URL,
  };
}

/**
 * Flags that a shortified Url has been successfully added
 *
 * @param {string} urlShortified
 * @return {object} An action object with a type of SHORTIFY_URL_SUCCESS
 */
export function shortifyUrlSuccess(urlShortified) {
  return {
    type: SHORTIFY_URL_SUCCESS,
    urlShortified,
  };
}

/**
 * Flags that the last shortification produced an error
 *
 * @param {string} url
 * @return {object} An action object with a type of SHORTIFY_URL_ERROR
 */
export function shortifyUrlError(error) {
  return {
    type: SHORTIFY_URL_ERROR,
    error,
  };
}

/**
 * Keeps current form url in state
 *
 * @param {string} url
 * @return {object} An action object with a type of CHANGE_URL
 */
export function changeUrl(url) {
  return {
    type: CHANGE_URL,
    url,
  }
}
