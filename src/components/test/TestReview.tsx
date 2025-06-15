
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { testModules } from '@/data/testModules';
import { TestResponses } from '@/types/test';

interface TestReviewProps {
  responses: TestResponses;
  onBack: () => void;
  onSubmit: () => void;
}

const TestReview = ({ responses, onBack, onSubmit }: TestReviewProps) => {
  const moduleKeys = Object.keys(testModules) as Array<keyof typeof testModules>;

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-medical-green" />
          Revisão das Respostas
        </CardTitle>
        <CardDescription>
          Revise suas respostas antes de finalizar o teste
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {moduleKeys.map(moduleKey => {
          const module = testModules[moduleKey];
          const IconComponent = module.icon;
          
          return (
            <div key={moduleKey} className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <IconComponent className="h-5 w-5 text-medical-blue" />
                {module.title}
              </h3>
              <div className="grid gap-3">
                {module.questions.map(question => (
                  <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm mb-2">{question.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">Resposta:</span>
                      <Badge variant={responses[question.id] ? "default" : "secondary"}>
                        {responses[question.id] ? 
                          `${responses[question.id]}/5` : 
                          "Não respondida"
                        }
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Teste
          </Button>
          <Button onClick={onSubmit} className="medical-button">
            Finalizar e Ver Resultados
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestReview;
