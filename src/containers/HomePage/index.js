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
  makeSelectSuccess,
  makeSelectCurUrl,
  makeSelectLastShortified,
  makeSelectRecentlyShortened,
} from './selectors';

const HelpBlockWhite = styled(HelpBlock)`
  color: #fff;
`;

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.handleChangeInputUrl = this.handleChangeInputUrl.bind(this);
  }

  /**
   * when initial state last shortified is not null, submit the form to display the last shortified
   */
  componentDidMount() {
    if (!isEmpty(this.props.url)) {
      this.props.onSubmitForm();
    }
  }

  handleChangeInputUrl(evt) {
    // If user tries to change it when successful we start from scratch
    if (this.props.success) {
      this.props.onChangeUrl('');
    } else {
      this.props.onChangeUrl(evt.target.value);
    }
  }

  render() {
    const { loading, error, success, mappedUrls, url } = this.props;

    const urlListProps = {
      loading,
      error: false,
      urls: mappedUrls,
    };

    // Set form and components
    let formValidationState = null;
    let buttonBsStyle = 'primary';

    if (error) {
      formValidationState = 'error';
      buttonBsStyle = 'danger';
    } else if (success) {
      formValidationState = 'success';
      buttonBsStyle = 'success';
    }

    return (
      <div>
        <Section>
          <Form onSubmit={this.props.onSubmitForm}>
            <FormGroup bsSize="large" validationState={formValidationState}>
              <InputGroup>
                <FormControl
                  type="search"
                  id="url"
                  placeholder="try me..."
                  value={url}
                  onChange={this.handleChangeInputUrl}
                />
                <span className="input-group-btn">
                  {success ? (
                    <Button bsSize="large" bsStyle={buttonBsStyle} type="button">
                      Copy
                    </Button>
                  ) : (
                    <Button bsSize="large" bsStyle={buttonBsStyle} type="submit" disabled={loading}>
                      Shorten
                    </Button>
                  )}
                </span>
              </InputGroup>
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
  success: PropTypes.bool,
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
  success: makeSelectSuccess,
  url: makeSelectCurUrl,
  lastShortified: makeSelectLastShortified,
  mappedUrls: makeSelectRecentlyShortened,
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUrl: (inputValue) => dispatch(changeUrl(inputValue)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(shortifyUrl());
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
