import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
  //    service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "patriciaakweleyn@gmail.com",
    pass: "hmsh sccy ulav tffq",
  },
});


export const registerUserTemplate = `<div> 
    <h1> Dear {{username}} </h1>
    <p>A new account has been created for you </p>
    <h2> Thank you </h2>`;
