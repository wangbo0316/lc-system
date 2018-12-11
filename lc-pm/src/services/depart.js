import request from '@/utils/request';

export async function addDepart(params) {
  return request('/api/depart/', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateDepart(params) {
  return request(`/api/depart/${params.id}/`, {
    method: 'PUT',
    body: { depart_name: params.depart_name },
  });
}

export async function getDepartList(params) {
  return request(`/api/depart/?page=${params.page}`);
}

export async function removeDepart(params) {
  return request(`/api/depart/${params}/`, {
    method: 'DELETE',
  });
}
