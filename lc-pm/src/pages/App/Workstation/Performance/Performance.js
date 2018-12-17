import { Row, Col, Card, Tooltip ,Steps, Table ,Button} from 'antd';
import { connect } from 'dva';
import React, { Component } from 'react';
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import styles from './Performance.less'
import CreatForm from '../CreatForm/CreatForm'
import Withline from '../Withline'


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
        cvr: Math.ceil(Math.random() * 9) / 10,
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
        {/*view*/}
        <Row>
          {/*sum and steps*/}
          <Col span={17}>
            <Card
            >
              <p style={{fontWeight:'bold',fontFamily:'微软雅黑'}} >
                {this.state.infomation.name}:
              </p>
              <p style={{textAlign:'center',fontSize:'3rem',fontWeight:'bold',fontFamily:'微软雅黑'}} >
                {this.state.infomation.sum}
                <span style={{fontSize:'1rem',fontWeight:'normal'}} >&nbsp;&nbsp;&nbsp;分</span>
              </p>
              <p style={{fontWeight:'bold',fontFamily:'微软雅黑'}} >
                当前进度:
              </p>
              <Steps style={{marginTop:35}} current={1}>
                <Step title="Finished" description="This is a description." />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
              </Steps>

            </Card>
          </Col>
          {/*chart*/}
          <Col  span={7}>
            <Card
            >
              <Withline/>
            </Card>
          </Col>
        </Row>
        {/*list*/}

      </GridContent>
    )}
}
export default Performance
