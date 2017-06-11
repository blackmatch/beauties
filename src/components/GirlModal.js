import React from 'react';
import {
  Modal,
  Spin,
  message,
} from 'antd';
import request from '../utils/request';
import styles from './GirlModal.css';

class GirlModal extends React.Component {
  constructor(props) {
    super(props);

    // this.uId = this.props.uId;
    this.state = {
      visible: false,
      loading: false,
      uId: '',
      userDetail: {
        uId: '',
        nickname: '',
        imgs: [],
      },
    };

    this.getUserDetail = this.getUserDetail.bind(this);
    this.showHandler = this.showHandler.bind(this);
    this.hideHandler = this.hideHandler.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uId) {
      this.setState({ ...this.state, uId: nextProps.uId });
    }
  }

  /* 获取用户详情 */
  getUserDetail() {
    const pm = new Promise((resolve) => {
      if (this.state.uId.length > 0) {
        resolve(request(`/api/user/${this.state.uId}`));
      } else {
        resolve(-1);
      }
    });

    return pm;
  }

  /* 显示modal */
  async showHandler() {
    try {
      this.setState({ ...this.state, visible: true, loading: true });
      const ud = await this.getUserDetail();
      if (ud !== -1) {
        this.setState({
          ...this.state,
          userDetail: ud.data,
          loading: false,
        });
      } else {
        this.setState({ ...this.state, visible: false, loading: false });
        message.warning('无法获取该用户信息');
      }
    } catch (error) {
      this.setState({ ...this.state, visible: false, loading: false });
      message.error(error.message);
    }
  }

  /* 隐藏modal */
  hideHandler() {
    this.setState({ ...this.state, visible: false });
  }

  render() {
    const { children } = this.props;
    /* 构建所有图片的元素 */
    const imgItems = this.state.userDetail.imgs.map((img, index) =>
      <li key={`${index}`}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <p>{img.title}</p>
          <img
            style={{ maxWidth: '100%' }}
            src={img.imgUrl}
            alt={img.title}
          />
        </div>
      </li>,
    );

    return (
      <span>
        <span onClick={this.showHandler}>
          {children}
        </span>
        <span>
          <Modal
            title={this.state.userDetail.nickname}
            footer={null}
            visible={this.state.visible}
            onCancel={this.hideHandler}
            width={800}
            maskClosable={false}
          >
            <div className={styles.imgs}>
              <ul>
                {imgItems}
              </ul>
            </div>
            <Spin
              className={styles.spin}
              size="large"
              spinning={this.state.loading}
            />
          </Modal>
        </span>
      </span>
    );
  }
}

export default GirlModal;
