import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import "./styles/main.scss"
import ProvideRouter from './components/privateRouter/index'//私有组件
import Login from './views/login/index';
import Index from './views/index/Index'

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <ProvideRouter path="/index" component={Index}></ProvideRouter>
      </Switch>
    </HashRouter>
  );
}

export default App;
