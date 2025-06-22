
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const usePDFDownload = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async (sessionId: string, testResults: any) => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para baixar o PDF.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Generate PDF using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-pdf', {
        body: { 
          sessionId,
          userId: user.id,
          testResults 
        }
      });

      if (error) {
        console.error('Error generating PDF:', error);
        toast({
          title: "Erro ao gerar PDF",
          description: "Não foi possível gerar o relatório PDF.",
          variant: "destructive"
        });
        return;
      }

      // Track download
      await supabase
        .from('result_downloads')
        .insert({
          test_result_id: data.resultId,
          user_id: user.id,
          file_type: 'pdf'
        });

      // Update download count
      await supabase
        .from('test_results')
        .update({ 
          download_count: data.downloadCount + 1,
          pdf_generated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      // Create download link
      const blob = new Blob([new Uint8Array(data.pdfData)], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio-vocacional-${sessionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "PDF baixado com sucesso!",
        description: "Seu relatório foi salvo em Downloads.",
      });

    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast({
        title: "Erro no download",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    downloadPDF,
    isGenerating
  };
};
