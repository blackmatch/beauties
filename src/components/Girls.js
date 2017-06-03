import React from 'react';
import {
  Menu,
  Card,
  Pagination,
  Spin,
} from 'antd';
import { connect } from 'dva';
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

function Girls({ dispatch, girls, loading, total, page, tab: tabName }) {
  const menuItems = menus.map(menu =>
    <MenuItem key={menu.key}>
      {menu.title}
    </MenuItem>,
  );

  /* 切换菜单 */
  const onMenuSelect = (item) => {
    dispatch({
      type: 'girls/fetch',
      payload: { page: 1, tab: item.key },
    });
  };

  /* 页 */
  function pageChangeHandler(p) {
    dispatch({
      type: 'girls/fetch',
      payload: { page: p, tab: tabName },
    });
  }

  let shouldLoading;
  if (tabName === undefined) {
    shouldLoading = true;
  } else {
    shouldLoading = loading;
  }

  let girlCards;
  if (girls !== undefined && girls.length > 0) {
    girlCards = girls.map((girl, index) =>
      <li key={`${index}`} style={{ display: 'inline-block' }}>
        <Card className={styles.card} bodyStyle={{ padding: 0 }}>
          <div style={{ height: 320 }}>
            <GirlModal uId={girl.uId}>
              <img className={styles.img} alt={girl.title} src={girl.imgUrl} />
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
  } else if (girls !== undefined
    && girls.length === 0
    && shouldLoading === false) {
    girlCards = (
      <li>
        <div>
          <p style={{ marginTop: 20, color: 'red', fontSize: 18 }}>
            这一页真的什么都没有，要不换一页试试~~
          </p>
        </div>
      </li>
    );
  }

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
      <div className={styles.content}>
        <ul>
          {girlCards}
        </ul>
      </div>
      <div>
        <Pagination
          defaultCurrent={page}
          defaultPageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
          className={styles.pagination}
          total={total}
        />
      </div>
      <Spin className={styles.spin} size="large" spinning={shouldLoading} />
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
