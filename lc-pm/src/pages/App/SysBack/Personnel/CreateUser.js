import React, { Component } from 'react';
import { Button, Modal, Form, Input, message, Select, Switch, Icon } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const Option = Select.Option;

class CreateUser extends Component {
  state = {
    modal: false,
    swichVisible:false,
    swichCheck:false
  };

  render() {
    const changeSelect = (v) => {
      const {curr} = this.props;
      if (parseInt(v) === curr.depart){
        this.props.form.setFieldsValue({ is_superuser: false });
        this.setState({swichVisible:true,swichCheck:false})
      }else this.setState({swichVisible:false})
    };
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { dispatch } = this.props;
          dispatch({
            type: 'user/createUser',
            payload: values,
            callback: res => {
              if (res) {
                message.success('用户添加成功！');
              } else {
                message.warning('用户可能添加失败了！');
              }
              dispatch({
                type: 'user/fetch',
              });
              this.props.form.resetFields();
            },
          });

          this.setState({ modal: false });
        }
      });
    };
    const handleCancel = () => {
      this.setState({ modal: false });
    };
    const { getFieldDecorator } = this.props.form;
    const { departDir } = this.props;
    const departList = [];
    Object.keys(departDir).forEach(key => departList.push({ id: key, name: departDir[key] }));
    return (
      <div>
        <Button
          onClick={() => this.setState({ modal: true })}
          type="dashed"
          shape="circle"
          icon="plus"
        />
        <Modal title="添加用户" visible={this.state.modal} onOk={handleOk} onCancel={handleCancel}>
          <Form>
            <FormItem label="账号" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('username', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      console.log(value);
                      if (value) {
                        axios.get(`/api/valiUser/?username=${value}`).then(res => {
                          if (res.data === 'OK') {
                            callback();
                          } else callback('账号已经存在，换一个吧！');
                        });
                      } else callback('请输入账号！');
                    },
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名 !' }],
              })(<Input />)}
            </FormItem>
            <FormItem label="部门" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('depart', {
                rules: [{ required: true, message: '请选择部门 !' }],
              })(
                <Select onChange={changeSelect}>
                  {departList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {' '}
                      {item.name}{' '}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
            <FormItem label="是否管理者" labelCol={{ span: 5 }} wrapperCol={{offset:15, span: 2 }}>
              {getFieldDecorator('is_superuser', {
                initialValue: false,
              })(<Switch checked={this.state.swichCheck} onChange={cheack=>this.setState({swichCheck:cheack})} disabled={this.state.swichVisible} size="small" />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CreateUser);
