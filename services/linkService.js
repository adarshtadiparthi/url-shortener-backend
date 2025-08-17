const { nanoid } = require("nanoid");
const linkRepo = require("../repository/linkRepository");

const createLink = async (userId, originalUrl) => {
  const shortCode = nanoid(8); // generates short unique code
  const link = await linkRepo.createLink({ originalUrl, shortCode, userId });
  return { id: link._id, shortCode: link.shortCode, originalUrl: link.originalUrl };
};

const getUserLinks = async (userId) => {
  const links = await linkRepo.findByUser(userId);
  return links.map(l => ({ id: l._id, shortCode: l.shortCode, originalUrl: l.originalUrl }));
};

const resolveLink = async (shortCode) => {
  const link = await linkRepo.findByShortCode(shortCode);
  if (!link) throw new Error("Link not found");
  return link.originalUrl;
};

module.exports = { createLink, getUserLinks, resolveLink };
