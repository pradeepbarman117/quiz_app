// import BottomNav from "@/components/home/BottomNav";
// import QuizCard from "@/components/home/QuizCard";
// import StatCard from "@/components/home/StatCard";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// // import { ThemeToggle } from "@/components/ThemeToggle";
// import {
//   Coins,
//   Heart,
//   Flame,
//   Trophy,
//   Target,
//   Users,
//   BookOpen,
//   Zap,
//   Brain,
//   FlaskConical,
//   Clock,
// } from "lucide-react";

// const Home = ()=> {

//   const categories = [
//     { id: "upsc", name: "UPSC", icon: BookOpen, color: "text-primary", count: 500 },
//     { id: "gk", name: "GK", icon: Brain, color: "text-accent", count: 350 },
//     { id: "science", name: "Science", icon: FlaskConical, color: "text-success", count: 420 },
//     { id: "history", name: "History", icon: Clock, color: "text-warning", count: 280 },
//   ];

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       <div className="max-w-sm mx-auto">
//         {/* Header with Stats */}
//         <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background p-4 pb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-2xl font-bold">Welcome Back!</h1>
//               <p className="text-sm text-muted-foreground">Ready to play?</p>
//             </div>
//             {/* <ThemeToggle /> */}
//             <div className="flex items-center gap-2">
//               <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
//                 <Heart className="w-4 h-4 text-destructive fill-destructive" />
//                 <span className="font-bold">5</span>
//               </Badge>
//               <Badge variant="secondary" className="gap-1.5 py-1.5 px-3">
//                 <Coins className="w-4 h-4 text-warning fill-warning" />
//                 <span className="font-bold">1,250</span>
//               </Badge>
//             </div>
//           </div>

//           {/* Quick Stats Grid */}
//           <div className="grid grid-cols-2 gap-3">
//             <StatCard
//               icon={Flame}
//               label="Streak"
//               value="7 days"
//               color="warning"
//               testId="stat-streak"
//             />
//             <StatCard
//               icon={Target}
//               label="Accuracy"
//               value="85%"
//               color="success"
//               testId="stat-accuracy"
//             />
//           </div>
//         </div>

//         <div className="px-4 space-y-6 pt-6">
//           {/* Daily Quiz Hero Card */}
//           <div data-testid="section-daily-quiz">
//             <h2 className="text-xl font-bold mb-3">Today's Challenge</h2>
//             <QuizCard
//               title="Daily Quiz"
//               description="Test your knowledge with today's questions"
//               category="Mixed Topics"
//               type="daily"
//               reward={100}
//               timeLimit={300}
//               variant="hero"
//               testId="card-daily-quiz"
//             />
//           </div>

//           {/* Contests Grid */}
//           <div data-testid="section-contests">
//             <h2 className="text-xl font-bold mb-3">Contests</h2>
//             <div className="grid grid-cols-2 gap-3">
//               <Card
//                 data-testid="card-1v1"
//                 className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mb-3">
//                   <Users className="w-6 h-6 text-accent" />
//                 </div>
//                 <h3 className="font-bold text-base mb-1">1 vs 1</h3>
//                 <p className="text-xs text-muted-foreground mb-2">
//                   Challenge a player
//                 </p>
//                 <Badge className="bg-accent text-accent-foreground text-xs">
//                   Live Now
//                 </Badge>
//               </Card>

//               <Card
//                 data-testid="card-weekly"
//                 className="p-4 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
//               >
//                 <div className="flex items-center justify-center w-12 h-12 bg-warning/10 rounded-xl mb-3">
//                   <Trophy className="w-6 h-6 text-warning" />
//                 </div>
//                 <h3 className="font-bold text-base mb-1">Weekly</h3>
//                 <p className="text-xs text-muted-foreground mb-2">
//                   Join tournaments
//                 </p>
//                 <Badge className="bg-warning text-warning-foreground text-xs">
//                   3 Active
//                 </Badge>
//               </Card>
//             </div>
//           </div>

//           {/* Categories Horizontal Scroll */}
//           <div data-testid="section-categories">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-xl font-bold">Categories</h2>
//               <Button
//                 variant="link"
//                 data-testid="button-view-all-categories"
//                 className="text-primary font-semibold p-0 h-auto"
//               >
//                 View All
//               </Button>
//             </div>
//             <ScrollArea className="w-full">
//               <div className="flex gap-3 pb-2">
//                 {categories.map((category) => {
//                   const Icon = category.icon;
//                   return (
//                     <Card
//                       key={category.id}
//                       className="flex-shrink-0 w-32 p-4 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
//                     >
//                       <div className={`flex items-center justify-center w-10 h-10 bg-${category.color}/10 rounded-xl mb-2`}>
//                         <Icon className={`w-5 h-5 ${category.color}`} />
//                       </div>
//                       <h3 className="font-semibold text-sm mb-1">
//                         {category.name}
//                       </h3>
//                       <p className="text-xs text-muted-foreground">
//                         {category.count} Qs
//                       </p>
//                     </Card>
//                   );
//                 })}
//               </div>
//               <ScrollBar orientation="horizontal" />
//             </ScrollArea>
//           </div>

