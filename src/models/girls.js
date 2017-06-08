import * as girlsService from '../services/girls';
import { TOTAL_NUM } from '../constants';

export default {
  namespace: 'girls',
  state: {
    girls: [],
    total: TOTAL_NUM,
    page: 1,
  },
  reducers: {
    save(state, { payload: { girls, total, page, tab } }) {
      return { ...state, girls, total, page, tab };
    },
  },
  effects: {
    *fetch({ payload: { page, tab } }, { call, put }) {
      const data = yield call(girlsService.query, { page, tab });
      const girls = data.data;
      const newGirls = [];
      for (const girl of girls) {
        girl.imgUrl = girl.imgUrl.replace('http', 'https');
        newGirls.push(girl);
      }
      yield put({
        type: 'save',
        payload: {
          girls: newGirls,
          total: TOTAL_NUM,
          page: page,
          tab: tab,
        },
      });
    },
    // *reload(action, { put }) {
    //   yield put({
    //     type: 'fetch',
    //     payload: action.payload,
    //   });
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === '/') {
          const t = query.tab || 'all';
          const p = query.page ? parseInt(query.page, 10) : 1;
          dispatch({
            type: 'fetch',
            payload: { tab: t, page: p },
          });
        }
      });
    },
  },
};
