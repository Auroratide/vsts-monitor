export const statusFor = (record) => {
  if(record.state === 'pending') {
    return 'pending';
  } else if(record.state === 'inProgress') {
    return 'progress';
  } else if(record.state === 'completed') {
    if(record.result === 'succeeded') {
      return 'success';
    } else if(record.result === 'failed') {
      return 'failure';
    } else if(record.result === 'skipped') {
      return 'pending';
    } else {
      return 'unknown';
    }
  } else {
    return 'unknown';
  }
};

export const buildStatus = (build) => {
  if(build.result === 'succeeded') {
    return 'success';
  } else {
    return 'failure';
  }
};

export const sortByOrder = (records) => {
  return records.sort((lhs, rhs) => lhs.order < rhs.order ? -1 : 1);
};

export const keepOnlyTasks = (records) => {
  return records.filter(record => record.type === 'Task');
};

export const organizeIntoEnvironmentBuckets = (records) => {
  const buckets = {};
  records.forEach(record => {
    record.environments.forEach(env => {
      if(!buckets[env])
        buckets[env] = [];
      buckets[env].push(env);
    });
  });

  return buckets;
};

export const findFirstNotInProgress = (envs) => {
  return envs.find(env => env.status != 'inProgress');
};

export const orderByRank = (envs) => {
  return envs.sort((lhs, rhs) => lhs.rank - rhs.rank);
};

export const statusForRelease = (record) => {
  if(record.status === 'pending') {
    return 'pending';
  } else if(record.status === 'inProgress') {
    return 'progress';
  } else if(record.status === 'succeeded') {
    return 'success';
  } else if(record.status === 'failed') {
    return 'failure';
  } else {
    return 'unknown';
  }
};