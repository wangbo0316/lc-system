import React,{Component} from 'react'
import {Button,Modal,Row,Col,Form,InputNumber,DatePicker,Radio,message  } from 'antd'
import {connect} from 'dva'
const FormItem = Form.Item;
const { MonthPicker } = DatePicker;
const RadioGroup = Radio.Group;


@connect(({ para,user,performance, loading }) => ({
  para,
  user,
  performance,
  loading: loading.effects['para/getCurrPara'],
}))

class CreatPF extends Component{
  state = {
    modal:false
  };
  componentWillMount() {

    const { dispatch } = this.props
    dispatch({
      type:'para/getCurrPara'
    })
  }
  render() {
    const handleOk = () => {
      this.props.form.validateFields((err,val)=>{
        if (!err){
          const {dispatch} = this.props;
          const {user} = this.props;
          let pf_name = `${val.dateMonth.year()}-${val.dateMonth.month()+1}`;
          let mode = val.mode;
          delete val.mode;
          delete val.dateMonth;
          let sum = 0;
          Object.keys(val).map((v)=>{
            sum += parseFloat(val[v])
          });
          const post_data = {
            user:parseInt(user.currentUser.id),
            pf_name : pf_name,
            self_evaluat : JSON.stringify(val),
            second_evaluat : JSON.stringify(val),
            status : mode === 1 ? parseInt(user.currentUser.level):parseInt(user.currentUser.level)-1,
            sum : sum,
            second_sum : sum
          }
          console.log(user.currentUser.level);
          console.log(post_data);
          dispatch({
            type:'performance/createPf',
            payload:post_data,
            callback:(res)=>{
              console.log(res)
              if (res) {
                if (res.status){
                  message.success('绩效记录添加成功！');
                  dispatch({
                      type:'performance/getPfList',
                      callback:()=>{return}
                    })
                } else {
                  message.error(res.message);
                }

              } else {
                message.warning('绩效记录可能添加失败了！');
              }
            }

          });
          this.props.form.resetFields();
          this.setState({modal:false})
        }
      })
    };
    const handleCancel = () => {this.setState({modal:false})};
    const {para} = this.props;
    let currPara = para.currPara.content_json?JSON.parse(para.currPara.content_json):{};
    let keys = Object.keys(currPara);
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItems = keys.map((k, index) => (
      <Row key={index}>
        <Col span={24}>
          <FormItem
            {...formItemLayout}
            label={k}
            required={true}
          >
            {getFieldDecorator(k, {
              validateTrigger: 'onBlur',
              initialValue: '0',
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入科目名称!',
              }],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={parseFloat(currPara[k])} precision={2}/>,
            )}
          </FormItem>
        </Col>
      </Row>
    ));

    return (
      <div>
        <Button  onClick={()=>this.setState({modal:true})} type="dashed"  shape="circle" icon="plus" />
        <Modal title="新增绩效" visible={this.state.modal} onOk={handleOk} onCancel={handleCancel}>
          <Form>
            <FormItem
              {...formItemLayout}
              label='绩效月份'
              required={true}
            >
              {getFieldDecorator('dateMonth')(
                <MonthPicker style={{width:'100%'}}  placeholder="请选择绩效月份" />
              )}
            </FormItem>
            {formItems}
            <FormItem
              {...formItemLayout}
              label='模式'
              required={true}
            >
              {getFieldDecorator('mode',{
                initialValue: 1
              })(
                <RadioGroup  >
                  <Radio value={1}>暂存</Radio>
                  <Radio value={2}>直接提交</Radio>
                </RadioGroup>
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }

}
export default Form.create()(CreatPF)
