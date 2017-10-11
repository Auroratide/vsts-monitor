import http from './http';

const getAll = () => {
  return http.get('/pipelines').then(res => res.data);
};

const get = id => {
  return http.get(`/pipelines/${id}`).then(res => res.data);
};

export default {
  getAll,
  get
};