import { Row, Col, Card, Popconfirm ,Steps, List ,Button,Icon,Divider,message} from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Performance.less'
import CreatPF from './CreatPF'
import UpdatePF from './UpdatePF'
import Withline from '../Withline'
const Step = Steps.Step;


@connect(({performance,user,loading}) => ({
  performance,
  user,
  loading:loading.effects['performance/getPfList']
}))



class Performance extends  Component{

  state = {
    data:[],
    information : {
      pf_name : '--' ,
      user : 0,
      self_evaluat : '',
      second_evaluat : '',
      status : 0,
      add_time : '',
      sum : 0,
      second_sum : 0,
    }
  };

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch({
      type:'performance/getPfList',
      callback:(res)=>{
        if (res.length){this.setState({data:res,information:res[0]})}

      }
    });
  }

  render(){
    const { performance } = this.props;
    const chartObject = this.state.information.second_evaluat===""?{}:JSON.parse(this.state.information.second_evaluat);
    delete chartObject['备注'];
    const chartData = [];
    Object.keys(chartObject).map(v=>{
      chartData.push({
        item:v,
        v:parseFloat(chartObject[v])
      })
    });
    const data = performance.PfList?performance.PfList:this.state.data;
    const currStatus = this.props.user.currentUser.level-this.state.information.status;
    return(
      <GridContent>
        {/*view*/}
        <Row  gutter={1} >
          {/*sum and steps*/}
          <Col span={16}>
            <Card
              style={{height:311}}
              bordered={false}
            >
              <p style={{fontWeight:'bold',fontFamily:'微软雅黑'}} >
                {`${this.state.information.pf_name} 绩效评分`}:
              </p>
              <p style={{textAlign:'center',fontSize:'3rem',fontWeight:'bold',fontFamily:'微软雅黑'}} >
                {this.state.information.sum}
                <span style={{fontSize:'1rem',fontWeight:'normal'}} >&nbsp;&nbsp;&nbsp;分</span>
              </p>
              <p style={{fontWeight:'bold',fontFamily:'微软雅黑'}} >
                当前进度:
              </p>
              <Steps size="small" style={{marginTop:'2.15rem'}} current={this.state.information.status === 0 ? 3 : currStatus > 2 ? 2 : currStatus}>
                <Step title="自评" description={`自评分数：${this.state.information.sum} 分`} />
                <Step title="直接上级" description={currStatus>1?"已处理 ！":"等待处理"} />
                <Step title="公司领导" description={this.state.information.status === 0 ? "已处理 ！":"等待处理"} />
                <Step title={this.state.information.status === 0 ? "处理完毕":""}  />
              </Steps>
            </Card>
          </Col>
          {/*chart*/}
          <Col  span={8}>
            <Card
              bordered={false}
            >
              <Withline data={chartData} />
            </Card>
          </Col>
        </Row>
        {/*list*/}
        <Row style={{marginTop:16}}>
          <List
            bordered={false}
            grid={{
              gutter: 16, column: (data.length+1)>3?4:data.length+1
            }}
            dataSource={data}
            renderItem={(item,index) => {
              const clickI = () =>{
                this.setState({information:item})
              };
              const del = () =>{
                const {dispatch}=this.props;
                dispatch({
                  type:'performance/removePf',
                  payload:item.id,
                  callback:(res)=>{
                    if (res===""){
                      message.success('绩效记录删除成功！');
                      dispatch({
                        type:'performance/getPfList',
                        callback:()=>{return}
                      })
                    } else {
                      message.warning('绩效记录可能删除失败了！');
                    }
                  }
                });
                this.setState({information:this.props.performance.PfList[0]})
              };
              if (index === 0){
                return (
                  <div>
                    <List.Item>
                      <Card
                        bordered={false}
                        style={{height:138}}
                      >
                        <Row style={{marginTop:35,textAlign:'center'}} >
                          <CreatPF  />
                        </Row>

                      </Card>
                    </List.Item>
                    <List.Item>
                      <Card
                        bordered={false}
                        style={{height:138}}
                        title={(<Icon type="file-text" />)}
                        extra={(<a onClick={clickI} style={{textAlign:'center',fontSize:'1rem',fontFamily:'微软雅黑'}}>{item.pf_name} 绩效评分</a>)}
                      >
                        <Row>
                          <Col style={{textAlign:'center'}} span={11}>
                            <UpdatePF record_id={item.id} record={JSON.parse(item.self_evaluat)} pfName={item.pf_name} isDis={!(item.status === this.props.user.currentUser.level)} />
                          </Col>
                          <Col style={{textAlign:'center'}} span={2}>
                            <Divider type="vertical" />
                          </Col>
                          <Col style={{textAlign:'center'}} span={11}>
                            <Button type="danger" onClick={del} disabled={!(item.status === this.props.user.currentUser.level)} ghost shape="circle" icon="delete" />
                          </Col>
                        </Row>
                      </Card>
                    </List.Item>
                  </div>

                )
              }
              else {
                return (
                  <List.Item>
                    <Card
                      style={{height:138}}
                      bordered={false}
                      title={(<Icon type="file-text" />)}
                      extra={(<a onClick={clickI} style={{textAlign:'center',fontSize:'1rem',fontFamily:'微软雅黑'}}>{item.pf_name} 绩效评分</a>)}
                    >
                      <Row>
                        <Col style={{textAlign:'center'}} span={11}>
                          <UpdatePF record_id={item.id} record={JSON.parse(item.self_evaluat)} pfName={item.pf_name} isDis={!(item.status === this.props.user.currentUser.level)} />
                        </Col>
                        <Col style={{textAlign:'center'}} span={2}>
                          <Divider type="vertical" />
                        </Col>
                        <Col style={{textAlign:'center'}} span={11}>
                          <Button type="danger" onClick={del} disabled={!(item.status === this.props.user.currentUser.level)} ghost shape="circle" icon="delete" />
                        </Col>
                      </Row>
                    </Card>
                  </List.Item>
                )
              }

            }}
          >
            {data.length?null:(<List.Item>
              <Card
                bordered={false}
                style={{height:138}}
              >
                <Row style={{marginTop:35,textAlign:'center'}} >
                  <CreatPF  />
                </Row>

              </Card>
            </List.Item>)}
          </List>
        </Row>

      </GridContent>
    )}
}
export default Performance
