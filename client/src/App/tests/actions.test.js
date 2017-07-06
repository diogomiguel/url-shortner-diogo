import {
  LOAD_URLS,
  LOAD_URLS_SUCCESS,
  LOAD_URLS_ERROR,
} from '../constants';

import {
  loadUrls,
  loadUrlsSuccess,
  loadUrlsError,
} from '../actions';

describe('App Actions', () => {
  describe('loadUrls', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_URLS,
      };

      expect(loadUrls()).toEqual(expectedResult);
    });
  });

  describe('loadUrlsSuccess', () => {
    it('should return the correct type and the passed urls', () => {
      const fixture = ['Test'];
      const expectedResult = {
        type: LOAD_URLS_SUCCESS,
        urls: fixture,
      };

      expect(loadUrlsSuccess(fixture)).toEqual(expectedResult);
    });
  });

  describe('loadUrlsError', () => {
    it('should return the correct type and the error', () => {
      const fixture = 'Something went wrong!';
      const expectedResult = {
        type: LOAD_URLS_ERROR,
        error: fixture,
      };

      expect(loadUrlsError(fixture)).toEqual(expectedResult);
    });
  });
});
