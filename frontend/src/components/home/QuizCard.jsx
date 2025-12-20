// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Clock, Trophy, Users } from "lucide-react";
// import { cn } from "@/lib/utils";

// const QuizCard = ({
//   title,
//   description,
//   category,
//   type,
//   reward,
//   timeLimit,
//   players,
//   variant = "default",
//   onPlay,
//   testId,
// })=> {
//   const typeColors = {
//     daily: "bg-primary text-primary-foreground",
//     "1v1": "bg-accent text-accent-foreground",
//     weekly: "bg-warning text-warning-foreground",
//   };

//   return (
//     <Card
//       data-testid={testId}
//       className={cn(
//         "overflow-hidden hover-elevate transition-all",
//         variant === "hero" && "bg-gradient-to-br from-primary/10 via-accent/5 to-background"
//       )}
//     >
//       <div className={cn("p-6", variant === "hero" && "pb-8")}>
//         <div className="flex items-start justify-between mb-3">
//           <Badge className={cn("font-semibold text-xs", typeColors[type])}>
//             {type === "1v1" ? "1 vs 1" : type.charAt(0).toUpperCase() + type.slice(1)}
//           </Badge>
//           {reward && (
//             <div className="flex items-center gap-1 text-warning">
//               <Trophy className="w-4 h-4" />
//               <span className="font-bold text-sm">+{reward}</span>
//             </div>
//           )}
//         </div>

//         <h3 className={cn(
//           "font-bold mb-2",
//           variant === "hero" ? "text-2xl" : "text-xl"
//         )} data-testid={`${testId}-title`}>
//           {title}
//         </h3>

//         {description && (
//           <p className="text-sm text-muted-foreground mb-4">
//             {description}
//           </p>
//         )}

//         <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
//           <span className="uppercase tracking-wide font-semibold text-xs">
//             {category}
//           </span>
//           {timeLimit && (
//             <div className="flex items-center gap-1">
//               <Clock className="w-3.5 h-3.5" />
//               <span>{timeLimit}s</span>
//             </div>
//           )}
//           {players && (
//             <div className="flex items-center gap-1">
//               <Users className="w-3.5 h-3.5" />
//               <span>{players}</span>
//             </div>
//           )}
//         </div>

//         <Button
//           onClick={onPlay}
//           data-testid={`${testId}-play`}
//           className={cn(
//             "w-full rounded-full font-bold",
//             variant === "hero" && "h-12 text-base"
//           )}
//         >
//           Play Now
//         </Button>
//       </div>
//     </Card>
//   );
// }

// export default QuizCard;




import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const QuizCard = ({
  title,
  description,
  category,
  type,
  reward,
  timeLimit,
  players,
  variant = "default",
  onPlay,
  testId,
}) => {
  const typeColors = {
    daily: "bg-primary text-primary-foreground",
    "1v1": "bg-accent text-accent-foreground",
    weekly: "bg-warning text-warning-foreground",
  };

  return (
    <Card
      data-testid={testId}
      className={cn(
        "overflow-hidden hover-elevate transition-all",
        variant === "hero" && "bg-gradient-to-br from-primary/10 via-accent/5 to-background"
      )}
    >
      <div className={cn("p-4", variant === "hero" && "pb-6")}>
        <div className="flex items-start justify-between mb-2">
          <Badge className={cn("font-semibold text-xs", typeColors[type])}>
            {type === "1v1" ? "1 vs 1" : type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
          {reward && (
            <div className="flex items-center gap-1 text-warning">
              <Trophy className="w-3 h-3" />
              <span className="font-bold text-xs">+{reward}</span>
            </div>
          )}
        </div>

        <h3
          className={cn(
            "font-bold mb-1",
            variant === "hero" ? "text-xl" : "text-lg"
          )}
          data-testid={`${testId}-title`}
        >
          {title}
        </h3>

        {description && (
          <p className="text-xs text-muted-foreground mb-3">
            {description}
          </p>
        )}

        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
          <span className="uppercase tracking-wide font-semibold">
            {category}
          </span>
          {timeLimit && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{timeLimit}s</span>
            </div>
          )}
          {players && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{players}</span>
            </div>
          )}
        </div>

        <Button
          onClick={onPlay}
          data-testid={`${testId}-play`}
          className={cn(
            "w-full rounded-full font-bold",
            variant === "hero" && "h-10 text-sm"
          )}
        >
          Play Now
        </Button>
      </div>
    </Card>
  );
};

export default QuizCard;
