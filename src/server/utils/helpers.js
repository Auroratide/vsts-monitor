export const isJson = (req) => {
    const accept = req.headers.accept;
    return accept && accept.indexOf('application/json') >= 0;
  };
  