import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clock, Trophy, Zap, HelpCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DailyQuizInstruction = () => {
  const navigate = useNavigate(); 
  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="max-w-sm mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/home")}
              data-testid="button-back"
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl font-bold">Daily Quiz</h1>
          </div>

          {/* Quiz Info Card */}
          <Card className="p-6 mb-6 bg-gradient-to-br from-primary/10 to-accent/5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-1">10 Questions</h2>
                <p className="text-sm text-muted-foreground">Mixed Categories</p>
              </div>
              <div className="flex items-center gap-2 bg-warning/10 px-4 py-2 rounded-full">
                <Trophy className="w-5 h-5 text-warning" />
                <span className="font-bold text-warning text-lg">+15</span>
              </div>
            </div>
          </Card>

          {/* Instructions */}
          <div className="space-y-4 mb-8">
            <h3 className="font-bold text-lg mb-3">How to Play</h3>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Time Limit</h4>
                <p className="text-sm text-muted-foreground">
                  You have 30 seconds to answer each question
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Points System</h4>
                <p className="text-sm text-muted-foreground">
                  Earn 10 points for each correct answer
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">Lifelines Available</h4>
                <p className="text-sm text-muted-foreground">
                  Use 50:50, Skip, or Audience Poll once per game
                </p>
              </div>
            </div>
          </div>

          {/* Rules */}
          <Card className="p-4 mb-8 bg-muted/50">
            <h4 className="font-semibold mb-2 text-sm">Important Rules</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• You can't go back to previous questions</li>
              <li>• Each lifeline can only be used once</li>
              <li>• No answer = 0 points for that question</li>
              <li>• Coins are awarded at the end of the quiz</li>
            </ul>
          </Card>

          {/* Start Button */}
          <Button
            onClick={() => navigate("/quiz/daily/general/GEN-DAILY-001/play/e73b0c33-870a-41e0-a033-1bb9445c8713")}
            data-testid="button-start-quiz"
            className="w-full h-12 rounded-full font-bold text-base"
          >
            Start Quiz
          </Button>
        </div>
      </div>
    </>
  );
}

export default DailyQuizInstruction;