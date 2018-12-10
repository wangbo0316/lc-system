import React,{Component} from 'react'
import {Form,Row,Col,Input,Modal} from 'antd'

const FormItem = Form.Item

class FixPwd extends Component{

  render(){
    const { visible , submit , cancel , form } = this.props
    const {getFieldDecorator} = form
    const formLayout = {
      labelCol: {
        offset:2,
        span:5
      },
      wrapperCol: {
        offset:1,
        span:12
      },
    };

    return(
      <div>
        <Modal
          visible={visible}
          title="修改密码"
          okText="提 交"
          onCancel={cancel}
          onOk={submit}
          width={'600px'}
        >
          <Form >

            <FormItem
              {...formLayout}
              label="旧密码"
            >
              {getFieldDecorator('oldPwd', {
                rules: [{
                  validator:(rule,value,callback)=>{
                    if (value !== '888888'){
                      callback('原密码输入错误')
                    } else {callback()}
                  }}],
                validateTrigger:'onBlur'
              })(
                <Input />
              )}
            </FormItem>

            <FormItem
              {...formLayout}
              label="新密码"
            >
              {getFieldDecorator('newPwd',{
                rules:[{
                  required:true,
                  message:'请输入新密码!'
                }],
                validateTrigger:'onBlur'
              })(<Input  />)}
            </FormItem>
            <FormItem
              {...formLayout}
              label="重复新密码"
            >
              {getFieldDecorator('rePwd',{
                rules:[{
                  validator:(rule, value, callback)=>{
                    let newPwd = form.getFieldValue('newPwd')
                    if (newPwd !== value){
                      callback('两次输入的密码不一致')
                    }else {callback()}
                  }
                }],
                validateTrigger:'onBlur'
              })(<Input  />)}
            </FormItem>

          </Form>
        </Modal>

      </div>
    )
  }
}

export default Form.create()(FixPwd)
