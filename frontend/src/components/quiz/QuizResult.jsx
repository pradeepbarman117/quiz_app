import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Target, Clock, Coins, Home, RotateCcw, Zap, TrophyIcon, Frown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuizResult = () => {
  const navigate = useNavigate();

  // Mock result data
  const result = {
    score: 70,
    opponentScore: 65,
    correctAnswers: 7,
    totalQuestions: 10,
    accuracy: 70,
    timeTaken: 180, // seconds
    coinsEarned: 100,
    passed: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-success/10 via-background to-background">
      <div className="max-w-sm mx-auto px-4 py-6">
        {/* Celebration Icon */}
        <div className="text-center mb-4">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 ${result.passed ? "bg-success/20" : "bg-destructive/20"
              }`}
          >
           {
              result.passed ? (
                <Trophy className={`w-8 h-8 text-success`} />
              ) : (
                <Frown className={`w-8 h-8 text-destructive`} />
              )
           }
          </div>
          <h1 className="text-xl font-bold mb-1">
            {result.passed ? "Well Done!" : "Keep Trying!"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {result.passed ? "You've completed the daily quiz" : "Don't give up, practice makes perfect"}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {/* Your Score */}
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 shadow-sm border border-blue-200">
            <div className="flex flex-col items-center">
              <p className="text-xs text-blue-600 font-semibold mb-1">Your Score</p>
              <p className="text-3xl font-bold text-blue-800" data-testid="final-score">{result.score}</p>
              <p className="text-xs text-blue-600 mt-1">
                {result.correctAnswers}/{result.totalQuestions} correct
              </p>
            </div>
          </div>
          {/* Opponent Score */}
          <div className="flex-1 bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 shadow-sm border border-red-200">
            <div className="flex flex-col items-center">
              <p className="text-xs text-red-600 font-semibold mb-1">Opponent Score</p>
              <p className="text-3xl font-bold text-red-800" data-testid="opponent-score">{result.opponentScore}</p>
              <p className="text-xs text-red-600 mt-1">
                {result.correctAnswers}/{result.totalQuestions} correct
              </p>
            </div>
          </div>
        </div>


        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Card className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-6 h-6 bg-success/10 rounded-lg flex items-center justify-center">
                <Target className="w-3 h-3 text-success" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">
                Accuracy
              </span>
            </div>
            <p className="text-sm font-bold" data-testid="accuracy">
              {result.accuracy}%
            </p>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-6 h-6 bg-info/10 rounded-lg flex items-center justify-center">
                <Clock className="w-3 h-3 text-info" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">
                Time
              </span>
            </div>
            <p className="text-sm font-bold" data-testid="time-taken">
              {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}s
            </p>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-6 h-6 bg-info/10 rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 text-yellow-600 fill-yellow-600" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">
                Avg. Time / Q
              </span>
            </div>
            <p className="text-sm font-bold text-foreground" data-testid="average-time">
              18s
            </p>
          </Card>

          <Card className="p-3">
            <div className="flex items-center gap-1 mb-1">
              <div className="w-6 h-6 bg-info/10 rounded-lg flex items-center justify-center">
                <Clock className="w-3 h-3 text-info" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold uppercase">
                Rival's Time
              </span>
            </div>
            <p className="text-sm font-bold text-foreground">
              2:45s
            </p>
          </Card>
        </div>


        <Card className="p-4 mb-4 hover-elevate">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 bg-text-success/10 rounded-lg flex items-center justify-center`}>
                <TrophyIcon className={`w-4 h-4 text-success`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rank Up</p>
                <p className="text-sm font-bold">#45 → #42</p>
              </div>
            </div>
            <div className="w-4 h-4 bg-success/20 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-success rounded-full" />
            </div>
          </div>
        </Card>


        {/* Coins Earned */}
        <Card className="p-3 mb-4 bg-warning/10 border-warning/20">
          <div className="flex items-center justify-center gap-2">
            <Coins className="w-6 h-6 text-warning fill-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Coins Earned</p>
              <p className="text-xl font-bold text-warning">
                +{result.coinsEarned}
              </p>
            </div>
          </div>
        </Card>

        {/* Achievement Unlocked */}
        <Card className="p-3.5 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                Achievement Unlocked
              </p>
              <p className="font-bold text-sm">Daily Streak Master</p>
              {/* <p className="text-xs text-muted-foreground">
                Complete 7 daily quizzes in a row
              </p> */}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2 mt-10">
          <Button
            data-testid="button-claim-reward"
            className="w-full h-10 rounded-full font-bold text-sm mb-4"
          >
            Claim Reward
          </Button>

          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={() => navigate("/quiz/daily")}
              data-testid="button-play-again"
              variant="outline"
              className="h-10 rounded-full font-semibold text-sm gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Play Again
            </Button>
            <Button
              onClick={() => navigate("/home")}
              data-testid="button-home"
              variant="outline"
              className="h-10 rounded-full font-semibold text-sm gap-1"
            >
              <Home className="w-3 h-3" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
