const linkService = require("../services/linkService");

const createLink = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "Original URL is required" });

    const maxRetries = 5;
    let attempts = 0;
    let link = null;

    while (attempts < maxRetries) {
      try {
        link = await linkService.createLink(req.user.id, originalUrl);
        break; // Success - exit the retry loop
      } catch (err) {
        attempts++;
        
        // Check if the error is due to duplicate short code
        if (err.code === 11000 || 
            err.name === 'MongoServerError' && err.code === 11000 ||
            err.message.includes('duplicate key') ||
            err.message.includes('E11000')) {
          
          if (attempts >= maxRetries) {
            return res.status(500).json({ 
              error: "Unable to generate unique short code after multiple attempts" 
            });
          }
          
          // Continue to next iteration for retry
          continue;
        }
        
        // If it's not a duplicate error, throw it to be caught by outer catch
        throw err;
      }
    }

    if (!link) {
      return res.status(500).json({ 
        error: "Failed to create link after multiple attempts" 
      });
    }

    res.status(201).json({ link });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLinks = async (req, res) => {
  try {
    const links = await linkService.getUserLinks(req.user.id);
    res.json({ links });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const redirect = async (req, res) => {
  try {
    const originalUrl = await linkService.resolveLink(req.params.code);
    res.redirect(originalUrl);
  } catch {
    res.status(404).json({ error: "Short link not found" });
  }
};

module.exports = { createLink, getLinks, redirect };