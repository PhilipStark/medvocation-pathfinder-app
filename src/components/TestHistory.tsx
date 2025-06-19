
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Brain, Calendar, Trophy } from 'lucide-react';

interface TestHistoryItem {
  id: string;
  completed_at: string;
  specialty_scores: Record<string, number>;
  topSpecialty: string;
  topScore: number;
}

interface TestHistoryProps {
  tests: TestHistoryItem[];
  loading: boolean;
}

const TestHistory = ({ tests, loading }: TestHistoryProps) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Histórico de Testes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (tests.length === 0) {
    return (
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Histórico de Testes</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum teste concluído ainda
          </h3>
          <p className="text-gray-600 mb-4">
            Complete seu primeiro teste vocacional para ver os resultados aqui.
          </p>
          <Button onClick={() => navigate('/test')} className="medical-button">
            Fazer Teste Vocacional
          </Button>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Histórico de Testes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tests.map((test) => (
          <div 
            key={test.id} 
            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            onClick={() => navigate(`/results/${test.id}`)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-medical-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Teste Vocacional Completo
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {formatDate(test.completed_at)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-medical-blue">
                  {Math.round(test.topScore)}%
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-gray-600">Melhor compatibilidade: </span>
                <Badge variant="secondary" className="ml-1">
                  {test.topSpecialty}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/results/${test.id}`);
                }}
              >
                Ver Detalhes
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TestHistory;
