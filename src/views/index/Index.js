import React, { Component } from 'react'
import './layout.scss'
import LayoutAside from './components/aside'
import LayoutHeader from './components/header'
import { Layout } from 'antd';
const {Sider, Header, Content} = Layout

export default class Index extends Component {
  render() {
    return (
      <Layout className="layout-wrap">
          <Header className="layout-header">
            <LayoutHeader></LayoutHeader>
          </Header>
        <Layout>
          <Sider width="250px">
            <LayoutAside></LayoutAside>
          </Sider>
          <Content className="layout-content">content</Content>
        </Layout>
      </Layout>
    )
  }
}
