import React,{Component} from 'react'
import {Modal,Form,Input, InputNumber,Tooltip,Row,Col, DatePicker , Button} from 'antd'
import styles from './CreatForm.less'
const FormItem = Form.Item;
const {MonthPicker} = DatePicker
const TextArea = Input.TextArea
class CreatForm extends Component{

  state = {
    visible : false
  };

  render(){
    const showModal = () => {this.setState({visible:true})}
    const submit = () => {

      this.props.form.validateFields((err,value)=>{
        if (!err){
          let upData = this.props.form.getFieldsValue()
          upData.date = upData.date._d.getFullYear()+'-'+(upData.date._d.getMonth()+1)
          upData.sum = sum
          console.log(upData)
          this.setState({visible:false})
        }
      })

    };
    const handleCancel = () => {this.setState({visible:false})};
    const formLayout = {
      labelCol: {
        span:10
      },
      wrapperCol: {
        offset:1,
        span:13
      },
    };
    const lastRowLayout = {
      labelCol: {
        span:5
      },
      wrapperCol: {

        span:19
      },
    };
    const {getFieldDecorator} = this.props.form;
    const formData = this.props.form.getFieldsValue()
    const {client,costControl,planAchieve,workAttitude,systemObey,skillUp,teamWork,extraCredit} = formData
    let sum = ((parseFloat(client)?parseFloat(client):0)
      +(parseFloat(costControl)?parseFloat(costControl):0)
      +(parseFloat(planAchieve)?parseFloat(planAchieve):0)
      +(parseFloat(workAttitude)?parseFloat(workAttitude):0)
      +(parseFloat(systemObey)?parseFloat(systemObey):0)
      +(parseFloat(skillUp)?parseFloat(skillUp):0)
      +(parseFloat(teamWork)?parseFloat(teamWork):0)
      +(parseFloat(extraCredit)?parseFloat(extraCredit):0)).toFixed(2)
    return(
      <div>
        <Button type="primary"  onClick={showModal}>添加事项</Button>
        <Modal
          title="绩效提交"
          visible={this.state.visible}
          onOk={submit}
          onCancel={handleCancel}
          okText = '提 交'
          cancelText = '算 了'
          width = {'800px'}
        >
          <Form layout='vertical'>
            {/*第一行*/}
            <Row>
              {/*日期*/}
              <Col offset={1} span={10}>
                <FormItem
                  {...formLayout}
                  label='绩效月份'
                  style={{textAlign:'left',width:'100%'}}
                >
                  {getFieldDecorator('date',{
                    rules:[{
                      required:true,
                      message:'请选择绩效月份!',
                    }],
                    validateTrigger:'onSelect'

                  })(
                    <MonthPicker style={{width:'100%'}} format='YYYY-MM'/>
                  )}
                </FormItem>
              </Col>
              {/*总得分*/}
              <Col offset={2} span={4}>
                <p className={styles.pLabelL}>当前总分:</p>
              </Col>
              <Col  span={6}>
                <p className={styles.pLabelR}>{sum}</p>
              </Col>
            </Row>
            {/*第二行*/}
            <Row>
              {/*成本控制*/}
              <Col offset={1} span={10}>
                <FormItem
                  {...formLayout}
                  label="成本控制"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('costControl',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入成本控制项得分,最高分5分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={5} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
              {/*内外部客户*/}
              <Col offset={2} span={10}>
                <FormItem
                  {...formLayout}
                  label="内外部客户"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('client',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入内外部客户项得分,最高分30分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={30} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>

            </Row>
            {/*第三行*/}
            <Row>
              {/*工作态度*/}
              <Col offset={1} span={10}>
                <FormItem
                  {...formLayout}
                  label="工作态度"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('workAttitude',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入工作态度项得分,最高分15分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={15} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
              {/*遵守制度*/}
              <Col offset={2} span={10}>
                <FormItem
                  {...formLayout}
                  label="遵守制度"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('systemObey',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入遵守制度项得分,最高分5分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={5} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>

            </Row>
            {/*第四行*/}
            <Row>
              {/*团队协作*/}
              <Col offset={1} span={10}>
                <FormItem
                  {...formLayout}
                  label="团队协作"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('teamWork',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入团队协作项得分,最高分15分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={5} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
              {/*技能提升*/}
              <Col offset={2} span={10}>
                <FormItem
                  {...formLayout}
                  label="技能提升"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('skillUp',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入技能提升项得分,最高分10分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={10} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
            </Row>
            {/*第五行*/}
            <Row>
              {/*计划达成*/}
              <Col offset={1} span={10}>
                <FormItem
                  {...formLayout}
                  label="计划达成"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('planAchieve',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入计划达成项得分,最高分30分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={30} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
              {/*额外加分项*/}
              <Col offset={2}  span={10}>
                <FormItem
                  {...formLayout}
                  label="额外加分项"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('extraCredit',{
                    rules:[{
                      required:true,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                    <Tooltip title='请输入额外加分项,最高15分' trigger='focus'>
                      <InputNumber style={{width:'100%'}} min={0} max={15} defaultValue={0} precision={2}  />
                    </Tooltip>
                  )}
                </FormItem>
              </Col>
            </Row>
            {/*第六行*/}
            <Row>
              <Col offset={1} span={22}>
                <FormItem
                  {...lastRowLayout}
                  label="额外加分原因"
                  style={{width:'100%'}}
                >
                  {getFieldDecorator('resonance',{
                    rules:[{
                      required:false,
                      message:'请输入正确的得分!',
                    }],
                    validateTrigger:'onBlur'
                  })(
                      <TextArea  style={{width:'100%'}} autosize={{ minRows: 3 }}  />
                  )}
                </FormItem>
              </Col>
            </Row>








          </Form>
        </Modal>
      </div>
    )
  }
}
export default Form.create()(CreatForm)

