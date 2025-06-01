import axios from 'axios';
import qs from 'qs';

export const login = async (userID, password, deviceToken: string) => {
  const url = `${process.env.REACT_APP_API_URL}/auth/signin`;

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const data = qs.stringify({
    userID,
    password,
    deviceToken
  });

  try {
    const response = await axios.post(url, data);

    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error.request)
    if (error.response) {
      throw new Error(`${error.response.data.message || 'Login failed'}`);
    } else if (error.request) {
      throw new Error('No response received from server.');
    } else {
      throw new Error('Unexpected error during login.');
    }
  }
};
