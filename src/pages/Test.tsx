
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import { 
  Brain, 
  Heart, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  Save,
  Play,
  CheckCircle,
  LifeBuoy
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Test modules data with weighted questions
const testModules = {
  personality: {
    title: "Perfil de Personalidade",
    icon: Brain,
    description: "Descubra como sua personalidade se alinha com diferentes especialidades",
    questions: [
      {
        id: 1,
        text: "Prefiro trabalhar em situações de alta pressão e emergência",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.7,
          "anesthesiology": 0.8,
          "psychiatry": 0.2,
          "dermatology": 0.1,
          "radiology": 0.3
        }
      },
      {
        id: 2,
        text: "Gosto de trabalhar com detalhes precisos e análise cuidadosa",
        weights: {
          "radiology": 0.9,
          "pathology": 0.9,
          "dermatology": 0.8,
          "psychiatry": 0.7,
          "emergency": 0.2,
          "surgery": 0.6,
          "pediatrics": 0.5
        }
      },
      {
        id: 3,
        text: "Prefiro interação constante com pacientes e suas famílias",
        weights: {
          "pediatrics": 0.9,
          "psychiatry": 0.9,
          "family_medicine": 0.9,
          "internal_medicine": 0.8,
          "radiology": 0.1,
          "pathology": 0.1,
          "anesthesiology": 0.3
        }
      },
      {
        id: 4,
        text: "Sou confortável tomando decisões rápidas sob pressão",
        weights: {
          "emergency": 0.9,
          "surgery": 0.8,
          "cardiology": 0.7,
          "anesthesiology": 0.8,
          "psychiatry": 0.3,
          "dermatology": 0.2,
          "radiology": 0.4
        }
      },
      {
        id: 5,
        text: "Prefiro trabalhar de forma independente com mínima supervisão",
        weights: {
          "radiology": 0.8,
          "pathology": 0.9,
          "dermatology": 0.7,
          "psychiatry": 0.6,
          "surgery": 0.3,
          "pediatrics": 0.2,
          "emergency": 0.3
        }
      }
    ]
  },
  interests: {
    title: "Interesses Profissionais",
    icon: Heart,
    description: "Identifique suas áreas de interesse na medicina",
    questions: [
      {
        id: 6,
        text: "Tenho interesse em procedimentos cirúrgicos e técnicas manuais",
        weights: {
          "surgery": 0.9,
          "orthopedics": 0.9,
          "cardiology": 0.6,
          "dermatology": 0.7,
          "psychiatry": 0.1,
          "radiology": 0.2,
          "pathology": 0.1
        }
      },
      {
        id: 7,
        text: "Prefiro focar na prevenção de doenças",
        weights: {
          "family_medicine": 0.9,
          "pediatrics": 0.8,
          "internal_medicine": 0.7,
          "psychiatry": 0.6,
          "surgery": 0.2,
          "emergency": 0.3,
          "pathology": 0.1
        }
      },
      {
        id: 8,
        text: "Gosto de trabalhar com tecnologia avançada e equipamentos",
        weights: {
          "radiology": 0.9,
          "cardiology": 0.8,
          "anesthesiology": 0.7,
          "surgery": 0.6,
          "psychiatry": 0.2,
          "family_medicine": 0.3,
          "pediatrics": 0.3
        }
      },
      {
        id: 9,
        text: "Tenho interesse em saúde mental e comportamento humano",
        weights: {
          "psychiatry": 0.9,
          "pediatrics": 0.6,
          "family_medicine": 0.5,
          "internal_medicine": 0.4,
          "surgery": 0.1,
          "radiology": 0.1,
          "pathology": 0.1
        }
      },
      {
        id: 10,
        text: "Prefiro trabalhar com crianças e adolescentes",
        weights: {
          "pediatrics": 0.9,
          "psychiatry": 0.5,
          "surgery": 0.3,
          "family_medicine": 0.6,
          "internal_medicine": 0.2,
          "radiology": 0.3,
          "pathology": 0.1
        }
      }
    ]
  },
  lifestyle: {
    title: "Estilo de Vida",
    icon: Clock,
    description: "Avalie como diferentes especialidades se encaixam no seu estilo de vida",
    questions: [
      {
        id: 11,
        text: "Estou disposto(a) a trabalhar plantões noturnos regularmente",
        weights: {
          "emergency": 0.9,
          "surgery": 0.7,
          "anesthesiology": 0.8,
          "cardiology": 0.6,
          "dermatology": 0.1,
          "psychiatry": 0.2,
          "family_medicine": 0.3
        }
      },
      {
        id: 12,
        text: "Prefiro um horário de trabalho mais previsível (9h-17h)",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.8,
          "radiology": 0.8,
          "pathology": 0.9,
          "emergency": 0.1,
          "surgery": 0.2,
          "cardiology": 0.3
        }
      },
      {
        id: 13,
        text: "O equilíbrio trabalho-vida pessoal é muito importante para mim",
        weights: {
          "dermatology": 0.9,
          "psychiatry": 0.7,
          "family_medicine": 0.6,
          "radiology": 0.8,
          "emergency": 0.2,
          "surgery": 0.3,
          "cardiology": 0.4
        }
      },
      {
        id: 14,
        text: "Estou disposto(a) a dedicar muitos anos de especialização",
        weights: {
          "surgery": 0.9,
          "cardiology": 0.8,
          "internal_medicine": 0.7,
          "radiology": 0.7,
          "family_medicine": 0.4,
          "emergency": 0.5,
          "psychiatry": 0.6
        }
      },
      {
        id: 15,
        text: "A remuneração é um fator muito importante na minha escolha",
        weights: {
          "surgery": 0.8,
          "dermatology": 0.9,
          "cardiology": 0.8,
          "radiology": 0.7,
          "family_medicine": 0.3,
          "pediatrics": 0.4,
          "psychiatry": 0.5
        }
      }
    ]
  }
};

