import React, { Component } from 'react'
import "./index.scss"
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Login extends Component {
  state = {
    formType:'login'
  }
  switchForm = (value) => {
    this.setState({
      formType:value
    })
  }
  render() {
    const {formType} = this.state
    return (
      <div className="form-wrap">
        {formType==="login"?<LoginForm switchForm={this.switchForm}/>:<RegisterForm switchForm={this.switchForm}/>}
      </div>
    )
  }
}
