import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Qs from "qs";
import moment from "moment";
import { Form, Input, InputNumber, DatePicker, Button, message } from "antd";
import { TableWrapper, EditWrapper, Title } from "../style";

class EditForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {id: null};
  }

  getRouteByParamId(id) {
    axios.get(`/route/oneRoute?id=${id}`).then(res => {
      if(res.data.success) {
        console.log(res.data.route);
        this.setState(res.data.route);
      }
    }).catch(error => {
      console.log(error);
      message.warn("初始化失败，请稍后再试");
    })
  }

  handleModRoute(data) {
    axios({
      method: "post",
      url: "/route/modRoute",
      headers: {"contentType": "application/x-www-form-urlencoded"},
      data: Qs.stringify(data)
    }).then(res => {
      message.info(res.data.msg);
      if(res.data.success) {
        this.props.history.push("/myRoute");
      }
    }).catch(error => {
      console.log(error);
      message.error("操作失败，请稍后再试");
    });
  }

  handleAddRoute(data) {
    axios({
      method: "post",
      url: "/route/addRoute",
      headers: {"contentType": "application/x-www-form-urlencoded"},
      data: Qs.stringify(data)
    }).then(res => {
      message.info(res.data.msg);
      if(res.data.success) {
        this.props.history.push("/myRoute");
      }
    }).catch(error => {
      console.log(error);
      message.error("操作失败，请稍后重试");
    });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if(id) {
      this.getRouteByParamId(id);
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const id = this.state.id;
    const id_company = this.props.user.id;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err) {
        if(id) {
          const data = {...values, time: values['time'].format('YYYY-MM-DD'), id};
          this.handleModRoute(data);
        } else {
          const data = {...values, time: values['time'].format('YYYY-MM-DD'), id_company};
          console.log(data);
          this.handleAddRoute(data);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, flight, flightPrice, hotel, hotelPrice,
      time, other, period } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 32 },
        sm: { span: 19 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (this.props.user !== null && this.props.user.role === "agent" ? <TableWrapper>
      <EditWrapper>
        <Title>编辑路线</Title><br/>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="路线名">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{
                  required: true,
                  message: "请输入线路名！",
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="航班">
            {getFieldDecorator('flight', {
              initialValue: flight,
              rules: [{
                  required: true,
                  message: "请输入航班号！",
                },
              ],
            })(<Input/>)}
          </Form.Item>
          <Form.Item label="航班价格">
            {getFieldDecorator('flightPrice', {
              initialValue: flightPrice,
              rules: [{
                  required: true,
                  message: "请输入航班价格！",
                },{
                  type: "number",
                  message: "请输入数字"
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="酒店">
            {getFieldDecorator('hotel', {
              initialValue: hotel,
              rules: [{
                  required: true,
                  message: "请输入酒店名！",
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="酒店价格">
            {getFieldDecorator('hotelPrice', {
              initialValue: hotelPrice,
              rules: [{
                  required: true,
                  message: "请输入酒店价格！",
                },{
                  type: "number",
                  message: "请输入数字"
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="其他费用">
            {getFieldDecorator('other', {
              initialValue: other,
              rules: [{
                  required: true,
                  message: "请输入其他费用！",
                },{
                  type: "number",
                  message: "请输入数字"
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item label="开始时间">
            {getFieldDecorator('time', {
              initialValue: moment(time),
              rules: [{
                  type: "object",
                  required: true,
                  message: "请输入开始时间！",
                }
              ],
            })(<DatePicker />)}
          </Form.Item>
          <Form.Item label="时长">
            {getFieldDecorator('period', {
              initialValue: period,
              rules: [{
                  required: true,
                  message: "请输入时长！",
                },{
                  type: "number",
                  message: "请输入数字"
                }
              ],
            })(<InputNumber />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
        </Form>
      </EditWrapper>
    </TableWrapper> : <Redirect to="" />);
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});

const EditRoute = Form.create()(EditForm);
export default connect(mapStateToProps, null)(EditRoute);
