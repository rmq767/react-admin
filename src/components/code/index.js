import React, { Component } from 'react'
import { Button, message } from 'antd';
import { GetCode} from '../../api/account'//api
import { validate_email } from '../../utils/validate'//验证

let timer = null

export default class Code extends Component {
     state = {
        username:this.props.username,
        button_text:"发送验证码",
        button_disabled:this.props.button_disabled,
        button_loading:false,
        module:this.props.module
      }
  // 接收父组件传来的props
  componentWillReceiveProps({username,button_disabled}){
    this.setState({
      username,
      button_disabled
    })
  }
  // 组件销毁
  componentWillUnmount(){
    clearInterval(timer)
  }
  // 获取验证码
  getCode = () => {
    const {username, module} = this.state
    if (!username) {
      message.warning('用户名不存在！',1);
      return false;
    }
    if (!validate_email(username)) {
      message.warning('邮箱格式不正确',1);
      return false;
    }
    const requestData = {
      username,
      module
    }
    GetCode(requestData).then(res => {
      this.countDown()
      message.success(res.data.message,3);
    }).catch(err => {
      this.setState({
        button_loading:false,
        button_text:"重新发送"
      })
    })
    this.setState({
      button_loading:true,
      button_text:"发送中"
    })
  }
  // 倒计时
  countDown = () => {
    let sec = 60
    this.setState({
      button_disabled:true,
      button_loading:false,
      button_text:`${sec}s`
    })
    timer = setInterval(() => {
      sec--;
      if (sec <= 0) {
        clearInterval(timer)
        this.setState({
          button_disabled:false,
          button_text:"重新发送"
        })
        return false
      }
      this.setState({
        button_text:`${sec}s`
      })
    }, 1000);
  }
  render() {
    const {button_disabled, button_loading, button_text} = this.state
    return (
      <Button type="danger" block onClick={this.getCode} disabled={button_disabled} loading={button_loading}>{button_text}</Button>
    )
  }
}
