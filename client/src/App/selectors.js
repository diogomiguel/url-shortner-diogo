/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const selectGlobalUrls = (state) => state.getIn(['global', 'urls']);

const makeSelectAppLoading = createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectAppError = createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

// To be used by router
const makeSelectLocation = createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

// To be used by URLs shortned listings
// Shows most recent first
const makeSelectMappedUrls = createSelector(
  selectGlobalUrls,
  (urls) => urls.reverse().toJS()
);

export {
  selectGlobal,
  makeSelectAppLoading,
  makeSelectAppError,
  makeSelectLocation,
  makeSelectMappedUrls,
};
