import {Component} from 'react'
import {connect} from 'dva'
import {Form,Row,Col,Button,Input,Select,DatePicker } from 'antd'
const FormItem = Form.Item;
const {MonthPicker} = DatePicker;
const Option = Select.Option;

@connect(({performance,loading})=>({
  performance,
  loading:loading.effects['performance/getTranList']
}))

class SearchForm extends Component{
  state = {};
  componentWillMount() {
  };
  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    const {searchFunc} = this.props;
    const submit = () =>{
      this.props.form.validateFields((err, values) => {
        if (!err) {
          searchFunc(values)
        }
      });
    };
    return (
      <Form>
        <Row  gutter={24} >
          <Col  span={11}>
            <FormItem>
              {getFieldDecorator('depart')(
                <Input  placeholder="所属部门"/>
              )}
            </FormItem>
          </Col>

          <Col  span={6}>
            <FormItem>
              {getFieldDecorator('date')(
                <MonthPicker placeholder="绩效日期" style={{width:'100%'}}/>
              )}
            </FormItem>

          </Col>

          <Col  span={6}>
            <FormItem>
              {getFieldDecorator('level')(
                <Select placeholder="绩效等级"  allowClear={true}>
                  <Option value="A+">A+</Option>
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="D">D</Option>
                  <Option value="E">E</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col  style={{textAlign:"right"}} span={1}>
            <FormItem>
              <Button type="primary" shape="circle" icon="search" onClick={submit}/>
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
