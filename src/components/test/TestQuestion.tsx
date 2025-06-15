
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { TestQuestion as TestQuestionType } from '@/types/test';

interface TestQuestionProps {
  question: TestQuestionType;
  response: number | undefined;
  onResponse: (value: number) => void;
}

const TestQuestion = ({ question, response, onResponse }: TestQuestionProps) => {
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
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
            <RadioGroupItem value={value.toString()} id={`option-${value}`} />
            <Label 
              htmlFor={`option-${value}`} 
              className="flex-1 cursor-pointer text-sm font-medium"
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
          💡 <strong>Dica:</strong> Use as teclas 1-5 para responder rapidamente ou as setas ← → para navegar
        </p>
      </div>
    </div>
  );
};

export default TestQuestion;
