import {Component} from 'react'
import {connect} from 'dva'
import {Form,Row,Col,Button,Input,Select} from 'antd'
const FormItem = Form.Item;

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
    const handleSearch = () => {};
    const handleReset = () => {};
    return (
      <Form
        onSubmit={handleSearch}
      >
        <Row gutter={24}>


        </Row>

        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={handleReset}>清空</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(SearchForm)
