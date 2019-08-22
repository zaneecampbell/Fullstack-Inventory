import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
// Redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

// if theres a jwt sets it to 'x-auth-token'
// if (localStorage.token) {
//   setAuthToken(localStorage.token);
// }

const App = () => {
  // Checks to see if you have an active token, if so grabs your data.
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Switch>
            <Route exact path='/' component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
