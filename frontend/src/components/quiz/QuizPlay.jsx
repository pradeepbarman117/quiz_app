import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AnswerOption from "./QuizPlayAnswer";
import TimerRing from "./QuizPlayTimer";
import LifelineButton from "./QuizPlayLIfeLine";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { SplitSquareHorizontal, SkipForward, Users, X, Trophy, Zap } from "lucide-react"; // Added Trophy, Zap for icons
import { useNavigate } from "react-router-dom";

// --- New Component for 1 vs 1 Header ---
const PlayerProfileHeader = ({ playerScore, opponentScore }) => {
    // Mock user data for the header
    const user = { name: "You", avatar: "👤", score: playerScore };
    const opponent = { name: "Opponent", avatar: "🤖", score: opponentScore };

    return (
        <div className="flex justify-between items-center p-4 bg-primary-foreground border-b border-border shadow-md">
            {/* Player 1 (You) Profile */}
            <div className="flex items-center space-x-2">
                <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold text-white ring-2 ring-blue-300">
                    {user.avatar}
                </div>
                <div>
                    <div className="text-sm font-bold text-blue-600">{user.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                        <Trophy className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{user.score} Points</span>
                    </div>
                </div>
            </div>

            {/* Separator / VS indicator */}
            <div className="text-lg font-extrabold text-primary mx-4">VS</div>

            {/* Player 2 (Opponent) Profile */}
            <div className="flex items-center space-x-2">
                <div>
                    <div className="text-sm font-bold text-red-600 text-right">{opponent.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center justify-end">
                        <span className="font-semibold">{opponent.score} Points</span>
                        <Trophy className="w-3 h-3 ml-1 text-yellow-500 fill-yellow-500" />
                    </div>
                </div>
                <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center text-xl font-bold text-white ring-2 ring-red-300">
                    {opponent.avatar}
                </div>
            </div>
        </div>
    );
};
// --- End New Component ---


// Mock quiz data (unchanged)
const mockQuestions = [
    {
        id: "1",
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
    },
    {
        id: "2",
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
    },
    // Add more questions as needed
];

const QuizPlay = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    // Renamed score to playerScore to distinguish from opponentScore
    const [playerScore, setPlayerScore] = useState(0); 
    // New state for opponent score
    const [opponentScore, setOpponentScore] = useState(0); 
    const [lifelines, setLifelines] = useState({
        fifty: false,
        skip: false,
        audience: false,
    });
    const [showLifelineDialog, setShowLifelineDialog] = useState(false);
    const [removedOptions, setRemovedOptions] = useState([]);
    // State to simulate opponent's activity (e.g., they answered after 1 second)
    const [opponentActivity, setOpponentActivity] = useState(null); 

    const question = mockQuestions[currentQuestion];
    const totalQuestions = mockQuestions.length;
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;

    // Simulate opponent's answer/score update
    useEffect(() => {
        if (showResult && currentQuestion < totalQuestions) {
            // Simulate opponent getting 50% of the questions correct
            const opponentGetsCorrect = currentQuestion % 2 === 0; 
            
            // Simulating a delay for opponent's action (e.g., 500ms to 1500ms)
            const opponentActionDelay = Math.random() * 1000 + 500; 

            const opponentTimeout = setTimeout(() => {
                if (opponentGetsCorrect) {
                    setOpponentScore(prev => prev + 10);
                    setOpponentActivity("correct");
                } else {
                    setOpponentActivity("incorrect");
                }
            }, opponentActionDelay);

            return () => clearTimeout(opponentTimeout);
        } else {
             // Clear opponent activity when moving to the next question
             setOpponentActivity(null); 
        }
    }, [showResult, currentQuestion, totalQuestions]);

    const handleAnswer = (index) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);

        if (index === question.correctAnswer) {
            setPlayerScore(prev => prev + 10);
        }

        setTimeout(() => {
            if (currentQuestion < mockQuestions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowResult(false);
                setRemovedOptions([]);
            } else {
                // Determine winner and navigate to result
                const winner = playerScore > opponentScore ? "You Win" : 
                               playerScore < opponentScore ? "Opponent Wins" : "Draw";
                navigate('/quiz/daily/general/GEN-DAILY-001/result/e73b0c33-870a-41e0-a033-1bb9445c8713');
            }
        }, 3000); // Increased delay to allow seeing both player and opponent results
    };

    // Lifeline handlers remain the same for functionality, only the calls below are used

    const handleFiftyFifty = () => {
        if (lifelines.fifty || showResult) return;
        setLifelines({ ...lifelines, fifty: true });
        const wrongOptions = question.options
            .map((_, i) => i)
            .filter((i) => i !== question.correctAnswer);
        const toRemove = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 2); // Randomly choose 2 wrong
        setRemovedOptions(toRemove);
    };

    const handleSkip = () => {
        if (lifelines.skip || showResult) return;
        setLifelines({ ...lifelines, skip: true });
        if (currentQuestion < mockQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setRemovedOptions([]);
        } else {
             // Handle end of quiz if last question is skipped
             const winner = playerScore > opponentScore ? "You Win" : 
                            playerScore < opponentScore ? "Opponent Wins" : "Draw";
             navigate("/quiz/daily/general/GEN-DAILY-001/result/e73b0c33-870a-41e0-a033-1bb9445c8713");
        }
    };

    const handleAudiencePoll = () => {
        if (lifelines.audience || showResult) return;
        setLifelines({ ...lifelines, audience: true });
        setShowLifelineDialog(true);
    };


    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="max-w-md mx-auto w-full flex flex-col flex-1">
                {/* 1. New Player Profile Header */}
                <PlayerProfileHeader playerScore={playerScore} opponentScore={opponentScore} />

                {/* 2. Main Game Header (Quit, Timer, Progress) */}
                <div className="p-4 space-y-3 bg-card border-b border-border">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/home")}
                            className="rounded-full text-foreground hover:bg-muted"
                        >
                            <X className="w-5 h-5" />
                        </Button>
                        
                        {/* Timer/Progress Indicator Group */}
                        <div className="flex items-center space-x-4">
                            <span className="text-base font-bold text-primary flex items-center">
                                <Zap className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                                {currentQuestion + 1}/{totalQuestions}
                            </span>
                            <TimerRing
                                duration={30}
                                onTimeout={() => handleAnswer(-1)}
                                paused={showResult}
                            />
                        </div>
                    </div>
                    <Progress value={progress} className="h-2 bg-muted/50" indicatorClassName="bg-primary" />
                </div>

                {/* 3. Question & Answers Area */}
                <div className="flex-1 p-4 pb-32 overflow-y-auto">
                    {/* Question Card - Redesigned for better contrast and emphasis */}
                    <div className="bg-primary text-primary-foreground rounded-2xl p-6 mb-6 min-h-32 flex items-center shadow-lg transform transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-xl font-extrabold leading-tight text-center w-full">
                            {question.question}
                        </h2>
                    </div>

                    {/* Opponent Activity Banner (new) */}
                    {opponentActivity && (
                         <div className={`text-center mb-4 p-2 rounded-lg text-sm font-semibold ${
                            opponentActivity === "correct" 
                                ? "bg-green-100 text-green-700 border border-green-300" 
                                : "bg-red-100 text-red-700 border border-red-300"
                        }`}>
                            Opponent answered **{opponentActivity}**!
                        </div>
                    )}

                    {/* Answer Grid */}
                    <div className="grid grid-cols-1 gap-3">
                        {question.options.map((option, index) => (
                            <AnswerOption
                                key={index}
                                option={option}
                                index={index}
                                selected={selectedAnswer === index}
                                correct={index === question.correctAnswer}
                                showResult={showResult}
                                disabled={removedOptions.includes(index) || showResult}
                                onSelect={() => handleAnswer(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* 4. Lifelines Bottom Bar (Fixed) */}
                <div className="fixed bottom-0 left-0 right-0 bg-card border-t-4 border-primary p-4 rounded-t-3xl shadow-2xl">
                    <div className="max-w-md mx-auto">
                        <div className="flex justify-around gap-2">
                            <LifelineButton
                                icon={SplitSquareHorizontal}
                                label="50:50"
                                used={lifelines.fifty}
                                onClick={handleFiftyFifty}
                                testId="lifeline-fifty"
                                disabled={showResult}
                            />
                            <LifelineButton
                                icon={SkipForward}
                                label="Skip"
                                used={lifelines.skip}
                                onClick={handleSkip}
                                testId="lifeline-skip"
                                disabled={showResult}
                            />
                            <LifelineButton
                                icon={Users}
                                label="Poll"
                                used={lifelines.audience}
                                onClick={handleAudiencePoll}
                                testId="lifeline-audience"
                                disabled={showResult}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Audience Poll Dialog (unchanged) */}
            <Dialog open={showLifelineDialog} onOpenChange={setShowLifelineDialog}>
                <DialogContent className="max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Audience Poll Results</DialogTitle>
                        <DialogDescription>
                            View how the audience voted on this question
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 py-4">
                        {question.options.map((option, index) => {
                            // Enhanced mock poll data: correct is higher, but not 100%
                            const basePercent = index === question.correctAnswer ? 55 : (Math.random() * 20 + 5);
                            const totalOther = question.options.filter((_, i) => i !== question.correctAnswer).reduce((sum, _, i) => sum + (i === index ? 0 : (Math.random() * 10)), 0);
                            const percentage = index === question.correctAnswer ? 
                                100 - (question.options.length - 1) * 15 : // Example logic
                                Math.min(20, Math.round(basePercent)); // Cap other options
                            
                            // Simple mock distribution to ensure sum is close to 100%
                            const finalPercentage = index === question.correctAnswer ? 60 : [15, 10, 15][index]; 

                            return (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium">{option}</span>
                                        <span className="text-sm font-bold">{finalPercentage}%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${finalPercentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <DialogClose asChild>
                        <Button
                            onClick={() => {
                                handleAudiencePoll(); // Mark lifeline as used
                                setShowLifelineDialog(false);
                            }}
                            className="w-full"
                        >
                            Got It
                        </Button>
                    </DialogClose>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default QuizPlay;