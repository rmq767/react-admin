import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined,VerifiedOutlined } from '@ant-design/icons';
import Code from "../../components/code/index";
import {validate_pwd, validate_email} from '../../utils/validate'//验证
import {Register} from '../../api/account'//api
import CryptoJS from 'crypto-js'

export default class RegisterForm extends Component {
  state = {
    username:"",
    module:"register"
  }
  onFinish = values => {
    const requestData = {
      username:values.username,
      password:CryptoJS.MD5(values.password).toString(),
      code:values.code,
    }
    Register(requestData).then(res => {
      message.success(res.data.message,3)
      if (res.data.resCode === 0) {
        this.toggleForm()
      }
    }).catch(err => {
      message.error(err,3)
    })
  };
  toggleForm = () => {
    this.props.switchForm('login')
  }
  inputChange = (e) => {
    this.setState({
      username:e.target.value
    })
  }
  render() {
    const {username, module} = this.state
    return (
      <div>
        <div className="form-header">
          <h4 className="column">注册</h4>
          <span onClick={this.toggleForm}>登录</span>
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
                      return Promise.resolve();
                    }else{
                      return Promise.reject('邮箱格式不正确');
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
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    let pwd_value = getFieldValue("passwords")
                    if (!validate_pwd(value)) {
                      return Promise.reject('密码需6位到20位的数字加字母');
                    }
                    if (pwd_value && value !== pwd_value) {
                      return Promise.reject('两次密码不一致');
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="passwords"
              rules={[
                {
                  required: true,
                  message: '请确认密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value!==getFieldValue("password")) {
                      return Promise.reject('两次密码不一致');
                    }else{
                      return Promise.resolve();
                    }
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Check Pwd"
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
                <Code username={username} module={module}></Code>
              </Col>
            </Row>
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" className="login-form-button">
                注册
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
