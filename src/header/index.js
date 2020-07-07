import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { Input, Icon, message } from "antd";
import { logoutAction } from "../store/action";
import { HeaderWrapper,
         LinkWrapper,
         Menu,
         Logo
      } from "./style";
import WHUT from "../static/whut.jpg";

const { Search } = Input;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(value, e) {
    e.preventDefault();
    if(value) {
      this.props.history.push(`/search/${value}`);
    } else message.warn("请输入关键字进行搜索");
  }

  render() {

    const { loading, user, logout } = this.props;
    const { show } = this.state;
    const unload = <Fragment>
      <Link to="/login" className="login btn">登录</Link>
      <Link to="/register" className="register btn">注册</Link>
    </Fragment>;
    const load = user !== null ?
      <div className="icon"
        onMouseEnter={() => {this.setState({show: true})}}
        onMouseLeave={() => {this.setState({show: false})}}
      >
        {user.role === "agent" ? <Icon type="bank" /> :<Icon type={user.sex === "男" ? "man" : "woman"} />}
        &nbsp;&nbsp;{user.name}&nbsp;&nbsp;
        <Icon type="caret-down" />
      {show ? <Menu>
        <Link to={user.role === "agent" ? "/myRoute" : "/myBill"}>
          <div className="item">
            <Icon type={user.role === "agent" ? "rise" : "dollar"} />&nbsp;&nbsp;{user.role === "agent" ? "我的路线" : "我的账单"}
          </div>
        </Link>
        {user.role === "agent" ? <Link to="/new_route">
          <div className="item"><Icon type="plus" />&nbsp;&nbsp;添加路线</div></Link> : null}
        <div className="item" onClick={logout}><Icon type="logout" />&nbsp;&nbsp;退出</div>
      </Menu> : null}
    </div> : null;

    return (
      <HeaderWrapper>
        <div className="limit">
          <Logo>
            <a href="http://www.whut.edu.cn" target="_blank" rel="noopener noreferrer">
              <img className="logo" src={WHUT} alt="Logo"/>
              旅行代理
            </a>
          </Logo>
          <LinkWrapper>
            <Link to="/">首页</Link>
            <Link to="/">下载APP</Link>
          </LinkWrapper>
          <Search
              className="search"
              placeholder="搜索线路"
              onSearch={this.handleSearch}
              enterButton
              style={{float: "left", width: "250px", marginTop: "11px"}}
            />
          {loading ? load : unload}
        </div>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.login,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout() {
      dispatch(logoutAction());
      message.info("退出登录");
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
