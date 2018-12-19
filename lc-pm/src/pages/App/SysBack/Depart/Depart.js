import React, { Component } from 'react';
import { Row, Col, Card, Button, Divider, Table, Popconfirm, message } from 'antd';
import styles from './Depart.less';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { connect } from 'dva';
import AddModal from './AddModal';
import UpdateModal from './UpdateModal';

@connect(({ depart, loading }) => ({
  depart,
  loading: loading.effects['depart/fetch'],
}))
class Depart extends Component {
  state = {
    createModal: false,
  };
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'depart/fetch',
    });
  }
  render() {
    const { depart, dispatch } = this.props;
    const changPage = (page, pageSize) => {
      console.log(page);
      dispatch({
        type: 'depart/fetch',
        payload: { page: page },
      });
    };

    // console.log(depart)
    let departList = depart.departList.results;
    const columns = [
      {
        title: '',
        dataIndex: 'depart_name',
        key: 'depart_name',
      },
      {
        title: '',
        key: 'action',
        align: 'center',
        render: (text, record) => {
          const del = () => {
            dispatch({
              type: 'depart/removeDepart',
              payload: record.id,
              callback: res => {
                console.log(res);
                if (res === '') {
                  message.success('删除部门信息成功！');
                } else {
                  message.warning('删除部门信息可能失败了！');
                }
                dispatch({
                  type: 'depart/fetch',
                });
              },
            });
          };
          return (
            <Row>
              <Col offset={19} span={2}>
                <UpdateModal dispatch={dispatch} record={record} />
              </Col>
              <Col span={1}>
                <Divider type="vertical" />
              </Col>
              <Col span={2}>
                <Popconfirm
                  placement="bottomRight"
                  title="确认删除该部门信息吗？"
                  onConfirm={del}
                  okText="是的"
                  cancelText="不"
                >
                  <Button type="danger" ghost shape="circle" icon="delete" />
                </Popconfirm>
              </Col>
            </Row>
          );
        },
      },
    ];
    return (
      <GridContent>
        <Row>
          <Col offset={1} span={22}>
            <Card
              title="部门管理"
              extra={<AddModal dispatch={dispatch} />}
              style={{ minHeight: 800 }}
            >
              <Table
                columns={columns}
                dataSource={departList}
                rowKey={record => record.id}
                pagination={{
                  total: depart.departList.count,
                  pageSize: 10,
                  onChange: changPage,
                  hideOnSinglePage: true,
                  size: 'small',
                }}
              />
            </Card>
          </Col>
        </Row>
      </GridContent>
    );
  }
}
export default Depart;
