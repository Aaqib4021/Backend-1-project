const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index"); //page should be in views compulsary
});
app.get("/profile/:username", (req, res) => {
  //   req.params.username;req.params is an object
  res.send(req.params.username); //page should be in views compulsary
});
app.get("/author/:username/:age", (req, res) => {
  res.send(`Welcome ${req.params.username} of age ${req.params.age}`); //page should be in views compulsary
});

app.listen(3000);
