import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (email) {
      // here you can call your API later
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-sm mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/login")}
            data-testid="button-back"
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">Forgot Password</h1>
        </div>

        <Card className="p-6 mb-6">
          <p className="text-sm text-muted-foreground mb-6">
            Enter your email address and we&apos;ll send you instructions to reset your password.
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
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

            <Button
              type="submit"
              data-testid="button-submit"
              className="w-full h-12 rounded-full font-bold text-base"
            >
              Send Reset Link
            </Button>
          </form>
        </Card>

        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate("/auth/login")}
            data-testid="button-back-to-login"
            className="text-primary font-semibold"
          >
            Back to Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
