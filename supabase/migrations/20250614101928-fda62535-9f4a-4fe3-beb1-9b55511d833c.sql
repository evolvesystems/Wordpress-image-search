
-- 1. Create a table to store each user's preferred WordPress URL.
CREATE TABLE public.wordpress_user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  wordpress_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Add a unique constraint so each user has only one setting.
ALTER TABLE public.wordpress_user_settings
ADD CONSTRAINT unique_user UNIQUE (user_id);

-- 3. Enable Row Level Security.
ALTER TABLE public.wordpress_user_settings ENABLE ROW LEVEL SECURITY;

-- 4. Allow users to select, insert, update, and delete only their own row.
CREATE POLICY "Users can select their wordpress settings"
ON public.wordpress_user_settings
FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can insert their wordpress settings"
ON public.wordpress_user_settings
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their wordpress settings"
ON public.wordpress_user_settings
FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Users can delete their wordpress settings"
ON public.wordpress_user_settings
FOR DELETE
USING (user_id = auth.uid());
