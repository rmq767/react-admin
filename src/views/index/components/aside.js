import React, { Component, Fragment } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu
export default class Aside extends Component {
  handleClick = e => {
    console.log('click ', e);
  };
  render() {
    return (
      <Fragment>
        <Menu
          onClick={this.handleClick}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <MailOutlined />
                <span>Navigation One</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 1</Menu.Item>
            <Menu.Item key="10">Option 2</Menu.Item>
            <Menu.Item key="11">Option 3</Menu.Item>
            <Menu.Item key="12">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 5</Menu.Item>
            <Menu.Item key="10">Option 6</Menu.Item>
            <Menu.Item key="11">Option 7</Menu.Item>
            <Menu.Item key="12">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <SettingOutlined />
                <span>Navigation Three</span>
              </span>
            }
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </Fragment>
    )
  }
}
