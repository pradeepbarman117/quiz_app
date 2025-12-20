import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SearchingOpponent = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    // Simulate finding opponent after 3 seconds
    const timer = setTimeout(() => {
      navigate("/contest/duel/general/GEN-DUEL-001/play/e73b0c33-870a-41e0-a033-1bb9445c8713");
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-background rounded-xl max-w-sm mx-auto p-6 text-center relative">
        {/* Searching Animation */}
        <div className="relative my-14">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary/10 rounded-full animate-pulse" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full animate-ping" />
          </div>
          <div className="relative flex items-center justify-center pt-0">
            <Loader2 className="w-16 h-16 text-primary animate-spin" data-testid="loading-spinner" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3">Finding Opponent...</h1>
        <p className="text-muted-foreground mb-8">
          Matching you with a player of similar skill level
        </p>

        {/* Skeleton Cards */}
        <Card className="p-6 mb-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-full" />
            <div className="flex-1 text-left space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        </Card>

        <Button
          variant="outline"
          onClick={() => {
            navigate("/quiz/contest/duel");
            onClose();
          }}
          data-testid="button-cancel"
          className="w-full h-12 rounded-full font-semibold"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default SearchingOpponent;
