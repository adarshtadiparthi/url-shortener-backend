const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const { user, token } = await authService.signup(req.body.email, req.body.password);
    res.status(201).json({ user, token });
  } catch (err) {
    const msg = err?.code === 11000 ? "Email already in use" : err.message;
    res.status(400).json({ error: msg });
  }
};

const signin = async (req, res) => {
  try {
    const { user, token } = await authService.signin(req.body.email, req.body.password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const me = async (req, res) => {
  try {
    const user = await authService.currentUser(req.user.id);
    res.json({ user });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { signup, signin, me };
