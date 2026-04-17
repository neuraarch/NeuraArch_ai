
CREATE TABLE public.learning_paths (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  level TEXT NOT NULL DEFAULT 'Beginner',
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  what_you_learn TEXT[] DEFAULT '{}',
  intro_video_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning paths are publicly readable"
ON public.learning_paths FOR SELECT USING (true);

CREATE POLICY "Admins can manage learning paths"
ON public.learning_paths FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_learning_paths_updated_at
BEFORE UPDATE ON public.learning_paths
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.learning_path_tutorials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  learning_path_id UUID NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0,
  duration TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(learning_path_id, article_id)
);

ALTER TABLE public.learning_path_tutorials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Learning path tutorials publicly readable"
ON public.learning_path_tutorials FOR SELECT USING (true);

CREATE POLICY "Admins can manage learning path tutorials"
ON public.learning_path_tutorials FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX idx_lpt_path_order ON public.learning_path_tutorials(learning_path_id, order_index);

INSERT INTO public.learning_paths (title, slug, description, level, tags, what_you_learn) VALUES
('AI Beginner Path', 'ai-beginner', 'Start with the foundations — embeddings, vector search, and your first RAG pipeline.', 'Beginner', ARRAY['RAG','Embeddings','Vector DB'], ARRAY['Understand embeddings and vector spaces','Build your first RAG pipeline','Use vector databases like Pinecone & Weaviate','Evaluate retrieval quality']),
('RAG Engineer Path', 'rag-engineer', 'Master retrieval-augmented generation, chunking strategies, and evaluation frameworks.', 'Intermediate', ARRAY['RAG','Chunking','Evaluation'], ARRAY['Advanced chunking strategies','Hybrid search (dense + sparse)','Re-ranking and query rewriting','Production RAG evaluation']),
('Agentic AI Path', 'agentic-ai', 'Build autonomous AI agents with tool use, planning, and multi-step reasoning.', 'Advanced', ARRAY['Agents','Tools','Planning'], ARRAY['Design agent architectures','Tool use and function calling','Multi-agent orchestration','Planning and reasoning loops']);
