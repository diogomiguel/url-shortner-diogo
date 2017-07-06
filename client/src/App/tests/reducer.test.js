import { fromJS } from 'immutable';

import appReducer from '../reducer';
import {
  loadUrls,
  loadUrlsSuccess,
  loadUrlsError,
} from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      urls: fromJS([]),
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadUrls action correctly', () => {
    const expectedResult = state
      .set('loading', true)
      .set('error', false);

    expect(appReducer(state, loadUrls())).toEqual(expectedResult);
  });

  it('should handle the loadUrlsSuccess action correctly', () => {
    const fixture = [{
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    }];
    const expectedResult = state
      .set('urls', fromJS(fixture))
      .set('loading', false);

    expect(appReducer(state, loadUrlsSuccess(fixture))).toEqual(expectedResult);
  });

  it('should handle the loadUrlsError action correctly', () => {
    const fixture = 'Not found';
    const expectedResult = state
      .set('error', fixture)
      .set('loading', false);

    expect(appReducer(state, loadUrlsError(fixture))).toEqual(expectedResult);
  });
});
