/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 */

/**
 * type for addUrl action
 * @type {String}
 */
export const ADD_URL = 'urlshortner/App/ADD_URL';

/**
 * type for removeUrl action
 * @type {String}
 */
export const REMOVE_URL = 'urlshortner/App/REMOVE_URL';
