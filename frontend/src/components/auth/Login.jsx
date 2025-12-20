import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            data-testid="button-back"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Log In</h1>
        </div>

        {/* Login Form */}
        <Card className="p-6 mb-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                  className="pl-10 h-12 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="text-right">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate("/auth/forgot-password")}
                data-testid="button-forgot-password"
                className="text-sm text-primary font-semibold p-0 h-auto"
              >
                Forgot Password?
              </Button>
            </div>

            <Button
              type="submit"
              data-testid="button-submit"
              className="w-full h-12 rounded-full font-bold text-base"
            >
              Log In
            </Button>
          </form>
        </Card>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?
            <Button
              variant="link"
              onClick={() => navigate("/auth/register")}
              data-testid="button-signup-link"
              className="text-primary font-semibold p-0 h-auto"
            >
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
