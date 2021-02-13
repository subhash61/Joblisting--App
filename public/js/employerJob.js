import axios from 'axios';

export const employerJob = async (obj) => {
  try {
    const res = await axios({
      url: '/api/v1/jobs',
      method: 'POST',
      data: obj,
    });
    if (res.data.status === 'success') {
      location.reload();
    }
  } catch (error) {
    console.log(error.res);
  }
};