const specialties = [
  { id: "emergency", name: "Medicina de Emergência", category: "Clínica" },
  { id: "surgery", name: "Cirurgia Geral", category: "Cirúrgica" },
  { id: "cardiology", name: "Cardiologia", category: "Clínica" },
  { id: "psychiatry", name: "Psiquiatria", category: "Clínica" },
  { id: "pediatrics", name: "Pediatria", category: "Clínica" },
  { id: "dermatology", name: "Dermatologia", category: "Clínica" },
  { id: "radiology", name: "Radiologia", category: "Diagnóstica" },
  { id: "anesthesiology", name: "Anestesiologia", category: "Cirúrgica" },
  { id: "pathology", name: "Patologia", category: "Diagnóstica" },
  { id: "orthopedics", name: "Ortopedia", category: "Cirúrgica" },
  { id: "family_medicine", name: "Medicina de Família", category: "Clínica" },
  { id: "internal_medicine", name: "Clínica Médica", category: "Clínica" }
];

const Test = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [currentModule, setCurrentModule] = useState<keyof typeof testModules>('personality');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [startTime] = useState(Date.now());
  const [showReview, setShowReview] = useState(false);
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState(25); // minutes

  const moduleKeys = Object.keys(testModules) as Array<keyof typeof testModules>;
  const currentModuleData = testModules[currentModule];
  const currentQuestionData = currentModuleData.questions[currentQuestion];
  
  const totalQuestions = Object.values(testModules).reduce((acc, module) => acc + module.questions.length, 0);
  const answeredQuestions = Object.keys(responses).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

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
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
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

  const handleNext = () => {
    const currentModuleIndex = moduleKeys.indexOf(currentModule);
    const isLastQuestionInModule = currentQuestion === currentModuleData.questions.length - 1;
    const isLastModule = currentModuleIndex === moduleKeys.length - 1;

    if (isLastQuestionInModule) {
      if (isLastModule) {
        setShowReview(true);
      } else {
        setCurrentModule(moduleKeys[currentModuleIndex + 1]);
        setCurrentQuestion(0);
      }
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      const currentModuleIndex = moduleKeys.indexOf(currentModule);
      if (currentModuleIndex > 0) {
        const prevModule = moduleKeys[currentModuleIndex - 1];
        setCurrentModule(prevModule);
        setCurrentQuestion(testModules[prevModule].questions.length - 1);
      }
    }
  };

  const calculateResults = () => {
    const scores: Record<string, number> = {};
    
    // Initialize scores
    specialties.forEach(specialty => {
      scores[specialty.id] = 0;
    });

    // Calculate weighted scores
    Object.entries(responses).forEach(([questionId, response]) => {
      const question = Object.values(testModules)
        .flatMap(module => module.questions)
        .find(q => q.id === parseInt(questionId));
      
      if (question) {
        Object.entries(question.weights).forEach(([specialtyId, weight]) => {
          if (scores[specialtyId] !== undefined) {
            scores[specialtyId] += (response - 1) * weight * 25; // Convert 1-5 scale to percentage
          }
        });
      }
    });

    // Normalize scores to 0-100 range
    const maxPossibleScore = Object.values(testModules).reduce((acc, module) => 
      acc + module.questions.length * 4 * 25, 0
    );
    
    Object.keys(scores).forEach(specialtyId => {
      scores[specialtyId] = Math.min(100, Math.max(0, scores[specialtyId]));
    });

    return scores;
  };

  const handleSubmit = () => {
    const results = calculateResults();
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
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-medical-green" />
                Revisão das Respostas
              </CardTitle>
              <CardDescription>
                Revise suas respostas antes de finalizar o teste
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {moduleKeys.map(moduleKey => (
                <div key={moduleKey} className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <testModules[moduleKey].icon className="h-5 w-5 text-medical-blue" />
                    {testModules[moduleKey].title}
                  </h3>
                  <div className="grid gap-3">
                    {testModules[moduleKey].questions.map(question => (
                      <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm mb-2">{question.text}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-600">Resposta:</span>
                          <Badge variant={responses[question.id] ? "default" : "secondary"}>
                            {responses[question.id] ? 
                              `${responses[question.id]}/5` : 
                              "Não respondida"
                            }
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={() => setShowReview(false)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar ao Teste
                </Button>
                <Button onClick={handleSubmit} className="medical-button">
                  Finalizar e Ver Resultados
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const CurrentIcon = currentModuleData.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teste Vocacional</h1>
              <p className="text-gray-600">
                Questão {answeredQuestions + 1} de {totalQuestions}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Tempo estimado restante</div>
              <div className="text-lg font-semibold text-medical-blue">
                {estimatedTimeRemaining} min
              </div>
            </div>
          </div>
          
          <Progress value={progress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{Math.round(progress)}% concluído</span>
            <span>{totalQuestions - answeredQuestions} questões restantes</span>
          </div>
        </div>

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
            <CardDescription>
              Escolha o nível que melhor representa sua opinião (1 = Discordo totalmente, 5 = Concordo totalmente)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={responses[currentQuestionData.id]?.toString() || ""}
              onValueChange={(value) => handleResponse(parseInt(value))}
              className="space-y-4"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={value.toString()} id={`option-${value}`} />
                  <Label 
                    htmlFor={`option-${value}`} 
                    className="flex-1 cursor-pointer text-sm font-medium"
                  >
                    <div className="flex items-center justify-between">
                      <span>
                        {value === 1 && "Discordo totalmente"}
                        {value === 2 && "Discordo parcialmente"}
                        {value === 3 && "Neutro"}
                        {value === 4 && "Concordo parcialmente"}
                        {value === 5 && "Concordo totalmente"}
                      </span>
                      <Badge variant="outline">{value}</Badge>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {/* Keyboard Hints */}
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-xs text-blue-700">
                💡 <strong>Dica:</strong> Use as teclas 1-5 para responder rapidamente ou as setas ← → para navegar
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentModule === 'personality' && currentQuestion === 0}
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
                onClick={handleNext}
                disabled={!responses[currentQuestionData.id]}
                className="medical-button"
              >
                {currentModule === moduleKeys[moduleKeys.length - 1] && 
                 currentQuestion === currentModuleData.questions.length - 1 ? (
                  <>
                    Revisar Respostas
                    <CheckCircle className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Próxima
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
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
