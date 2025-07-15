const Url = require('../models/Url');
const generateShortCode = require('../utils/generateShortCode');

const createShortUrl = async (req, res) => {
    try {
        const { url, validityInMinutes, shortCode } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const code = shortCode || generateShortCode();

        const existing = await Url.findOne({ shortCode: code });
        if (existing) {
            return res.status(409).json({ error: 'Shortcode already exists' });
        }

        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + (validityInMinutes || 30));

        const newUrl = await Url.create({
            originalUrl: url,
            shortCode: code,
            expiryDate: expiry,
            clicks: []
        });

        return res.status(201).json({
            shortLink: `${process.env.BASE_URL}/r/${newUrl.shortCode}`,
            expiry: expiry.toISOString()
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const getUrlStats = async (req, res) => {
    try {
        const { code } = req.params;
        const urlEntry = await Url.findOne({ shortCode: code });

        if (!urlEntry) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        const data = {
            originalUrl: urlEntry.originalUrl,
            createdAt: urlEntry.createdAt,
            expiryDate: urlEntry.expiryDate,
            totalClicks: urlEntry.clicks.length,
            clickDetails: urlEntry.clicks
        };

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
