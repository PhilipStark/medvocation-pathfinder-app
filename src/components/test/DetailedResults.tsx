
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  Lightbulb,
  CheckCircle,
  Star
} from 'lucide-react';
import { TestResponses } from '@/types/test';
import { getTopSpecialties, getScoreInterpretation, getDetailedAnalysis } from '@/utils/testCalculations';

interface DetailedResultsProps {
  responses: TestResponses;
  scores: Record<string, number>;
}

const DetailedResults = ({ responses, scores }: DetailedResultsProps) => {
  const topSpecialties = getTopSpecialties(scores, 8);
  const analysis = getDetailedAnalysis(responses, topSpecialties);

  return (
    <div className="space-y-6">
      {/* Header com estatísticas gerais */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-medical-blue" />
            Resumo da Análise Vocacional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-blue">90</div>
              <div className="text-sm text-gray-600">Perguntas Respondidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-green">{topSpecialties[0]?.score}%</div>
              <div className="text-sm text-gray-600">Maior Compatibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-medical-gold">{topSpecialties.length}</div>
              <div className="text-sm text-gray-600">Especialidades Analisadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Especialidades com detalhes */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-medical-gold" />
            Suas Principais Especialidades
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topSpecialties.slice(0, 5).map((item, index) => {
            const interpretation = getScoreInterpretation(item.score);
            return (
              <div key={item.specialty.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-medical-blue text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.specialty.name}</h3>
                      <p className="text-sm text-gray-600">{item.specialty.category}</p>
                    </div>
                  </div>
                  <Badge className={`${interpretation.bg} ${interpretation.color} border-0`}>
                    {item.score}%
                  </Badge>
                </div>
                
                <Progress value={item.score} className="mb-2" />
                
                <div className={`p-3 rounded-md ${interpretation.bg}`}>
                  <p className={`text-sm font-medium ${interpretation.color}`}>
                    {interpretation.level}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {interpretation.description}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Insights de Personalidade */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-medical-blue" />
            Perfil de Personalidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.personalityInsights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-medical-green mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recomendações de Carreira */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-medical-blue" />
            Recomendações de Carreira
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.careerRecommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-medical-gold mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximos Passos */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-medical-blue" />
            Próximos Passos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-medical-blue text-white text-xs font-bold mt-0.5 flex-shrink-0">
                  {index + 1}
                </div>
                <p className="text-sm text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Completo */}
      <Card className="medical-card">
        <CardHeader>
          <CardTitle>Ranking Completo das Especialidades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topSpecialties.map((item, index) => (
              <div key={item.specialty.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{item.specialty.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.specialty.category}
                  </Badge>
                </div>
                <span className="font-semibold text-medical-blue">{item.score}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedResults;
