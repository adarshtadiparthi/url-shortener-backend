const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepository");

const signup = async (email, password) => {
  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepo.createUser({ email, password: hashedPassword });
};

const signin = async (email, password) => {
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return { token };
};

module.exports = { signup, signin };
