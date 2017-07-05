/**
 * UrlsListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem';
import ShortLink from './ShortLink';
import FullUrl from './FullUrl';
import Wrapper from './Wrapper';

export class UrlsListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    const shortenedUrl = `${process.env.REACT_APP_SHORTIFY_HOST}/${item.hash}`;

    // Put together the content of the repository
    const content = (
      <Wrapper>
        <ShortLink href={shortenedUrl} target="_blank">
           {shortenedUrl}
        </ShortLink>
        <FullUrl>
          {item.url}
        </FullUrl>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem key={`url-item-${item.url}`} item={content} />
    );
  }
}

UrlsListItem.propTypes = {
  item: PropTypes.object,
};

export default UrlsListItem;
