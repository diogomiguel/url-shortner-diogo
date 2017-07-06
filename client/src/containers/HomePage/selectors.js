/**
 * The Homepage state selectors
 */

import { createSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';

import { makeSelectMappedUrls } from '../../App/selectors';

import { LIST_URLS_MAX } from './constants';

const selectHome = (state) => state.get('home');

const makeSelectHomeLoading = createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectHomeError = createSelector(
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

const makeSelectRecentlyShortened = createSelector(
  makeSelectMappedUrls,
  (urls) => urls.slice(0, LIST_URLS_MAX)
);

const makeSelectSuccess = createSelector(
  makeSelectHomeError,
  makeSelectLastShortified,
  (isError, lastUrl) => !isError && !isEmpty(lastUrl)
);

export {
  makeSelectHomeLoading,
  makeSelectHomeError,
  makeSelectCurUrl,
  makeSelectLastShortified,
  makeSelectRecentlyShortened,
  makeSelectSuccess,
};
