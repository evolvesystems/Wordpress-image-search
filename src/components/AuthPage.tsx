
import React, { useState, useEffect } from 'react';
import { User, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const getURLParam = (name: string) => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};

const AuthPage = () => {
  const initialMode = getURLParam("signup") === "1" ? false : true;
  const [isLogin, setIsLogin] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update mode if user lands via `/auth?signup=1`
  useEffect(() => {
    if (getURLParam("signup") === "1") setIsLogin(false);
    else setIsLogin(true);
  }, []);

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
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "Signed in successfully.",
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) throw error;

        toast({
          title: "Account created!",
          description: "Check your email to confirm your account.",
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: isLogin ? "Sign in failed" : "Sign up failed",
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
        <div className="text-center mb-8">
          <User className="w-12 h-12 mx-auto mb-4 text-green-600" />
          <h1 className="text-2xl font-bold mb-2">
            {isLogin ? 'Sign in to WordPress + AI' : 'Create Your WordPress + AI Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Login to supercharge your WordPress with AI image search.' 
              : 'Sign up free and experience next-gen WordPress image management.'}
          </p>
        </div>

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
              autoComplete={isLogin ? "current-password" : "new-password"}
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
            ) : isLogin ? (
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
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {isLogin 
              ? "Don't have an account? Create one" 
              : "Already have an account? Sign in"
            }
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthPage;
