import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import isEmpty from 'lodash/isEmpty';

import { FormGroup, InputGroup, FormControl, HelpBlock, Button } from 'react-bootstrap';

import H2 from '../../components/H2';
import UrlsList from '../../components/UrlsList';

import Form from './Form';
import Section from './Section';

import { shortifyUrl, changeUrl } from './actions';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurUrl,
  makeSelectLastShortified,
  makeSelectRecentlyShortened,
} from './selectors';

const HelpBlockWhite = styled(HelpBlock)`
  color: #fff;
`;

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
    const { loading, error, mappedUrls } = this.props;

    const urlListProps = {
      loading,
      error,
      urls: mappedUrls,
    };

    return (
      <div>
        <Section>
          <Form onSubmit={this.props.onSubmitForm}>
            <FormGroup bsSize="large">
              <InputGroup>
                <FormControl
                  type="text"
                  id="url"
                  placeholder="try me..."
                  value={this.props.url}
                  onChange={this.props.onChangeUrl}
                />
                <span className="input-group-btn">
                  <Button bsSize="large" bsStyle="primary" type="submit">Submit</Button>
                </span>
              </InputGroup>
              <FormControl.Feedback />
              <HelpBlockWhite>Insert a valid URL to shorten.</HelpBlockWhite>
            </FormGroup>
          </Form>
        </Section>
        <Section>
          <H2>Recently Shortened</H2>
          <UrlsList {...urlListProps} />
        </Section>
      </div>
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
  mappedUrls: PropTypes.array,
  onChangeUrl: PropTypes.func,
  onSubmitForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading,
  error: makeSelectError,
  url: makeSelectCurUrl,
  lastShortified: makeSelectLastShortified,
  mappedUrls: makeSelectRecentlyShortened,
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
