import React from "react";
import axios from "axios";
import Qs from "qs";
import { connect } from "react-redux";
import { Table, message } from "antd";

const MyTable = (props) => {

  const reserve = (route) => {
    const { login, user } = props;
    if(login && user.role === "visitor") {
      const userId = user.id;
      const phone = user.phone;
      const routeId = route.key;
      const endTime = route.time;
      axios({
        method: "post",
        url: "/route/reserve",
        data: Qs.stringify({
          userId,
          routeId,
          endTime,
          phone
        }),
        headers: {"content-type": "application/x-www-form-urlencoded"}
      }).then(res => {
        message.info(res.data.msg);
      }).catch(error => {
        message.error("操作失败，请检查网络或稍后再试");
      });
    } else if(!login) message.info("请先登录");
    else message.info("您不是游客，无法预定线路");
  }

  const columns = [
    {
      title: '线路名',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '航班',
      dataIndex: 'flight',
      key: 'flight',
      align: 'center'
    },
    {
      title: '航班价格（元）',
      dataIndex: 'flightPrice',
      key: 'flightPrice',
      align: 'center'
    },
    {
      title: '酒店',
      key: 'hotel',
      dataIndex: 'hotel',
      align: 'center'
    },
    {
      title: '酒店价格（元/天）',
      key: 'hotelPrice',
      dataIndex: 'hotelPrice',
      align: 'center'
    },
    {
      title: '时间',
      key: 'time',
      dataIndex: 'time',
      align: 'center',
      width: 150
    },
    {
      title: '时长（天）',
      key: 'period',
      dataIndex: 'period',
      align: 'center'
    },
    {
      title: '其他费用（元）',
      key: 'other',
      dataIndex: 'other',
      align: 'center'
    },
    {
      title: '旅行社',
      key: 'agent',
      dataIndex: 'agent',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      width: 70,
      render: (text, record) => (
        <span 
          onClick={() => reserve(record)} 
          style={{color: "#38f", cursor: "pointer"}}
        >
          预定
        </span>
      ),
    },
  ];

  return (<Table
    columns={columns}
    dataSource={props.routes}
    bordered={true}
    title={() => <h1 align="center">{props.title}</h1>}
  />);
}

const mapStateToProps = (state) => ({
  user: state.user,
  login: state.login
});

export default connect(mapStateToProps, null)(MyTable);

