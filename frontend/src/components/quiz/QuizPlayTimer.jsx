import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const TimerRing = ({ duration, onTimeout, paused = false, className })=> {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;
  const isLowTime = timeLeft <= 10;

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, onTimeout]);

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative", className)} data-testid="timer-ring">
      <svg className="w-20 h-20 -rotate-90">
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          className="text-muted"
        />
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke="currentColor"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000",
            isLowTime ? "text-destructive animate-pulse" : "text-primary"
          )}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={cn(
            "text-2xl font-bold",
            isLowTime ? "text-destructive" : "text-foreground"
          )}
          data-testid="timer-value"
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

export default TimerRing;