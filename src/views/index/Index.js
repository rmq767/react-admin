import React, { Component } from 'react'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import ContainerMain from '../../components/containerMain/index'
import { Layout } from 'antd';
const {Sider, Header, Content} = Layout

export default class Index extends Component {
  state = {
    collapsed:true
  }
  changeCollapsed = () => {
    const collapsed = !this.state.collapsed
    this.setState({
      collapsed
    })
    sessionStorage.setItem("collapsed",collapsed)
  }
  componentDidMount(){
    const collapsed = JSON.parse(sessionStorage.getItem("collapsed"))
    this.setState({
      collapsed
    })
  }
  render() {
    return (
      <Layout className="layout-wrap">
          <Sider width="250px" collapsed={this.state.collapsed}>
            <LayoutAside></LayoutAside>
          </Sider>
        <Layout>
          <Header className="layout-header">
            <LayoutHeader changeCollapsed={this.changeCollapsed}></LayoutHeader>
          </Header>
          <Content className="layout-content">
            <ContainerMain></ContainerMain>
          </Content>
        </Layout>
      </Layout>
    )
  }
}
