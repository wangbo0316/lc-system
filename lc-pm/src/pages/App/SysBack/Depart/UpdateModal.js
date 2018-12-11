import React, { Component } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';

const FormItem = Form.Item;

class UpdateModal extends Component {
  state = {
    modal: false,
  };

  render() {
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          const { dispatch, record } = this.props;
          dispatch({
            type: 'depart/updateDepart',
            payload: { ...values, id: record.id },
            callback: res => {
              console.log(res);
              if (res) {
                message.success('部门信息修改成功！');
              } else {
                message.warning('部门信息可能修改失败了！');
              }
              dispatch({
                type: 'depart/fetch',
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
    const { record } = this.props;

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
            <FormItem label="部门名称" labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
              {getFieldDecorator('depart_name', {
                rules: [{ required: true, message: '请输入部门名称!' }],
                initialValue: record.depart_name,
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(UpdateModal);
