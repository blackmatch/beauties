import queryString from 'query-string';
import request from '../utils/request';

export async function query(payload) {
  const params = {
    page: payload.page || 1,
  };
  const tab = payload.tab || 'all';
  return request(`/api/image/${tab}?${queryString.stringify(params)}`);
}
