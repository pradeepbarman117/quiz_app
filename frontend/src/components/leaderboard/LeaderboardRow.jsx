import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, Medal } from "lucide-react";
import { cn } from "@/lib/utils";

const LeaderboardRow = (props) => {
  const { rank, username, profileImage, score, isCurrentUser, testId } = props;

  const getRankBadge = () => {
    if (rank === 1) return <Crown className="w-5 h-5 text-warning fill-warning" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground fill-muted-foreground" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-chart-4 fill-chart-4" />;
    return null;
  };

  return (
    <div
      data-testid={testId}
      className={cn(
        "flex items-center gap-3 p-3 rounded-xl hover-elevate",
        isCurrentUser && "bg-primary/5 border border-primary/20"
      )}
    >
      <div className="flex items-center justify-center w-8 h-8 shrink-0">
        {rank <= 3 ? (
          getRankBadge()
        ) : (
          <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
        )}
      </div>

      <Avatar className="w-10 h-10">
        <AvatarImage src={profileImage} alt={username} />
        <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p
          className={cn("font-semibold truncate", isCurrentUser && "text-primary")}
          data-testid={`${testId}-username`}
        >
          {username}
        </p>
        {isCurrentUser && (
          <Badge variant="secondary" className="text-[10px] h-4 px-1.5 mt-0.5">
            You
          </Badge>
        )}
      </div>

      <div className="text-right shrink-0">
        <p className="text-lg font-bold" data-testid={`${testId}-score`}>
          {score.toLocaleString()}
        </p>
        <p className="text-xs text-muted-foreground">points</p>
      </div>
    </div>
  );
}

export default LeaderboardRow;
