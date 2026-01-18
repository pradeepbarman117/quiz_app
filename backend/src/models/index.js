'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.development);
}

// Recursive function to load models from all subdirectories
const loadModels = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      loadModels(filePath); // Recursively read subdirectories
    } else if (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    ) {
      const model = require(filePath)(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });
};

// Start loading models from the current directory
loadModels(__dirname);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});




// ===============================
// ASSOCIATIONS
// ===============================


// User - Profile (1:1)
db.User.hasOne(db.UserProfile, { foreignKey: 'userId', as: 'profile', onDelete: 'CASCADE' });
db.UserProfile.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// User - Stats (1:1)
db.User.hasOne(db.UserStats, { foreignKey: 'userId', as: 'stats', onDelete: 'CASCADE' });
db.UserStats.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// User - Wallet (1:1)
db.User.hasOne(db.Wallet, { foreignKey: 'userId', as: 'wallet', onDelete: 'CASCADE' });
db.Wallet.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Wallet - Transactions (1:N)
db.Wallet.hasMany(db.Transaction, { foreignKey: 'walletId', as: 'transactions' });
db.Transaction.belongsTo(db.Wallet, { foreignKey: 'walletId', as: 'wallet' });

// User - Transactions (1:N)
db.User.hasMany(db.Transaction, { foreignKey: 'userId', as: 'transactions' });
db.Transaction.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// User - Referral (Self-referencing)
db.User.hasMany(db.User, { foreignKey: 'referredBy', as: 'referrals' });
db.User.belongsTo(db.User, { foreignKey: 'referredBy', as: 'referrer' });

// Category - Subcategories (Self-referencing)
db.Category.hasMany(db.Category, { foreignKey: 'parentId', as: 'subcategories' });
db.Category.belongsTo(db.Category, { foreignKey: 'parentId', as: 'parent' });

// Category - Questions (1:N)
db.Category.hasMany(db.Question, { foreignKey: 'categoryId', as: 'questions' });
db.Question.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// Question - Options (1:N)
db.Question.hasMany(db.QuestionOption, { foreignKey: 'questionId', as: 'options', onDelete: 'CASCADE' });
db.QuestionOption.belongsTo(db.Question, { foreignKey: 'questionId', as: 'question' });

// Question - Tags (M:N)
db.Question.belongsToMany(db.Tag, { through: db.QuestionTag, foreignKey: 'questionId', as: 'tags' });
db.Tag.belongsToMany(db.Question, { through: db.QuestionTag, foreignKey: 'tagId', as: 'questions' });

// User - Created Questions (1:N)
db.User.hasMany(db.Question, { foreignKey: 'createdBy', as: 'createdQuestions' });
db.Question.belongsTo(db.User, { foreignKey: 'createdBy', as: 'creator' });

// ===============================
// MATCH (1v1) ASSOCIATIONS
// ===============================

// User - Matches as Player 1
db.User.hasMany(db.Match, { foreignKey: 'player1Id', as: 'matchesAsPlayer1' });
db.Match.belongsTo(db.User, { foreignKey: 'player1Id', as: 'player1' });

// User - Matches as Player 2
db.User.hasMany(db.Match, { foreignKey: 'player2Id', as: 'matchesAsPlayer2' });
db.Match.belongsTo(db.User, { foreignKey: 'player2Id', as: 'player2' });

// User - Matches Won
db.User.hasMany(db.Match, { foreignKey: 'winnerId', as: 'matchesWon' });
db.Match.belongsTo(db.User, { foreignKey: 'winnerId', as: 'winner' });

// Match - Category
db.Category.hasMany(db.Match, { foreignKey: 'categoryId', as: 'matches' });
db.Match.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// Match - Answers
db.Match.hasMany(db.MatchAnswer, { foreignKey: 'matchId', as: 'answers', onDelete: 'CASCADE' });
db.MatchAnswer.belongsTo(db.Match, { foreignKey: 'matchId', as: 'match' });

// User - Match Answers
db.User.hasMany(db.MatchAnswer, { foreignKey: 'playerId', as: 'matchAnswers' });
db.MatchAnswer.belongsTo(db.User, { foreignKey: 'playerId', as: 'player' });

// Question - Match Answers
db.Question.hasMany(db.MatchAnswer, { foreignKey: 'questionId', as: 'matchAnswers' });
db.MatchAnswer.belongsTo(db.Question, { foreignKey: 'questionId', as: 'question' });

// QuestionOption - Match Answers
db.QuestionOption.hasMany(db.MatchAnswer, { foreignKey: 'selectedOptionId', as: 'matchSelections' });
db.MatchAnswer.belongsTo(db.QuestionOption, { foreignKey: 'selectedOptionId', as: 'selectedOption' });

// ===============================
// CONTEST ASSOCIATIONS
// ===============================

