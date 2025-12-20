import BottomNav from "../home/BottomNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Wallet,
  Trophy,
  Target,
  Flame,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    username: "QuizMaster_123",
    email: "user@example.com",
    profileImage: "",
    coins: 1250,
    totalGames: 42,
    wins: 28,
    averageAccuracy: 85,
    streak: 7,
    rank: 6,
    subscription: "none",
  };

  const stats = [
    { icon: Trophy, label: "Total Games", value: user.totalGames, color: "text-primary" },
    { icon: Target, label: "Win Rate", value: `${Math.round((user.wins / user.totalGames) * 100)}%`, color: "text-success" },
    { icon: TrendingUp, label: "Accuracy", value: `${user.averageAccuracy}%`, color: "text-accent" },
    { icon: Flame, label: "Streak", value: `${user.streak} days`, color: "text-warning" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background p-4 pb-6 rounded-b-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/settings")}
              data-testid="button-settings"
              className="rounded-full"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* User Info */}
          <Card className="p-5 bg-background/70 rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-1" data-testid="username">
                  {user.username}
                </h2>
                <p className="text-sm text-muted-foreground mb-2" data-testid="email">
                  {user.email}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <Trophy className="w-3 h-3" />
                    Rank #{user.rank}
                  </Badge>
                  {user.subscription === "none" && (
                    <Badge className="bg-muted text-muted-foreground text-xs">Free</Badge>
                  )}
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate("/wallet")}
              data-testid="button-wallet"
              variant="outline"
              className="w-full rounded-full font-semibold text-sm gap-2"
            >
              <Wallet className="w-4 h-4" />
              Wallet: {user.coins.toLocaleString()} coins
            </Button>
          </Card>
        </div>

        <div className="px-4 pt-6 space-y-6">
          {/* Stats Grid */}
          <div>
            <h3 className="font-bold text-base mb-3">Statistics</h3>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-3 bg-background/70 rounded-lg" data-testid={`stat-${index}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-xs text-muted-foreground font-semibold uppercase">
                        {stat.label}
                      </span>
                    </div>
                    <p className="text-xl font-bold">{stat.value}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-bold text-base mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Card
                onClick={() => navigate("/subscription")}
                data-testid="card-upgrade"
                className="p-4 bg-background/70 rounded-lg hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Upgrade to Premium</p>
                      <p className="text-xs text-muted-foreground">Unlimited lives & no ads</p>
                    </div>
                  </div>
                  <Badge className="bg-warning text-warning-foreground text-xs">₹49/wk</Badge>
                </div>
              </Card>

              <Card
                onClick={() => navigate("/remove-ads")}
                data-testid="card-remove-ads"
                className="p-4 bg-background/70 rounded-lg hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                      <Settings className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Remove Ads</p>
                      <p className="text-xs text-muted-foreground">One-time payment</p>
                    </div>
                  </div>
                  <Badge className="bg-success text-success-foreground text-xs">₹99</Badge>
                </div>
              </Card>

              <Card
                onClick={() => navigate("/quiz-history")}
                data-testid="card-history"
                className="p-4 bg-background/70 rounded-lg hover:shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Quiz History</p>
                    <p className="text-xs text-muted-foreground">View past performances</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Log Out */}
          <Button
            onClick={() => navigate("/")}
            data-testid="button-logout"
            variant="outline"
            className="w-full h-12 rounded-full font-semibold text-sm gap-2 text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;


