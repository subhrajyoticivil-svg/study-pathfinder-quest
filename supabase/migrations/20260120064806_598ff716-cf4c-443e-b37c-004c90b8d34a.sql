-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Create match_questions function for semantic search
CREATE OR REPLACE FUNCTION public.match_questions(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  question_text text,
  answer text,
  topic text,
  subtopic text,
  difficulty text,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    q.id,
    q.question_text,
    q.answer,
    q.topic,
    q.subtopic,
    q.difficulty,
    1 - (q.embedding <=> query_embedding) AS similarity
  FROM public.questions q
  WHERE 1 - (q.embedding <=> query_embedding) > match_threshold
  ORDER BY q.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;