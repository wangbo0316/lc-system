import request from '@/utils/request';


export async function updatePara(params) {
  return request(`/api/para/${params.id}/`, {
    method: 'PUT',
    body: { depart_name: params.depart_name },
  });
}

export async function getParaList() {
  return request('/api/para/');
}

