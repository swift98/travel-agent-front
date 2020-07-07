import styled from "styled-components";

//头部最外层的div，包含登录注册按钮，用户名信息的组件的样式
export const HeaderWrapper = styled.div`
  width: 100%;
  height: 56px;
  line-height: 56px;
  font-size: 17px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  .limit {
    min-width:1000px;
    max-width:1250px;
    margin:0 auto;
    .btn {
      margin: 0 10px;
      diaplay: block;
      height: 38px;
      width: 78px;
      line-height: 38px;
      border-radius: 8px;
      float: right;
      margin-top: 9px;
      color: #ec7259;
      border: 1px solid #ec7259;
      text-align: center;
    }
    .btn:hover {
      background-color: #fef8f7;
    }
    .icon {
      height: 56px;
      float: right;
      cursor: default;
      padding: 0 5px;
      position: relative;
      :hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

//展示用户信息的下拉菜单
export const Menu = styled.div`
  z-index: 1000;
  position: absolute;
  top: 56px;
  left: 0;
  background-color: #fff;
  .item {
    padding: 5px 15px;
    width: 150px;
    text-align: center;
    :hover {
      background-color: #f5f5f5;
    }
  }
`;

//头部左侧的Logo
export const Logo = styled.div`
  float: left;
  cursor: pointer;
  height: 56px;
  font-weight: bold;
  a {
    color: #333;
    :hover {
      color: #444;
    }
  }
  .logo {
    width: 54px;
    margin-right: 15px;
  }
`;

//头部的主页，搜索等按钮的外层div
export const LinkWrapper = styled.div`
  float: left;
  margin-left: 100px;
  margin-right: 100px;
  height: 56px;
  a {
    color: #333;
    padding: 0 15px;
    display: inline-block;
    :hover {
      color: #333;
      background-color: #f5f5f5;
    }
  }
`;
