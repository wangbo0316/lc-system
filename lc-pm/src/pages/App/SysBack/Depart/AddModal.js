import React,{Component} from 'react'
import {Button,Modal,Form,Input,Icon} from 'antd'

const FormItem = Form.Item;

class AddModal extends Component{

  state = {
    modal:false
  };

  render() {
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
      this.setState({modal:false})
    };
    const handleCancel = () => {this.setState({modal:false})};
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;
    const departNameError = isFieldTouched('depart_name') && getFieldError('depart_name');

    return (
      <div>
        <Button onClick={()=>this.setState({modal:true})}  type="dashed" shape="circle" icon="plus" />
        <Modal
          title="添加部门"
          visible={this.state.modal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form >
            <FormItem
              label="Note"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 12 }}
            >
              {getFieldDecorator('note', {
                rules: [{ required: true, message: 'Please input your note!' }],
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

}

export default Form.create()(AddModal);
