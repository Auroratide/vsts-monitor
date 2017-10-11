export const doIf = (predicate, func) => {
  return (req, res, next) => {
    if(predicate(req))
      func(req, res, next);
    else
      next();
  };
};

export const render = (req, res) => {
  return res.render('index', { });
};