import React from 'react';
import { shallow, render } from 'enzyme';

import FullUrl from '../FullUrl';

describe('<FullUrl />', () => {
  it('should render an <span> tag', () => {
    const renderedComponent = render(<FullUrl />);
    expect(renderedComponent.find('span').length).toEqual(1);
  });

  it('should adopt a valid attribute', () => {
    const id = 'test';
    const renderedComponent = shallow(<FullUrl id={id} />);
    expect(renderedComponent.prop('id')).toEqual(id);
  });

  it('should not adopt an invalid attribute', () => {
    const renderedComponent = shallow(<FullUrl attribute={'test'} />);
    expect(renderedComponent.prop('attribute')).toBeUndefined();
  });
});
