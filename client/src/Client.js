/* eslint-disable no-undef */

/**
 * Sir get me all the encoded urls please
 *
 * @return {Promise}
 */
function getUrls() {
  return fetch(`/api/urls`, {
    accept: 'application/json',
  })
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Sir post this URL, shortify it and get me the result of this
 *
 * @params [string] url
 * @return {Promise}
 */
function shortifyUrl(url) {
  return fetch(`/api/urls/shortify`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'post',
    body: JSON.stringify({
      url,
    }),
  })
    .then(checkStatus)
    .then(parseJSON);
}

/**
 * Is the API response valid or an error?
 *
 * @params [string] url
 * @return {object|error}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.error(error); // eslint-disable-line no-console
  throw error;
}

/**
 * Parse response to JSON
 *
 * @params [object] response
 * @return {json}
 */
function parseJSON(response) {
  return response.json();
}

const Client = { getUrls, shortifyUrl };
export default Client;
