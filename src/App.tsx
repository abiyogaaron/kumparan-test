import React, { FC } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux';
import ContainerWrapper from './components/ContainerWrapper';
import Users from './pages/users';
import Post from './pages/post';
import Album from './pages/album';
import Photo from './pages/photo';
import 'semantic-ui-css/semantic.min.css';

const App: FC<RouteComponentProps> = (props) => (
  <Provider store={store}>
    <Switch>
      <Route
        exact
        path="/users"
        render={() => (
          <ContainerWrapper>
            <Users {...props} />
          </ContainerWrapper>
        )}
      />
      <Route
        exact
        path="/posts/:userId"
        render={() => (
          <ContainerWrapper>
            <Post {...props} />
          </ContainerWrapper>
        )}
      />
      <Route
        exact
        path="/albums/:userId"
        render={() => (
          <ContainerWrapper>
            <Album {...props} />
          </ContainerWrapper>
        )}
      />
      <Route
        exact
        path="/albums/:albumId/photo"
        render={() => (
          <ContainerWrapper>
            <Photo {...props} />
          </ContainerWrapper>
        )}
      />
    </Switch>
  </Provider>
);

export default App;
