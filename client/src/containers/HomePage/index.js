import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import CopyToClipboard from 'react-copy-to-clipboard';

import isEmpty from 'lodash/isEmpty';

import {
  FormGroup,
  InputGroup,
  FormControl,
  HelpBlock,
  Button,
  Alert,
} from 'react-bootstrap';

import H2 from '../../components/H2';
import UrlsList from '../../components/UrlsList';

import { loadUrls } from '../../App/actions';
import { makeSelectAppLoading, makeSelectAppError } from '../../App/selectors';

import Form from './Form';
import Section from './Section';

import { shortifyUrl, changeUrl } from './actions';
import {
  makeSelectHomeLoading,
  makeSelectHomeError,
  makeSelectSuccess,
  makeSelectCurUrl,
  makeSelectLastShortified,
  makeSelectRecentlyShortened,
} from './selectors';

const HelpBlockWhite = styled(HelpBlock)`
  color: #fff;
`;

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * @constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    // Component state for copying function only
    this.state = {
      copied: false,
    };

    this.handleChangeInputUrl = this.handleChangeInputUrl.bind(this);
  }

  /**
   * Orchestrates operations that need doing after component mounts
   */
  componentDidMount() {
    // Load recently shortened list on mount
    this.props.onMountLoad();

    // When initial state last shortified is not null, submit the form to display the last shortified
    if (!isEmpty(this.props.url)) {
      this.props.onSubmitForm();
    }
  }

  /**
   * When component is flagged for updating set copied state to false if no longer in submit success mode
   * @params [object] nextProps
   * @params [object] nextState
   */
  componentWillUpdate(nextProps, nextState) {
    // This is needed to keep our comp state in sink with the app state
    if (!nextProps.success && nextState.copied) {
      this.setState({ copied: false });
    }
  }

  /**
   * Keeps input value in-synch with state
   * @params {HtmlEvent} evt
   */
  handleChangeInputUrl(evt) {
    // If user tries to change it when successful we start from scratch
    if (this.props.success) {
      this.props.onChangeUrl('');
    } else {
      this.props.onChangeUrl(evt.target.value);
    }
  }

  /**
   * Renders form feedback in the form of alert boxes
   */
  renderFeedback() {
    const { success, error, lastShortified } = this.props;

    if (error) {
      return (
        <Alert bsStyle="warning">
          <strong>An error occurred:</strong> {error}
        </Alert>
      );
    } else if (success) {
      return (
        <Alert bsStyle="success">
          <strong>URL successfully shortened:</strong> {lastShortified}
        </Alert>
      );
    }
  }

  render() {
    const {
      loading,
      error,
      success,
      mappedUrls,
      url,
      lastShortified,
      isListLoading,
      isListError,
    } = this.props;



    const urlListProps = {
      loading: isListLoading,
      error: isListError,
      urls: mappedUrls,
    };

    // Set form and components
    let formValidationState = null;
    let buttonBsStyle = 'primary';
    let buttonTxt = 'Shorten';

    if (error) {
      formValidationState = 'error';
      buttonBsStyle = 'danger';
      buttonTxt = 'Error';
    } else if (success) {
      formValidationState = 'success';
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
                    /* Copy functionality with button label changing from copy to copied thanks to comp state */
                    <CopyToClipboard
                      text={lastShortified}
                      onCopy={() => this.setState({ copied: true })}
                    >
                      {this.state.copied ? (
                        <Button bsSize="large" bsStyle='warning' type="button">
                          Copied
                        </Button>
                      ) : (
                        <Button bsSize="large" bsStyle='success' type="button">
                          Copy
                        </Button>
                      )}
                    </CopyToClipboard>
                  ) : (
                    <Button bsSize="large" bsStyle={buttonBsStyle} type="submit" disabled={loading}>
                      {buttonTxt}
                    </Button>
                  )}
                </span>
              </InputGroup>
              {success || error
                ? this.renderFeedback()
                : (
                  <HelpBlockWhite>Insert a valid URL to shorten.</HelpBlockWhite>
                )}
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
  /** @type {Boolean} is app still posting URL to API? **/
  loading: PropTypes.bool,
  /** @type {Boolean} was the last action a successful post submission? **/
  success: PropTypes.bool,
  /** @type {String|Boolean} did the last action produce an error? Which? **/
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /** @type {String} user input value. When success it will be the shortened URL returned **/
  url: PropTypes.string,
  /** @type {String} the last successfully shortened URL if there is one **/
  lastShortified: PropTypes.string,
  /** @type {Array} list of recently shortened URLs **/
  mappedUrls: PropTypes.array,
  /** @type {Boolean} if app is loading so is the list **/
  isListLoading: PropTypes.bool,
  /** @type {String|Boolean} if app has an error it means the list failed to retrieve its items **/
  isListError: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  /** @type {Function} when called fetches a new list of URLs **/
  onMountLoad: PropTypes.func.isRequired,
  /** @type {Function} when called updates the url value in state **/
  onChangeUrl: PropTypes.func.isRequired,
  /** @type {Function} when called submits the current url value to be shortified **/
  onSubmitForm: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // Form
  loading: makeSelectHomeLoading,
  error: makeSelectHomeError,
  success: makeSelectSuccess,
  url: makeSelectCurUrl,
  lastShortified: makeSelectLastShortified,
  // URLs List
  isListLoading: makeSelectAppLoading,
  isListError: makeSelectAppError,
  mappedUrls: makeSelectRecentlyShortened,
});

export function mapDispatchToProps(dispatch) {
  return {
    onMountLoad: () => dispatch(loadUrls()),
    onChangeUrl: (inputValue) => dispatch(changeUrl(inputValue)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(shortifyUrl());
    },
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
