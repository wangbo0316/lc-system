import React, { Component } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

const FormItem = Form.Item;

class AddModal extends Component {
  state = {
    modal: false,
  };

  render() {
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { dispatch, addStatus } = this.props;
          dispatch({
            type: 'depart/addDepart',
            payload: values,
            callback: res => {
              if (res) {
                message.success('部门信息添加成功！');
              } else {
                message.warning('部门信息可能添加失败了！');
              }
              dispatch({
                type: 'depart/fetch',
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

    return (
      <div>
        <Button
          onClick={() => this.setState({ modal: true })}
          type="dashed"
          shape="circle"
          icon="plus"
        />
        <Modal title="添加部门" visible={this.state.modal} onOk={handleOk} onCancel={handleCancel}>
          <Form>
            <FormItem label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('depart_name', {
                rules: [{ required: true, message: '请输入部门名称!' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(AddModal);
