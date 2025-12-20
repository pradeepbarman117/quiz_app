import BottomNav from "../home/BottomNav";
import LeaderboardRow  from "./LeaderboardRow";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const topPlayers = Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    username: i === 5 ? "You" : `Player_${Math.floor(Math.random() * 1000)}`,
    profileImage: "",
    score: 10000 - i * 500,
    isCurrentUser: i === 5,
  }));

  const top3 = topPlayers.slice(0, 3);
  const rest = topPlayers.slice(3);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-warning/10 via-primary/5 to-background p-4 pb-6">
          <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
          <p className="text-sm text-muted-foreground">
            Compete with the best players worldwide
          </p>
        </div>

        <div className="px-4 pt-6">
          {/* Tabs */}
          <Tabs defaultValue="daily" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted rounded-lg p-1">
              <TabsTrigger value="daily" data-testid="tab-daily" className="rounded-md">
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" data-testid="tab-weekly" className="rounded-md">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="alltime" data-testid="tab-alltime" className="rounded-md">
                All-Time
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-6">
              {/* Top 3 Podium */}
              <div className="grid grid-cols-3 gap-2 items-end mb-6">
                {/* 2nd Place */}
                <Card className="p-3 pb-4 text-center order-1 bg-muted/30">
                  <div className="flex justify-center mb-2">
                    <Medal className="w-8 h-8 text-muted-foreground fill-muted-foreground" />
                  </div>
                  <div className="w-14 h-14 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <p className="font-semibold text-xs truncate mb-1">{top3[1].username}</p>
                  <p className="text-sm font-bold text-muted-foreground">{top3[1].score.toLocaleString()}</p>
                </Card>

                {/* 1st Place */}
                <Card className="p-3 pb-4 text-center order-2 bg-gradient-to-b from-warning/10 to-card">
                  <div className="flex justify-center mb-2">
                    <Trophy className="w-10 h-10 text-warning fill-warning" />
                  </div>
                  <div className="w-16 h-16 mx-auto bg-warning/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="font-bold text-sm truncate mb-1">{top3[0].username}</p>
                  <p className="text-base font-bold text-warning">{top3[0].score.toLocaleString()}</p>
                </Card>

                {/* 3rd Place */}
                <Card className="p-3 pb-4 text-center order-3 bg-muted/30">
                  <div className="flex justify-center mb-2">
                    <Medal className="w-8 h-8 text-chart-4 fill-chart-4" />
                  </div>
                  <div className="w-14 h-14 mx-auto bg-muted/20 rounded-full flex items-center justify-center mb-2">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <p className="font-semibold text-xs truncate mb-1">{top3[2].username}</p>
                  <p className="text-sm font-bold text-muted-foreground">{top3[2].score.toLocaleString()}</p>
                </Card>
              </div>

              {/* Rest of Leaderboard */}
              <ScrollArea className="h-96">
                <div className="space-y-2">
                  {rest.map((player) => (
                    <LeaderboardRow
                      key={player.rank}
                      {...player}
                      testId={`leaderboard-row-${player.rank}`}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="weekly">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {topPlayers.map((player) => (
                    <LeaderboardRow
                      key={player.rank}
                      {...player}
                      testId={`leaderboard-weekly-${player.rank}`}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="alltime">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {topPlayers.map((player) => (
                    <LeaderboardRow
                      key={player.rank}
                      {...player}
                      testId={`leaderboard-alltime-${player.rank}`}
                    />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Your Rank Sticky Footer */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="max-w-sm mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <LeaderboardRow
                rank={6}
                username="You"
                score={7500}
                isCurrentUser={true}
                testId="your-rank"
              />
            </Card>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}


export default Leaderboard;