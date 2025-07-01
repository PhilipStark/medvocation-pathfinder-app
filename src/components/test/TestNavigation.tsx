
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface TestNavigationProps {
  canGoBack: boolean;
  hasCurrentResponse: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSaveAndExit: () => void;
  showNextButton?: boolean;
}

const TestNavigation = ({
  canGoBack,
  hasCurrentResponse,
  isLastQuestion,
  onPrevious,
  onNext,
  onSaveAndExit,
  showNextButton = true
}: TestNavigationProps) => {
  return (
    <div className="flex justify-between pt-6">
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={!canGoBack}
          className="transition-all duration-200"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <Button variant="outline" onClick={onSaveAndExit}>
          <Save className="h-4 w-4 mr-2" />
          Salvar e Sair
        </Button>
      </div>

      {showNextButton && (
        <Button 
          onClick={onNext}
          disabled={!hasCurrentResponse}
          className="medical-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastQuestion ? "Revisar Respostas" : "Próxima"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
      
      {!showNextButton && (
        <div className="text-sm text-gray-500 flex items-center">
          Avançando automaticamente...
        </div>
      )}
    </div>
  );
};

export default TestNavigation;
