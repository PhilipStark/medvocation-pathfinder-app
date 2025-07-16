
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from "@/components/ui/button";
import { BookOpenCheck, Share2 } from "lucide-react";
import Navbar from '@/components/Navbar';
import ResultsTeaser from '@/components/test/ResultsTeaser';
import DetailedResults from '@/components/test/DetailedResults';
import { supabase } from '@/integrations/supabase/client';
import { TestResults } from '@/types/test';

const Results = () => {
  const { sessionId } = useParams<{ sessionId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<TestResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const loadResults = async () => {
      if (sessionId) {
        // Check if returning from payment
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');
        
        if (paymentStatus === 'success') {
          // Verify payment and unlock results
          const checkoutSessionId = localStorage.getItem(`checkout_session_${sessionId}`);
          if (checkoutSessionId) {
            try {
              const { data, error } = await supabase.functions.invoke('verify-payment', {
                body: { checkoutSessionId, sessionId }
              });
              
              if (error || !data.success) {
                toast({
                  title: "Erro na verificação",
                  description: "Não foi possível verificar o pagamento. Entre em contato conosco.",
                  variant: "destructive"
                });
              } else {
                toast({
                  title: "Pagamento confirmado!",
                  description: "Seu relatório foi desbloqueado com sucesso.",
                });
                setIsUnlocked(true);
                // Clean up
                localStorage.removeItem(`checkout_session_${sessionId}`);
                // Remove payment params from URL
                window.history.replaceState({}, '', `/results/${sessionId}`);
              }
            } catch (error) {
              console.error('Error verifying payment:', error);
            }
          }
        } else if (paymentStatus === 'cancelled') {
          toast({
            title: "Pagamento cancelado",
            description: "Você pode tentar novamente quando quiser.",
          });
          // Remove payment params from URL
          window.history.replaceState({}, '', `/results/${sessionId}`);
        }

        // Try to load from Supabase first, then localStorage
        try {
          const { data } = await supabase
            .from('test_results')
            .select(`
              *,
              test_sessions!inner(*)
            `)
            .eq('session_id', sessionId)
            .single();

          if (data) {
            const testResults: TestResults = {
              sessionId: data.session_id,
              userId: data.user_id,
              responses: (data.test_sessions.responses as any) || {},
              scores: data.scores as Record<string, number>,
              completedAt: data.created_at,
              testDuration: 0
            };
            setResults(testResults);
            // Use the real is_unlocked value from database
            setIsUnlocked(data.is_unlocked || false);
            setLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error loading results from Supabase:', error);
        }

        // Fallback to localStorage
        const localResults = localStorage.getItem(`test_results_${sessionId}`);
        if (localResults) {
          setResults(JSON.parse(localResults));
          // For localStorage results, default to locked (false)
          setIsUnlocked(false);
        }
      } else {
        // Load most recent result for current user
        const savedResults = localStorage.getItem('test_results_latest');
        if (savedResults) {
          setResults(JSON.parse(savedResults));
          // For localStorage results, default to locked (false)
          setIsUnlocked(false);
        }
      }
      setLoading(false);
    };

    loadResults();
  }, [sessionId, toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Meu Teste Vocacional Médico',
        text: 'Confira os resultados do meu teste vocacional!',
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link foi copiado para a área de transferência.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando resultados...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpenCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Nenhum resultado encontrado</h2>
            <p className="text-gray-600">Você ainda não completou nenhum teste ou o ID é inválido.</p>
            <Button onClick={() => navigate('/test')} className="medical-button mt-4">
              Fazer Teste Vocacional
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sortedScores = Object.entries(results.scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topSpecialty = sortedScores[0][0];
  const topScore = sortedScores[0][1];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!isUnlocked ? (
          // Show teaser page when results are not unlocked
          <ResultsTeaser 
            topSpecialty={topSpecialty}
            topScore={topScore}
            sessionId={sessionId || ''}
          />
        ) : (
          // Show full detailed results when unlocked
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Seu Relatório Vocacional Completo
                  </h1>
                  <p className="text-gray-600">
                    Análise detalhada baseada em 90 perguntas sobre personalidade, interesses, estilo de vida e valores
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            <DetailedResults 
              responses={results.responses}
              scores={results.scores}
              sessionId={sessionId || ''}
            />

            <div className="mt-8 text-center">
              <Button
                onClick={() => navigate('/specialties')}
                className="medical-button"
              >
                Explorar Todas as Especialidades
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
