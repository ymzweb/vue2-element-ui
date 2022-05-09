import request from "@/utils/request";
const api = {
  get: "/api/get",
  post: "/api/post",
  put: "/api/put",
  del: "/api/del",
};

export function getData(params) {
  return request({
    url: api.get,
    method: "get",
    params,
  });
}

export function postData(data) {
  return request({
    url: api.post,
    method: "post",
    data,
  });
}

export function putData(data) {
  return request({
    url: api.put,
    method: "put",
    data,
  });
}

export function delData(params) {
  return request({
    url: api.del,
    method: "del",
    params,
  });
}
