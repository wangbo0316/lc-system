import React,{Component} from 'react'
import {Row,Col,Card,Button,Divider,Table,Modal} from 'antd'
import styles from './Depart.less'
import GridContent from '@/components/PageHeaderWrapper/GridContent'
import { connect } from 'dva';
import AddModal from './AddModal'


@connect(({ depart, loading }) => ({
  depart,
  loading: loading.effects['depart/fetch'],
}))
class Depart extends Component {
  state = {
    createModal:false
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'depart/fetch',
    });

  }
  render() {
    const {depart} = this.props
    let departList = depart.departList.results
    console.log(departList)
    const columns = [ {
      title: '部门名称',
      dataIndex: 'depart_name',
      key: 'depart_name',
    },{
      title: '操作',
      key: 'action',
      align:'right',
      render: (text, record) => (
        <span>
      <Button type="primary" shape="circle" icon="edit" />
      <Divider type="vertical" />
      <Button type="danger" shape="circle" icon="delete" />
    </span>
      ),
    }];
    return (
      <GridContent>
        <Row>
          <Col offset={1} span={22}>
            <Card
              title='部门管理'
              extra={<AddModal  />}
              style={{minHeight:800}}
            >
              <Table columns={columns} dataSource={departList} />

            </Card>
          </Col>

        </Row>
      </GridContent>
    )
  }
}
export default Depart

