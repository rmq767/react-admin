import React from 'react';
import { Switch } from 'react-router-dom'
import User from '../../views/user/index'
import AddUser from '../../views/user/Add'
import PrivateRouter from '../privateRouter/index'//私有组件
function ContainerMain() {
  return (
    <Switch>
      <PrivateRouter exact path="/index/user/list" component={User}></PrivateRouter>
      <PrivateRouter exact path="/index/user/add" component={AddUser}></PrivateRouter>
    </Switch>
  );
}

export default ContainerMain;
