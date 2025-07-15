const express = require('express');
const router = express.Router();
const { createShortUrl, getUrlStats } = require('../controllers/urlController');

// Create short URL
router.post('/shorturl', createShortUrl);

// Get short URL stats
router.get('/shorturl/:code', getUrlStats);

module.exports = router;
