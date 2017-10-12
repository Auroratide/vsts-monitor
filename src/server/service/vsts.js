import http from './http';
import { getAuthorization } from './login';

const request = http.create({
  baseURL: 'https://mrcooper.visualstudio.com'
});

const getMostRecentBuild = (id) => {
  return request.get(`/${process.env.PROJECT_ID}/_apis/build/builds`, {
    params: {
      definitions: id,
      '$top': 1
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getMostRecentCompletedBuild = (id) => {
  return request.get(`/${process.env.PROJECT_ID}/_apis/build/builds`, {
    params: {
      definitions: id,
      statusFilter: 'completed',
      '$top': 1
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getBuildTimeline = (id) => {
  return request.get(`/${process.env.PROJECT_ID}/_apis/build/builds/${id}/timeline`, {
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

export default {
  getMostRecentBuild,
  getMostRecentCompletedBuild,
  getBuildTimeline
};