import React, { Component } from 'react';
import { connect } from 'react-redux';

class NotFoundPage extends Component {
  render() {
    return (
      <div className="NotFoundPage">
        <p>NotFoundPage</p>
      </div>
    );
  }
}

export default connect()(NotFoundPage);
