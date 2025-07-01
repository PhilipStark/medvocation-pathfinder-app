
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TestQuestion as TestQuestionType } from '@/types/test';

interface TestQuestionProps {
  question: TestQuestionType;
  response: number | undefined;
  onResponse: (value: number) => void;
  isTransitioning?: boolean;
}

const TestQuestion = ({ question, response, onResponse, isTransitioning = false }: TestQuestionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{question.text}</h2>
      <p className="text-sm text-gray-600">
        Escolha o nível que melhor representa sua opinião (1 = Discordo totalmente, 5 = Concordo totalmente)
      </p>
      
      <RadioGroup
        value={response?.toString() || ""}
        onValueChange={(value) => onResponse(parseInt(value))}
        className="space-y-4"
        disabled={isTransitioning}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <div 
            key={value} 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
              isTransitioning 
                ? 'opacity-60 cursor-not-allowed' 
                : 'hover:bg-gray-50 cursor-pointer'
            } ${response === value ? 'bg-blue-50 border border-blue-200' : ''}`}
          >
            <RadioGroupItem 
              value={value.toString()} 
              id={`option-${value}`}
              disabled={isTransitioning}
            />
            <Label 
              htmlFor={`option-${value}`} 
              className={`flex-1 text-sm font-medium ${
                isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {value === 1 && "Discordo totalmente"}
                  {value === 2 && "Discordo parcialmente"}
                  {value === 3 && "Neutro"}
                  {value === 4 && "Concordo parcialmente"}
                  {value === 5 && "Concordo totalmente"}
                </span>
                <Badge variant="outline">{value}</Badge>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-700">
          💡 <strong>Dica:</strong> Clique em uma resposta para avançar automaticamente, ou use as teclas 1-5 para responder rapidamente
        </p>
      </div>
    </div>
  );
};

export default TestQuestion;
