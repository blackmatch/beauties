import React from 'react';
import {
  Menu,
  Card,
  Pagination,
  Spin,
} from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import styles from './Girls.css';
import GirlModal from './GirlModal';
import { PAGE_SIZE } from '../constants';

const MenuItem = Menu.Item;

const menus = [
  {
    key: 'all',
    title: '全部',
  },
  {
    key: 'daxiong',
    title: '大胸妹',
  },
  {
    key: 'qiaotun',
    title: '小翘臀',
  },
  {
    key: 'heisi',
    title: '黑丝袜',
  },
  {
    key: 'meitui',
    title: '美腿控',
  },
  {
    key: 'yanzhi',
    title: '有颜值',
  },
  {
    key: 'dazahui',
    title: '大杂烩',
  },
];

function Girls({
  dispatch,
  girls,
  loading,
  total,
  page: current,
  tab: tabName }) {
  /* 切换菜单 */
  const onMenuSelect = (item) => {
    dispatch(routerRedux.push({
      pathname: '/',
      query: {
        tab: item.key,
        page: 1,
      },
    }));
  };

  /* 切换页 */
  function pageChangeHandler(p) {
    dispatch(routerRedux.push({
      pathname: '/',
      query: {
        tab: tabName,
        page: p,
      },
    }));
  }

  /* 菜单元素 */
  const menuItems = menus.map(menu =>
    <MenuItem key={menu.key}>
      {menu.title}
    </MenuItem>,
  );

  /* 每一张图片的元素 */
  const girlCards = girls.map((girl, index) =>
    <li key={`${index}`} style={{ display: 'inline-block' }}>
      <Card className={styles.card} bodyStyle={{ padding: 0 }}>
        <div style={{ height: 320 }}>
          <GirlModal imgSrc={girl.imgUrl} title={girl.title}>
            <div>
              <img className={styles.img} alt={girl.title} src={girl.imgUrl} />
            </div>
          </GirlModal>
        </div>
        <div style={{ height: 30 }}>
          <p className={styles.title}>
            {girl.title}
          </p>
        </div>
      </Card>
    </li>,
  );

  return (
    <div className={styles.normal}>
      <div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[tabName]}
          onSelect={onMenuSelect}
          style={{ alignItems: 'center' }}
          align="center"
        >
          {menuItems}
        </Menu>
      </div>
      <div>
        <h4 style={{ marginTop: 10, color: 'red' }}>
          声明：该网站数据来源于互联网，仅供学习使用，不得用于商业用途，如有侵权，请
          <a href="mailto:coder.blackmatch@gmail.com">
            给我发邮件
          </a>
        </h4>
      </div>
      <div className={styles.content}>
        <ul>
          {girlCards}
        </ul>
      </div>
      <div>
        <Pagination
          current={current || 0}
          defaultPageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
          className={styles.pagination}
          total={total}
        />
      </div>
      <Spin className={styles.spin} size="large" spinning={loading} />
    </div>
  );
}

function mapStateToProps(state) {
  const { girls, total, page, tab } = state.girls;
  return {
    loading: state.loading.models.girls,
    girls,
    total,
    page,
    tab,
  };
}

export default connect(mapStateToProps)(Girls);
