const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

//(Making our own method associated with the model instead of using built-in methods)
// When defining this function, we cannot use arrow function, instead we have to use regular fucntion defining because we are using the 'this' keyword in our function
// static signup method
userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User with this email already exists!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // changes here 1
  const user = await this.create({ email, password: hash, role: 'user' });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  
  
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User with this email doesn't exist!");
  }

  // we can't compare the hashed password stored in our db with the input password, so we use the
  // compare method of bcrypt which decodes the hashed password and then compares it with the input
  // password
  const match = bcrypt.compare(password, user.password)
  
  if(!match){
    throw Error("Incorrect password")
  }

  // changes here 2
  console.log(user)
  return user;
};

module.exports = mongoose.model("User", userSchema);
