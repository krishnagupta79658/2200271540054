const axios = require('axios');

const LOGGING_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// Reusable log function
async function Log(stack, level, pkg, message) {
    try {
        const payload = {
            stack: stack.toLowerCase(),
            level: level.toLowerCase(),
            package: pkg.toLowerCase(),
            message: message
        };

        const response = await axios.post(LOGGING_API_URL, payload);
        console.log(' Log sent:', response.data);
    } catch (error) {
        console.error('Failed to send log:', error.message);
    }
}

module.exports = Log;
