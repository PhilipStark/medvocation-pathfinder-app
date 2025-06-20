import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useToast } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpenCheck } from "lucide-react";
import Navbar from '@/components/Navbar';
import ResultsTeaser from '@/components/test/ResultsTeaser';
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
            .eq('id', sessionId)
            .single();

          if (data) {
            const testResults: TestResults = {
              sessionId: data.id,
              userId: data.user_id,
              responses: (data.test_sessions.responses as any) || {},
              scores: data.specialty_scores as Record<string, number>,
              completedAt: data.created_at,
              testDuration: 0 // We don't store duration yet
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
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!isUnlocked ? (
          // Show teaser page when results are not unlocked
          <ResultsTeaser 
            topSpecialty={topSpecialty}
            topScore={topScore}
            sessionId={sessionId || ''}
          />
        ) : (
          // Show full results when unlocked
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Seus Resultados Vocacionais
              </h1>
              <p className="text-gray-600">
                Confira as especialidades que mais combinam com você!
              </p>
            </div>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Top 5 Especialidades</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedScores.map(([specialty, score], index) => (
                  <div key={specialty} className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{specialty}</h3>
                      <p className="text-sm text-gray-600">
                        Compatibilidade: {Math.round(score)}%
                      </p>
                    </div>
                    <Badge variant="secondary">#{index + 1}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recomendação Personalizada
              </h2>
              <Card className="medical-card">
                <CardContent>
                  <div className="text-center">
                    <Sparkles className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
                    <p className="text-gray-700">
                      Com base nos seus resultados, recomendamos explorar a área de{" "}
                      <span className="font-semibold">{topSpecialty}</span>.
                    </p>
                    <Button
                      onClick={() => navigate('/specialties')}
                      className="medical-button mt-4"
                    >
                      Ver Especialidades
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Results;
