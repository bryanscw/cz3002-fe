export const getTokenConfig = getState => {
  const token = localStorage.getItem('access_token');

  const config = {
    headers: {
      'Authorization': `bearer ${token}`,
    },
  };

  return config;
};

export const getUser = getState => getState().authReducer.user;