import axios from 'axios';

export const profileForm = async () => {
  try {
    const url = '/user/profile';
    const res = await axios({
      method: 'GET',
      url,
    });

    location.assign('/user/profile');
  } catch (err) {
    console.log('err:', err);
  }
};
// window.setTimeout(() => {
//   if (res.data.data.user.role === 'user') location.assign('/user');
//   else {
//     location.assign('/employer');
//   }
// }, 1500);
