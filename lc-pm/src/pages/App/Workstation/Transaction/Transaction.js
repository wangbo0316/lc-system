import React,{Component} from 'react'
import {Row,Col,Table,Card,Divider,Button,message} from 'antd'
import {connect} from 'dva'
import SearchForm from './SearchForm'
import UpdateTran from './UpdateTran'
import UpdatePF from "../Performance/UpdatePF";


@connect(({performance,user,loading})=>({
  performance,
  user,
  loading:loading.effects['performance/getTranList']
}))

class Transaction extends Component{
  state= {
    selectedRowKeys:[],
    page:1,
    searchFiles:{},
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
    const allSub = () => {
      const {dispatch} = this.props;
      let keys = this.state.selectedRowKeys;
      let mess = message.loading('正在执行批量提交操作，请勿重复点击提交...', 0);
      keys.map((key,index)=>{
        let row = data[key];
        dispatch({
          type:'performance/updatePf',
          payload:{
            ...row,
            status:row.status-1
          },
          callback:(res)=>{
            if (res){
              message.success(`提交成功,当前进度：${index+1}/${keys.length}`,1);
            } else {
              message.warning(`提交失败,当前进度：${index+1}/${keys.length}`)
            }
            if (index+1===keys.length){
              message.info("已完成全部提交操作");
              this.setState({selectedRowKeys:[]});
              setTimeout(mess, 1);
              dispatch({
                type:'performance/getTranList',
                payload:{
                  ...this.state.searchFiles,
                  page:this.state.page
                }
              })
            }
          }
        })
      })

    };
    const handleSearch = (files) => {
      const {dispatch} = this.props;
      let searchVo = {};
      if (files.date){
        searchVo["pf_name"] = `${files.date.year()}-${files.date.month()+1}`
      }
      if (files.depart && files.depart !== ""){
        searchVo["user__depart__depart_name__contains"] = files.depart
      }
      if (files.level){
        switch (true) {
          case files.level === "A+":
            searchVo["second_sum__gt"] = 110;
            break;
          case files.level === "A":
            searchVo["second_sum__gte"] = 95;
            searchVo["second_sum__lt"] = 110;
            break;
          case files.level === "B":
            searchVo["second_sum__gte"] = 90;
            searchVo["second_sum__lt"] = 95;
            break;
          case files.level === "C":
            searchVo["second_sum__gte"] = 75;
            searchVo["second_sum__lt"] = 90;
            break;
          case files.level === "D":
            searchVo["second_sum__gte"] = 65;
            searchVo["second_sum__lt"] = 75;
            break;
          case files.level === "E":
            searchVo["second_sum__lt"] = 65;
            break;
        }
      }
      dispatch({
        type:'performance/getTranList',
        payload:{
          ...searchVo,
          page:this.state.page
        }
      });
      this.setState({searchFiles:searchVo})

    };
    let data = this.props.performance.TranList&&this.props.performance.TranList.results?this.props.performance.TranList.results:[];
    let total = this.props.performance.TranList&&this.props.performance.TranList.count?this.props.performance.TranList.count:0;
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

        const sub = () => {
          const {dispatch} = this.props;
          dispatch({
            type:'performance/updatePf',
            payload:{
              ...record,
              status:record.status-1
            },
            callback:(res)=>{
              if (res){
                message.success("提交成功！");
                dispatch({
                  type:'performance/getTranList',
                  payload:{
                    ...this.state.searchFiles,
                    page:this.state.page
                  }
                })
              } else {
                message.warning("提交失败")
              }
            }
          })
        };

        return(
          <div>
            <Row>
              <Col style={{textAlign:'center'}} span={11}>
                <UpdateTran  record={JSON.parse(record.second_evaluat)} record_vo={record} />
              </Col>
              <Col style={{textAlign:'center'}} span={2}>
                <Divider type="vertical" />
              </Col>
              <Col style={{textAlign:'center'}} span={11}>
                <Button onClick={sub} type="primary" ghost shape="circle" icon="upload" />
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
    const changPage = (page) =>{
      const {dispatch} = this.props;
      dispatch(
        {
          type:'performance/getTranList',
          payload: {
            ...this.state.searchFiles,
            page:page
          }
        }
      );
      this.setState({page:page});
    };
    const UploadPf = () => {
      const {dispatch} = this.props;
      dispatch({
        type:'performance/uploadPf',
        payload:this.props.user.currentUser.id,
        callback:(res)=>{
          if (res){
            if (res.status === "OK"){
              message.success("表格加载成功，请刷新Excel表格查看")
            } else {
              message.error("表格加载失败，请联系管理员：wangbo@lcservis.com")
            }

          } else {
            message.error("表格加载失败，请联系管理员：wangbo@lcservis.com")
          }
        }
      })
    };
    return(
      <div>
        <Card>
          <SearchForm  searchFunc={handleSearch} />
        </Card>
        <Card
          title={
            <Row >
              <Button type="primary" icon="select" disabled={this.state.selectedRowKeys.length===0} onClick={allSub} >批量提交</Button>
              <Button style={{marginLeft:'1rem'}} onClick={UploadPf} type="primary" icon="download"  >加载表格</Button>
            </Row>}
        >
          <Table
            rowSelection={rowSelection}
            dataSource={data}
            columns={columns}
            pagination={{
              total: total,
              pageSize: 10,
              onChange: changPage,
              hideOnSinglePage: true,
              size: 'small',
            }}
          />
        </Card>

      </div>
    )
  }
}

export default Transaction
