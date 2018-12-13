import React, { Component } from 'react';
import { Button, Modal, Form, Input, message, Select, Switch, Icon } from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const Option = Select.Option;

class UpdateUser extends Component {
  state = {
    modal: false,
  };

  render() {
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { dispatch, record } = this.props;
          dispatch({
            type: 'user/updateUser',
            payload: { ...values, id: record.id },
            callback: res => {
              console.log(res);
              if (res) {
                message.success('用户信息修改成功！');
              } else {
                message.warning('用户信息可能修改失败了！');
              }
              dispatch({
                type: 'user/fetch',
              });
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
    const { record, departDir } = this.props;
    const departList = [];
    Object.keys(departDir).forEach(key =>
      departList.push({ id: parseInt(key), name: departDir[key] })
    );

    return (
      <div>
        <Button
          onClick={() => this.setState({ modal: true })}
          type="primary"
          shape="circle"
          icon="edit"
        />
        <Modal title="添加部门" visible={this.state.modal} onOk={handleOk} onCancel={handleCancel}>
          <Form>
            <FormItem label="账号" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('username', {
                validateTrigger: 'onBlur',
                rules: [
                  {
                    validator: (rule, value, callback) => {
                      console.log(value);
                      if (value) {
                        axios
                          .get(`/api/valiUser/?username=${value}&user_id=${record.id}`)
                          .then(res => {
                            if (res.data === 'OK') {
                              callback();
                            } else callback('账号已经存在，换一个吧！');
                          });
                      } else callback('请输入账号！');
                    },
                  },
                ],
                initialValue: record.username,
              })(<Input />)}
            </FormItem>
            <FormItem label="姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名 !' }],
                initialValue: record.name,
              })(<Input />)}
            </FormItem>
            <FormItem label="部门" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('depart', {
                rules: [{ required: true, message: '请选择部门 !' }],
                initialValue: record.depart,
              })(
                <Select>
                  {departList.map(item => (
                    <Option value={item.id} key={item.id}>
                      {' '}
                      {item.name}{' '}
                    </Option>
                  ))}
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UpdateUser);
