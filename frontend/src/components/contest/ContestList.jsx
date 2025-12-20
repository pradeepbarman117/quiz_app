// import { Button } from "@/components/ui/button";
// import RoomCard from "./RoomCard";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import BottomNav from "../home/BottomNav";

// const ContestList = () => {
//     const navigate = useNavigate();

//     const activeRooms = [
//         {
//             id: "1",
//             name: "UPSC Champions",
//             category: "UPSC",
//             prizePool: 5000,
//             currentPlayers: 42,
//             maxPlayers: 50,
//             status: "open",
//             startTime: new Date(Date.now() + 600000),
//         },
//         {
//             id: "2",
//             name: "Science Masters",
//             category: "Science",
//             prizePool: 3000,
//             currentPlayers: 50,
//             maxPlayers: 50,
//             status: "full",
//             startTime: new Date(Date.now() + 300000),
//         },
//         {
//             id: "3",
//             name: "History Quiz",
//             category: "History",
//             prizePool: 2000,
//             currentPlayers: 28,
//             maxPlayers: 40,
//             status: "open",
//             startTime: new Date(Date.now() + 900000),
//         },
//     ];

//     const upcomingRooms = [
//         {
//             id: "4",
//             name: "Weekend Mega Contest",
//             category: "Mixed",
//             prizePool: 10000,
//             currentPlayers: 0,
//             maxPlayers: 100,
//             status: "open",
//             startTime: new Date(Date.now() + 7200000),
//         },
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
//             <div className="max-w-sm mx-auto">
//                 {/* Header */}
//                 <div className="p-4 bg-card rounded-b-lg shadow-sm mb-6">
//                     <div className="flex items-center gap-3 mb-4">
//                         <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => navigate("/home")}
//                             data-testid="button-back"
//                             className="rounded-full"
//                         >
//                             <ArrowLeft className="w-5 h-5" />
//                         </Button>
//                         <h1 className="text-xl font-bold text-foreground">Weekly Contests</h1>
//                     </div>

//                     {/* Tabs */}
//                     <Tabs defaultValue="active" className="w-full">
//                         <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted rounded-lg p-1">
//                             <TabsTrigger value="active" data-testid="tab-active" className="rounded-md">
//                                 Active Now
//                             </TabsTrigger>
//                             <TabsTrigger value="upcoming" data-testid="tab-upcoming" className="rounded-md">
//                                 Upcoming
//                             </TabsTrigger>
//                         </TabsList>

//                         <TabsContent value="active" className="space-y-3">
//                             {activeRooms.map((room) => (
//                                 <RoomCard
//                                     key={room.id}
//                                     {...room}
//                                     onClick={() => navigate(`/contest/room/${room.id}`)}
//                                     testId={`room-${room.id}`}
//                                 />
//                             ))}
//                         </TabsContent>

//                         <TabsContent value="upcoming" className="space-y-3">
//                             {upcomingRooms.map((room) => (
//                                 <RoomCard
//                                     key={room.id}
//                                     {...room}
//                                     onClick={() => navigate(`/contest/room/${room.id}`)}
//                                     testId={`room-${room.id}`}
//                                 />
//                             ))}
//                         </TabsContent>
//                     </Tabs>
//                 </div>
//             </div>

//             <BottomNav />
//         </div>
//     );
// }


// export default ContestList



import { Button } from "@/components/ui/button";
import RoomCard from "./RoomCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../home/BottomNav";

export default function ContestList() {
    const navigate = useNavigate();

    // Mock data for 1vs1 contests
    const oneVsOneRooms = [
        {
            id: "1v1-1",
            name: "Quick Challenge",
            category: "General",
            contestType: "1vs1",
            prizePool: 200,
            currentPlayers: 1,
            maxPlayers: 2,
            status: "open",
            startTime: new Date(Date.now() + 60000),
            redirect: "/quiz/contest/duel/upsc",
        },
        {
            id: "1v1-2",
            name: "Science Duel",
            category: "Science",
            contestType: "1vs1",
            prizePool: 300,
            currentPlayers: 1,
            maxPlayers: 2,
            status: "open",
            startTime: new Date(Date.now() + 120000),
            redirect: "/quiz/contest/duel/science",
        },
    ];

    // Mock data for Weekly contests
    const weeklyRooms = [
        {
            id: "weekly-1",
            name: "UPSC Champions",
            category: "UPSC",
            contestType: "weekly",
            prizePool: 5000,
            currentPlayers: 42,
            maxPlayers: 50,
            status: "open",
            startTime: new Date(Date.now() + 600000),
            redirect: "/quiz/contest/multiplayer/sceince",
        },
        {
            id: "weekly-2",
            name: "Science Masters",
            category: "Science",
            contestType: "weekly",
            prizePool: 3000,
            currentPlayers: 50,
            maxPlayers: 50,
            status: "full",
            startTime: new Date(Date.now() + 300000),
            redirect: "/quiz/contest/multiplayer/sceince",
        },
        {
            id: "weekly-3",
            name: "History Quiz",
            category: "History",
            contestType: "weekly",
            prizePool: 2000,
            currentPlayers: 28,
            maxPlayers: 40,
            status: "open",
            startTime: new Date(Date.now() + 900000),
            redirect: "/quiz/contest/multiplayer/sceince",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
            <div className="max-w-sm mx-auto">
                {/* Header */}
                <div className="p-4 bg-card rounded-b-lg shadow-sm mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate("/home")}
                            data-testid="button-back"
                            className="rounded-full"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <h1 className="text-xl font-bold text-foreground">Contests</h1>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="1vs1" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted rounded-lg p-1">
                            <TabsTrigger value="1vs1" data-testid="tab-1vs1" className="rounded-md">
                                1vs1
                            </TabsTrigger>
                            <TabsTrigger value="weekly" data-testid="tab-weekly" className="rounded-md">
                                Weekly
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="1vs1" className="space-y-3">
                            {oneVsOneRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    {...room}
                                    onClick={() => navigate(room.redirect)}
                                />
                            ))}
                        </TabsContent>

                        <TabsContent value="weekly" className="space-y-3">
                            {weeklyRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    {...room}
                                    onClick={() => navigate(`/contest/room/${room.id}`)}
                                />
                            ))}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
