
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useTestNavigation } from '@/hooks/useTestNavigation';
import { useTestProgress } from '@/hooks/useTestProgress';
import TestProgress from '@/components/test/TestProgress';
import TestHeader from '@/components/test/TestHeader';
import TestQuestion from '@/components/test/TestQuestion';
import TestReview from '@/components/test/TestReview';
import TestValidation from '@/components/test/TestValidation';
import TestKeyboardShortcuts from '@/components/test/TestKeyboardShortcuts';
import TestNavigation from '@/components/test/TestNavigation';
import TestHelpSection from '@/components/test/TestHelpSection';
import { testModules } from '@/data/testModules';
import { calculateResults } from '@/utils/testCalculations';
import { validateTestResponses } from '@/utils/testValidation';
import { TestResponses } from '@/types/test';
import { useToast } from '@/hooks/use-toast';

const TestContainer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    currentModule,
    currentQuestion,
    currentModuleData,
    currentQuestionData,
    handleNext,
    handlePrevious,
    canGoBack,
    isLastQuestion
  } = useTestNavigation();

  const { saveProgress, clearProgress, saveTestResults } = useTestProgress();

  const [responses, setResponses] = useState<TestResponses>({});
  const [startTime] = useState(Date.now());
  const [showReview, setShowReview] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(25);

  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const hasCurrentResponse = responses[currentQuestionData.id] !== undefined;

  // Calculate estimated time remaining
  useEffect(() => {
    if (answeredQuestions > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const avgTimePerQuestion = timeElapsed / answeredQuestions;
      const remainingQuestions = totalQuestions - answeredQuestions;
      setEstimatedTimeRemaining(Math.max(1, Math.round(remainingQuestions * avgTimePerQuestion)));
    }
  }, [answeredQuestions, startTime, totalQuestions]);

  // Keyboard navigation with validation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const value = parseInt(e.key);
        handleResponse(value);
        setShowValidation(false);
      } else if (e.key === 'ArrowLeft') {
        handleNavigationPrevious();
      } else if (e.key === 'ArrowRight') {
        handleNavigationNext();
      } else if (e.key === 'Escape') {
        handleSaveAndExit();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentModule, currentQuestion, hasCurrentResponse]);

  const handleResponse = (value: number) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionData.id]: value
    }));
    setShowValidation(false);
  };

  const handleNavigationNext = () => {
    if (!hasCurrentResponse) {
      setShowValidation(true);
      toast({
        title: "Resposta necessária",
        description: "Por favor, selecione uma resposta antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    const result = handleNext();
    if (result === 'review') {
      setShowReview(true);
    }
    setShowValidation(false);
  };

  const handleNavigationPrevious = () => {
    handlePrevious();
    setShowValidation(false);
  };

  const handleSubmit = async () => {
    const validation = validateTestResponses(responses);
    
    if (!validation.isComplete) {
      toast({
        title: "Teste incompleto",
        description: `Ainda restam ${validation.missingQuestions} questões para responder.`,
        variant: "destructive"
      });
      return;
    }

    const results = calculateResults(responses);
    const testDuration = Math.round((Date.now() - startTime) / 1000 / 60);
    
    // Save results to Supabase (if user is logged in)
    const sessionId = await saveTestResults(responses, results, testDuration);
    
    // Also save to localStorage as backup
    const localSessionId = sessionId || Date.now().toString();
    localStorage.setItem(`test_results_${localSessionId}`, JSON.stringify({
      sessionId: localSessionId,
      userId: user?.id,
      responses,
      scores: results,
      completedAt: new Date().toISOString(),
      testDuration
    }));

    clearProgress();
    toast({
      title: "Teste concluído!",
      description: "Redirecionando para seus resultados...",
    });
    
    navigate(`/results/${localSessionId}`);
  };

  const handleSaveAndExit = async () => {
    const sessionId = await saveProgress(currentModule, currentQuestion, responses);
    
    toast({
      title: "Progresso salvo!",
      description: "Você pode continuar de onde parou a qualquer momento.",
    });
    
    navigate('/dashboard');
  };

  if (showReview) {
    return (
      <TestReview 
        responses={responses}
        onBack={() => setShowReview(false)}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <>
      <TestProgress 
        answeredQuestions={answeredQuestions}
        estimatedTimeRemaining={estimatedTimeRemaining}
      />

      <TestHeader currentModuleData={currentModuleData} />

      <Card className="medical-card animate-scale-in">
        <CardContent>
          <TestQuestion
            question={currentQuestionData}
            response={responses[currentQuestionData.id]}
            onResponse={handleResponse}
          />

          <TestValidation 
            hasResponse={hasCurrentResponse}
            showValidation={showValidation}
          />

          <TestNavigation
            canGoBack={canGoBack}
            hasCurrentResponse={hasCurrentResponse}
            isLastQuestion={isLastQuestion}
            onPrevious={handleNavigationPrevious}
            onNext={handleNavigationNext}
            onSaveAndExit={handleSaveAndExit}
          />
        </CardContent>
      </Card>

      <TestKeyboardShortcuts />
      <TestHelpSection />
    </>
  );
};

export default TestContainer;
