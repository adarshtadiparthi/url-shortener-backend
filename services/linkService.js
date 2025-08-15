const shortid = require("shortid");
const linkRepo = require("../repository/linkRepository");

const createShortLink = async (originalUrl, userId) => {
  const shortCode = shortid.generate();
  return linkRepo.createLink({ originalUrl, shortCode, userId });
};

const getUserLinks = async (userId) => {
  return linkRepo.findByUserId(userId);
};

module.exports = { createShortLink, getUserLinks };
