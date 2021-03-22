export const getTokenConfig = getState => {
 const token = getState().authReducer.access_token
 console.log("getState().authReducer.access_token:"+getState().authReducer.access_token);
//const  ="6425e615-6b0c-406d-8438-c790954f8a5c"

  const config = {
    headers: {
      'Authorization': `bearer ${token}`
      // 'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  return config;
};

export const getUser = getState => getState().authReducer.user;