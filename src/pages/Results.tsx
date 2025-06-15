
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { 
  Trophy, 
  Download, 
  Share2, 
  Star, 
  TrendingUp,
  Brain,
  Heart,
  Clock,
  Target,
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const specialtiesData = {
  emergency: {
    name: "Medicina de Emergência",
    category: "Clínica",
    description: "Atendimento médico em situações críticas e urgentes",
    salary: "R$ 15.000 - R$ 35.000",
    workSchedule: "Plantões 12x36h",
    yearsTraining: "3 anos de residência",
    keySkills: ["Tomada de decisão rápida", "Trabalho sob pressão", "Liderança"],
    pros: ["Alto impacto na vida dos pacientes", "Variedade de casos", "Adrenalina constante"],
    cons: ["Estresse elevado", "Plantões noturnos", "Carga emocional intensa"],
    whyMatch: "Sua personalidade demonstra excelente capacidade de trabalhar sob pressão e tomar decisões rápidas, características essenciais para a medicina de emergência."
  },
  surgery: {
    name: "Cirurgia Geral",
    category: "Cirúrgica",
    description: "Tratamento cirúrgico de doenças do abdome, trauma e procedimentos gerais",
    salary: "R$ 20.000 - R$ 50.000",
    workSchedule: "Horário variável + plantões",
    yearsTraining: "5 anos de residência",
    keySkills: ["Destreza manual", "Precisão", "Resistência física"],
    pros: ["Resultados imediatos", "Prestígio profissional", "Remuneração elevada"],
    cons: ["Longas horas de trabalho", "Responsabilidade alta", "Estresse constante"],
    whyMatch: "Seu perfil indica interesse em procedimentos manuais e capacidade de trabalhar com precisão em situações complexas."
  },
  cardiology: {
    name: "Cardiologia",
    category: "Clínica",
    description: "Diagnóstico e tratamento de doenças cardiovasculares",
    salary: "R$ 18.000 - R$ 45.000",
    workSchedule: "Consultório + plantões ocasionais",
    yearsTraining: "3 anos de residência",
    keySkills: ["Raciocínio clínico", "Interpretação de exames", "Comunicação"],
    pros: ["Campo em crescimento", "Boa remuneração", "Consultório próprio"],
    cons: ["Responsabilidade alta", "Atualização constante", "Casos complexos"],
    whyMatch: "Sua capacidade analítica e interesse em tecnologia médica são ideais para a cardiologia moderna."
  },
  psychiatry: {
    name: "Psiquiatria",
    category: "Clínica",
    description: "Diagnóstico e tratamento de transtornos mentais e comportamentais",
    salary: "R$ 12.000 - R$ 30.000",
    workSchedule: "Horário flexível",
    yearsTraining: "3 anos de residência",
    keySkills: ["Empatia", "Escuta ativa", "Paciência"],
    pros: ["Horários flexíveis", "Trabalho humanizado", "Crescimento pessoal"],
    cons: ["Carga emocional", "Estigma social", "Casos desafiadores"],
    whyMatch: "Seu interesse em saúde mental e habilidades de comunicação são fundamentais para a psiquiatria."
  },
  dermatology: {
    name: "Dermatologia",
    category: "Clínica",
    description: "Diagnóstico e tratamento de doenças da pele, cabelos e unhas",
    salary: "R$ 15.000 - R$ 40.000",
    workSchedule: "Horário comercial",
    yearsTraining: "4 anos de residência",
    keySkills: ["Atenção aos detalhes", "Destreza manual", "Estética"],
    pros: ["Equilíbrio vida-trabalho", "Boa remuneração", "Baixo estresse"],
    cons: ["Residência concorrida", "Investimento alto", "Casos repetitivos"],
    whyMatch: "Seu perfil indica preferência por horários regulares e trabalho detalhado."
  }
};

interface TestResult {
  sessionId: string;
  userId: string;
  responses: Record<number, number>;
  scores: Record<string, number>;
  completedAt: string;
  testDuration: number;
}

const Results = () => {
  const { sessionId } = useParams();
  const [results, setResults] = useState<TestResult | null>(null);
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({});
  const [showComparison, setShowComparison] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  useEffect(() => {
    // Load results from localStorage (will be replaced with Supabase)
    const savedResults = localStorage.getItem(`test_results_${sessionId}`);
    if (savedResults) {
      const parsedResults = JSON.parse(savedResults);
      setResults(parsedResults);
      
      // Animate score counters
      setTimeout(() => {
        Object.entries(parsedResults.scores).forEach(([specialty, score]) => {
          animateScore(specialty, score as number);
        });
      }, 500);
    }
  }, [sessionId]);

  const animateScore = (specialty: string, targetScore: number) => {
    let current = 0;
    const increment = targetScore / 50; // 50 steps for smooth animation
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetScore) {
        current = targetScore;
        clearInterval(timer);
      }
      setAnimatedScores(prev => ({ ...prev, [specialty]: Math.round(current) }));
    }, 20);
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus resultados...</p>
        </div>
      </div>
    );
  }

  // Get top 5 specialties
  const sortedSpecialties = Object.entries(results.scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .filter(([specialtyId]) => specialtiesData[specialtyId as keyof typeof specialtiesData]);

  const topSpecialty = sortedSpecialties[0];

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Meus Resultados do Teste Vocacional MedVocation',
        text: `Descobri que tenho ${topSpecialty[1]}% de compatibilidade com ${specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].name}!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleDownloadPDF = () => {
    // This would generate and download a PDF report
    alert('Funcionalidade de download do PDF será implementada em breve!');
  };

  const toggleComparison = (specialtyId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(specialtyId)) {
        return prev.filter(id => id !== specialtyId);
      } else if (prev.length < 3) {
        return [...prev, specialtyId];
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-medical-green/10 text-medical-green px-4 py-2 rounded-full mb-4">
            <CheckCircle className="h-5 w-5" />
            Teste Concluído com Sucesso!
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Seus Resultados Vocacionais
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Baseado em suas respostas, analisamos sua compatibilidade com diferentes especialidades médicas. 
            Confira suas recomendações personalizadas abaixo.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-medical-blue">
                {animatedScores[topSpecialty[0]] || 0}%
              </div>
              <p className="text-sm text-gray-600">Melhor Match</p>
            </CardContent>
          </Card>

          <Card className="medical-card text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-medical-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-medical-blue">
                {sortedSpecialties.length}
              </div>
              <p className="text-sm text-gray-600">Especialidades Avaliadas</p>
            </CardContent>
          </Card>

          <Card className="medical-card text-center">
            <CardContent className="p-6">
              <Clock className="h-8 w-8 text-medical-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-medical-blue">
                {results.testDuration}min
              </div>
              <p className="text-sm text-gray-600">Tempo de Teste</p>
            </CardContent>
          </Card>

          <Card className="medical-card text-center">
            <CardContent className="p-6">
              <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-medical-blue">
                {Object.keys(results.responses).length}
              </div>
              <p className="text-sm text-gray-600">Questões Respondidas</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Recommendation */}
            <Card className="medical-card border-medical-blue border-2 bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-yellow-500" />
                  Sua Especialidade Recomendada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-medical-blue mb-2">
                    {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].name}
                  </h2>
                  <div className="text-4xl font-bold text-medical-green mb-2">
                    {animatedScores[topSpecialty[0]] || 0}%
                  </div>
                  <Badge className="mb-4">
                    {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].category}
                  </Badge>
                  <p className="text-gray-700">
                    {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="font-semibold mb-2">💰 Remuneração</h4>
                    <p className="text-sm text-gray-600">
                      {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].salary}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⏰ Horário de Trabalho</h4>
                    <p className="text-sm text-gray-600">
                      {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].workSchedule}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">🎓 Tempo de Formação</h4>
                    <p className="text-sm text-gray-600">
                      {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].yearsTraining}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">⭐ Habilidades Chave</h4>
                    <div className="flex flex-wrap gap-1">
                      {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].keySkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-medical-blue" />
                    Por que esta especialidade combina com você?
                  </h4>
                  <p className="text-sm text-gray-700">
                    {specialtiesData[topSpecialty[0] as keyof typeof specialtiesData].whyMatch}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleDownloadPDF} variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Relatório PDF
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* All Results */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Todas as Especialidades</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                  >
                    {showComparison ? "Ocultar" : "Comparar"} Especialidades
                  </Button>
                </CardTitle>
                <CardDescription>
                  Seus níveis de compatibilidade com cada especialidade médica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sortedSpecialties.map(([specialtyId, score], index) => {
                  const specialty = specialtiesData[specialtyId as keyof typeof specialtiesData];
                  if (!specialty) return null;

                  return (
                    <div key={specialtyId} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-400">
                              #{index + 1}
                            </span>
                            {showComparison && (
                              <input
                                type="checkbox"
                                checked={selectedForComparison.includes(specialtyId)}
                                onChange={() => toggleComparison(specialtyId)}
                                className="rounded"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{specialty.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {specialty.category}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-medical-blue">
                            {animatedScores[specialtyId] || 0}%
                          </div>
                        </div>
                      </div>
                      <Progress value={animatedScores[specialtyId] || 0} className="h-2" />
                      
                      <details className="text-sm">
                        <summary className="cursor-pointer text-medical-blue hover:underline">
                          Por que {Math.round(score)}% de compatibilidade?
                        </summary>
                        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                          <p className="text-gray-700 mb-2">{specialty.whyMatch}</p>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <strong>Prós:</strong>
                              <ul className="list-disc list-inside text-gray-600">
                                {specialty.pros.map((pro, i) => (
                                  <li key={i}>{pro}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <strong>Contras:</strong>
                              <ul className="list-disc list-inside text-gray-600">
                                {specialty.cons.map((con, i) => (
                                  <li key={i}>{con}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  );
                })}

                {showComparison && selectedForComparison.length > 1 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-3">Comparação Selecionada</h4>
                    <div className="grid gap-4">
                      {selectedForComparison.map(specialtyId => {
                        const specialty = specialtiesData[specialtyId as keyof typeof specialtiesData];
                        const score = results.scores[specialtyId];
                        return (
                          <div key={specialtyId} className="flex justify-between items-center">
                            <span className="font-medium">{specialty.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-medical-blue font-bold">{Math.round(score)}%</span>
                              <Link to={`/specialty/${specialtyId}`}>
                                <Button size="sm" variant="outline">
                                  Ver Detalhes
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Personality Profile */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5 text-medical-blue" />
                  Seu Perfil Psicológico
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tolerância ao Estresse</span>
                    <span className="font-semibold">Alto</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Preferência por Rotina</span>
                    <span className="font-semibold">Baixo</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trabalho em Equipe</span>
                    <span className="font-semibold">Alto</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tomada de Decisão</span>
                    <span className="font-semibold">Rápida</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Próximos Passos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/specialties">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Explorar Especialidades
                  </Button>
                </Link>
                
                <Link to="/test">
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-2" />
                    Refazer Teste
                  </Button>
                </Link>
                
                <Link to="/pricing">
                  <Button className="w-full medical-button justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Falar com Especialista
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Referral Program */}
            <Card className="medical-card bg-gradient-to-r from-green-50 to-blue-50">
              <CardHeader>
                <CardTitle className="text-lg">Convide Amigos</CardTitle>
                <CardDescription>
                  Ganhe 1 mês de Premium para cada 3 amigos que fizerem o teste!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar Convite
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
