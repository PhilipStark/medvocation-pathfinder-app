
import { Card, CardContent } from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';

const TestHelpSection = () => {
  return (
    <Card className="medical-card mt-6 bg-gradient-to-r from-blue-50 to-green-50 animate-fade-in">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <LifeBuoy className="h-5 w-5 text-medical-blue" />
          <div>
            <h4 className="font-medium text-gray-900">Precisa de ajuda?</h4>
            <p className="text-sm text-gray-600">
              Responda com honestidade. Não existem respostas certas ou erradas!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestHelpSection;
