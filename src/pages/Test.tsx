
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Save, LifeBuoy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useTestNavigation } from '@/hooks/useTestNavigation';
import { useTestProgress } from '@/hooks/useTestProgress';
import TestProgress from '@/components/test/TestProgress';
import TestQuestion from '@/components/test/TestQuestion';
import TestReview from '@/components/test/TestReview';
import TestValidation from '@/components/test/TestValidation';
import TestKeyboardShortcuts from '@/components/test/TestKeyboardShortcuts';
import { TestLoadingSkeleton } from '@/components/ui/loading-skeleton';
import { testModules } from '@/data/testModules';
import { calculateResults } from '@/utils/testCalculations';
import { validateTestResponses } from '@/utils/testValidation';
import { TestResponses } from '@/types/test';
import { useToast } from '@/hooks/use-toast';

const Test = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    currentModule,
    currentQuestion,
    currentModuleData,
    currentQuestionData,
    moduleKeys,
    handleNext,
    handlePrevious,
    canGoBack,
    isLastQuestion
  } = useTestNavigation();

  const { saveProgress, clearProgress } = useTestProgress(user?.id);

  const [responses, setResponses] = useState<TestResponses>({});
  const [startTime] = useState(Date.now());
  const [showReview, setShowReview] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(25);

  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const hasCurrentResponse = responses[currentQuestionData.id] !== undefined;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

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

  const handleSubmit = () => {
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
    const sessionId = Date.now().toString();
    
    // Save results to localStorage
    localStorage.setItem(`test_results_${sessionId}`, JSON.stringify({
      sessionId,
      userId: user?.id,
      responses,
      scores: results,
      completedAt: new Date().toISOString(),
      testDuration: Math.round((Date.now() - startTime) / 1000 / 60)
    }));

    clearProgress();
    toast({
      title: "Teste concluído!",
      description: "Redirecionando para seus resultados...",
    });
    
    navigate(`/results/${sessionId}`);
  };

  const handleSaveAndExit = () => {
    const sessionId = saveProgress(currentModule, currentQuestion, responses);
    
    toast({
      title: "Progresso salvo!",
      description: "Você pode continuar de onde parou a qualquer momento.",
    });
    
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TestLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <TestReview 
            responses={responses}
            onBack={() => setShowReview(false)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    );
  }

  const CurrentIcon = currentModuleData.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <TestProgress 
          answeredQuestions={answeredQuestions}
          estimatedTimeRemaining={estimatedTimeRemaining}
        />

        {/* Module Header */}
        <Card className="medical-card mb-6 animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-medical-blue/10 rounded-lg">
                <CurrentIcon className="h-6 w-6 text-medical-blue" />
              </div>
              {currentModuleData.title}
            </CardTitle>
            <CardDescription>
              {currentModuleData.description}
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="medical-card animate-scale-in">
          <CardHeader>
            <CardTitle className="text-lg">
              {currentQuestionData.text}
            </CardTitle>
          </CardHeader>
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

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleNavigationPrevious}
                  disabled={!canGoBack}
                  className="transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button variant="outline" onClick={handleSaveAndExit}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar e Sair
                </Button>
              </div>

              <Button 
                onClick={handleNavigationNext}
                disabled={!hasCurrentResponse}
                className="medical-button transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLastQuestion ? "Revisar Respostas" : "Próxima"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <TestKeyboardShortcuts />

        {/* Help Section */}
        <Card className="medical-card mt-6 bg-gradient-to-r from-blue-50 to-green-50 animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <LifeBuoy className="h-5 w-5 text-medical-blue" />
              <div>
                <h4 className="font-medium text-gray-900">Precisa de ajuda?</h4>
                <p className="text-sm text-gray-600">
                  Responda com honestidade. Não existem respostas certas ou erradas!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Test;
