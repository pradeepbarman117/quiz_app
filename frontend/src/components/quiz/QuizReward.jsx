import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Coins, Gift, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const QuizReward =()=> {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const rewards = [
    { icon: Coins, label: "Coins", value: "+100", color: "text-warning" },
    { icon: Star, label: "XP Points", value: "+50", color: "text-primary" },
    { icon: Trophy, label: "Rank Up", value: "#45 → #42", color: "text-success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-warning/10 via-background to-background relative overflow-hidden">
      {/* Confetti Effect (simplified) */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-sm mx-auto px-4 py-8 relative z-10">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-warning/20 rounded-full mb-4 animate-bounce">
            <Gift className="w-12 h-12 text-warning" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Congratulations!</h1>
          <p className="text-muted-foreground">You've earned amazing rewards</p>
        </div>

        {/* Rewards Cards */}
        <div className="space-y-4 mb-8">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            return (
              <Card
                key={index}
                data-testid={`reward-${index}`}
                className="p-6 hover-elevate"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 bg-${reward.color}/10 rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${reward.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{reward.label}</p>
                      <p className="text-xl font-bold">{reward.value}</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-success rounded-full" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Achievement Unlocked */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-accent/10 to-primary/10">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center shrink-0">
              <Trophy className="w-7 h-7 text-accent-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-semibold uppercase mb-1">
                Achievement Unlocked
              </p>
              <p className="font-bold">Daily Streak Master</p>
              <p className="text-sm text-muted-foreground">
                Complete 7 daily quizzes in a row
              </p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => navigate("/home")}
            data-testid="button-continue"
            className="w-full h-12 rounded-full font-bold text-base"
          >
            Continue
          </Button>
          <Button
            onClick={() => navigate("/rewards")}
            data-testid="button-view-rewards"
            variant="outline"
            className="w-full h-12 rounded-full font-semibold"
          >
            View All Rewards
          </Button>
        </div>
      </div>
    </div>
  );
}
export default QuizReward;
