import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { getTopSpecialties, getDetailedAnalysis } from '@/utils/testCalculations';
import { specialtyDetails } from '@/data/specialtyDetails';
import SpecialtyCard from './SpecialtyCard';
import PDFDownloadButton from '../PDFDownloadButton';

interface DetailedResultsProps {
  responses: TestResponses;
  scores: Record<string, number>;
  sessionId: string;
}

const DetailedResults = ({ responses, scores, sessionId }: DetailedResultsProps) => {
  const topSpecialties = getTopSpecialties(scores, 8);
  const analysis = getDetailedAnalysis(responses, topSpecialties);

  return (
    <div className="space-y-6">
      {/* Header com estatísticas gerais */}
      <Card className="medical-card bg-gradient-to-r from-medical-blue to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="h-6 w-6" />
            Resumo da Análise Vocacional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">90</div>
              <div className="text-sm opacity-90">Perguntas Respondidas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{topSpecialties[0]?.score}%</div>
              <div className="text-sm opacity-90">Maior Compatibilidade</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{topSpecialties.length}</div>
              <div className="text-sm opacity-90">Especialidades Analisadas</div>
            </div>
            <div className="text-center">
              <PDFDownloadButton 
                responses={responses}
                scores={scores}
                sessionId={sessionId}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Especialidades com detalhes visuais */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Star className="h-6 w-6 text-medical-gold" />
          Suas Principais Especialidades
        </h2>
        
        {topSpecialties.slice(0, 5).map((item, index) => {
          const specialtyDetail = specialtyDetails[item.specialty.id];
          if (!specialtyDetail) return null;
          
          return (
            <SpecialtyCard
              key={item.specialty.id}
              specialty={specialtyDetail}
              score={item.score}
              rank={index + 1}
            />
          );
        })}
      </div>

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
              <div key={item.specialty.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-8">#{index + 1}</span>
                  <div>
                    <span className="font-medium">{item.specialty.name}</span>
                    <Badge variant="outline" className="text-xs ml-2">
                      {item.specialty.category}
                    </Badge>
                  </div>
                </div>
                <span className="font-semibold text-medical-blue text-lg">{item.score}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedResults;
