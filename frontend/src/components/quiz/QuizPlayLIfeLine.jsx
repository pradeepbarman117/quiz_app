import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LifelineButton = ({ icon: Icon, label, used, onClick, testId }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={used}
      data-testid={testId}
      aria-label={`Use ${label} lifeline${used ? ' (already used)' : ''}`}
      aria-disabled={used}
      className={cn(
        "flex-1 flex flex-col items-center gap-1.5 h-auto py-3 px-4",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        used && "opacity-40"
      )}
    >
      <Icon className="w-5 h-5" aria-hidden="true" />
      <span className="text-xs font-semibold">{label}</span>
      {used && (
        <span className="text-[10px] text-destructive font-medium uppercase" aria-hidden="true">Used</span>
      )}
    </Button>
  );
}

export default LifelineButton;