import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import About from './views/About';
import Home from './views/Home';
import './styles/App.scss';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/about" component={About}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
