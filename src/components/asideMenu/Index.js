import React, { Component, Fragment } from 'react'
import { Link, withRouter } from "react-router-dom";
import Router from '../../router/index'
import { Menu } from 'antd';
// import { MailOutlined } from '@ant-design/icons';
const { SubMenu } = Menu
class AsideMenu extends Component {
  state = {
    selectedKeys:[],
    openKeys:[]
  }
  // 初始化菜单选中
  componentDidMount(){
    const pathname = this.props.location.pathname
    const menuKey = pathname.split("/").slice(0,3).join("/")
    const menu = {
      selectedKeys:[pathname],
      openKeys:[menuKey]
    }
    this.selectMenuHL(menu)
  }
  renderMenu = ({title, key}) => {
    return (
      <Menu.Item key={key}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    )
  }
  renderSubMenu = ({title, key, child}) => {
    return (
      <SubMenu key={key} title={title}>
        {
          child && child.map(item => {
            return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
          })
        }
      </SubMenu>
    )
  }
  // 切换菜单
  handleClick = (e) => {
    const menu = {
      selectedKeys:[e.key],
      openKeys:[e.keyPath[e.keyPath.length - 1]]
    }
    this.selectMenuHL(menu)
  }
  // 菜单高光
  selectMenuHL = ({selectedKeys, openKeys }) => {
    this.setState({
      selectedKeys,
      openKeys
    })
  }
  // 打开子菜单
  openSubMenu = (openKeys) => {
    console.log(openKeys)
    this.setState({
      openKeys:[openKeys[openKeys.length - 1]]
    })
  }
  render() {
    const { selectedKeys, openKeys } = this.state
    return (
      <Fragment>
        <h1 className="logo">
          <span>LOGO</span>
        </h1>
        <Menu
          onOpenChange={this.openSubMenu}
          onClick={this.handleClick}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
        >
          {
            Router && Router.map(item => {
              return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
            })
          }
          {/* <SubMenu
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
          </SubMenu> */}
        </Menu>
      </Fragment>
    )
  }
}

export default withRouter(AsideMenu)
