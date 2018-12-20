import React,{Component} from 'react'
import {Row,Col,Table,Card,Divider,Button} from 'antd'
import {connect} from 'dva'
import SearchForm from './SearchForm'


@connect(({performance,loading})=>({
  performance,
  loading:loading.effects['performance/getTranList']
}))

class Transaction extends Component{
  state= {
    selectedRowKeys:[]
  };
  componentWillMount() {
    const {dispatch} = this.props
    dispatch({
      type:'performance/getTranList',
      payload:{
        page:1
      }
    })
  }
  render(){
    let data = this.props.performance.TranList;
    data.map((item,index)=>{
      item['name'] = item['user']['name'];
      item['depart'] = item['user']['depart']['depart_name']
    });
    const columns = [{
      title: '绩效日期',
      align:'center',
      dataIndex: 'pf_name',
    },{
      title: '所属人员',
      align:'center',
      dataIndex: 'name',
    },{
      title: '所属部门',
      align:'center',
      dataIndex: 'depart',
    },{
      title: '绩效总分',
      align:'center',
      dataIndex: 'second_sum',
    },{
      title: '绩效等级',
      align:'center',
      dataIndex: 'second_sum',
      key:'level',
      render:(text,record)=>{
        let score = parseFloat(text);
        switch (true) {
          case score>110:
            return <p style={{color:'#930F7F'}} > A+ </p>;
          case score<=110&&score>=95:
            return <p style={{color:'#323296'}} > A </p>;
          case score<95&&score>=90:
            return <p style={{color:'#009241'}} > B </p>;
          case score<90&&score>=75:
            return <p style={{color:'#FEED23'}} > C </p>;
          case score<75&&score>=65:
            return <p style={{color:'#FA931D'}} > D </p>;
          case score<65:
            return <p style={{color:'#EC1D23'}} > E </p>;
        }
      }
    },{
      title: '绩效系数',
      align:'center',
      dataIndex: 'second_sum',
      key:'num',
      render:(text,record)=>{
        let score = parseFloat(text);
        switch (true) {
          case score>=115:
            return <p style={{color:'#901081'}} > 1.5 </p>;
          case score<115&&score>=110:
            return <p style={{color:'#5E0E89'}} > 1.4 </p>;
          case score<110&&score>=105:
            return <p style={{color:'#302F97'}} > 1.3 </p>;
          case score<105&&score>=100:
            return <p style={{color:'#0171BB'}} > 1.2 </p>;
          case score<100&&score>=95:
            return <p style={{color:'#019245'}} > 1.1 </p>;
          case score<95&&score>=90:
            return <p style={{color:'#91C644'}} > 1.0 </p>;
          case score<90&&score>=85:
            return <p style={{color:'#FFEC23'}} > 0.9 </p>;
          case score<85&&score>=80:
            return <p style={{color:'#FFAD41'}} > 0.8 </p>;
          case score<80&&score>=75:
            return <p style={{color:'#F8931D'}} > 0.7 </p>;
          case score<75&&score>=70:
            return <p style={{color:'#F85625'}} > 0.6 </p>;
          case score<70&&score>=65:
            return <p style={{color:'#F11B23'}} > 0.5 </p>;
          case score<65:
            return <p style={{color:'#D00175'}} > 0.0 </p>;
        }
      }
    },{
      title: '',
      dataIndex: 'id',
      render:(text,record)=>{
        return(
          <div>
            <Row>
              <Col style={{textAlign:'center'}} span={11}>
                <Button
                  // onClick={() => this.setState({ modal: true })}
                  type="primary"
                  ghost
                  shape="circle"
                  icon="edit"
                />
              </Col>
              <Col style={{textAlign:'center'}} span={2}>
                <Divider type="vertical" />
              </Col>
              <Col style={{textAlign:'center'}} span={11}>
                <Button type="primary" ghost shape="circle" icon="check" />
              </Col>
            </Row>
          </div>
        )
      }
    }];
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange:(ks)=>{this.setState({selectedRowKeys:ks})},
    };
    return(

      <div>
        <Card>
          <SearchForm/>
        </Card>
        <Card>
          <Table rowSelection={rowSelection} rowKey='id' dataSource={data} columns={columns} />
        </Card>

      </div>

    )
  }
}

export default Transaction
