import { fromJS } from 'immutable';

import homeReducer from '../reducer';
import {
  shortifyUrl,
  shortifyUrlSuccess,
  shortifyUrlError,
  changeUrl,
} from '../actions';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      url: '',
      lastShortified: null,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the shortifyUrl action correctly', () => {
    const fixture = '/8AF';
    const expectedResult = state
      .set('loading', true);

    expect(homeReducer(state, shortifyUrl(fixture))).toEqual(expectedResult);
  });

  it('should handle the shortifyUrlSuccess action correctly', () => {
    const fixture = '/BAF';
    const expectedResult = state
      .set('loading', false)
      .set('error', false)
      .set('url', fixture)
      .set('lastShortified', fixture);

    expect(homeReducer(state, shortifyUrlSuccess(fixture))).toEqual(expectedResult);
  });

  it('should handle the shortifyUrlError action correctly', () => {
    const fixture = 'Something went wrong.';
    const expectedResult = state
      .set('loading', false)
      .set('error', fixture)
      .set('lastShortified', null);

    expect(homeReducer(state, shortifyUrlError(fixture))).toEqual(expectedResult);
  });

  it('should handle the changeUrl action correctly', () => {
    const fixture = 'goo';
    const expectedResult = state
      .set('error', false)
      .set('url', fixture)
      .set('lastShortified', null);

    expect(homeReducer(state, changeUrl(fixture))).toEqual(expectedResult);
  });
});
