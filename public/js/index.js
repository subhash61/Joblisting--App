/* eslint-disable */
import '@babel/polyfill';
import { sendOTP, login } from './login';
import { updateResume, uploadUser } from './updateResume';

// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login');
const jobForm = document.querySelector('.job__form');
const resumeApply = document.querySelector('.resume__apply');

if (sendOTPBtn) {
  sendOTPBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    sendOTP(email);
  });
}

if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const otp = document.querySelector('.otp__input').value;
    const email = document.getElementById('email').value;
    login(otp, email);
  });
}

if (resumeApply) {
  resumeApply.addEventListener('click', (e) => {
    console.log('fasfkajfakjfakjfs');
    e.preventDefault();
    const form = new FormData();
    form.append('resume', document.getElementById('resume').files[0]);
    console.log(form);

    updateResume(form);
  });

  resumeApply.addEventListener('click', (e) => {
    console.log('askafgaksfgaskfgasfkagfkagfakasfa');
    e.preventDefault();
    const { jobId } = document.querySelector('.company__name').dataset;
    uploadUser(jobId);
  });
}
