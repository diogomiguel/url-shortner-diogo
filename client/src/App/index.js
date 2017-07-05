import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from '../containers/HomePage/Loadable';

import H1 from '../components/H1';

const AppWrapper = styled.div`
  max-width: calc(600px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 10% 16px 0;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <div id="app">
        <AppWrapper>
          <H1>URL Shortener</H1>
          <Switch>
            <Route exact path="/" component={HomePage} />
          </Switch>
        </AppWrapper>
      </div>
    );
  }
}

export default App;
