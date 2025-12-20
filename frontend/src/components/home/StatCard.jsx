// import { Card } from "@/components/ui/card";

// const StatCard = ({ icon: Icon, label, value, color = "primary", testId })=> {
//   const colorClasses = {
//     primary: "text-primary bg-primary/10",
//     success: "text-success bg-success/10",
//     warning: "text-warning bg-warning/10",
//     accent: "text-accent bg-accent/10",
//   };

//   return (
//     <Card className="p-4 hover-elevate" >
//       <div className="flex items-center gap-3">
//         <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
//           <Icon className="w-5 h-5" />
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
//             {label}
//           </p>
//           <p className="text-xl font-bold mt-0.5" >
//             {value}
//           </p>
//         </div>
//       </div>
//     </Card>
//   );
// }

// export default StatCard;



import { Card } from "@/components/ui/card";

const StatCard = ({ icon: Icon, label, value, color = "primary", testId }) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10",
    accent: "text-accent bg-accent/10",
  };

  return (
    <Card className="p-3 hover-elevate" data-testid={testId}>
      <div className="flex items-center gap-2">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-base font-bold mt-0.5" data-testid={`${testId}-value`}>
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
