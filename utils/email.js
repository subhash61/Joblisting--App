// const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');
const mailgun = require('mailgun-js')({ apiKey: process.env.API_KEY, domain: process.env.API_URL });

const mg = mailgun;

module.exports = class Email {
  constructor(user, otp) {
    this.firstName = user.name.split(' ')[0];
    this.otp = otp;
    this.from = `Subhash <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
  }

  send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
      otp: this.otp,
      firstName: this.firstName,
      subject,
    });
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };
    mg.messages().send(mailOptions, function (error, body) {
      // eslint-disable-next-line no-console
      console.log('OTP sent successfully!!');
    });
  }

  sendOTP() {
    this.send('otp', 'Valid only for 10 min!!');
  }
};
