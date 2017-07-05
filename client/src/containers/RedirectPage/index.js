import React, { Component } from 'react';
import { connect } from 'react-redux';

class RedirectPage extends Component {
  render() {
    return (
      <div className="RedirectPage">
        <p>RedirectPage</p>
      </div>
    );
  }
}

export default connect()(RedirectPage);
