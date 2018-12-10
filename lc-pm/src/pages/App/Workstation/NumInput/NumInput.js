import React,{Component} from 'react'
import {Input,Tooltip} from 'antd'


class NumInput extends Component {

  state = {value:''}

  validateNum = (e) => {
    const { cout } = this.props
    const { value } = e.target;
    const reg = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) && parseFloat(value) <= cout || value === ''  ) {
      this.setState({value:value})
    }
  };

  render(){
    const {cout,label} = this.props
    return(
      <Tooltip title={'请输入'+label+'项得分,最高分为' + cout+'分'}>
        <Input onChange={this.validateNum} value={this.state.value}></Input>
      </Tooltip>
    )
  }
}

export default NumInput
