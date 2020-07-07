import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Table, message } from "antd";
import { getMyRouteAction } from "../../store/action";
import { TableWrapper } from "../style";

class MyRoute extends React.Component {

  componentDidMount() {
    if(this.props.user !== null && this.props.user.role === "agent") {
      this.props.init(this.props.user.id);
    }
  }

  deleteRoute(routeId) {
    axios.get(`/route/delRoute?id=${routeId}`).then(res => {
      message.info(res.data.msg);
      if(res.data.success) {
        this.props.init(this.props.user.id);
      }
    }).catch(error => {
      console.log(error);
      message.info("发生异常，请稍后再试");
    });
  }

  render() {
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
        title: '操作',
        key: 'action',
        align: 'center',
        width: 120,
        render: (text, record) => (
          <Fragment>
            <span style={{color: "#38f", cursor: "pointer", paddingRight: "10px"}}>
              <Link to={`/edit/${record.key}`}>修改</Link>
            </span>
            |
            <span
              onClick={this.deleteRoute.bind(this, record.key)}
              style={{color: "#38f", cursor: "pointer", paddingLeft: "10px"}}
            >
              删除
            </span>
          </Fragment>
        ),
      },
    ];
    return (this.props.user !== null && this.props.user.role === "agent" ? <TableWrapper>
      <Table
        columns={columns}
        dataSource={this.props.routes}
        bordered={true}
        title={() => <h1 align="center">我的路线</h1>}
      />
    </TableWrapper> : <Redirect to="/" />);
  }
}

const mapStateToProps = (state) => {
  return {
    routes: state.myRoute,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init(agentId) {
      dispatch(getMyRouteAction(agentId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRoute);
