import React, { useState, useEffect } from 'react';
import { User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from "react-router-dom";

function getModeParam(): "login" | "signup" {
  if (typeof window === "undefined") return "login";
  const params = new URLSearchParams(window.location.search);
  return params.get("mode") === "signup" ? "signup" : "login";
}

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">(getModeParam());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signUpComplete, setSignUpComplete] = useState(false);
  const navigate = useNavigate();

  // Keep mode in sync with URL
  useEffect(() => {
    const desiredMode = getModeParam();
    if (mode !== desiredMode) setMode(desiredMode);
    // eslint-disable-next-line
  }, [window.location.search]);

  // Helper to update mode and push URL params
  const updateMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    const url = new URL(window.location.href);
    url.searchParams.set("mode", newMode);
    window.history.replaceState({}, '', url.toString());
    setSignUpComplete(false);
    setEmail('');
    setPassword('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "Signed in successfully.",
        });
        // Redirect to admin dashboard after login
        setTimeout(() => navigate('/admin'), 200);
      } else {
        // Sign up without forcing email confirmation
        const { error } = await supabase.auth.signUp({
          email,
          password
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "You can now sign in with your credentials.",
        });
        
        // Switch to login mode after successful signup
        updateMode("login");
      }
    } catch (error: any) {
      toast({
        title: mode === "login" ? "Sign in failed" : "Sign up failed",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-600 to-emerald-700 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-7">
          <User className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-2">
            {mode === "login"
              ? 'Sign in to WordPress + AI'
              : 'Create Your WordPress + AI Account'}
          </h1>
          <p className="text-gray-600 mb-1">
            {mode === "login"
              ? 'Access fast, smart AI for WordPress media search.'
              : 'Sign up free to experience next-gen WordPress image management.'}
          </p>
        </div>
        {mode === "signup" && signUpComplete ? (
          <div className="text-center">
            <p className="mb-6 text-green-800 font-semibold">
              🎉 Account created!<br />
              Please check your email and click the confirmation link.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 mt-2" onClick={() => updateMode("login")}>
              <LogIn className="w-4 h-4 mr-2" />
              Go to Login
            </Button>
          </div>
        ) : (
        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <Input
              type="email"
              autoComplete="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isLoading}
          >
            {isLoading ? (
              "Loading..."
            ) : mode === "login" ? (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>
        )}
        <div className="mt-7 text-center">
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => updateMode("signup")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Don't have an account? Create one
            </button>
          ) : (
            <button
              type="button"
              onClick={() => updateMode("login")}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Already have an account? Sign in
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
