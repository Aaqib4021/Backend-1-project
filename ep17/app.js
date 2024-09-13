const express = require("express");
const app = express();
const userModel = require("./models/user.model");
const postModel = require("./models/post.model");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const upload = require("./config/multer.config");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/uploads");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12, (err, bytes) => {
//       const fn = bytes.toString("hex") + path.extname(file.originalname);
//       cb(null, fn);
//     });
//   },
// });

// const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/profile/upload", (req, res) => {
  res.render("filetest");
});

app.post("/upload", isLoggedIn, upload.single("image"), async (req, res) => {
  const user = await userModel.findOneAndUpdate(
    { email: req.user.email },
    { profilepic: req.file.filename }
  );
  res.redirect("/profile");
});

app.get("/login", (req, res) => {
  const errorMessage = req.query.error;
  res.render("login", { errorMessage });
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});
// app.get("/upload", function (req, res) {
//   res.render("filetest");
// });
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});

app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("posts");
  res.render("profile", { user });
});

app.get("/delete/:id", async (req, res) => {
  await postModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/profile");
});

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
// });

app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let createdPost = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(createdPost._id);
  await user.save();
  res.redirect("/profile");
});

app.post("/register", async (req, res) => {
  let { email, password, username, name, age } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send(" already registered user");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        age,
        name,
        password: hash,
      });
      let token = jwt.sign({ email: email, userid: createdUser._id }, "shhhh");
      res.cookie("token", token);
      res.send("registered");
    });
  });
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.send("Something went wrong");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "shhhh");
      res.cookie("token", token);
      return res.status(200).redirect("/profile");
    } else {
      res.redirect("/login?error=Invalid credentials");
    }
  });
});

app.post("/update/:id", async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "")
    return res.send("you must login first to go to this page");
  else {
    let data = jwt.verify(req.cookies.token, "shhhh");
    req.user = data;
    next();
  }
}
app.listen(3000);
