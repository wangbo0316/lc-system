import React,{Component} from 'react'
import {connect} from 'dva'
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import {Row,Col,Card,List,Modal} from 'antd'
import styles from './Para.less'
import UpdatePara from './UpdatePara'
@connect(({ para,  loading }) => ({
  para,
  loading: loading.effects['para/fetch'],
}))

class Para extends Component {
  state = {
    detailModal:false,
    showItem:{
      depart:{
        depart_name:""
      },
      content_json:{}
    }
  };

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch({
      type:'para/fetch'
    })
  }

  render() {
    const {para,dispatch} = this.props;
    const data = para.paraList;



    return (
      <GridContent>
        <Row>
          <Col offset={1} span={22}>
            <Card
              title="参数管理"
              style={{ minHeight: 800 }}
            >
              <List
                grid={{
                  gutter: 16, xs: 3, sm: 3, md:3, lg: 3, xl: 3, xxl:3,
                }}
                dataSource={data}
                renderItem={item => {
                  const content_json = JSON.parse(item.content_json);
                  let json_keys = []
                  if (content_json) {json_keys = Object.keys(content_json);}

                  if (json_keys.length>2){
                    json_keys = json_keys.slice(0,2)
                  }
                  let vo = {...item , content_json:content_json};
                  const showDetail = () => {
                    this.setState({
                      detailModal:true,
                      showItem:vo
                    })
                  }
                  return (
                    <List.Item>
                      <Card
                        title={<a onClick={showDetail} >{item.depart.depart_name}</a>}
                        style={{ height: 205 }}
                        extra={<UpdatePara  dispatch={dispatch} data={vo} />}
                      >
                        {
                          json_keys.length>0?json_keys.map((value , key)=>
                            <Row key={key} style={{marginTop:key?'2rem':0}}>
                              <Col style={{fontFamily:'微软雅黑',fontWeight:'blod',fontSize:'1.2rem'}} offset={1} span={11}>
                                {value}
                              </Col>
                              <Col style={{fontFamily:'微软雅黑',fontWeight:'blod',fontSize:'1.2rem',textAlign:"right"}} span={11}>
                                {content_json[value]}
                              </Col>
                            </Row>):"还未添加任何参数..."
                        }
                      </Card>
                    </List.Item>
                  )
                  }}
              />
            </Card>
          </Col>
        </Row>

        <Modal
          visible={this.state.detailModal}
          title={this.state.showItem.depart.depart_name}
          footer={[]}
          onCancel={()=>this.setState({detailModal:false})}
        >
          {
            this.state.showItem.content_json ? Object.keys(this.state.showItem.content_json).map((v,k)=>{
              return (
                <Row key={k} style={{marginTop:k?'2rem':0}}>
                  <Col style={{fontFamily:'微软雅黑',fontWeight:'blod',fontSize:'1.2rem'}} offset={1} span={11}>
                    {v}
                  </Col>
                  <Col style={{fontFamily:'微软雅黑',fontWeight:'blod',fontSize:'1.2rem',textAlign:"right"}} span={11}>
                    {this.state.showItem.content_json[v]}
                  </Col>
                </Row>
              )
            }):"还未添加任何参数..."
          }
        </Modal>
      </GridContent>
    )

  }
}
export default Para
