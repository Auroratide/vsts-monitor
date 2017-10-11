export const statusFor = (record) => {
  if(record.state === 'pending') {
    return 'pending';
  } else if(record.state === 'inProgress') {
    return 'progress';
  } else if(record.state === 'completed') {
    if(record.result === 'succeeded') {
      return 'success';
    } else {
      return 'failure';
    }
  } else {
    return 'unknown';
  }
};

export const sortByOrder = (records) => {
  return records.sort((lhs, rhs) => lhs.order < rhs.order ? -1 : 1);
};

export const keepOnlyTasks = (records) => {
  return records.filter(record => record.type === 'Task');
};