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