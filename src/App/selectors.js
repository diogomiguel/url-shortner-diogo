/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const selectGlobalUrls = (state) => state.getIn(['global', 'urls']);

const makeSelectLoading = createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectLocation = createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectMappedUrls = createSelector(
  selectGlobalUrls,
  (urls) => urls.toJS()
);

const makeSelectNextUniqueId = createSelector(
  selectGlobalUrls,
  (urls) => {
    const highestId = urls.reduceRight((sum, url) => {
      const idNum = Number(url.get('id'));
      // Return the highest id, now or the accum ?
      return Math.max(idNum, sum);
    }, 0);

    return highestId + 1;
  }
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocation,
  makeSelectMappedUrls,
  makeSelectNextUniqueId,
};
