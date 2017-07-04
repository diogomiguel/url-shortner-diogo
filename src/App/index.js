import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from '../containers/HomePage/Loadable';
import RedirectPage from '../containers/RedirectPage/Loadable';
import NotFoundPage from '../containers/NotFoundPage/Loadable';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/404" component={NotFoundPage} />
          <Route path="" component={RedirectPage} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
