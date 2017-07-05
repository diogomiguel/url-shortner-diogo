import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import isEmpty from 'lodash/isEmpty';

import Form from './Form';
import Input from './Input';
import Section from './Section';

import { shortifyUrl, changeUrl } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurUrl,
  makeSelectLastShortified,
} from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state last shortified is not null, submit the form to display the last shortified
   */
  componentDidMount() {
    if (!isEmpty(this.props.url)) {
      this.props.onSubmitForm();
    }
  }

  render() {
    return (
      <article>
        <Section>
          <Form onSubmit={this.props.onSubmitForm}>
            <label htmlFor="url">
              <Input
                id="url"
                type="text"
                placeholder="try me..."
                value={this.props.url}
                onChange={this.props.onChangeUrl}
              />
            </label>
          </Form>
        </Section>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  url: PropTypes.string,
  lastShortified: PropTypes.string,
  onChangeUrl: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading,
  error: makeSelectError,
  url: makeSelectCurUrl,
  lastShortified: makeSelectLastShortified,
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUrl: (evt) => dispatch(changeUrl(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(shortifyUrl());
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
