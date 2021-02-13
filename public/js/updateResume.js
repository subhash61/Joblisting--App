import axios from 'axios';

export const updateResume = async (data) => {
  try {
    const url = '/api/v1/users/uploadResume';

    const res = await axios({
      method: 'POST',
      url,
      data,
    });
    console.log(res);
  } catch (err) {
    console.log(err.response);
  }
};
export const uploadUser = async (jobId) => {
  try {
    const url = `/api/v1/jobs/applyJob/${jobId}`;

    const res = await axios({
      method: 'PATCH',
      url,
      jobId,
    });
    if (res.data.status === 'success') {
      window.alert('Applied added successfully');
    }
  } catch (err) {
    window.alert(err.response.data.message);
  }
};
