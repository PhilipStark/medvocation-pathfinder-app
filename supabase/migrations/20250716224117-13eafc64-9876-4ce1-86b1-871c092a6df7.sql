-- Add missing columns to test_results table
ALTER TABLE public.test_results 
ADD COLUMN IF NOT EXISTS ai_analysis TEXT,
ADD COLUMN IF NOT EXISTS analysis_generated_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS specialty_scores JSONB;

-- Update the trigger for test_results
DROP TRIGGER IF EXISTS update_test_results_updated_at ON public.test_results;
CREATE TRIGGER update_test_results_updated_at
  BEFORE UPDATE ON public.test_results
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();