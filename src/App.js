import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from './views/login/index';
import "./styles/main.scss"

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
