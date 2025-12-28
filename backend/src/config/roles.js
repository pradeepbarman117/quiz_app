// ============================================
// 1. ROLES CONSTANTS
// Path: constants/roles.js
// ============================================

const ROLES = {
    USER: 'user',
    ADMIN: 'admin',
    SUPERADMIN: 'superadmin',
    MODERATOR: 'moderator'
};

Object.freeze(ROLES); // Make it immutable

module.exports = { ROLES };