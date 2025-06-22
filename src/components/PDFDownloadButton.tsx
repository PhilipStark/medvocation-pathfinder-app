
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFReport from './PDFReport';
import { TestResponses } from '@/types/test';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface PDFDownloadButtonProps {
  responses: TestResponses;
  scores: Record<string, number>;
  sessionId: string;
}

const PDFDownloadButton: React.FC<PDFDownloadButtonProps> = ({
  responses,
  scores,
  sessionId
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const doc = (
        <PDFReport
          responses={responses}
          scores={scores}
          userName={user?.user_metadata?.name || 'Usuário'}
          testDate={new Date().toLocaleDateString('pt-BR')}
        />
      );

      const blob = await pdf(doc).toBlob();
      saveAs(blob, `relatorio-vocacional-${sessionId}.pdf`);

      toast({
        title: "PDF baixado com sucesso!",
        description: "Seu relatório foi salvo na pasta de Downloads.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o relatório. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      className="bg-medical-blue hover:bg-blue-700 text-white flex items-center gap-2"
    >
      {isGenerating ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      ) : (
        <Download className="h-4 w-4" />
      )}
      {isGenerating ? 'Gerando PDF...' : 'Download PDF'}
    </Button>
  );
};

export default PDFDownloadButton;
