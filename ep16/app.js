const express = require("express");
const userModel = require("./models/user.model");
const postModel = require("./models/posts.model");

const app = express();
app.get("/", (req, res) => {
  res.send("Welcome");
});
app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    username: "Aaqib",
    email: "aaqibnengroo5@gmail.com",
    age: 22,
  });
  res.send(createdUser);
});

app.get("/post/create", async (req, res) => {
  let createdPost = await postModel.create({
    postData: "himalaya",
    user: "66d88bb2b165ad429fceaa06",
  });
  let user = await userModel.findOne({ _id: "66d88bb2b165ad429fceaa06" });
  user.posts.push(user._id);
  await user.save();

  res.send(createdPost);
});
app.listen(3000);
