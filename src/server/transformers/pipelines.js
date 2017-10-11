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
