const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: {
    type: String,
    required: true
  }
});

// Static signup method
userSchema.statics.signup = async function(username, email,  password) {

  // Validation
  if (!email) {
    throw Error('Email is required');
  }
  if (!username) {
    throw Error('Username is required');
  }
  if (!password) {
    throw Error('Password is required');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  // Check if email or username already exists
  const existsemail = await this.findOne({ email });
  const existsusername = await this.findOne({ username });

  if (existsemail) {
    throw Error('Email already in use');
  }
  if (existsusername) {
    throw Error('Username already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, username, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function(email, password) {

  if (!email) {
    throw Error('Email is required');
  }
  if (!password) {
    throw Error('Password is required');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Email not found');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
