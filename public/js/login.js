//eslint-disabled
import axios from 'axios';

export const login = async (email) => {
  const res = await axios({
    method: 'POST',
    url: '/api/v1/users/sendOTP',
    data: {
      email,
    },
  });

  console.log(res);
};
