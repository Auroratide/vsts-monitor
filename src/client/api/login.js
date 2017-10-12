import http from './http';

export default (username, personalAccessToken) => {
  return http.post('/login', {
    username,
    personalAccessToken
  }).then(res => 200 <= res.status && res.status < 400);
};