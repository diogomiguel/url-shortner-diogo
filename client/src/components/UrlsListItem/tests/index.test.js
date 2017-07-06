/**
 * Test the repo list item
 */

import React from 'react';
import { shallow, render } from 'enzyme';

import ListItem from '../../ListItem';
import { UrlsListItem } from '../index';

const renderComponent = (props = {}) => render(
  <UrlsListItem {...props} />
);

describe('<UrlsListItem />', () => {
  let item;

  // Before each test reset the item data for safety
  beforeEach(() => {
    item = {
      id: 10,
      short_url: `/8AF`,
      url: 'http://www.maria.pt',
    };
  });

  it('should render a ListItem', () => {
    const renderedComponent = shallow(
      <UrlsListItem item={item} />
    );
    expect(renderedComponent.find(ListItem).length).toBe(1);
  });

  it('should render the ShortLink', () => {
    const renderedComponent = renderComponent({
      item,
    });
    expect(renderedComponent.text()).toContain(item.short_url);
  });

  it('should render the FullUrl', () => {
    const renderedComponent = renderComponent({
      item,
    });
    expect(renderedComponent.text()).toContain(item.url);
  });
});
