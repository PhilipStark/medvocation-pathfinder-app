
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: string;
  name?: string;
  university?: string;
  semester?: string;
  created_at?: string;
  updated_at?: string;
}

interface TestHistoryItem {
  id: string;
  completed_at: string;
  specialty_scores: Record<string, number>;
  topSpecialty: string;
  topScore: number;
}

export const useProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [testHistory, setTestHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchTestHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          id,
          created_at,
          specialty_scores,
          test_sessions!inner(completed_at)
        `)
        .eq('user_id', user.id)
        .not('test_sessions.completed_at', 'is', null)
        .order('test_sessions.completed_at', { ascending: false });

      if (error) {
        console.error('Error fetching test history:', error);
        return;
      }

      const formattedHistory: TestHistoryItem[] = (data || []).map((result: any) => {
        const scores = result.specialty_scores as Record<string, number>;
        const topSpecialtyEntry = Object.entries(scores).reduce((max, [specialty, score]) => 
          score > max[1] ? [specialty, score] : max
        );

        return {
          id: result.id,
          completed_at: result.test_sessions.completed_at,
          specialty_scores: scores,
          topSpecialty: topSpecialtyEntry[0],
          topScore: topSpecialtyEntry[1]
        };
      });

      setTestHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching test history:', error);
    }
  };

  const updateProfile = async (updatedData: Partial<UserProfile>) => {
    if (!user) return false;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...updatedData,
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating profile:', error);
        toast({
          title: "Erro ao atualizar",
          description: "Não foi possível salvar as alterações.",
          variant: "destructive"
        });
        return false;
      }

      setProfile(prev => prev ? { ...prev, ...updatedData } : null);
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso."
      });
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        await Promise.all([fetchProfile(), fetchTestHistory()]);
        setLoading(false);
      };
      loadData();
    }
  }, [user]);

  return {
    profile,
    testHistory,
    loading,
    updating,
    updateProfile,
    refetch: () => {
      fetchProfile();
      fetchTestHistory();
    }
  };
};
