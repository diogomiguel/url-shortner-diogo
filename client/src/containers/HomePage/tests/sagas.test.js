/**
 * Tests for HomePage sagas
 */

import { cancel, take, put, takeLatest } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';

import { LOCATION_CHANGE } from 'react-router-redux';

import { loadUrls, loadUrlsSuccess, loadUrlsError } from '../../../App/actions';
import { LOAD_URLS } from '../../../App/constants';

import { shortifyUrlSuccess, shortifyUrlError } from '../actions';
import { SHORTIFY_URL } from '../constants';
import { handleShortifyUrl, handleLoadUrls, onShortifyUrl, onLoadUrls } from '../sagas';

/* eslint-disable redux-saga/yield-effects */
describe('handleShortifyUrl Saga', () => {
  let handleShortifyUrlGenerator;
  const url = 'http://google.co.uk';

  // We have to test twice, once for a successful load and once for an unsuccessful one
  beforeEach(() => {
    handleShortifyUrlGenerator = handleShortifyUrl();

    const selectDescriptor = handleShortifyUrlGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = handleShortifyUrlGenerator.next(url).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the shortifyUrlSuccess action if it requests the data successfully', () => {
    const response = {
      id: 12,
      short_url: `/T1GG`,
      url,
    };
    const putDescriptor = handleShortifyUrlGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(shortifyUrlSuccess(`${process.env.REACT_APP_SHORTIFY_HOST}${response.short_url}`)));

    const loadDescriptior = handleShortifyUrlGenerator.next().value;
    expect(loadDescriptior).toEqual(put(loadUrls()));
  });

  it('should call the shortifyUrlError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = handleShortifyUrlGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(shortifyUrlError(response.toString())));
  });
});

describe('handleLoadUrls Saga', () => {
  let handleLoadUrlsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  beforeEach(() => {
    handleLoadUrlsGenerator = handleLoadUrls();

    const callDescriptor = handleLoadUrlsGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the loadUrlsSuccess action if it requests the data successfully', () => {
    const response = [{
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    }, {
      id: 11,
      short_url: `/EAF`,
      url: 'http://www.maria2.pt',
    }];

    const putDescriptor = handleLoadUrlsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(loadUrlsSuccess(response)));
  });

  it('should call the loadUrlsError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = handleLoadUrlsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loadUrlsError(response.toString())));
  });
});

describe('onShortifyUrl Saga', () => {
  const onShortifyUrlSaga = onShortifyUrl();
  const mockedTask = createMockTask();

  it('should start task to watch for SHORTIFY_URL action', () => {
    const takeLatestDescriptor = onShortifyUrlSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(SHORTIFY_URL, handleShortifyUrl));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = onShortifyUrlSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = onShortifyUrlSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});

describe('onLoadUrls Saga', () => {
  const onLoadUrlsSaga = onLoadUrls();
  const mockedTask = createMockTask();

  it('should start task to watch for LOAD_URLS action', () => {
    const takeLatestDescriptor = onLoadUrlsSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_URLS, handleLoadUrls));
  });

  it('should yield until LOCATION_CHANGE action', () => {
    const takeDescriptor = onLoadUrlsSaga.next(mockedTask).value;
    expect(takeDescriptor).toEqual(take(LOCATION_CHANGE));
  });

  it('should cancel the forked task when LOCATION_CHANGE happens', () => {
    const cancelDescriptor = onLoadUrlsSaga.next().value;
    expect(cancelDescriptor).toEqual(cancel(mockedTask));
  });
});
