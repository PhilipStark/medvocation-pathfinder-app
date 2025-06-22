
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lock, CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PaymentPlansSection from './PaymentPlansSection';
import { specialtyDetails } from '@/data/specialtyDetails';

interface ResultsTeaserProps {
  topSpecialty: string;
  topScore: number;
  sessionId: string;
}

const ResultsTeaser = ({ topSpecialty, topScore, sessionId }: ResultsTeaserProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPlans, setShowPlans] = useState(false);

  const specialtyDetail = specialtyDetails[topSpecialty];

  const handleUnlockReport = async () => {
    if (!selectedPlan) {
      setShowPlans(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      console.log('Creating checkout session for sessionId:', sessionId);

      // Create checkout session using the new Edge Function
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { test_result_id: sessionId }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        toast({
          title: "Erro",
          description: "Não foi possível iniciar o pagamento. Tente novamente.",
          variant: "destructive"
        });
        return;
      }

      console.log('Checkout session created, redirecting to:', data.url);
      
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
      <Card className="medical-card border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
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
          <div className="bg-white p-6 rounded-lg border-2 border-medical-blue shadow-lg">
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-3">
              #1 Especialidade
            </Badge>
            <h2 className="text-3xl font-bold text-medical-blue mb-2">
              {specialtyDetail?.name || topSpecialty}
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Compatibilidade: {Math.round(topScore)}%
            </p>
            {specialtyDetail && (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Faixa Salarial</p>
                  <p className="font-semibold">{specialtyDetail.salary_range}</p>
                </div>
                <div>
                  <p className="text-gray-500">Demanda</p>
                  <Badge variant="outline" className="text-xs">
                    {specialtyDetail.demand_level}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {!showPlans ? (
        // Simple unlock button
        <Card className="medical-card border-blue-200 bg-blue-50">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-blue-800">
              Desbloqueie seu Relatório Completo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="bg-white p-6 rounded-lg mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                O que você receberá:
              </h3>
              <ul className="space-y-3 text-left">
                {[
                  "Análise detalhada das suas top 5 especialidades",
                  "Perfil psicométrico completo",
                  "Informações de salário, demanda e formação", 
                  "Plano de carreira personalizado",
                  "Relatório em PDF para download",
                  "Acesso vitalício aos seus resultados"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-medical-blue">R$ 39,90</div>
              <p className="text-gray-600">Pagamento único</p>
            </div>
            
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
                "Desbloquear Relatório - R$ 39,90"
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Payment plans section
        <PaymentPlansSection 
          onSelectPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      )}

      {showPlans && selectedPlan && (
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-medical-green hover:bg-green-600 text-white px-8 py-4 text-lg"
            onClick={handleUnlockReport}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando Pagamento...
              </>
            ) : (
              "Finalizar Compra"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsTeaser;
