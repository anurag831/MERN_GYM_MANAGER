const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
  return token;
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    // changes here 3
    const role = user.role;
    res.status(200).json({ email, token, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all the users
const getUsers = async (req, res) => {
  const users = await User.find({role:'user'}).sort({ createdAt: -1 });
  res.status(200).json(users)
};

module.exports = { loginUser, signupUser, getUsers };
