import React, { FC } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import ContainerWrapper from './components/ContainerWrapper';
import Users from './pages/users';
import 'semantic-ui-css/semantic.min.css';

const App: FC<RouteComponentProps> = () => (
  <Provider store={store}>
    <Switch>
      <Route
        exact
        path="/users"
        render={() => (
          <ContainerWrapper>
            <Users />
          </ContainerWrapper>
        )}
      />
    </Switch>
  </Provider>
);

export default App;
