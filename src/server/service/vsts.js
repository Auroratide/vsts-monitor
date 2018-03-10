import http from './http';
import { getAuthorization } from './login';

const builds = http.create({
  baseURL: 'https://mrcooper.visualstudio.com'
});

const releases = http.create({
  baseURL: 'https://mrcooper.vsrm.visualstudio.com/'
});

const getMostRecentBuild = (id) => {
  return builds.get(`/${process.env.PROJECT_ID}/_apis/build/builds`, {
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
  return builds.get(`/${process.env.PROJECT_ID}/_apis/build/builds`, {
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
  return builds.get(`/${process.env.PROJECT_ID}/_apis/build/builds/${id}/timeline`, {
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getReleaseDefinitions = () => {
  return releases.get(`/${process.env.PROJECT_ID}/_apis/release/definitions`, {
    params: {
      'api-version': '4.0-preview.3',
      '$expand': 'artifacts'
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getMostRecentReleases = (releaseId) => {
  return releases.get(`/${process.env.PROJECT_ID}/_apis/release/releases`, {
    params: {
      'api-version': '4.0-preview.4',
      'definitionId': releaseId.toString(),
      '$top': 25,
      '$expand': 'environments'
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

export default {
  getMostRecentBuild,
  getMostRecentCompletedBuild,
  getBuildTimeline,
  getReleaseDefinitions,
  getMostRecentReleases
};