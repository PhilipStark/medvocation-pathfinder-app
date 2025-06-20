
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lock, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ResultsTeaserProps {
  topSpecialty: string;
  topScore: number;
  sessionId: string;
}

const ResultsTeaser = ({ topSpecialty, topScore, sessionId }: ResultsTeaserProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const premiumFeatures = [
    "Top 5 Specialty Analysis with percentages",
    "Detailed Psychometric Profile", 
    "Lifestyle Compatibility Analysis",
    "The 'Pros and Cons' of each top specialty",
    "Personalized Career Roadmap timeline",
    "Professional PDF Report for Download"
  ];

  const handleUnlockReport = async () => {
    setIsProcessing(true);
    
    try {
      // Create payment session
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { sessionId }
      });

      if (error) {
        console.error('Error creating payment session:', error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o pagamento. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      // Store checkout session ID for verification
      localStorage.setItem(`checkout_session_${sessionId}`, data.checkoutSessionId);
      
      // Redirect to Stripe Checkout
      window.location.href = data.url;
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
              onClick={handleUnlockReport}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                "Desbloquear Relatório Completo por R$ 39,90"
              )}
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
