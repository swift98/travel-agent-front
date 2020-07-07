import styled from "styled-components";
import titLine from "../static/tit-line.png";

export const HotWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  padding-bottom:20px;
  ul {
    width:1000px;
    margin-top: 20px;
  }
  ul li {
    float:left;
    padding-top:0px;
    padding-bottom:0px;
    margin-right:20px;
    margin-bottom:20px;
    width:230px;
    height:230px;
    position:relative;
    overflow:hidden;
    background-color:#7f7f7f
  }
  ul li img {
    position:absolute;
  }
  ul li a span {
    display:block;
    position:absolute;
    bottom:0px;
    width:100%;
    height:47px;
  }
  ul li a:hover span {
    height:230px;
    filter:alpha(opacity=50);
    -moz-opacity:0.5;
    opacity:0.5;
    background:#000;
  }
  ul li em {
    position:absolute;
    bottom:8px;
    margin-left:10px;
    width:100%;
    height:auto;
    font-size:18px;
    font-style:normal;
    line-height:21px;
    color:#fff;
    text-shadow: 2px 2px 2px #000;
  }
`;

export const Title = styled.h1`
  font-size:30px;
  font-weight:700;
  color:#454545;
  line-height:50px;
  text-align:center;
  background: url(${titLine}) center center no-repeat;
`;

export const HomeWrapper = styled.div`
  backgroundColor: "#fff",
  padding: "15px 15px",
  borderRadius: "8px"
`;
