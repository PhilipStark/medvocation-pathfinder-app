import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAIAnalysis = () => {
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const { toast } = useToast();

  const generateAnalysis = async (sessionId: string) => {
    setAnalysisLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-results', {
        body: { sessionId }
      });

      if (error || !data.success) {
        throw new Error(data?.error || 'Erro ao gerar análise');
      }

      setAnalysis(data.analysis);
      toast({
        title: "Análise de IA concluída!",
        description: "Sua análise personalizada foi gerada com sucesso.",
      });

      return data.analysis;
    } catch (error) {
      console.error('Error generating AI analysis:', error);
      toast({
        title: "Erro na análise",
        description: "Não foi possível gerar a análise de IA. Tente novamente.",
        variant: "destructive"
      });
      return null;
    } finally {
      setAnalysisLoading(false);
    }
  };

  return {
    generateAnalysis,
    analysisLoading,
    analysis,
    setAnalysis
  };
};