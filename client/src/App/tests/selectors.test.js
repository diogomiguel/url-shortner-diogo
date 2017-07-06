import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectAppLoading,
  makeSelectAppError,
  makeSelectMappedUrls,
  makeSelectLocation,
} from '../selectors';

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectAppLoading;
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectAppError;
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectMappedUrls', () => {
  const mappedUrlsSelector = makeSelectMappedUrls;
  it('should select the repos', () => {
    const urls = fromJS([{
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    }, {
      id: 11,
      short_url: `/EAF`,
      url: 'http://www.maria2.pt',
    }]);
    const mockedState = fromJS({
      global: {
        urls,
      },
    });
    expect(mappedUrlsSelector(mockedState)).toEqual(urls.reverse().toJS());
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation;
  it('should select the location', () => {
    const route = fromJS({
      location: { pathname: '/pois' },
    });
    const mockedState = fromJS({
      route,
    });
    expect(locationStateSelector(mockedState)).toEqual(route.get('location').toJS());
  });
});
