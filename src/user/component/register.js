import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Qs from "qs";
import md5 from "md5";
import { Tabs, Input, Button, Icon, Radio, message } from "antd";
import { RegisterWrapper } from "../style";

const { TabPane } = Tabs;

const Register = (props) => {

  const [ tabKey, setTabKey ] = useState("1");
  const [ name, setName ] = useState("");
  const [ sex, setSex ] = useState("男");
  const [ card, setCard ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ password, setPass ] = useState("");
  const [ pass1, setPass1 ] = useState("");
  const [ address, setAddress ] = useState("");

  const TabChange = (key) => {
    setTabKey(key);
    if("1" === key) {
      setName("");
      setPhone("");
      setPass("");
      setPass1("");
      setAddress("");
    } else {
      setName("");
      setSex("");
      setCard("");
      setPhone("");
      setPass("");
      setPass1("");
    }
  };

  const checkVisitorData = () => {
    const pReg = /^[0-9]{11}$/g;
    const cReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    const result = { success: false, msg: "" }
    if(!name.length) {
      result.msg = "姓名不能为空！";
    } else if(!cReg.test(card)) {
      result.msg = "身份证号格式错误！";
    } else if(!pReg.test(phone) || phone.length !== 11) {
      result.msg = "手机号格式错误！";
    } else if(!password.length || !pass1.length) {
      result.msg = "密码不能为空！";
    } else if(password !== pass1) {
      result.msg = "两次密码不一致，请重新输入！";
    } else {result.success = true;result.data = {name, sex, phone, card, password:md5(password)}}
    return result;
  };

  const checkAgentData = () => {
    const pReg = /^[0-9]{11}$/g;
    const result = { success: false, msg: "" }
    if(!name.length) {
      result.msg = "公司名不能为空！";
    } else if(!address.length) {
      result.msg = "公司地址不能为空！";
    } else if(!pReg.test(phone) || phone.length !== 11) {
      result.msg = "手机号格式错误！";
    } else if(!password.length || !pass1.length) {
      result.msg = "密码不能为空！";
    } else if(password !== pass1) {
      result.msg = "两次密码不一致，请重新输入！";
    } else {result.success = true;result.data = {name, address, phone, password:md5(password)}}
    return result;
  };

  const submit = () => {
    const url = tabKey === "1" ? "/user/vRegister" : "/user/aRegister";
    const data = tabKey === "1" ? checkVisitorData() : checkAgentData();
    if(data.success) {
      axios({
        method: "post",
        url,
        data: Qs.stringify(data.data),
        headers: {contentType: "application/x-www-form-urlencoded"}
      }).then(res => {
        res = res.data;
        message.info(res.msg);
        if(res.success) {
          props.history.push("/login");
        }
      }).catch(error => {
        console.log(error);
        message.error("注册失败，请稍后再试！");
      });
    } else message.error(data.msg);
  };

  const visitorForm = <div>
    <Input
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="姓名"
      value={name}
      onChange={e => setName(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="身份证号"
      value={card}
      onChange={e => setCard(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="11位手机号"
      value={phone}
      onChange={e => setPhone(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="密码"
      type="password"
      value={password}
      onChange={e => setPass(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="确认密码"
      type="password"
      value={pass1}
      onChange={e => setPass1(e.target.value)}
    /><br/><br/>
    <Radio.Group defaultValue={sex} onChange={e => setSex(e.target.value)}>
      <Radio value={"男"}>男</Radio>
      <Radio value={"女"}>女</Radio>
    </Radio.Group><br/><br/>
    <Button type="primary" onClick={submit} block>马上注册</Button><br/><br/>
    已有账号？<Link to="/login">去登录</Link>
  </div>

  const agentForm = <div>
    <Input
      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="公司名"
      value={name}
      onChange={e => setName(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="bank" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="公司地址"
      value={address}
      onChange={e => setAddress(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="11位手机号"
      value={phone}
      onChange={e => setPhone(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="密码"
      type="password"
      value={password}
      onChange={e => setPass(e.target.value)}
    /><br/><br/>
    <Input
      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.5)' }} />}
      placeholder="确认密码"
      type="password"
      value={pass1}
      onChange={e => setPass1(e.target.value)}
    /><br/><br/>
    <Button type="primary" onClick={submit} block>马上注册</Button><br/><br/>
    已有账号？<Link to="/login">去登录</Link>
  </div>

  return (<RegisterWrapper>
    <Tabs activeKey={tabKey} onChange={TabChange} tabBarStyle={{textAlign: "center"}}>
      <TabPane tab="游客注册" key="1">
        {visitorForm}
      </TabPane>
      <TabPane tab="旅行社注册" key="2">
        {agentForm}
      </TabPane>
    </Tabs> 
  </RegisterWrapper>);
}

export default Register;
