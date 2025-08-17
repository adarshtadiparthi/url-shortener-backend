const Link = require("../persistence/models/Link");

const createLink = (linkData) => Link.create(linkData);
const findByUser = (userId) => Link.find({ userId }).sort({ createdAt: -1 });
const findByShortCode = (shortCode) => Link.findOne({ shortCode });

module.exports = { createLink, findByUser, findByShortCode };
