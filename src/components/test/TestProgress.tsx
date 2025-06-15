
import { Progress } from '@/components/ui/progress';
import { testModules } from '@/data/testModules';

interface TestProgressProps {
  answeredQuestions: number;
  estimatedTimeRemaining: number;
}

const TestProgress = ({ answeredQuestions, estimatedTimeRemaining }: TestProgressProps) => {
  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teste Vocacional</h1>
          <p className="text-gray-600">
            Questão {answeredQuestions + 1} de {totalQuestions}
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Tempo estimado restante</div>
          <div className="text-lg font-semibold text-medical-blue">
            {estimatedTimeRemaining} min
          </div>
        </div>
      </div>
      
      <Progress value={progress} className="h-3 mb-2" />
      <div className="flex justify-between text-sm text-gray-600">
        <span>{Math.round(progress)}% concluído</span>
        <span>{totalQuestions - answeredQuestions} questões restantes</span>
      </div>
    </div>
  );
};

export default TestProgress;
