
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle } from 'lucide-react';

interface TestProgressProps {
  answeredQuestions: number;
  estimatedTimeRemaining: number;
}

const TestProgress = ({ answeredQuestions, estimatedTimeRemaining }: TestProgressProps) => {
  const totalQuestions = 90;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">Progresso do Teste</h3>
        <span className="text-sm text-gray-500">
          {answeredQuestions} de {totalQuestions} perguntas
        </span>
      </div>
      
      <Progress value={progressPercentage} className="mb-3" />
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          <span>{Math.round(progressPercentage)}% concluído</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>~{estimatedTimeRemaining} min restantes</span>
        </div>
      </div>
    </div>
  );
};

export default TestProgress;
