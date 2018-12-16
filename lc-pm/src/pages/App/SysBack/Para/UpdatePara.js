import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Modal, Button, Icon, Input, message, InputNumber } from 'antd';

const FormItem = Form.Item;

class UpdatePara extends Component {

  state = {
    modal: false,
    id: this.props.data.content_json ? Object.keys(this.props.data.content_json).length : 0,
    err: '',
  };
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };


  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(this.state.id + 1);
    this.setState({ id: this.state.id + 1 });
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  render() {
    const { dispatch, data } = this.props;
    const names = data.content_json ? Object.keys(data.content_json) : [];
    const names_lenth = names.length;
    const values = [];
    names.map(v => values.push(data.content_json[v]));
    const initKeys = [];
    for (let i = 0; i < names_lenth; i++) {
      initKeys.push(i);
    }
    const handleOk = () => {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if (sum !== 100) {
            this.setState({ err: '总分必须等于100 !' });
          } else {
            this.setState({ err: '' });
            let content_json = {};
            values.keys.map(i => {
              content_json[values.names[i]] = values.values[i];
            });
            let params = { id: data.id, content_json: JSON.stringify(content_json) };
            dispatch({
              type: 'para/update',
              payload: params,
              callback: (res) => {
                if (res) {
                  message.success('参数信息修改成功！');
                } else {
                  message.warning('参数信息可能修改失败了！');
                }
                dispatch({
                  type: 'para/fetch',
                });
                this.props.form.resetFields();
                this.setState({ modal: false });
              },
            });
          }

        } else {
          console.log(err);
        }
      });
    };
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 20,
      },
    };
    getFieldDecorator('keys', { initialValue: initKeys });
    const keys = getFieldValue('keys');
    const valueArry = getFieldValue('values') ? getFieldValue('values') : [];
    let sum = 0;
    valueArry.map(v => sum = sum + parseFloat(v));
    const formItems = keys.map((k, index) => (
      <Row key={k}>
        <Col span={11}>
          <FormItem
            {...formItemLayout}
            label='科目'
            required={false}
          >
            {getFieldDecorator(`names[${k}]`, {
              validateTrigger: 'onBlur',
              initialValue: names[k] ? names[k] : '',
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入科目名称!',
              }],
            })(
              <Input/>,
            )}
          </FormItem>
        </Col>
        <Col span={11}>
          <FormItem
            {...formItemLayout}
            label='占比'
            required={false}
            key={k}
          >
            {getFieldDecorator(`values[${k}]`, {
              validateTrigger: 'onBlur',
              initialValue: values[k] ? values[k] : 0,
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入占比值 !',
              }],
            })(
              <InputNumber style={{ width: '100%' }} min={0} max={100} precision={2}/>,
            )}
          </FormItem>
        </Col>
        <Col style={{ textAlign: 'right' }} span={2}>
          <Button
            icon="minus"
            type="dashed"
            onClick={() => this.remove(k)}
          />
        </Col>
      </Row>
    ));
    return (
      <div>
        <Button
          onClick={() => this.setState({ modal: true })}
          type="dashed"
          shape="circle"
          icon="edit"
        />
        <Modal
          width='60%'
          title="修改参数"
          visible={this.state.modal}
          onOk={handleOk}
          onCancel={() => this.setState({ modal: false })}
        >
          <Form>
            <Row>
              <Col span={12}>
                <p style={{ fontFamily: '微软雅黑', fontSize: '1.5rem', fontWeight: 'blod' }}>
                  当前总分:
                </p>
              </Col>
              <Col style={{ textAlign: 'right' }} span={12}>
                <p style={{ fontFamily: '微软雅黑', fontSize: '1.5rem', fontWeight: 'blod' }}>
                  {sum}
                </p>
              </Col>
            </Row>

            <Row>
              <Col style={{ textAlign: 'center' }} span={24}>
                <p style={{ fontFamily: '微软雅黑', fontSize: '1.5rem', fontWeight: 'blod', color: 'red' }}>
                  {this.state.err}
                </p>
              </Col>
            </Row>
            {formItems}
            <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
              <Icon type="plus"/> 添加科目
            </Button>
          </Form>

        </Modal>
      </div>
    );
  }
}

export default Form.create()(UpdatePara);
