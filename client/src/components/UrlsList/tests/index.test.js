import { shallow, mount } from 'enzyme';
import React from 'react';

import UrlsListItem from '../../UrlsListItem';
import List from '../../List';
import LoadingIndicator from '../../LoadingIndicator';
import UrlsList from '../index';

describe('<UrlsList />', () => {
  it('should render the loading indicator when its loading', () => {
    const renderedComponent = shallow(
      <UrlsList loading />
    );
    expect(renderedComponent.contains(<List component={LoadingIndicator} />)).toEqual(true);
  });

  it('should render an error if loading failed', () => {
    const renderedComponent = mount(
      <UrlsList
        loading={false}
        error={{ message: 'Loading failed!' }}
      />
    );
    expect(renderedComponent.text()).toMatch(/Something went wrong/);
  });

  it('should render the urls if loading was successful', () => {
    const urls = [{
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    }];
    const renderedComponent = shallow(
      <UrlsList
        urls={urls}
        error={false}
      />
    );

    expect(renderedComponent.contains(<List items={urls} component={UrlsListItem} />)).toEqual(true);
  });

  it('should not render anything if nothing interesting is provided', () => {
    const renderedComponent = shallow(
      <UrlsList
        urls={false}
        error={false}
        loading={false}
      />
    );

    expect(renderedComponent.html()).toEqual(null);
  });
});
