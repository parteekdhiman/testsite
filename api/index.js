// Backend moved to separate server (see /server)
// This file intentionally returns 410 for client requests to avoid duplicate handlers.

module.exports = function handler(req, res) {
  res.status(410).json({ error: 'Backend moved to external server. Use configured API URL.' });
};
