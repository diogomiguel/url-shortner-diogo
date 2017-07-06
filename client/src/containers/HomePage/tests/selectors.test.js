import { fromJS } from 'immutable';

import { LIST_URLS_MAX } from '../constants';
import {
  makeSelectHomeLoading,
  makeSelectHomeError,
  makeSelectCurUrl,
  makeSelectLastShortified,
  makeSelectRecentlyShortened,
  makeSelectSuccess,
} from '../selectors';

describe('makeSelectHomeLoading', () => {
  const loadingSelector = makeSelectHomeLoading;
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      home: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectHomeError', () => {
  const errorSelector = makeSelectHomeError;
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      home: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectCurUrl', () => {
  const curUrlSelector = makeSelectCurUrl;
  it('should select current url', () => {
    const url = 'http://www.maria2.pt';
    const mockedState = fromJS({
      home: {
        url,
      },
    });
    expect(curUrlSelector(mockedState)).toEqual(url);
  });
});

describe('makeSelectLastShortified', () => {
  const lastShortifiedSelector = makeSelectLastShortified;
  it('should select current url', () => {
    const lastShortified = 'http://localhost:3000/8AF';
    const mockedState = fromJS({
      home: {
        lastShortified,
      },
    });
    expect(lastShortifiedSelector(mockedState)).toEqual(lastShortified);
  });
});

describe('makeSelectRecentlyShortened', () => {
  const recentlyShortenedSelector = makeSelectRecentlyShortened;
  it(`should select up to ${LIST_URLS_MAX} retrieved urls if more than that provided`, () => {
    // Create a mock with 12 items
    const urls12 = Array(12).fill({
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    });

    const mockedState = fromJS({
      global: {
        urls: urls12,
      },
    });

    const result = recentlyShortenedSelector(mockedState);

    // Should be LIST_URLS_MAX
    expect(result).toHaveLength(LIST_URLS_MAX);
    expect(result).toContainEqual(urls12[0]);
  });

  it(`should select all retrieved urls if less than ${LIST_URLS_MAX} that provided`, () => {
    // Create a mock with 12 items
    const urls9 = Array(9).fill({
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    });

    const mockedState = fromJS({
      global: {
        urls: urls9,
      },
    });

    const result = recentlyShortenedSelector(mockedState);

    // Should be LIST_URLS_MAX
    expect(result).toHaveLength(urls9.length);
    expect(result).toContainEqual(urls9[0]);
  });
});

describe('makeSelectSuccess', () => {
  const successSelector = makeSelectSuccess;
  const homeError = 'Some Error';
  const lastShortified = 'http://localhost:3000/8AF';

  it('should return false if home as error', () => {
    const mockedState = fromJS({
      home: {
        error: homeError,
        lastShortified: lastShortified,
      },
    });
    expect(successSelector(mockedState)).toEqual(false);
  });

  it('should return false if lastShortified is empty', () => {
    const mockedState = fromJS({
      home: {
        error: false,
        lastShortified: '',
      },
    });
    expect(successSelector(mockedState)).toEqual(false);
  });

  it('should return true if lastShortified is not empty and home is not in error', () => {
    const mockedState = fromJS({
      home: {
        error: false,
        lastShortified: lastShortified,
      },
    });
    expect(successSelector(mockedState)).toEqual(true);
  });
});

