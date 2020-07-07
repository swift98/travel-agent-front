import React from "react";
import { HotWrapper, Title } from "../style";

const data = [
  {
    key: 1,
    name: "厦门园林植物园",
    src: "des_pic00001.jpg",
    href: "http://xm.visitxm.com/news/1529477924706.html"
  },
  {
    key: 2,
    name: "梦幻海岸",
    src: "des_pic00013.jpg",
    href: "http://xm.visitxm.com/news/1529476601793.html"
  },
  {
    key: 3,
    name: "云上厦门",
    src: "des_pic00012.jpg",
    href: "http://xm.visitxm.com/news/1530694863090.html"
  },
  {
    key: 4,
    name: "日月谷温泉渡假村",
    src: "des_pic00007.jpg",
    href: "http://xm.visitxm.com/news/1529455645995.html"
  },
  {
    key: 5,
    name: "胡里山炮台",
    src: "des_pic00006.jpg",
    href: "http://xm.visitxm.com/news/1529465511952.html"
  },
  {
    key: 6,
    name: "中山路",
    src: "des_pic00005.jpg",
    href: "http://xm.visitxm.com/news/1530694435977.html"
  },
  {
    key: 7,
    name: "环岛路",
    src: "des_pic00004.jpg",
    href: "http://xm.visitxm.com/news/1530694206313.html"
  },
  {
    key: 8,
    name: "诚毅科技探索中心",
    src: "cyts3.jpg",
    href: "http://xm.visitxm.com/news/1529477224140.html"
  },
  // {
  //   key: 9,
  //   name: "曾厝垵",
  //   src: "http://xm.visitxm.com/tpImagesUpload/hot_small/des_pic00002.jpg",
  //   href: "http://xm.visitxm.com/news/1529398742087.html"
  // }
];

data.forEach(item => {
  item.src = require("../../static/" + item.src);
});

export default () => {

  const pics = data.map(item => {
    return (<li key={item.key}>
      <a href={item.href} target="_blank" rel="noopener noreferrer">
        <img src={item.src} alt={item.name}/>
        <span></span>
        <em>{item.name}</em>
      </a>
    </li>);
  });

  return (<HotWrapper>
    <Title>热门推荐</Title>
    <ul>{pics}</ul>
  </HotWrapper>);
}
