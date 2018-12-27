import request from '@/utils/request';

export async function query(params) {
  return request(`/api/user/?page=${params.page}`);
}

export async function queryCurrent() {
  return request('/api/currentUser/');
}

export async function updateUser(params) {
  let id = params.id;
  delete params.id;
  return request(`/api/user/${id}/`, {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function removeUser(params) {
  return request(`/api/user/${params}/`, {
    method: 'DELETE',
  });
}

export async function createUser(params) {
  return request('/api/user/', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function valiPwd(params) {
  return request(`/api/fixPwd/?pwd=${params}`)
}

export async function fixPwd(params) {
  return request('/api/fixPwd/', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
