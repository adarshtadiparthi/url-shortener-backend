const Link = require("../persistence/models/Link");

const createLink = (linkData) => Link.create(linkData);
const findByUserId = (userId) => Link.find({ userId });
const findByShortCode = (shortCode) => Link.findOne({ shortCode });

module.exports = { createLink, findByUserId, findByShortCode };
