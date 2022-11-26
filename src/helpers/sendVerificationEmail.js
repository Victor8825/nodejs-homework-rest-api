const sgMail = require("@sendgrid/mail");
const requestError = require("./requestError");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (data) => {
  const email = { ...data, from: "victorrv2588@gmail.com" };
  try {
    await sgMail.send(email);
  } catch (error) {
    throw requestError(502, "Ooops, something happened");
  }
};

module.exports = sendMail;
