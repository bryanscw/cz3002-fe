export const getTokenConfig = getState => {
  const token = getState().authReducer.access_token;

  const config = {
    headers: {
      'Authorization': `bearer ${token}`,
    },
  };

  return config;
};

export const getUser = getState => getState().authReducer.user;