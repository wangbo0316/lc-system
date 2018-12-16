import request from '@/utils/request';


export async function updatePara(params) {
  return request(`/api/updatePara/${params.id}/`, {
    method: 'PUT',
    body: { content_json: params.content_json },
  });
}

export async function getParaList() {
  return request('/api/para/');
}

