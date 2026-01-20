-- Create questions table for civil tech semantic search
CREATE TABLE IF NOT EXISTS public.questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid NULL,
  question_text text NOT NULL,
  answer text NULL,
  topic text NULL,
  subtopic text NULL,
  difficulty text NULL,
  embedding vector(768) NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Read: any signed-in user can search/view questions
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='questions' AND policyname='Questions are readable by authenticated users'
  ) THEN
    CREATE POLICY "Questions are readable by authenticated users"
      ON public.questions
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Write: only owner (created_by) can modify their own rows
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='questions' AND policyname='Users can insert their own questions'
  ) THEN
    CREATE POLICY "Users can insert their own questions"
      ON public.questions
      FOR INSERT
      TO authenticated
      WITH CHECK (created_by = auth.uid());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='questions' AND policyname='Users can update their own questions'
  ) THEN
    CREATE POLICY "Users can update their own questions"
      ON public.questions
      FOR UPDATE
      TO authenticated
      USING (created_by = auth.uid());
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public' AND tablename='questions' AND policyname='Users can delete their own questions'
  ) THEN
    CREATE POLICY "Users can delete their own questions"
      ON public.questions
      FOR DELETE
      TO authenticated
      USING (created_by = auth.uid());
  END IF;
END $$;

-- Index for vector search (cosine distance)
CREATE INDEX IF NOT EXISTS questions_embedding_ivfflat_idx
  ON public.questions
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- Keep updated_at in sync
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_questions_updated_at'
  ) THEN
    CREATE TRIGGER update_questions_updated_at
      BEFORE UPDATE ON public.questions
      FOR EACH ROW
      EXECUTE FUNCTION public.update_updated_at_column();
  END IF;
END $$;