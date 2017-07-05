/**
 * The Homepage state selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectLoading = createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectError = createSelector(
  selectHome,
  (homeState) => homeState.get('error')
);

const makeSelectCurUrl = createSelector(
  selectHome,
  (homeState) => homeState.get('url')
);

const makeSelectLastShortified = createSelector(
  selectHome,
  (homeState) => homeState.get('lastShortified')
);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurUrl,
  makeSelectLastShortified,
};