//           {/* Quick Action: Practice Mode */}
//           <Card
//             data-testid="card-practice"
//             className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
//           >
//             <div className="flex items-center gap-4">
//               <div className="flex items-center justify-center w-14 h-14 bg-primary rounded-2xl">
//                 <Zap className="w-7 h-7 text-primary-foreground" />
//               </div>
//               <div className="flex-1">
//                 <h3 className="font-bold text-lg mb-1">Practice Mode</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Unlimited quizzes to improve your skills
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>

//       <BottomNav />
//     </div>
//   );
// }

// export default Home;




import BottomNav from "@/components/home/BottomNav";
import QuizCard from "@/components/home/QuizCard";
import StatCard from "@/components/home/StatCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Coins,
    Heart,
    Flame,
    Trophy,
    Target,
    Users,
    BookOpen,
    Zap,
    Brain,
    FlaskConical,
    Clock,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {

    const navigationHandler = useNavigate();
    const categories = [
        { id: "upsc", name: "UPSC", icon: BookOpen, color: "text-primary", count: 500 },
        { id: "gk", name: "GK", icon: Brain, color: "text-accent", count: 350 },
        { id: "science", name: "Science", icon: FlaskConical, color: "text-success", count: 420 },
        { id: "history", name: "History", icon: Clock, color: "text-warning", count: 280 },
    ];

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="max-w-sm mx-auto">
                {/* Header with Stats */}
                <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background p-3 pb-5">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h1 className="text-lg font-bold">Welcome Back!</h1>
                            <p className="text-xs text-muted-foreground">Ready to play?</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="gap-1 py-1 px-2">
                                <Heart className="w-3 h-3 text-destructive fill-destructive" />
                                <span className="font-bold text-xs">5</span>
                            </Badge>
                            <Badge variant="secondary" className="gap-1 py-1 px-2">
                                <Coins className="w-3 h-3 text-warning fill-warning" />
                                <span className="font-bold text-xs">1,250</span>
                            </Badge>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        <StatCard
                            icon={Flame}
                            label="Streak"
                            value="7 days"
                            color="warning"
                            testId="stat-streak"
                            className="p-3"
                        />
                        <StatCard
                            icon={Target}
                            label="Accuracy"
                            value="85%"
                            color="success"
                            testId="stat-accuracy"
                            className="p-3"
                        />
                    </div>
                </div>

                <div className="px-3 space-y-4 pt-4">
                    {/* Daily Quiz Hero Card */}
                    <div data-testid="section-daily-quiz">
                        <h2 className="text-base font-bold mb-2">Today's Challenge</h2>
                        <QuizCard
                            title="Daily Quiz"
                            description="Test your knowledge with today's questions"
                            category="Mixed Topics"
                            type="daily"
                            reward={100}
                            timeLimit={300}
                            variant="hero"
                            onPlay={() => navigationHandler('/quiz/daily')}
                        />
                    </div>

                    {/* Contests Grid */}
                    <div data-testid="section-contests">
                        <h2 className="text-base font-bold mb-2">Contests</h2>
                        <div className="grid grid-cols-2 gap-2">
                            <NavLink to="/contest/duel/general">
                                <Card
                                    data-testid="card-1v1"
                                    className="p-3 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-xl mb-2">
                                        <Users className="w-5 h-5 text-accent" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">1 vs 1</h3>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        Challenge a player
                                    </p>
                                    <Badge className="bg-accent text-accent-foreground text-xs">
                                        Live Now
                                    </Badge>
                                </Card>
                            </NavLink>

                            <NavLink to="/contest/list">
                                <Card
                                    data-testid="card-weekly"
                                    className="p-3 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-xl mb-2">
                                        <Trophy className="w-5 h-5 text-warning" />
                                    </div>
                                    <h3 className="font-bold text-sm mb-1">Weekly</h3>
                                    <p className="text-xs text-muted-foreground mb-1">
                                        Join tournaments
                                    </p>
                                    <Badge className="bg-warning text-warning-foreground text-xs">
                                        3 Active
                                    </Badge>
                                </Card>
                            </NavLink>
                        </div>
                    </div>

                    {/* Categories Horizontal Scroll */}
                    <div data-testid="section-categories">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-base font-bold">Categories</h2>
                            <Button
                                variant="link"
                                data-testid="button-view-all-categories"
                                className="text-primary font-semibold p-0 h-auto text-xs"
                            >
                                View All
                            </Button>
                        </div>
                        <ScrollArea className="w-full">
                            <div className="flex gap-2 pb-2">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <Card
                                            key={category.id}
                                            className="flex-shrink-0 w-28 p-3 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
                                        >
                                            <div className={`flex items-center justify-center w-8 h-8 bg-${category.color}/10 rounded-xl mb-1`}>
                                                <Icon className={`w-4 h-4 ${category.color}`} />
                                            </div>
                                            <h3 className="font-semibold text-xs mb-1">
                                                {category.name}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {category.count} Qs
                                            </p>
                                        </Card>
                                    );
                                })}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* Quick Action: Practice Mode */}
                    <Card
                        data-testid="card-practice"
                        className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 hover-elevate active-elevate-2 cursor-pointer transition-all active:scale-95"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
                                <Zap className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-base mb-1">Practice Mode</h3>
                                <p className="text-xs text-muted-foreground">
                                    Unlimited quizzes to improve your skills
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Home;
