const linkService = require("../services/linkService");

const createLink = async (req, res) => {
  try {
    const link = await linkService.createShortLink(req.body.url, req.user.id);
    res.status(201).json(link);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await linkService.getUserLinks(req.user.id);
    res.json(links);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createLink, getLinks };
