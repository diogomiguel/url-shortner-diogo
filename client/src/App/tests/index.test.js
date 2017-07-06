import React from 'react';
import { assert } from 'chai'
import { shallow } from 'enzyme';
import { Switch, Route } from 'react-router-dom';

import H1 from '../../components/H1';
import App from '../index';

describe('<App />', () => {
  it('should exist', function () {
    assert.isDefined(App);
  });

  it('should render the main title', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(H1).length).toBe(1);
  });

  it('should render the routes Switch', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Switch).length).toBe(1);
  });

  it('should render some routes', () => {
    const renderedComponent = shallow(
      <App />
    );
    expect(renderedComponent.find(Route).length).not.toBe(0);
  });
});
