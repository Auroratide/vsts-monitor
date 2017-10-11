import http from './http';

const request = http.create({
  baseURL: 'https://mrcooper.visualstudio.com',
  headers: {
    Authorization: `Basic ${process.env.VSTS_AUTHORIZATION}`
  }
});

const getMostRecentBuild = (id) => {
  return request.get(`/${process.env.PROJECT_ID}/_apis/build/builds`, {
    params: {
      definitions: id,
      '$top': 1
    }
  }).then(res => res.data);
};

const getBuildTimeline = (id) => {
  return request.get(`/${process.env.PROJECT_ID}/_apis/build/builds/${id}/timeline`).then(res => res.data);
};

export default {
  getMostRecentBuild,
  getBuildTimeline
};