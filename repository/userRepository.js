const User = require("../persistence/models/User");

const findByEmail = (email) => User.findOne({ email });
const createUser = (userData) => User.create(userData);
const findById   = (id) => User.findById(id);

module.exports = { findByEmail, createUser, findById };