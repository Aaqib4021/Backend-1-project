const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
app.use(cookieParser());
const jwt = require("jsonwebtoken");

app.get("/", function (req, res) {
  let token = jwt.sign({ email: "aqib@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("hello");
  /*
  res.cookie("name", "Aaqib");
  res.send("done");
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash("aaqib", salt, function (err, hash) {
      console.log(hash);
    });
  });
});
bcrypt.compare(
  "aaqib",
  "$2b$10$oYk8KO0FH4CB9r.FshLeFu9evu4Oz0QyISbvGEA5518c1DvCXnO0y",
  function (err, result) {
    console.log(result);
    */
});

app.get("/read", function (req, res) {
  res.send("read page");
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});

app.listen(3000);
