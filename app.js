const express = require("express");
const userModel = require("./usermodel");

const app = express();

app.get("/", function (req, res) {
  res.send("hello");
});

app.get("/create", async function (req, res) {
  let createdUser = await userModel.create({
    name: "Aaqib",
    username: "aaqibbashir",
    email: "aaqib@gmail.com",
  });
  res.send(createdUser);
});

app.get("/read", async function (req, res) {
  let users = await userModel.find();
  res.send(users);
});

app.get("/update", async function (req, res) {
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "talibmukhtar" },
    { name: "TalibIslamabad" },
    { new: true }
  );
  res.send(updatedUser);
});

app.get("/delete", async function (req, res) {
  let deletedUser = await userModel.findOneAndDelete({
    username: "aaqibbashir",
  });
  res.send(deletedUser);
});

app.listen(3000);
