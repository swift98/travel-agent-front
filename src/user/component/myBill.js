import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Table, message } from "antd";
import { getMyBillAction } from "../../store/action";
import { TableWrapper, Expired, Revoke } from "../style";

class MyBill extends React.Component {

  componentDidMount() {
    if(this.props.user !== null && this.props.user.role === "visitor") {
      this.props.init(this.props.user.id);
    }
  }

  revoke(bill) {
    axios.get(`/route/revoke?id=${bill.key}`).then(res => {
      if(res.data.success) {
        message.success(res.data.msg);
        this.props.init(this.props.user.id);
      } else message.error(res.data.msg);
    }).catch(error => {
      console.log(error);
      message.info("取消失败，发生异常");
    });
  }

  render() {
    const columns = [
      {
        title: '线路名',
        dataIndex: 'routeName',
        key: 'routeName',
        align: 'center'
      },
      {
        title: '交通费（元）',
        dataIndex: 'traffic',
        key: 'traffic',
        align: 'center'
      },
      {
        title: '住宿费（元）',
        dataIndex: 'hotel',
        key: 'hotel',
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
        render: (text, record) => {
          const end = new Date(record.end_time);
          const now = new Date();
          return (end < now ? <Expired>已过期</Expired> : <Revoke onClick={this.revoke.bind(this, record)}>取消预定</Revoke>)},
      },
    ];
    return (this.props.user !== null && this.props.user.role === "visitor" ? <TableWrapper>
      <Table 
        columns={columns} 
        dataSource={this.props.bills}
        bordered={true}
        title={() => <h1 align="center">我的账单</h1>}
      />
    </TableWrapper> : <Redirect to="/" />);
  }
}

const mapStateToProps = (state) => {
  return {
    bills: state.bills,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    init(userId) {
      dispatch(getMyBillAction(userId));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyBill);
