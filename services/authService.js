const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepo = require("../repository/userRepository");

const normalizeEmail = (e) => e.trim().toLowerCase();
const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

const signup = async (email, password) => {
  email = normalizeEmail(email);

  const existing = await userRepo.findByEmail(email);
  if (existing) throw new Error("User already exists");

  const hashed = await bcrypt.hash(password, 10);
  const user = await userRepo.createUser({ email, password: hashed });

  const token = signToken(user);
  return { user: user.toSafeJSON(), token };
};

const signin = async (email, password) => {
  email = normalizeEmail(email);

  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const token = signToken(user);
  return { user: user.toSafeJSON(), token };
};

const currentUser = async (id) => {
  const user = await userRepo.findById(id);
  if (!user) throw new Error("User not found");
  return user.toSafeJSON();
};

module.exports = { signup, signin, currentUser };
