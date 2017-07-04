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
  ADD_URL,
  REMOVE_URL,
} from './constants';

/**
 * Adds a shortfied URL to our state
 *
 * @param {array} urlMapped
 * @return {object} An action object with a type of ADD_URL
 */
export function addUrl(urlMapped) {
  return {
    type: ADD_URL,
    urlMapped,
  };
}

/**
 * Removes an URL by id from our state
 *
 * @param {number} id
 * @return {object} An action object with a type of REMOVE_URL
 */
export function removeUrl(id) {
  return {
    type: REMOVE_URL,
    id,
  };
}
