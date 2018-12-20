import React,{Component} from 'react'
import {connect} from 'dva'
import {Row,Col,Form,Modal,Button,InputNumber,Input,Radio,message} from 'antd'
const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;


@connect(({ para,user,performance, loading }) => ({
  para,
  performance,
  user,
  loading: loading.effects['para/getCurrPara'],
}))

class UpdatePF extends Component{
  state = {
    modal:false
  };
  componentWillMount() {


  };
  render() {
    const {para,dispatch} = this.props;
    let currPara = para.currPara.content_json?JSON.parse(para.currPara.content_json):{};
    const {record , isDis , pfName} = this.props;
    let keys = Object.keys(record);
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    let Fields = getFieldsValue() ? getFieldsValue() : {};
    delete Fields['备注'];
    delete Fields['mode'];
    let FieldsKey = Object.keys(Fields);
    let scoreSum = 0;
    FieldsKey.map(v => scoreSum = scoreSum + parseFloat(Fields[v]));


    const formItems = keys.map((k, index) => {
      if (k === '备注'){
        return(
          <Row key={index}>
            <Col span={24}>
              <FormItem
                {...formItemLayout}
                label={k}
                required={true}
              >
                {getFieldDecorator(k, {
                  validateTrigger: 'onBlur',
                  initialValue: record[k],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入得分!',
                  }],
                })(
                  <TextArea  autosize={{ minRows: 2}} />,
                )}
              </FormItem>
            </Col>
          </Row>
        )
      } else {
        return (
          <Row key={index}>
            <Col span={24}>

              <FormItem
                {...formItemLayout}
                label={k}
                required={true}
              >
                {getFieldDecorator(k, {
                  validateTrigger: 'onBlur',
                  initialValue: record[k],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: '请输入得分!',
                  }],
                })(
                  <InputNumber style={{ width: '100%' }} min={0} max={k==='加分项'?100:parseFloat(currPara[k])} precision={2}/>,
                )}
              </FormItem>
            </Col>
          </Row>
        )
      }
    });

    const handlerCancel = () => {
      this.setState({modal:false})
    };
    const handlerOk = () => {
      this.props.form.validateFields((err,val)=>{
        if (!err){
          const {dispatch,user} = this.props;
          let mode = val.mode;
          delete val.mode;
          const json_data = JSON.stringify(val);
          delete val['备注'];
          let sum = 0;
          Object.keys(val).map((v)=>{
            sum += parseFloat(val[v])
          });
          const post_data = {
            id : this.props.record_id,
            pf_name:pfName,
            self_evaluat : json_data,
            second_evaluat : json_data,
            status : mode === 1 ? parseInt(user.currentUser.level):parseInt(user.currentUser.level)-1,
            sum : sum,
            second_sum : sum
          };
          dispatch({
            type:'performance/updatePf',
            payload:post_data,
            callback:(res)=>{
              if (res){
                message.success('数据更新成功！');
                dispatch({
                  type: 'performance/getPfList',
                  callback:()=>{return}
                })
              } else {
                message.warning('数据更新可能失败了！')
              }
            }
          });
          this.props.form.resetFields();
          this.setState({modal:false})
        }
      });
    };

    return (
      <div>
        <Button
          onClick={()=>this.setState({modal:true})}
          type="primary"
          ghost
          disabled={isDis}
          shape="circle"
          icon="edit" />
        <Modal width={'40%'} title={`${pfName} 绩效评分`} onCancel={handlerCancel} onOk={handlerOk} visible={this.state.modal}
        >
          <Form>
            <Row>
              <Col span={12}>
                <p style={{ fontFamily: '微软雅黑', fontSize: '1.5rem', fontWeight: 'blod' }}>
                  当前总分:
                </p>
              </Col>
              <Col style={{ textAlign: 'right' }} span={12}>
                <p style={{ fontFamily: '微软雅黑', fontSize: '1.5rem', fontWeight: 'blod' }}>
                  {scoreSum}
                </p>
              </Col>
            </Row>
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
export default Form.create()(UpdatePF)
