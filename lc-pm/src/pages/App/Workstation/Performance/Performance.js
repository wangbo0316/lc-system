import { Row, Col, Card, Tooltip ,Steps, Table ,Button} from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Performance.less'
import CreatForm from '../CreatForm/CreatForm'
import axios from 'axios'


const Step = Steps.Step;

class Performance extends  Component{

  state = {
    infomation : {},
    data:[],

  };
  componentDidMount(){
    let data = []
    for (let i = 1 ; i < 4 ; i++){
      data.push({
        name:`${i}月绩效评分`,
        person:'吴亚琴',
        status: Math.round(Math.random()*3+1),
        costControl:Math.round(Math.random()*10),
        client:Math.round(Math.random()*10),
        planAchieve:Math.round(Math.random()*10),
        workAttitude:Math.round(Math.random()*10),
        systemObey:Math.round(Math.random()*10),
        skillUp:Math.round(Math.random()*10),
        teamWork:Math.round(Math.random()*10),
        extraCredit:Math.round(Math.random()*10),
        sum:Math.round(Math.random()*100),
        resonance:'这里是原因这里是原因这里是原因这里是原因这里是原因这里是原因这里是原因这里是原因',
      })
    }
    this.setState({data:data,infomation:data[0]})
  }



  render(){


    const columns = [
      {
      title: '事项',
      dataIndex: 'name',
      render:(text,record,index) => {
        const clickA = () => {
          this.setState({infomation:this.state.data[index]})
        }
        return(<a onClick={clickA}>{text}</a>)
      },

    },
      {
      title: '处理人',
      dataIndex: 'person',
    },
      {
        title: '当前进度',
        dataIndex: 'status',
        render:(text,record,index)=>{
          if (text === 1){

            return('组长评分')
          }
          if (text === 2){
            return('经理评分')
          }
          if (text === 3){
            return('人事确认')
          }
          if (text === 4){
            return('已完成')
          }
        }
    }];



    return(
      <GridContent>
      <Row>
        {/*事项列表*/}
        <Col  span={10}>
          <Card
            title="绩效列表"
            extra={<CreatForm type="primary" />}
          >
            <Table
              columns={columns}
              dataSource={this.state.data}
              pagination={{ pageSize: this.state.data.length,hideOnSinglePage:true }}
              scroll={{ y: 370 }}
              style={{minHeight:424,maxHeight:424}}
            />
          </Card>

        </Col>
        {/*事项信息*/}
        <Col offset={1} span={13}>
          <Card
            title="绩效信息"
            extra= {this.state.infomation.name}
            style={{height:541}}
          >
            <Row>
              <Col span={24}>
                <p className={styles.totalLable}>绩效总分 : </p>
              </Col>
              <Col span={24}>
                <p className={styles.totalScore}>{this.state.infomation.sum?this.state.infomation.sum:'--'}</p>
              </Col>
              <Row  style={{marginTop:100}}>
                <Col offset={1} span={4}>
                  <p className={styles.score}>成本控制 : {this.state.infomation.costControl?this.state.infomation.costControl:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>内外部客户 : {this.state.infomation.client?this.state.infomation.client:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>计划达成 : {this.state.infomation.planAchieve?this.state.infomation.planAchieve:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>团队协作 : {this.state.infomation.teamWork?this.state.infomation.teamWork:'--'}</p>
                </Col>
              </Row>
              <Row style={{marginTop:80}}>

                <Col offset={1} span={4}>
                  <p className={styles.score}>工作态度 : {this.state.infomation.workAttitude?this.state.infomation.workAttitude:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>遵守制度 : {this.state.infomation.systemObey?this.state.infomation.systemObey:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>技能提升 : {this.state.infomation.skillUp?this.state.infomation.skillUp:'--'}</p>
                </Col>
                <Col offset={2} span={4}>
                  <p className={styles.score}>额外加分 : {this.state.infomation.extraCredit?this.state.infomation.extraCredit:'--'}</p>
                </Col>
              </Row>
            </Row>

          </Card>
        </Col>
        {/*事项进度*/}
        <Col  className={styles.secondRow} span={24}>
          <Card
            title="当前进度"
            style={{height:250}}
          >
            <Steps className={styles.step} current={this.state.infomation.status}>
              <Step title="自评" description={`绩效总分:${this.state.infomation.sum}`} />
              <Step title="组长评分" description={this.state.infomation.status>1?'已处理':'等待处理'} />
              <Step title="经理评分" description={this.state.infomation.status>2?'已处理':'等待处理'} />
              <Step title="人事确认" description={this.state.infomation.status>3?`最终得分:${this.state.infomation.sum}`:'等待处理'} />
            </Steps>
          </Card>
        </Col>
      </Row>
      </GridContent>
    )}


}
export default Performance
