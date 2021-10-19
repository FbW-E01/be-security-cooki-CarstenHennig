import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log({
    cookies: req.cookies,
    signedCookies: req.signedCookies,
  });
  next();
});

const passwords = [];

// Endpoint that sets cookies
app.get("/setcookie", async (req, res) => {
  const cookiePass = Math.floor(Math.random() * 5).toString();
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(cookiePass, salt);
  passwords.push({ hashPassword, date: new Date() });
  res.cookie("luckynumber", hashPassword);
  console.log(passwords);
  res.send("you now have a cookie :)");
});

app.post("/message", (req, res) => {
  res.json({ message: req.body.message });
  console.log(req.cookies);
});

app.listen(3001, () => {
  console.log("Listening: http://localhost:3001");
});
