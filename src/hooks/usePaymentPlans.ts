
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PaymentPlan {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  currency: string;
  features: string[];
  is_active: boolean;
}

export const usePaymentPlans = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    try {
      // For now, use mock data since we don't have payment_plans table yet
      const mockPlans: PaymentPlan[] = [
        {
          id: 'basic',
          name: 'Análise Básica',
          description: 'Relatório básico com especialidades recomendadas',
          price_cents: 1999,
          currency: 'BRL',
          features: ['Top 3 especialidades', 'Perfil básico', 'PDF simples'],
          is_active: true
        },
        {
          id: 'premium',
          name: 'Análise Completa',
          description: 'Relatório detalhado com análise de IA',
          price_cents: 4999,
          currency: 'BRL',
          features: ['Análise completa', 'Recomendações de IA', 'PDF premium', 'Orientações de carreira'],
          is_active: true
        }
      ];

      setPlans(mockPlans);
    } catch (error) {
      console.error('Error fetching payment plans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    refetch: fetchPlans
  };
};
