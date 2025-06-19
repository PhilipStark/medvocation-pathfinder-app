
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface ResultsTeaserProps {
  topSpecialty: string;
  topScore: number;
  sessionId: string;
}

const ResultsTeaser = ({ topSpecialty, topScore, sessionId }: ResultsTeaserProps) => {
  const navigate = useNavigate();

  const premiumFeatures = [
    "Top 5 Specialty Analysis with percentages",
    "Detailed Psychometric Profile", 
    "Lifestyle Compatibility Analysis",
    "The 'Pros and Cons' of each top specialty",
    "Personalized Career Roadmap timeline",
    "Professional PDF Report for Download"
  ];

  return (
    <div className="space-y-6">
      {/* Congratulations Section */}
      <Card className="medical-card border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-800">
            Parabéns! Seu relatório vocacional personalizado está pronto.
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 mb-6">
            Com base no seu perfil, sua maior compatibilidade é com:
          </p>
          <div className="bg-white p-6 rounded-lg border-2 border-medical-blue">
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-2">
              #1 Especialidade
            </Badge>
            <h2 className="text-3xl font-bold text-medical-blue mb-2">
              {topSpecialty}
            </h2>
            <p className="text-xl text-gray-600">
              Compatibilidade: {Math.round(topScore)}%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Paywall Section */}
      <Card className="medical-card border-blue-200 bg-blue-50">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-xl text-blue-800">
            Desbloqueie seu Relatório Completo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
              onClick={() => navigate('/pricing')}
            >
              Desbloquear Relatório Completo por R$ 39,90
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              O que você receberá:
            </h3>
            <ul className="space-y-3">
              {premiumFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsTeaser;
