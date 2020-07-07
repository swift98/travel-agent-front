import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Qs from "qs";
import md5 from "md5";
import { Input, Icon, Radio, Button, message } from "antd";
import { loginAction } from "../../store/action";
import { LoginWrapper } from "../style";

const Login = (props) => {

  const [ account, setAccount ] = useState("");
  const [ password, setPass ] = useState("");
  const [ role, setRole ] = useState(1);

  const { login } = props;

  const submit = (phone, password, flag) => {

    const pReg = /^[0-9]{11}$/g;

    if(!pReg.test(phone) || phone.length !== 11) {
      message.warn("账号格式错误！", 5);
    } else if(password.length <= 0) {
      message.warn("请输入密码！", 5);
    } else {
      axios({
        method: "post",
        url: "/user/login",
        data: Qs.stringify({
          phone,
          password: md5(password),
          flag
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(res => {
        res = res.data;
        message.info(res.msg, 5);
        if(res.success) {
          const role = flag === 1 ? "visitor" : "agent";
          login({...res.user, role});
          props.history.replace("/");
        }
      }).catch(error => {
        console.log(error);
        message.error("登录失败！", 5)
      })
    }
  };

  return (
    <LoginWrapper>
      <Input
        prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.5)' }} />}
        placeholder="11位手机号"
        value={account}
        onChange={e => setAccount(e.target.value)}
      />
      <br/><br/>
      <Input
        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
        value={password}
        type="password"
        placeholder="密码"
        onChange={e => setPass(e.target.value)}
      />
      <br/><br/>
      <Radio.Group defaultValue={role} onChange={e => setRole(e.target.value)}>
        <Radio value={1}>游客登录</Radio>
        <Radio value={0}>旅行社登录</Radio>
      </Radio.Group>
      <br/><br/>
      <Button type="primary" block onClick={e => submit(account, password, role)}>
        登录
      </Button>
      <br/><br/>
      没有账号？<Link to="/register">马上注册</Link>
    </LoginWrapper>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(user) {
      dispatch(loginAction(user));
    }
  }
};

export default connect(null, mapDispatchToProps)(Login);
