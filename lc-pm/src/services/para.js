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

export async function getCurrPara() {
  return request('/api/getCurrPara/');
}

export async function getOnePara(params) {
  return request(`/api/onePara/?user_id=${params}`);
}


