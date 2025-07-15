const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    expiryDate: { type: Date, required: true },
    clicks: [{ 
        timestamp: Date,
        ip: String,
        referrer: String,
        location: String 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
const { customAlphabet } = require('nanoid');
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);

module.exports = () => nanoid();
