import queryString from 'query-string';
import request from '../utils/request';

// 转换
const transObj = {
  daxiong: 'tit',
  qiaotun: 'hip',
  heisi: 'silk',
  meitui: 'leg',
  yanzhi: 'face',
  dazahui: 'other',
};

export async function query(payload) {
  const params = {
    page: payload.page || 1,
  };

  if (payload.tab) {
    params.type = transObj[payload.tab];
  }

  if (params.type) {
    // ok
  } else {
    delete params.type;
  }

  return request(`/api/imgs?${queryString.stringify(params)}`);
}
