import React from 'react';
import PropTypes from 'prop-types';

import List from '../List';
import ListItem from '../ListItem';
import LoadingIndicator from '../LoadingIndicator';
import UrlsListItem from '../UrlsListItem';

function UrlsList({ loading, error, urls }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (urls !== false) {
    return <List items={urls} component={UrlsListItem} />;
  }

  return null;
}

UrlsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  urls: PropTypes.any,
};

export default UrlsList;
