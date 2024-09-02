/*
const fs = require("fs");

fs.writeFile("hey.txt", "hey how are you", function (err) {
  if (err) console.log(err);
  else console.log("done");
});

fs.mkdir("copy", function (err) {
  if (err) console.log(err);
  else console.log("Made");
});
fs.readFile("hey.txt", "utf-8", function (err, data) {
  if (err) console.log(err);
  console.log(data);
});
*/
// const http = require("http");

const express = require("express");
const app = express();
const port = 3000;

app.use(function (req, res, next) {
  //?here we are writing the middleware and we can make middleware as many times as we want
  console.log("this is a middleware");
  next(); //!forwarding the request
});
app.get("/", function (req, res) {
  res.send("Hello World ");
});

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
