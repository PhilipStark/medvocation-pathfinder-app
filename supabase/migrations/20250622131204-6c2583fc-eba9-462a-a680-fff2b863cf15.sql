
-- Verificar se a tabela test_results tem todas as colunas necessárias
-- Adicionar coluna para armazenar dados de download se não existir
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS pdf_generated_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS download_count INTEGER DEFAULT 0;

-- Criar tabela para planos de pagamento se não existir
CREATE TABLE IF NOT EXISTS payment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'BRL',
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Inserir planos básicos se a tabela estiver vazia
INSERT INTO payment_plans (name, description, price_cents, features) 
SELECT * FROM (VALUES 
  ('Relatório Básico', 'Análise vocacional completa com suas principais especialidades', 3990, '["Análise de 90 perguntas", "Top 5 especialidades", "Perfil de personalidade", "Recomendações básicas"]'::jsonb),
  ('Relatório Premium', 'Análise completa + mentoria e recursos extras', 7990, '["Tudo do Básico", "Análise detalhada de todas especialidades", "Plano de carreira personalizado", "Acesso a comunidade exclusiva", "1 sessão de mentoria"]'::jsonb)
) AS v(name, description, price_cents, features)
WHERE NOT EXISTS (SELECT 1 FROM payment_plans);

-- Adicionar RLS para payment_plans (leitura pública)
ALTER TABLE payment_plans ENABLE ROW LEVEL SECURITY;

-- Drop policy if exists and recreate
DROP POLICY IF EXISTS "Anyone can view active payment plans" ON payment_plans;
CREATE POLICY "Anyone can view active payment plans" 
ON payment_plans FOR SELECT 
USING (is_active = true);

-- Criar tabela para tracking de downloads
CREATE TABLE IF NOT EXISTS result_downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_result_id UUID REFERENCES test_results(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  file_type TEXT DEFAULT 'pdf'
);

-- RLS para downloads
ALTER TABLE result_downloads ENABLE ROW LEVEL SECURITY;

-- Drop policies if exist and recreate
DROP POLICY IF EXISTS "Users can view their own downloads" ON result_downloads;
CREATE POLICY "Users can view their own downloads" 
ON result_downloads FOR SELECT 
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can create their own downloads" ON result_downloads;
CREATE POLICY "Users can create their own downloads" 
ON result_downloads FOR INSERT 
WITH CHECK (user_id = auth.uid());
