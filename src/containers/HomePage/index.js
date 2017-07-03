import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <p>HomePage</p>
      </div>
    );
  }
}

export default connect()(HomePage);
