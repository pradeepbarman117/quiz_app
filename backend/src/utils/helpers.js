const crypto = require('crypto');

const helpers = {
    // Generate random string
    generateRandomString: (length = 10) => {
        return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
    },

    // Generate match code
    generateMatchCode: () => {
        return 'QUIZ' + crypto.randomBytes(3).toString('hex').toUpperCase();
    },

    // Generate referral code
    generateReferralCode: (username) => {
        const random = crypto.randomBytes(2).toString('hex').toUpperCase();
        return `${username.toUpperCase().slice(0, 6)}${random}`;
    },

    // Generate slug
    generateSlug: (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    // Calculate percentage
    calculatePercentage: (value, total) => {
        if (total === 0) return 0;
        return parseFloat(((value / total) * 100).toFixed(2));
    },

    // Calculate accuracy
    calculateAccuracy: (correct, total) => {
        if (total === 0) return 0;
        return parseFloat(((correct / total) * 100).toFixed(2));
    },

    // Get pagination params
    getPaginationParams: (query) => {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const offset = (page - 1) * limit;
        return { page, limit, offset };
    },

    // Build pagination response
    buildPaginationResponse: (count, page, limit) => {
        const totalPages = Math.ceil(count / limit);
        return {
            currentPage: page,
            totalPages,
            totalItems: count,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        };
    },

    // Get time difference in milliseconds
    getTimeDifferenceMs: (startTime, endTime) => {
        return new Date(endTime).getTime() - new Date(startTime).getTime();
    },

    // Check if date is today
    isToday: (date) => {
        const today = new Date();
        const checkDate = new Date(date);
        return checkDate.toDateString() === today.toDateString();
    },

    // Get today's date string (YYYY-MM-DD)
    getTodayDateString: () => {
        return new Date().toISOString().split('T')[0];
    }
};

module.exports = helpers;