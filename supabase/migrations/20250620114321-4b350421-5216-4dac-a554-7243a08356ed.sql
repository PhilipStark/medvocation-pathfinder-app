
-- Add is_unlocked column to test_results table
ALTER TABLE public.test_results 
ADD COLUMN is_unlocked BOOLEAN NOT NULL DEFAULT false;

-- Add a comment to document the purpose of this column
COMMENT ON COLUMN public.test_results.is_unlocked IS 'Indicates whether the user has paid to unlock the full test results';
