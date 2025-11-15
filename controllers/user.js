const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password, role } = req.body;
  await User.create({
    name,
    email,
    password,
    role,
  });
  return res.redirect("/");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(`UserEmail : ${user.email}`);
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  //if i wanted to send the token as json response
  // const token = setUser(user);
  // res.json({ token });

  //if i want to send the token by setting it in cookie
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
