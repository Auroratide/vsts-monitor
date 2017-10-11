export const classes = (...cs) => {
  let className = '';
  for(const c of cs) if(c)
    className += ` ${c}`;
  return className.substr(1);
};

export const renderIf = (condition, componentCallback) =>
  condition() ? componentCallback() : null;

export const exists = field => field !== undefined && field !== null;
