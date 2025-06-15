
import { useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface TestValidationProps {
  hasResponse: boolean;
  showValidation: boolean;
}

const TestValidation = ({ hasResponse, showValidation }: TestValidationProps) => {
  if (!showValidation || hasResponse) return null;

  return (
    <Alert variant="destructive" className="mt-4 animate-fade-in">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Por favor, selecione uma resposta antes de continuar.
      </AlertDescription>
    </Alert>
  );
};

export default TestValidation;
