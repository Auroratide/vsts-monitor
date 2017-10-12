let authorization = null;

export const isLoggedIn = () => authorization !== null;

export const getAuthorization = () => authorization;

export const login = (username, personalAccessToken) => {
  authorization = new Buffer(`${username}:${personalAccessToken}`).toString('base64');
  console.log('TOKEN', authorization);
};