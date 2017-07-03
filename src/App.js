import React, { Component } from 'react';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    /** pass children elements directly into the component's output **/
    children: PropTypes.node,
  };

  render() {
    return (
      <div className="App">
        <p>Maria</p>
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

export default App;
