
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Save, LifeBuoy } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useTestNavigation } from '@/hooks/useTestNavigation';
import TestProgress from '@/components/test/TestProgress';
import TestQuestion from '@/components/test/TestQuestion';
import TestReview from '@/components/test/TestReview';
import { testModules } from '@/data/testModules';
import { calculateResults } from '@/utils/testCalculations';
import { TestResponses } from '@/types/test';

const Test = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
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

  const [responses, setResponses] = useState<TestResponses>({});
  const [startTime] = useState(Date.now());
  const [showReview, setShowReview] = useState(false);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(25);

  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;

  // Calculate estimated time remaining based on current pace
  useEffect(() => {
    if (answeredQuestions > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // minutes
      const avgTimePerQuestion = timeElapsed / answeredQuestions;
      const remainingQuestions = totalQuestions - answeredQuestions;
      setEstimatedTimeRemaining(Math.max(1, Math.round(remainingQuestions * avgTimePerQuestion)));
    }
  }, [answeredQuestions, startTime, totalQuestions]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '5') {
        const value = parseInt(e.key);
        handleResponse(value);
      } else if (e.key === 'ArrowLeft') {
        handleNavigationPrevious();
      } else if (e.key === 'ArrowRight') {
        handleNavigationNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentModule, currentQuestion]);

  const handleResponse = (value: number) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestionData.id]: value
    }));
  };

  const handleNavigationNext = () => {
    const result = handleNext();
    if (result === 'review') {
      setShowReview(true);
    }
  };

  const handleNavigationPrevious = () => {
    handlePrevious();
  };

  const handleSubmit = () => {
    const results = calculateResults(responses);
    const sessionId = Date.now().toString();
    
    // Save results to localStorage (will be replaced with Supabase)
    localStorage.setItem(`test_results_${sessionId}`, JSON.stringify({
      sessionId,
      userId: user?.id,
      responses,
      scores: results,
      completedAt: new Date().toISOString(),
      testDuration: Math.round((Date.now() - startTime) / 1000 / 60) // minutes
    }));

    navigate(`/results/${sessionId}`);
  };

  const saveAndExit = () => {
    const sessionId = Date.now().toString();
    localStorage.setItem(`test_progress_${sessionId}`, JSON.stringify({
      sessionId,
      userId: user?.id,
      currentModule,
      currentQuestion,
      responses,
      savedAt: new Date().toISOString()
    }));
    
    // Here you would send an email with return link
    alert(`Progresso salvo! Você pode continuar em: ${window.location.origin}/test?session=${sessionId}`);
    navigate('/dashboard');
  };

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
        <Card className="medical-card mb-6">
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
        <Card className="medical-card">
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

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleNavigationPrevious}
                  disabled={!canGoBack}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
                
                <Button variant="outline" onClick={saveAndExit}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar e Sair
                </Button>
              </div>

              <Button 
                onClick={handleNavigationNext}
                disabled={!responses[currentQuestionData.id]}
                className="medical-button"
              >
                {isLastQuestion ? "Revisar Respostas" : "Próxima"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="medical-card mt-6 bg-gradient-to-r from-blue-50 to-green-50">
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
