import React, { Component } from 'react'
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined,VerifiedOutlined } from '@ant-design/icons';

export default class RegisterForm extends Component {
  onFinish = values => {
    console.log('Received values of form: ', values);
  };
  toggleForm = () => {
    this.props.switchForm('login')
  }
  render() {
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
                  message: 'Please input your Username!',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
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
                  message: 'Please check your Password!',
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Check Pwd"
              />
            </Form.Item>
            <Form.Item>
            <Row gutter={13}>
              <Col className="gutter-row" span={16}>
              <Input prefix={<VerifiedOutlined className="site-form-item-icon" />} placeholder="Code" />
              </Col>
              <Col className="gutter-row" span={8}>
              <Button type="danger" block >验证码</Button>
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
