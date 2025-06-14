
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface WordPressUserSettings {
  id: string;
  user_id: string;
  wordpress_url: string;
  created_at: string;
  updated_at: string;
}

export const useWordPressUserSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<WordPressUserSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("wordpress_user_settings")
      .select("*")
      .eq("user_id", user.id)
      .single();
    if (error && error.code !== "PGRST116") { // 'No rows found'
      setError(error.message);
    }
    setSettings(data || null);
    setLoading(false);
  }, [user]);

  const saveSettings = useCallback(
    async (wordpress_url: string) => {
      if (!user) return;
      setLoading(true);
      setError(null);
      let { data, error } = await supabase
        .from("wordpress_user_settings")
        .upsert({
          user_id: user.id,
          wordpress_url,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" })
        .select()
        .single();

      if (error) setError(error.message);
      setSettings(data || null);
      setLoading(false);
    },
    [user]
  );

  useEffect(() => {
    if (user) loadSettings();
  }, [user, loadSettings]);

  return { settings, setSettings: saveSettings, loading, error, reload: loadSettings };
};
