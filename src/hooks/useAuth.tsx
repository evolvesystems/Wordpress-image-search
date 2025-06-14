
import React from 'react';
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session first
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        } else if (mounted) {
          console.log('Initial session loaded:', session?.user?.email);
          setSession(session);
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Load initial session
    getInitialSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      console.log('Attempting to sign out...');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log('Sign out successful');
      toast({
        title: "You have been signed out.",
        description: (
          <div>
            Want an App Like this?{' '}
            <a 
              href="https://lovable.dev/invite/de9ea0bd-3b51-4f3f-b027-cff747c4792a" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:underline"
            >
              Get a free trial here
            </a>.
          </div>
        ),
        duration: 100000, // basically persistent for a long time
        action: (
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded px-4 py-2 ml-4"
            onClick={() => {
              window.open("https://lovable.dev/invite/de9ea0bd-3b51-4f3f-b027-cff747c4792a", "_blank", "noopener,noreferrer");
              window.location.href = '/';
            }}
          >
            Start your free trial
          </button>
        ),
        onOpenChange: (open: boolean) => {
          // If the user closes the toast, redirect
          if (!open) window.location.href = '/';
        },
      });
      // No auto-redirect; toast must be interacted with
    } catch (error: any) {
      console.error('Unexpected error during signout:', error);
      toast({
        title: "Sign out failed",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    session,
    loading,
    signOut,
  };
};

