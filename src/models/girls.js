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
    *fetch({ payload }, { call, put }) {
      const data = yield call(girlsService.query, payload);
      yield put({
        type: 'save',
        payload: {
          girls: data.data,
          total: TOTAL_NUM,
          page: payload.page,
          tab: payload.tab,
        },
      });
    },
    *reload(action, { put }) {
      yield put({
        type: 'fetch',
        payload: action.payload,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'reload',
            payload: { tab: 'all', page: 1 },
          });
        }
      });
    },
  },
};
