import { stringify } from 'qs';
import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/jwt_auth/', {
    method: 'POST',
    body: params,
  });
}
