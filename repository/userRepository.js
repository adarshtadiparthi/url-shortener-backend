const User = require("../persistence/models/User");

const findByEmail = (email) => User.findOne({ email });
const createUser = (userData) => User.create(userData);

module.exports = { findByEmail, createUser };
