// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { ArrowLeft, Users, Trophy, Zap, Search } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import SearchingOpponent from "./SearchingOpponent";
// import { useState } from "react";

// const DuelContest = () => {
//     const navigate = useNavigate();
//     const [isSearching, setIsSearching] = useState(false);
//     const handleSearchMatch = () => {
//         setIsSearching(true);
//     }

//     if(isSearching) {
//         return <SearchingOpponent isOpen={isSearching} onClose={() => setIsSearching(false)} />
//     }

//     return (
//         <div className="min-h-screen bg-background">
//             <div className="max-w-sm mx-auto px-4 py-6">
//                 {/* Header */}
//                 <div className="flex items-center gap-3 mb-8">
//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => navigate("/home")}
//                         data-testid="button-back"
//                         className="rounded-full"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                     </Button>
//                     <h1 className="text-2xl font-bold">1 vs 1 Battle</h1>
//                 </div>

//                 {/* Contest Info */}
//                 <Card className="p-6 mb-6 bg-gradient-to-br from-accent/10 to-primary/5">
//                     <div className="text-center mb-4">
//                         <h2 className="text-xl font-bold mb-2">Quick Match</h2>
//                         <p className="text-sm text-muted-foreground">
//                             Compete against a random player
//                         </p>
//                     </div>
//                     <div className="flex items-center justify-center gap-6 mb-4">
//                         <div className="text-center">
//                             <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2">
//                                 <Users className="w-8 h-8 text-success" />
//                             </div>
//                             <p className="text-xs text-muted-foreground">Players Online</p>
//                             <p className="text-lg font-bold">1,234</p>
//                         </div>
//                         <div className="text-center">
//                             <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-2">
//                                 <Trophy className="w-8 h-8 text-warning" />
//                             </div>
//                             <p className="text-xs text-muted-foreground">Entry Fee</p>
//                             <p className="text-lg font-bold">Free</p>
//                         </div>
//                     </div>
//                 </Card>

//                 {/* Rules */}
//                 <Card className="p-4 mb-8">
//                     <h3 className="font-bold mb-3">How It Works</h3>
//                     <div className="space-y-2 text-sm text-muted-foreground">
//                         <div className="flex items-start gap-2">
//                             <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                             <p>10 questions, 20 seconds each</p>
//                         </div>
//                         <div className="flex items-start gap-2">
//                             <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                             <p>Speed matters - faster answers = bonus points</p>
//                         </div>
//                         <div className="flex items-start gap-2">
//                             <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
//                             <p>Winner gets 50 coins, loser gets 10 coins</p>
//                         </div>
//                     </div>
//                 </Card>

//                 {/* Find Match Button */}
//                 <Button
//                     onClick={handleSearchMatch}
//                     data-testid="button-find-match"
//                     className="w-full h-12 rounded-full font-bold text-base"
//                 >
//                     Find Match
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default DuelContest;



import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Users, Trophy, Zap, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import SearchingOpponent from "./SearchingOpponent";
import { useState } from "react";

const DuelContest = () => {
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchMatch = () => {
        setIsSearching(true);
    };

    const handleRedirectToList = () => {
        navigate("/contest/list");
    };

    if (isSearching) {
        return <SearchingOpponent isOpen={isSearching} onClose={() => setIsSearching(false)} />;
    }

    const params = useParams();
    const isGeneralCategory = params?.categoryId === 'general';
    const selectedCategory = isGeneralCategory ? null : params?.categoryId;

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-sm mx-auto px-4 py-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate("/home")}
                        data-testid="button-back"
                        className="rounded-full"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h1 className="text-2xl font-bold">1 vs 1 Battle</h1>
                </div>

                {/* Contest Info */}
                <Card className="p-6 mb-6 bg-gradient-to-br from-accent/10 to-primary/5">
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-bold mb-2">Quick Match</h2>
                        <p className="text-sm text-muted-foreground">
                            Compete against a random player
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-6 mb-4">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-2">
                                <Users className="w-8 h-8 text-success" />
                            </div>
                            <p className="text-xs text-muted-foreground">Players Online</p>
                            <p className="text-lg font-bold">1,234</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mb-2">
                                <Trophy className="w-8 h-8 text-warning" />
                            </div>
                            <p className="text-xs text-muted-foreground">Entry Fee</p>
                            <p className="text-lg font-bold">Free</p>
                        </div>
                    </div>
                </Card>

                {/* Category Notifier */}
                {selectedCategory && (
                    <Card className="p-4 mb-6 bg-success/10 border border-success/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                                <Search className="w-3 h-3 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-success">
                                Category Selected: <span className="capitalize">{selectedCategory}</span>
                            </p>
                        </div>
                    </Card>
                )}

                {/* Random Quiz Notification (for general category) */}
                {isGeneralCategory && (
                    <Card className="p-4 mb-6 bg-muted rounded-lg">
                        <div className="flex items-start gap-2">
                            <Search className="w-5 h-5 text-muted-foreground mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground">Random Quiz</p>
                                <p className="text-xs text-muted-foreground">
                                    Questions from any category will be asked. For a specific category, use the button below.
                                </p>
                                <Button
                                    variant="link"
                                    size="sm"
                                    onClick={handleRedirectToList}
                                    className="text-primary p-0 mt-1"
                                >
                                    Browse Contests
                                </Button>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Rules */}
                <Card className="p-4 mb-8">
                    <h3 className="font-bold mb-3">How It Works</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>10 questions, 20 seconds each</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>Speed matters - faster answers = bonus points</p>
                        </div>
                        <div className="flex items-start gap-2">
                            <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            <p>Winner gets 50 coins, loser gets 10 coins</p>
                        </div>
                    </div>
                </Card>

                {/* Find Match Button */}
                <Button
                    onClick={handleSearchMatch}
                    data-testid="button-find-match"
                    className="w-full h-12 rounded-full font-bold text-base"
                >
                    Find Match
                </Button>
            </div>
        </div>
    );
};

export default DuelContest;

