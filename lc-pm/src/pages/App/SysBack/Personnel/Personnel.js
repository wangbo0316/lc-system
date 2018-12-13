import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Button, Divider, Table, Popconfirm, message } from 'antd';
import styles from './Personnel.less';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';

@connect(({ depart, user, loading }) => ({
  depart,
  user,
  loading: loading.effects['user/fetch'],
}))
class Personnel extends Component {
  state = {
    userList: [],
    count: null,
    depart_dir: {},
  };
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
    });
    dispatch({
      type: 'depart/fetchPara',
    });
  }

  render() {
    const { user, depart } = this.props;
    const total = user.list.count;
    const userList = user.list.results;
    const deparList = depart.departPara;
    let departDir = {};
    if (deparList) {
      deparList.map(item => {
        departDir[item.id] = item.depart_name;
      });
    }
    const { dispatch } = this.props;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '部门',
        dataIndex: 'depart',
        key: 'depart',
        render: values => departDir[values],
      },
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '是否管理者',
        dataIndex: 'is_superuser',
        key: 'is_superuser',
        render: val => (val ? '是' : '否'),
      },
      {
        title: '',
        key: 'action',
        align: 'center',
        render: (text, record) => {
          const del = () => {
            dispatch({
              type: 'user/removeUser',
              payload: record.id,
              callback: res => {
                console.log(res);
                if (res === '') {
                  message.success('删除用户成功！');
                } else {
                  message.warning('删除用户可能失败了！');
                }
                dispatch({
                  type: 'user/fetch',
                });
              },
            });
          };
          return (
            <Row>
              <Col offset={13} span={4}>
                <UpdateUser dispatch={dispatch} record={record} departDir={departDir} />
              </Col>
              <Col span={3}>
                <Divider type="vertical" />
              </Col>
              <Col span={4}>
                <Popconfirm
                  placement="bottomRight"
                  title="确认删除该用户吗？"
                  onConfirm={del}
                  okText="是的"
                  cancelText="不"
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
              </Col>
            </Row>
          );
        },
      },
    ];
    const changPage = (page, pageSize) => {
      console.log(page);
      dispatch({
        type: 'user/fetch',
        payload: { page: page },
      });
    };
    return (
      <GridContent>
        <Row>
          <Col offset={1} span={22}>
            <Card
              title="人员管理"
              extra={<CreateUser dispatch={dispatch} departDir={departDir} />}
              style={{ minHeight: 800 }}
            >
              <Table
                columns={columns}
                dataSource={userList}
                rowKey={record => record.id}
                pagination={{
                  total: total,
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
export default Personnel;
