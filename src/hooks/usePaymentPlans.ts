
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
      const { data, error } = await supabase
        .from('payment_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_cents', { ascending: true });

      if (error) {
        console.error('Error fetching payment plans:', error);
        toast({
          title: "Erro ao carregar planos",
          description: "Não foi possível carregar os planos de pagamento.",
          variant: "destructive"
        });
        return;
      }

      // Transform the data to match our interface
      const transformedPlans: PaymentPlan[] = (data || []).map(plan => ({
        id: plan.id,
        name: plan.name,
        description: plan.description || '',
        price_cents: plan.price_cents,
        currency: plan.currency || 'BRL',
        features: Array.isArray(plan.features) ? plan.features.filter((f): f is string => typeof f === 'string') : [],
        is_active: plan.is_active || false
      }));

      setPlans(transformedPlans);
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
