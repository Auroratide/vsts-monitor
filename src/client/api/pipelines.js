import http from './http';

const getAll = () => {
  return http.get('/pipelines').then(res => res.data);
};

export default {
  getAll
};