// Category - Contests
db.Category.hasMany(db.Contest, { foreignKey: 'categoryId', as: 'contests' });
db.Contest.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// User - Created Contests
db.User.hasMany(db.Contest, { foreignKey: 'createdBy', as: 'createdContests' });
db.Contest.belongsTo(db.User, { foreignKey: 'createdBy', as: 'creator' });

// Contest - Participants
db.Contest.hasMany(db.ContestParticipant, { foreignKey: 'contestId', as: 'participants', onDelete: 'CASCADE' });
db.ContestParticipant.belongsTo(db.Contest, { foreignKey: 'contestId', as: 'contest' });

// User - Contest Participations
db.User.hasMany(db.ContestParticipant, { foreignKey: 'userId', as: 'contestParticipations' });
db.ContestParticipant.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Contest - Answers
db.Contest.hasMany(db.ContestAnswer, { foreignKey: 'contestId', as: 'answers' });
db.ContestAnswer.belongsTo(db.Contest, { foreignKey: 'contestId', as: 'contest' });

// ContestParticipant - Answers
db.ContestParticipant.hasMany(db.ContestAnswer, { foreignKey: 'participantId', as: 'answers', onDelete: 'CASCADE' });
db.ContestAnswer.belongsTo(db.ContestParticipant, { foreignKey: 'participantId', as: 'participant' });

// User - Contest Answers
db.User.hasMany(db.ContestAnswer, { foreignKey: 'userId', as: 'contestAnswers' });
db.ContestAnswer.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Question - Contest Answers
db.Question.hasMany(db.ContestAnswer, { foreignKey: 'questionId', as: 'contestAnswers' });
db.ContestAnswer.belongsTo(db.Question, { foreignKey: 'questionId', as: 'question' });

// ===============================
// DAILY QUIZ ASSOCIATIONS
// ===============================

// Category - Daily Quizzes
db.Category.hasMany(db.DailyQuiz, { foreignKey: 'categoryId', as: 'dailyQuizzes' });
db.DailyQuiz.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// User - Created Daily Quizzes
db.User.hasMany(db.DailyQuiz, { foreignKey: 'createdBy', as: 'createdDailyQuizzes' });
db.DailyQuiz.belongsTo(db.User, { foreignKey: 'createdBy', as: 'creator' });

// DailyQuiz - Attempts
db.DailyQuiz.hasMany(db.DailyQuizAttempt, { foreignKey: 'dailyQuizId', as: 'attempts', onDelete: 'CASCADE' });
db.DailyQuizAttempt.belongsTo(db.DailyQuiz, { foreignKey: 'dailyQuizId', as: 'dailyQuiz' });

// User - Daily Quiz Attempts
db.User.hasMany(db.DailyQuizAttempt, { foreignKey: 'userId', as: 'dailyQuizAttempts' });
db.DailyQuizAttempt.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// DailyQuizAttempt - Answers
db.DailyQuizAttempt.hasMany(db.DailyQuizAnswer, { foreignKey: 'attemptId', as: 'answers', onDelete: 'CASCADE' });
db.DailyQuizAnswer.belongsTo(db.DailyQuizAttempt, { foreignKey: 'attemptId', as: 'attempt' });

// User - Daily Quiz Answers
db.User.hasMany(db.DailyQuizAnswer, { foreignKey: 'userId', as: 'dailyQuizAnswers' });
db.DailyQuizAnswer.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Question - Daily Quiz Answers
db.Question.hasMany(db.DailyQuizAnswer, { foreignKey: 'questionId', as: 'dailyQuizAnswers' });
db.DailyQuizAnswer.belongsTo(db.Question, { foreignKey: 'questionId', as: 'question' });

// ===============================
// LEADERBOARD & REWARDS
// ===============================

// User - Leaderboard Entries
db.User.hasMany(db.Leaderboard, { foreignKey: 'userId', as: 'leaderboardEntries' });
db.Leaderboard.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Category - Leaderboard Entries
db.Category.hasMany(db.Leaderboard, { foreignKey: 'categoryId', as: 'leaderboardEntries' });
db.Leaderboard.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// Contest - Leaderboard Entries
db.Contest.hasMany(db.Leaderboard, { foreignKey: 'contestId', as: 'leaderboardEntries' });
db.Leaderboard.belongsTo(db.Contest, { foreignKey: 'contestId', as: 'contest' });

// User - Rewards Earned
db.User.hasMany(db.UserReward, { foreignKey: 'userId', as: 'rewards' });
db.UserReward.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// Reward - User Rewards
db.Reward.hasMany(db.UserReward, { foreignKey: 'rewardId', as: 'userRewards' });
db.UserReward.belongsTo(db.Reward, { foreignKey: 'rewardId', as: 'reward' });

// User - Notifications
db.User.hasMany(db.Notification, { foreignKey: 'userId', as: 'notifications' });
db.Notification.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

// ===============================
// EXPORT
// ===============================


db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;







