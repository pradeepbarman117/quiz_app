import BottomNav from "../home/BottomNav";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Star, Target, Flame, Award, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Rewards() {
  const navigate = useNavigate();

  const coins = 1250;
  const achievements = [
    { id: "1", title: "First Quiz", description: "Complete your first quiz", icon: Star, unlocked: true, reward: 50 },
    { id: "2", title: "Streak Master", description: "7 days streak", icon: Flame, unlocked: true, reward: 100 },
    { id: "3", title: "Perfect Score", description: "Get 100% in any quiz", icon: Target, unlocked: true, reward: 150 },
    { id: "4", title: "Contest Winner", description: "Win your first 1v1", icon: Trophy, unlocked: false, reward: 200 },
    { id: "5", title: "Quiz Champion", description: "Complete 50 quizzes", icon: Award, unlocked: false, reward: 500 },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-sm mx-auto">
        {/* Header with Coins */}
        <div className="bg-gradient-to-br from-warning/10 via-accent/5 to-background p-4 pb-6">
          <h1 className="text-2xl font-bold mb-4">Rewards</h1>
          
          <Card className="p-6 bg-gradient-to-r from-warning/10 to-accent/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
                <p className="text-4xl font-bold text-warning">
                  {coins.toLocaleString()}
                </p>
              </div>
              <div className="w-16 h-16 bg-warning/20 rounded-2xl flex items-center justify-center">
                <Trophy className="w-8 h-8 text-warning" />
              </div>
            </div>
            <Button
              onClick={() => navigate("/buy-lives")}
              variant="outline"
              className="w-full mt-4 rounded-full font-semibold bg-transparent border-black/10"
            >
              Buy Game Lives
            </Button>
          </Card>
        </div>

        <div className="px-4 pt-6">
          {/* Tabs */}
          <Tabs defaultValue="achievements" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 py-6 place-content-center">
              <TabsTrigger  className="py-3" value="achievements">
                Achievements
              </TabsTrigger>
              <TabsTrigger className="py-3" value="badges">
                Badges
              </TabsTrigger>
            </TabsList>

            <TabsContent value="achievements">
              <ScrollArea className="h-[500px]">
                <div className="space-y-3">
                  {achievements.map((achievement) => {
                    const Icon = achievement.icon;
                    return (
                      <Card
                        key={achievement.id}
                        className={achievement.unlocked ? "hover-elevate" : "opacity-60"}
                      >
                        <div className="p-4 flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                            achievement.unlocked ? "bg-success/10" : "bg-muted/10"
                          }`}>
                            {achievement.unlocked ? (
                              <Icon className="w-7 h-7 text-success" />
                            ) : (
                              <Lock className="w-7 h-7 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-base mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {achievement.unlocked ? (
                              <Badge variant="secondary" className="text-xs">
                                +{achievement.reward} coins earned
                              </Badge>
                            ) : (
                              <Badge className="text-xs bg-warning text-warning-foreground">
                                +{achievement.reward} coins
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="badges">
              <div className="grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, i) => (
                  <Card
                    key={i}
                    data-testid={`badge-${i}`}
                    className="p-4 aspect-square flex flex-col items-center justify-center hover-elevate"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      i < 3 ? "bg-primary/10" : "bg-muted/10"
                    }`}>
                      {i < 3 ? (
                        <Award className="w-6 h-6 text-primary" />
                      ) : (
                        <Lock className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-center">
                      Badge {i + 1}
                    </p>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
