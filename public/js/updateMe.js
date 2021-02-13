import axios from 'axios';

export const updateMe = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/users/updateMe',
      data: {
        data,
      },
    });
    console.log(res);
  } catch (err) {}
};
