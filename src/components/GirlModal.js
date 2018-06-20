import React from 'react';
import {
  Modal,
  Spin,
  // message,
} from 'antd';
// import request from '../utils/request';
import styles from './GirlModal.css';

class GirlModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      loading: false,
    };

    this.showHandler = this.showHandler.bind(this);
    this.hideHandler = this.hideHandler.bind(this);
  }

  /* 显示modal */
  async showHandler() {
    this.setState({
      ...this.state,
      visible: true,
      loading: false,
    });
  }

  /* 隐藏modal */
  hideHandler() {
    this.setState({ ...this.state, visible: false });
  }

  render() {
    const { children, imgSrc, title } = this.props;

    return (
      <div>
        <span>
          <span onClick={this.showHandler}>
            {children}
          </span>
          <span>
            <Modal
              title={title}
              footer={null}
              visible={this.state.visible}
              onCancel={this.hideHandler}
              width={800}
              maskClosable={false}
            >
              <div className={styles.imgs}>
                <img
                  style={{ maxWidth: '100%' }}
                  src={imgSrc}
                  alt={title}
                />
              </div>
              <Spin
                className={styles.spin}
                size="large"
                spinning={this.state.loading}
              />
            </Modal>
          </span>
        </span>
      </div>
    );
  }
}

export default GirlModal;
