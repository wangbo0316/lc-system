import request from '@/utils/request';


export async function updatePf(params) {
  let id = params.id;
  delete params.id;
  return request(`/api/updatePF/${id}/`, {
    method: 'PUT',
    body: params,
  });
}

export async function uploadPf(params) {
  return request(`/api/uploadPf/?user_id=${params}`)
}

export async function createPf(params) {
  return request(`/api/performance/`, {
    method: 'POST',
    body: params,
  });
}

export async function removePf(params) {
  return request(`/api/performance/${params}/`, {
    method: 'DELETE',
  });
}

export async function getPfList() {
  return request('/api/performance/');
}



export async function getTranList(params) {
  let url = '/api/getTranList/';
  Object.keys(params).map((v,k)=>{
    if (k === 0){
      url += '?'+v+'='+params[v]
    } else url += '&'+v+'='+params[v]
  });
  return request(url);
}



