
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface UserSettings {
  openai_api_key: string | null;
  wordpress_url: string | null;
}

export const useUserSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    if (!user) {
      setSettings(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both user_settings and wordpress_user_settings in parallel
      const [userSettingsResponse, wpSettingsResponse] = await Promise.all([
        supabase
          .from("user_settings")
          .select("openai_api_key")
          .eq("user_id", user.id)
          .maybeSingle(),
        supabase
          .from("wordpress_user_settings")
          .select("wordpress_url")
          .eq("user_id", user.id)
          .maybeSingle()
      ]);

      const combinedSettings: UserSettings = {
        openai_api_key: userSettingsResponse.data?.openai_api_key || null,
        wordpress_url: wpSettingsResponse.data?.wordpress_url || null,
      };

      setSettings(combinedSettings);
    } catch (err: any) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateApiKey = useCallback(async (apiKey: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          openai_api_key: apiKey,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (error) throw error;
      
      setSettings(prev => prev ? { ...prev, openai_api_key: apiKey } : { openai_api_key: apiKey, wordpress_url: null });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateWordPressUrl = useCallback(async (wordpress_url: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("wordpress_user_settings")
        .upsert({
          user_id: user.id,
          wordpress_url,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (error) throw error;
      
      setSettings(prev => prev ? { ...prev, wordpress_url } : { openai_api_key: null, wordpress_url });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user, loadSettings]);

  return { 
    settings, 
    loading, 
    error, 
    reload: loadSettings,
    updateApiKey,
    updateWordPressUrl
  };
};
