import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const RoomCard = (props) => {
  const {
    name,
    category,
    prizePool,
    currentPlayers,
    maxPlayers,
    status,
    startTime,
    onClick,
    testId,
  } = props;

  const statusConfig = {
    open: { label: "Open", color: "bg-emerald-100 text-emerald-700 border border-emerald-200" },
    full: { label: "Full", color: "bg-amber-100 text-amber-700 border border-amber-200" },
    in_progress: { label: "Live", color: "bg-red-100 text-red-700 border border-red-200" },
    completed: { label: "Ended", color: "bg-slate-100 text-slate-600 border border-slate-200" },
  };

  const timeUntilStart = Math.floor((startTime.getTime() - Date.now()) / 60000);
  const fillPercent = Math.min(100, (currentPlayers / maxPlayers) * 100);
  const contestType = maxPlayers === 2 ? "1vs1" : "weekly";
  return (
    <Card
      onClick={onClick}
      data-testid={testId}
      className="p-4 rounded-xl border border-border/60 bg-gradient-to-br from-background to-muted/40 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
    >
      {/* Top row: title + status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1" data-testid={`${testId}-name`}>
            {name}
          </h3>
          <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {category}
          </p>
        </div>
        <Badge className={cn("font-semibold text-[11px]", contestType === "1vs1" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700")}>
          {contestType === "1vs1" ? "1vs1" : "Weekly"}
        </Badge>
      </div>

      {/* Prize / players / time */}
      <div className="space-y-2.5">
        {/* Prize */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground">Prize Pool</p>
              <p className="text-sm font-semibold text-amber-600">
                {prizePool.toLocaleString()} coins
              </p>
            </div>
          </div>
        </div>

        {/* Players + progress */}
        <div className="flex items-center gap-2 text-xs">
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground whitespace-nowrap">
            {currentPlayers}/{maxPlayers} players
          </span>
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                fillPercent >= 100
                  ? "bg-red-500"
                  : fillPercent >= 80
                    ? "bg-amber-500"
                    : "bg-primary"
              )}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        {/* Time */}
        {timeUntilStart > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Starts in {timeUntilStart} min</span>
          </div>
        )}
        {timeUntilStart <= 0 && status === "in_progress" && (
          <div className="flex items-center gap-2 text-xs text-red-500">
            <Clock className="w-4 h-4" />
            <span>Live now</span>
          </div>
        )}
      </div>
    </Card>
  );
}
export default RoomCard
