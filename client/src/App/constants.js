/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'urlshortner/Component' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */

/**
 * type for loadUrls action
 * @type {String}
 */
export const LOAD_URLS = 'urlshortner/App/LOAD_URLS';

/**
 * type for loadUrlsSuccess action
 * @type {String}
 */
export const LOAD_URLS_SUCCESS = 'urlshortner/App/LOAD_URLS_SUCCESS';

/**
 * type for loadUrlsError action
 * @type {String}
 */
export const LOAD_URLS_ERROR = 'urlshortner/App/LOAD_URLS_ERROR';
