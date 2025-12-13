import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Users, Award, Moon, Sun } from "lucide-react";

const Onboarding = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    const handleGetStarted = () => {
        // Navigate to login page
        window.location.href = '/login';
    };

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-gradient-to-b from-primary/10 via-accent/5 to-background">
                <div className="max-w-sm mx-auto px-4 py-8">
                    {/* Theme Toggle */}
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Hero Section */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-3xl mb-4">
                            <Trophy className="w-10 h-10 text-primary-foreground" />
                        </div>
                        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            QuizMaster
                        </h1>
                        <p className="text-lg text-muted-foreground font-medium">
                            Test Your Knowledge, Win Rewards
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                                <Zap className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Daily Challenges</h3>
                                <p className="text-sm text-muted-foreground">
                                    Play free quizzes every day and earn coins
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
                            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                                <Users className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">1v1 Battles</h3>
                                <p className="text-sm text-muted-foreground">
                                    Challenge opponents in real-time quiz duels
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border">
                            <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center shrink-0">
                                <Award className="w-5 h-5 text-warning" />
                            </div>
                            <div>
                                <h3 className="font-semibold mb-1">Weekly Contests</h3>
                                <p className="text-sm text-muted-foreground">
                                    Join multiplayer rooms and win big prizes
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 mb-6">
                        <Button
                            onClick={handleGetStarted}
                            data-testid="button-get-started"
                            className="w-full h-12 rounded-full text-base font-bold"
                        >
                            Get Started
                        </Button>
                        <Button
                            onClick={handleGetStarted}
                            data-testid="button-login"
                            variant="outline"
                            className="w-full h-12 rounded-full text-base font-semibold"
                        >
                            Log In
                        </Button>
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-xs text-muted-foreground">
                        Play 5 free games daily. Unlock unlimited with subscription.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Onboarding;