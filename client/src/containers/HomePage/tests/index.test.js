/**
 * Test the HomePage
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { loadUrls } from '../../../App/actions';
import UrlsList from '../../../components/UrlsList';
import { HomePage, mapDispatchToProps } from '../index';
import { changeUrl, shortifyUrl } from '../actions';

const fixtureRequireds = {
  onMountLoad: () => {},
  onChangeUrl: () => {},
  onSubmitForm: () => {},
};

describe('<HomePage />', () => {
  it('should render the urls list', () => {
    const renderedComponent = shallow(
      <HomePage {...fixtureRequireds} isListLoading isListError={false} mappedUrls={[]} />
    );
    expect(renderedComponent.contains(<UrlsList loading error={false} urls={[]} />)).toEqual(true);
  });

  it('should call onMountLoad on mount', () => {
    const mountLoadSpy = jest.fn();
    mount(
      <HomePage
        {...fixtureRequireds}
        onMountLoad={mountLoadSpy}
      />
    );
    expect(mountLoadSpy).toHaveBeenCalled();
  });

  it('should call onSubmitForm on mount if state input url value not empty', () => {
    const submitSpy = jest.fn();
    mount(
      <HomePage
        {...fixtureRequireds}
        url="Not Empty"
        onSubmitForm={submitSpy}
      />
    );
    expect(submitSpy).toHaveBeenCalled();
  });

  it('should not call onSubmitForm if state input url value is an empty string', () => {
    const submitSpy = jest.fn();
    mount(
      <HomePage
        {...fixtureRequireds}
        onSubmitForm={submitSpy}
      />
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should not call onSubmitForm if state input url value is null', () => {
    const submitSpy = jest.fn();
    mount(
      <HomePage
        {...fixtureRequireds}
        url=""
        onSubmitForm={submitSpy}
      />
    );
    expect(submitSpy).not.toHaveBeenCalled();
  });

  it('should set component state copied to false if updated with success=false', () => {
    const renderedComponent = shallow(
      <HomePage {...fixtureRequireds} loading={false} error={false} success={true} />
    );

    // Copy hasn't changed because success is false
    renderedComponent.setState({
      copied: true,
    });
    renderedComponent.setProps({ success: true });
    expect(renderedComponent.state().copied).toBe(true);

    // Copy has changed because success is true
    expect(renderedComponent.setProps({ success: false, lastShortified: 'http://df3' }));
    expect(renderedComponent.state().copied).toBe(false);
  });

  it('should call onChangeUrl with the target value on inputChange', () => {
    const changeInputSpy = jest.fn();
    const mountedComponent = mount(
      <HomePage
        {...fixtureRequireds}
        onChangeUrl={changeInputSpy}
      />
    );
    const fixture = 'Some Url';

    // Simulate input change
    const input = mountedComponent.find('input');
    input.get(0).value = fixture;
    input.first().simulate('change');

    expect(changeInputSpy).toHaveBeenCalled();
    expect(changeInputSpy.mock.calls[0][0]).toBe(fixture);
  });

  it('should call onChangeUrl with the target value empty if success=true', () => {
    const changeInputSpy = jest.fn();
    const mountedComponent = mount(
      <HomePage
        {...fixtureRequireds}
        onChangeUrl={changeInputSpy}
        success={true}
      />
    );

    // Simulate input change
    const input = mountedComponent.find('input');
    input.get(0).value = 'Something';
    input.first().simulate('change');

    expect(changeInputSpy).toHaveBeenCalled();
    expect(changeInputSpy.mock.calls[0][0]).toBe('');
  });

  describe('mapDispatchToProps', () => {
    describe('onChangeUrl', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onChangeUrl).toBeDefined();
      });

      it('should dispatch changeUrl when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        const url = 'http://maria.com';
        result.onChangeUrl(url);
        expect(dispatch).toHaveBeenCalledWith(changeUrl(url));
      });
    });

    describe('onMountLoad', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onMountLoad).toBeDefined();
      });

      it('should dispatch loadUrls when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onMountLoad();
        expect(dispatch).toHaveBeenCalledWith(loadUrls());
      });
    });

    describe('onSubmitForm', () => {
      it('should be injected', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        expect(result.onSubmitForm).toBeDefined();
      });

      it('should dispatch shortifyUrl when called', () => {
        const dispatch = jest.fn();
        const result = mapDispatchToProps(dispatch);
        result.onSubmitForm();
        expect(dispatch).toHaveBeenCalledWith(shortifyUrl());
      });

      it('should preventDefault if called with event', () => {
        const preventDefault = jest.fn();
        const result = mapDispatchToProps(() => {});
        const evt = { preventDefault };
        result.onSubmitForm(evt);
        expect(preventDefault).toHaveBeenCalledWith();
      });
    });
  });
});
