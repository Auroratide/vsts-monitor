import http from './http';

const get = id => {
  return http.get(`/pipelines/${id}`).then(res => res.data);
};

export default {
  get
};