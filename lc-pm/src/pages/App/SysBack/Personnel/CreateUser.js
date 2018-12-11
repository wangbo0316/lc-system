import React, { Component } from 'react';
import { Button, Modal, Form, Input, message, Select, Switch, Icon } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class CreateUser extends Component {
  state = {
    modal: false,
  };

  render() {
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
                rules: [{ required: true, message: '请输入账号 !' }],
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
            <FormItem label="是否管理者" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('is_superuser', {
                rules: [{ required: true, message: '请输入账号 !' }],
                initialValue: true,
              })(
                <Switch
                  checkedChildren={<Icon type="check" />}
                  unCheckedChildren={<Icon type="close" />}
                  defaultChecked
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(CreateUser);
