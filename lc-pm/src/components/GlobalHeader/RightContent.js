import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar,  Button , Form ,Modal} from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import NoticeIcon from '../NoticeIcon';
import styles from './index.less';
import FixPwd from './FixPwd'

export default class GlobalHeaderRight extends PureComponent {

  state = {
    modelOpen : false
  };
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  changLang = () => {
    const locale = getLocale();
    if (!locale || locale === 'zh-CN') {
      setLocale('en-US');
    } else {
      setLocale('zh-CN');
    }
  };

  render() {


    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.props;

    const Cancel = () => this.setState({modelOpen:false})

    const Submit = () => {
      const form = this.formRef.props.form;
      form.validateFields((err,values) => {
        console.log(form.getFieldsValue())
        if (!err) {
          this.setState({modelOpen:false})

        }
      })

    }

    const pwdClick = (para) => {
      if (para.key === 'fixPwd'){
        this.setState({modelOpen:true})
      }
      const { dispatch } = this.props;
      if (para.key === 'logout') {
        dispatch({
          type: 'login/logout',
        });
      }
    }
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={pwdClick}>
        <Menu.Item key="fixPwd">
          <Icon type="user" />
          密码修改
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div className={className}>


        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
        <Button
          size="small"
          ghost={theme === 'dark'}
          style={{
            margin: '0 8px',
          }}
          onClick={() => {
            this.changLang();
          }}
        >
          <FormattedMessage id="navbar.lang" />
        </Button>

        <FixPwd  wrappedComponentRef={this.saveFormRef}
                 visible={this.state.modelOpen}
                 submit={Submit}
                 cancel={Cancel}    />


      </div>
    );
  }
}
