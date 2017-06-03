import React from 'react';
import {
  Modal,
  Spin,
} from 'antd';
import request from '../utils/request';
import styles from './GirlModal.css';

class GirlModal extends React.Component {
  constructor(props) {
    super(props);

    this.uId = this.props.uId;
    this.state = {
      visible: false,
      loading: false,
      userDetail: {
        uId: '',
        nickname: '',
        imgs: [],
      },
      errorOccurred: false,
    };

    this.getUserDetail = this.getUserDetail.bind(this);
    this.showHandler = this.showHandler.bind(this);
    this.hideHandler = this.hideHandler.bind(this);
  }

  componentWillReceiveProps(nextProp) {
    this.uId = nextProp.uId;
  }

  async getUserDetail() {
    if (this.uId) {
      const data = await request(`api/user/${this.uId}`);
      console.log(data);
      if (data.data.error !== undefined) {
        this.setState({ ...this.state, loading: false, errorOccurred: true });
      } else {
        this.setState({
          ...this.state,
          userDetail: data.data,
          loading: false,
          errorOccurred: false,
        });
      }
    } else {
      this.setState({ ...this.state, loading: false, errorOccurred: false });
    }
  }

  showHandler() {
    const ud = {
      uId: '',
      nickname: '',
      imgs: [],
    };
    this.setState({
      ...this.state,
      userDetail: ud,
      visible: true,
      loading: true,
      errorOccurred: false,
    });
    this.getUserDetail();
  }

  hideHandler() {
    this.setState({ ...this.state, visible: false, errorOccurred: false });
  }

  render() {
    const { children } = this.props;
    let imgItems;
    if (this.state.errorOccurred) {
      imgItems = (
        <li>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ color: 'red', fontSize: 18 }}>
              糟糕！！！获取不到这个妹子的信息了~~
            </p>
          </div>
        </li>
      );
    } else {
      imgItems = this.state.userDetail.imgs.map((img, index) =>
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
    }

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
          >
            <ul>
              {imgItems}
            </ul>
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
