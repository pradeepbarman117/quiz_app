module.exports = {
    // User Roles
    ROLES: {
        USER: 'USER',
        ADMIN: 'ADMIN',
        MODERATOR: 'MODERATOR'
    },

    // User Status
    USER_STATUS: {
        ACTIVE: 'ACTIVE',
        INACTIVE: 'INACTIVE',
        BANNED: 'BANNED',
        SUSPENDED: 'SUSPENDED'
    },

    // Match Status
    MATCH_STATUS: {
        WAITING: 'WAITING',
        MATCHED: 'MATCHED',
        IN_PROGRESS: 'IN_PROGRESS',
        COMPLETED: 'COMPLETED',
        ABANDONED: 'ABANDONED',
        EXPIRED: 'EXPIRED',
        CANCELLED: 'CANCELLED'
    },

    // Match Types
    MATCH_TYPES: {
        RANDOM: 'RANDOM',
        FRIEND: 'FRIEND',
        REMATCH: 'REMATCH'
    },

    // Contest Status
    CONTEST_STATUS: {
        DRAFT: 'DRAFT',
        SCHEDULED: 'SCHEDULED',
        REGISTRATION_OPEN: 'REGISTRATION_OPEN',
        REGISTRATION_CLOSED: 'REGISTRATION_CLOSED',
        LIVE: 'LIVE',
        COMPLETED: 'COMPLETED',
        CANCELLED: 'CANCELLED'
    },

    // Contest Types
    CONTEST_TYPES: {
        DAILY: 'DAILY',
        WEEKLY: 'WEEKLY',
        MONTHLY: 'MONTHLY',
        SPECIAL: 'SPECIAL'
    },

    // Difficulty Levels
    DIFFICULTY: {
        EASY: 'EASY',
        MEDIUM: 'MEDIUM',
        HARD: 'HARD',
        MIXED: 'MIXED'
    },

    // Daily Quiz Status
    DAILY_QUIZ_STATUS: {
        DRAFT: 'DRAFT',
        SCHEDULED: 'SCHEDULED',
        ACTIVE: 'ACTIVE',
        COMPLETED: 'COMPLETED'
    },

    // Leaderboard Types
    LEADERBOARD_TYPES: {
        GLOBAL: 'GLOBAL',
        WEEKLY: 'WEEKLY',
        MONTHLY: 'MONTHLY',
        CATEGORY: 'CATEGORY',
        CONTEST: 'CONTEST',
        MATCH: 'MATCH'
    },

    // Transaction Types
    TRANSACTION_TYPES: {
        CREDIT: 'CREDIT',
        DEBIT: 'DEBIT'
    },

    // Transaction Categories
    TRANSACTION_CATEGORIES: {
        MATCH_WIN: 'MATCH_WIN',
        CONTEST_WIN: 'CONTEST_WIN',
        DAILY_QUIZ_REWARD: 'DAILY_QUIZ_REWARD',
        REFERRAL_BONUS: 'REFERRAL_BONUS',
        SIGNUP_BONUS: 'SIGNUP_BONUS',
        ENTRY_FEE: 'ENTRY_FEE',
        WITHDRAWAL: 'WITHDRAWAL',
        PURCHASE: 'PURCHASE',
        REFUND: 'REFUND',
        ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT'
    },

    // Reward Types
    REWARD_TYPES: {
        COINS: 'COINS',
        GEMS: 'GEMS',
        GIFT_CARD: 'GIFT_CARD',
        MERCHANDISE: 'MERCHANDISE',
        BADGE: 'BADGE',
        VOUCHER: 'VOUCHER'
    },

    // Reward Sources
    REWARD_SOURCES: {
        MATCH_WIN: 'MATCH_WIN',
        CONTEST_WIN: 'CONTEST_WIN',
        DAILY_QUIZ: 'DAILY_QUIZ',
        ACHIEVEMENT: 'ACHIEVEMENT',
        REFERRAL: 'REFERRAL',
        DAILY_LOGIN: 'DAILY_LOGIN',
        ADMIN: 'ADMIN'
    },

    // Notification Types
    NOTIFICATION_TYPES: {
        MATCH_INVITE: 'MATCH_INVITE',
        MATCH_STARTED: 'MATCH_STARTED',
        MATCH_RESULT: 'MATCH_RESULT',
        CONTEST_REMINDER: 'CONTEST_REMINDER',
        CONTEST_STARTED: 'CONTEST_STARTED',
        CONTEST_RESULT: 'CONTEST_RESULT',
        DAILY_QUIZ_REMINDER: 'DAILY_QUIZ_REMINDER',
        REWARD_EARNED: 'REWARD_EARNED',
        REWARD_CLAIMED: 'REWARD_CLAIMED',
        SYSTEM: 'SYSTEM',
        PROMOTIONAL: 'PROMOTIONAL'
    },

    // Default Values
    DEFAULTS: {
        SIGNUP_BONUS: 500,
        MATCH_QUESTIONS: 10,
        MATCH_TIME_LIMIT: 30,
        MATCH_WIN_REWARD: 100,
        DAILY_QUIZ_QUESTIONS: 10,
        DAILY_QUIZ_POINTS_PER_QUESTION: 10,
        DAILY_QUIZ_MIN_POINTS_FOR_REWARD: 70,
        DAILY_QUIZ_REWARD: 50,
        DAILY_QUIZ_PERFECT_SCORE_BONUS: 100,
        MATCH_EXPIRY_MINUTES: 5,
        REFERRAL_BONUS: 200
    }
}