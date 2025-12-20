import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

const AnswerOption = ({
  option,
  index,
  selected,
  correct,
  showResult,
  disabled,
  onSelect,
})=> {
  const labels = ["A", "B", "C", "D"];

  const getStateClasses = () => {
    if (showResult) {
      if (correct) {
        return "border-success bg-success/10 text-success";
      }
      if (selected && !correct) {
        return "border-destructive bg-destructive/10 text-destructive";
      }
    }
    if (selected) {
      return "border-primary bg-primary/5 text-primary";
    }
    return "border-border bg-card text-foreground";
  };

  return (
    <button
      onClick={onSelect}
      disabled={disabled || showResult}
      data-testid={`answer-option-${index}`}
      aria-label={`Option ${labels[index]}: ${option}`}
      aria-pressed={selected}
      aria-disabled={disabled || showResult}
      tabIndex={0}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left font-medium text-base transition-all",
        "active:scale-95",
        "hover-elevate active-elevate-2",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        getStateClasses(),
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
            showResult && correct
              ? "bg-success text-success-foreground"
              : showResult && selected && !correct
              ? "bg-destructive text-destructive-foreground"
              : selected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {showResult ? (
            correct ? (
              <Check className="w-4 h-4" />
            ) : selected && !correct ? (
              <X className="w-4 h-4" />
            ) : (
              labels[index]
            )
          ) : (
            labels[index]
          )}
        </div>
        <span className="flex-1">{option}</span>
      </div>
    </button>
  );
}


export default AnswerOption;