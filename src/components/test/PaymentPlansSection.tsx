
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Zap } from 'lucide-react';
import { usePaymentPlans } from '@/hooks/usePaymentPlans';

interface PaymentPlansSectionProps {
  onSelectPlan: (planId: string) => void;
  selectedPlan?: string;
}

const PaymentPlansSection = ({ onSelectPlan, selectedPlan }: PaymentPlansSectionProps) => {
  const { plans, loading } = usePaymentPlans();

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-blue mx-auto"></div>
        <p className="text-gray-600 mt-2">Carregando planos...</p>
      </div>
    );
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Escolha seu Plano de Relatório
        </h2>
        <p className="text-gray-600">
          Desbloqueie insights detalhados sobre sua vocação médica
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => {
          const isPopular = index === 1;
          const isSelected = selectedPlan === plan.id;
          
          return (
            <Card 
              key={plan.id} 
              className={`relative transition-all duration-300 ${
                isSelected 
                  ? 'ring-2 ring-medical-blue shadow-lg' 
                  : 'hover:shadow-lg'
              } ${
                isPopular 
                  ? 'border-medical-gold bg-gradient-to-br from-yellow-50 to-orange-50' 
                  : 'medical-card'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-medical-gold text-white px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Mais Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  {isPopular ? (
                    <Zap className="h-6 w-6 text-medical-gold" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-medical-blue" />
                  )}
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <p className="text-sm text-gray-600">{plan.description}</p>
                <div className="text-3xl font-bold text-medical-blue mt-2">
                  {formatPrice(plan.price_cents)}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-medical-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onSelectPlan(plan.id)}
                  className={`w-full ${
                    isSelected
                      ? 'bg-medical-green hover:bg-green-600'
                      : isPopular
                      ? 'bg-medical-gold hover:bg-yellow-600'
                      : 'medical-button'
                  }`}
                >
                  {isSelected ? 'Plano Selecionado' : 'Escolher Plano'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentPlansSection;
