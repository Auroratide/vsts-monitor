import http from './http';
import { getAuthorization } from './login';

const builds = http.create({
  baseURL: 'https://mrcooper.visualstudio.com'
});

const releases = http.create({
  baseURL: 'https://mrcooper.vsrm.visualstudio.com/'
});

const getMostRecentBuild = (projectid, id) => {
  return builds.get(`/${projectid}/_apis/build/builds`, {
    params: {
      definitions: id,
      '$top': 1
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getMostRecentCompletedBuild = (projectid, id) => {
  return builds.get(`/${projectid}/_apis/build/builds`, {
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

const getBuildTimeline = (projectid, id) => {
  return builds.get(`/${projectid}/_apis/build/builds/${id}/timeline`, {
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getReleaseDefinitions = (projectid) => {
  return releases.get(`/${projectid}/_apis/release/definitions`, {
    params: {
      'api-version': '4.1',
      '$expand': 'artifacts'
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getMostRecentReleases = (projectid, releaseId) => {
  return releases.get(`/${projectid}/_apis/release/releases`, {
    params: {
      'definitionId': releaseId.toString(),
      '$top': 25,
      '$expand': 'environments',
      'api-version': '4.1'
    },
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
};

const getProjects = () => {
  return builds.request('/_apis/projects', {
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
}

const getDefinitions = projectId =>{
  return builds.get(`${projectId}/_apis/build/definitions`, {
    headers: {
      Authorization: `Basic ${getAuthorization()}`
    }
  }).then(res => res.data);
}

export default {
  getMostRecentBuild,
  getMostRecentCompletedBuild,
  getBuildTimeline,
  getReleaseDefinitions,
  getMostRecentReleases,
  getProjects,
  getDefinitions
};