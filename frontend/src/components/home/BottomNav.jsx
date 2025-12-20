import { Home, Trophy, Award, Gift, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/contest/list", icon: Trophy, label: "Contest" },
  { path: "/leaderboard", icon: Award, label: "Ranks" },
  { path: "/rewards", icon: Gift, label: "Rewards" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = ()=> {
  const location = useLocation();

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 rounded-t-3xl shadow-lg pb-safe" 
      aria-label="Main navigation"
    >
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-${item.label.toLowerCase()}`}
                aria-label={`Navigate to ${item.label}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-xl transition-all hover-elevate active-elevate-2 relative ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "fill-primary" : ""}`} aria-hidden="true" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;