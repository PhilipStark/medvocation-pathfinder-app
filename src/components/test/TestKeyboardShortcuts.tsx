
import { Card, CardContent } from '@/components/ui/card';
import { Keyboard } from 'lucide-react';

const TestKeyboardShortcuts = () => {
  return (
    <Card className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
      <CardContent className="p-3">
        <div className="flex items-center gap-2">
          <Keyboard className="h-4 w-4 text-blue-600" />
          <div className="text-xs text-blue-700">
            <strong>Atalhos:</strong> 
            <span className="ml-2">1-5 para responder</span>
            <span className="ml-2">← → para navegar</span>
            <span className="ml-2">Esc para salvar e sair</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestKeyboardShortcuts;
