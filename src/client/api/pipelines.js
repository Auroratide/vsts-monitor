import http from './http';

const get = (projectId, id) => {
  return http.get(`/pipelines/${projectId}/${id}`).then(res => res.data);
};

export default {
  get
};