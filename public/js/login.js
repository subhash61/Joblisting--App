import axios from 'axios';

export const sendOTP = async (email) => {
  const res = await axios({
    method: 'POST',
    url: '/api/v1/users/sendOTP',
    data: {
      email,
    },
  });
  if (res.data.status === 'success') {
    window.alert('Otp send succesfully');
  }
};

export const login = async (otp, email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        otp,
        email,
      },
    });
    if (res.data.status === 'success') {
      window.alert('Logged in succesfully');
      window.setTimeout(() => {
        if (res.data.data.user.role === 'user') location.assign('/user');
        else {
          location.assign('/employer');
        }
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);
  }
};
