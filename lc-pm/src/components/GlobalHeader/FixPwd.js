import React,{Component} from 'react'
import {Form,Row,Col,Input,Modal,message} from 'antd'
import {connect} from 'dva'

const FormItem = Form.Item;

@connect(({user})=>({user}))

class FixPwd extends Component{

  render(){
    const { visible , submit , cancel , form } = this.props;
    const {getFieldDecorator} = form;
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
    const onSubmit = () => {
      this.props.form.validateFields((err,value)=>{
        const {dispatch} = this.props;
        dispatch({
          type: "user/fixPwd",
          payload: value,
          callback:(res)=>{
            if (res){
              if (res.status === "OK"){
                message.success("修改密码成功！")
              } else {
                message.warning("修改密码可能失败了。。。")
              }
            } else {
              message.error("修改密码可能失败了。。。")
            }
            this.props.form.resetFields();
            submit()
          }
        })
      })
    };
    return(
      <div>
        <Modal
          visible={visible}
          title="修改密码"
          okText="提 交"
          onCancel={cancel}
          onOk={onSubmit}
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
                    const {dispatch} = this.props;
                    dispatch({
                      type:'user/valiPwd',
                      payload:value,
                      callback:(res)=>{
                        if (res.length === 1){
                          callback()
                        } else {
                          callback('原密码输入错误')
                        }
                      }
                    });
                  }}],
                validateTrigger:'onBlur'
              })(
                <Input type={"password"} />
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
              })(<Input type={"password"} />)}
            </FormItem>
            <FormItem
              {...formLayout}
              label="重复新密码"
            >
              {getFieldDecorator('rePwd',{
                rules:[{
                  validator:(rule, value, callback)=>{
                    let newPwd = form.getFieldValue('newPwd');
                    if (newPwd !== value){
                      callback('两次输入的密码不一致')
                    }else {callback()}
                  }
                }],
                validateTrigger:'onBlur'
              })(<Input type={"password"} />)}
            </FormItem>

          </Form>
        </Modal>

      </div>
    )
  }
}

export default Form.create()(FixPwd)
