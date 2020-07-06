import React, { Component } from 'react'
import { MenuFoldOutlined } from "@ant-design/icons";

import './header.scss'
export default class Header extends Component {
  toggleCollapsed = () => {
    this.props.changeCollapsed()
  };
  render() {
    return (
      <div>
        <div className="header-wrap">
          <span className="collapsed-icon" onClick={this.toggleCollapsed}><MenuFoldOutlined /></span>
        </div>
      </div>
    )
  }
}
