import {
  SHORTIFY_URL,
  SHORTIFY_URL_SUCCESS,
  SHORTIFY_URL_ERROR,
  CHANGE_URL,
} from '../constants';

import {
  shortifyUrl,
  shortifyUrlSuccess,
  shortifyUrlError,
  changeUrl,
} from '../actions';

describe('Home Actions', () => {
  describe('shortifyUrl', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: SHORTIFY_URL,
      };

      expect(shortifyUrl()).toEqual(expectedResult);
    });
  });

  describe('shortifyUrlSuccess', () => {
    it('should return the correct type and the passed url shortified', () => {
      const fixture = ['/EAF'];
      const expectedResult = {
        type: SHORTIFY_URL_SUCCESS,
        urlShortified: fixture,
      };

      expect(shortifyUrlSuccess(fixture)).toEqual(expectedResult);
    });
  });

  describe('shortifyUrlError', () => {
    it('should return the correct type and the error', () => {
      const fixture = 'Something went wrong!';
      const expectedResult = {
        type: SHORTIFY_URL_ERROR,
        error: fixture,
      };

      expect(shortifyUrlError(fixture)).toEqual(expectedResult);
    });
  });

  describe('changeUrl', () => {
    it('should return the correct type and the passed url', () => {
      const fixture = 'http://www.maria.pt';
      const expectedResult = {
        type: CHANGE_URL,
        url: fixture,
      };

      expect(changeUrl(fixture)).toEqual(expectedResult);
    });
  });
});
