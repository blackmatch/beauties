import * as userService from '../services/user';

export default {
  namespace: 'user',
  state: {
    userDetail: {},
  },
  reducers: {
    save(state, { payload: detail }) {
      return { ...state, detail };
    },
  },
  effects: {
    *getDetail({ payload: uId }, { call, put }) {
      const data = yield call(userService.detail, uId);
      yield put({
        type: 'save',
        payload: { userDetail: data.data },
      });
    },
  },
  subscriptions: {},
};
