import http from './http';

const get = () => {
  return http.get('/projects').then(res => res.data);
};

const getDefinitions = projectId =>{
  return http.get(`/projects/${projectId}`).then(res => res.data);
}

export default {
  get,
  getDefinitions
};