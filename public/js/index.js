/* eslint-disable */
import '@babel/polyfill';
import { sendOTP, login, logout } from './login';
import { updateResume, uploadUser } from './updateResume';
import { profileForm } from './profileForm';
import { employerJob } from './employerJob';
import { updateMe } from './updateMe';
// DOM ELEMENTS
const sendOTPBtn = document.querySelector('.send__otp');
const loginBtn = document.querySelector('.submit__login');
// const jobForm = document.querySelector('.job__form');
const resumeApply = document.querySelectorAll('.resume__apply');
const profileButton = document.querySelector('.nav__btn--1');
const logoutButton = document.querySelector('.nav__btn--2');
const CreateJobForm = document.querySelector('.employer__submit');
const profileField = document.querySelector('.profile__field');

if (logoutButton) {
  logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    logout();
  });
}

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

if (profileButton) {
  profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    profileForm();
  });
}

if (resumeApply) {
  resumeApply.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const form = new FormData();

      const { jobId } = el.closest('.job').dataset;

      if (!el.closest('.upload').firstChild.lastChild.files[0]) {
        return alert('upload resume file first to apply');
      }
      form.append('resume', el.closest('.upload').firstChild.lastChild.files[0]);
      el.closest('.job').classList.add('slide__right');
      uploadUser(jobId);
      updateResume(form);
    });
  });
}

// if (CreateJobForm) {
//   CreateJobForm.addEventListener('click', (e) => {
//     e.preventDefault();
//     const obj = {};
//     obj.companyName = document.getElementById('name').value;
//     obj.title = document.getElementById('position').value;
//     obj.locationName = document.getElementById('location').value;
//     obj.expiry = document.getElementById('date').value;
//     obj.description = document.getElementById('description').value;

//     employerJob(obj);
//   });
// }

// if (profileField) {
//   profileField.addEventListener('click', (e) => {
//     e.preventDefault();
//     const form = {};
//     form.name = document.getElementById('name').value;
//     form.email = document.getElementById('email').value;
//     form.resume = document.getElementById('resume').value;
//     updateMe(form);
//   });
// }
