const express = require("express");
const app = express();
const userModel = require("./models/user.model");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  le    t { email, password, username, name, age } = req.body;

  //   let user = await userModel.findOne({ email });
  //   if (user) return res.status(500).send("registered user");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log(hash);
    });
  });

    let createdUser = await userModel.create({
      username,
      name,
      age,
      email,
      password,
    });
    res.send;
});

app.listen(3000);
