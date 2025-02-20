require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: process.env.EMAIL_RECEIVER, 
    subject: `Nowa wiadomość od ${name}`, 
    text: `Od: ${name} (${email})\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Błąd podczas wysyłania e-maila:", error);
      return res.status(500).send("Wystąpił błąd podczas wysyłania wiadomości.");
    }
    console.log("E-mail wysłany:", info.response);
    res.status(200).send("Wiadomość została wysłana!");
  });
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
