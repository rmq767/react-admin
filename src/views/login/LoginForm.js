import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons';
import {validate_password, validate_email} from '../../utils/validate'//验证
import {Login, GetCode} from '../../api/account'//api

export default class LoginForm extends Component {
  state = {
    username:"",
    code_button_disabled:false,
    code_button_loading:false,
    code_button_text:"获取验证码"
  }
  onFinish = values => {
    Login().then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    console.log('Received values of form: ', values);
  };
  toggleForm = () => {
    this.props.switchForm('register')
  }
  getCode = () => {
    if (!this.state.username) {
      message.warning('用户名不存在！',1);
      return false;
    }
    const requestData = {
      username:this.state.username,
      module:"login"
    }
    GetCode(requestData).then(res => {
      console.log(res)
      this.countDown()
    }).catch(err => {
      this.setState({
        code_button_loading:false,
        code_button_text:"重新发送"
      })
    })
    this.setState({
      code_button_loading:true,
      code_button_text:"发送中"
    })
  }
  inputChange = (e) => {
    this.setState({
      username:e.target.value,
    })
  }
  countDown = () => {
    let sec = 60
    this.setState({
      code_button_disabled:true,
      code_button_loading:false,
      code_button_text:`${sec}s`
    })
    let timer = null
    timer = setInterval(() => {
      sec--;
      if (sec <= 0) {
        clearInterval(timer)
        this.setState({
          code_button_disabled:false,
          code_button_text:"重新发送"
        })
        return false
      }
      this.setState({
        code_button_text:`${sec}s`
      })
    }, 1000);
  }
  render() {
    const {username, code_button_disabled, code_button_loading, code_button_text} = this.state
    const _this = this
    return (
      <div>
        <div className="form-header">
          <h4 className="column">登录</h4>
          <span onClick={this.toggleForm}>账号注册</span>
        </div>
        <div className="form-content">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入邮箱',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (validate_email(value)) {
                      _this.setState({
                        code_button_disabled:false
                      })
                      return Promise.resolve();
                    }else{
                      return Promise.reject('密码不能小于6位');
                    }
                  },
                }),
              ]}
            >
              <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
                // ({ getFieldValue }) => ({
                //   validator(rule, value) {
                //     if (value.length<6) {
                //       return Promise.reject('密码不能小于6位');
                //     }else{
                //       return Promise.resolve();
                //     }
                //   },
                // }),
                {pattern:validate_password,message:"密码需6位到20位的数字加字母"},
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: '验证码不能为空',
                },
                {
                  len: 6,
                  message: '请输入6位验证码',
                },
              ]}
            >
            <Row gutter={13}>
              <Col className="gutter-row" span={14}>
              <Input prefix={<VerifiedOutlined className="site-form-item-icon" />} placeholder="Code" />
              </Col>
              <Col className="gutter-row" span={10}>
              <Button type="danger" block onClick={this.getCode} disabled={code_button_disabled} loading={code_button_loading}>{code_button_text}</Button>
              </Col>
            </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
