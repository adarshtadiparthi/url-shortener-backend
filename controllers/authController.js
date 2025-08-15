const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body.email, req.body.password);
    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { token } = await authService.signin(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, signin };
