
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { 
  ArrowLeft, 
  Heart, 
  DollarSign, 
  Clock, 
  GraduationCap,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle,
  AlertCircle,
  Play,
  Calendar,
  Brain,
  Target
} from 'lucide-react';

const specialtyData = {
  emergency: {
    name: "Medicina de Emergência",
    category: "Clínica",
    description: "A Medicina de Emergência é a especialidade que se dedica ao atendimento médico em situações críticas e urgentes, onde decisões rápidas podem salvar vidas.",
    fullDescription: "O médico emergencista atua na linha de frente do atendimento hospitalar, lidando com casos que variam desde acidentes graves até emergências cardíacas. É uma especialidade dinâmica que exige conhecimento amplo, capacidade de trabalhar sob pressão e habilidades de liderança para coordenar equipes multidisciplinares.",
    salary: {
      min: 15000,
      max: 35000,
      average: 25000,
      description: "R$ 15.000 - R$ 35.000"
    },
    workSchedule: "Plantões 12x36h",
    yearsTraining: 3,
    marketDemand: "Alta",
    stress: "Alto",
    workLifeBalance: "Médio",
    jobMarket: {
      availability: 85,
      growth: 15,
      competition: 70
    },
    dailyRoutine: [
      "06:00 - Chegada ao plantão e passagem de caso",
      "07:00 - Atendimento de emergências e triagem",
      "12:00 - Pausa para almoço (quando possível)",
      "13:00 - Continuação dos atendimentos",
      "16:00 - Procedimentos e reavaliações",
      "18:00 - Fim do plantão e nova passagem"
    ],
    procedures: [
      "Intubação orotraqueal",
      "Cardioversão elétrica",
      "Punção venosa central",
      "Drenagem pleural",
      "Sutura de ferimentos",
      "RCP avançada"
    ],
    workLocations: [
      "Pronto-socorro hospitalar",
      "UPA - Unidade de Pronto Atendimento",
      "SAMU - Serviço móvel de urgência",
      "Hospital privado",
      "Clínicas de emergência"
    ],
    keySkills: [
      "Tomada de decisão rápida",
      "Trabalho sob pressão",
      "Liderança de equipe",
      "Comunicação eficaz",
      "Resistência física",
      "Conhecimento multidisciplinar"
    ],
    pros: [
      "Alto impacto na vida dos pacientes",
      "Variedade constante de casos",
      "Adrenalina e dinamismo",
      "Boa remuneração",
      "Desenvolvimento de habilidades de liderança",
      "Possibilidade de salvar vidas"
    ],
    cons: [
      "Estresse elevado constante",
      "Plantões noturnos e finais de semana",
      "Carga emocional intensa",
      "Risco de burnout",
      "Exposição a doenças infecciosas",
      "Responsabilidade extrema"
    ],
    careerPath: [
      "Graduação em Medicina (6 anos)",
      "Residência em Clínica Médica (2 anos) - opcional",
      "Residência em Medicina de Emergência (3 anos)",
      "Especialização em subespecialidades (opcional)",
      "Atuação em serviços de emergência"
    ],
    testimonials: [
      {
        name: "Dr. Carlos Silva",
        role: "Emergencista há 8 anos",
        text: "Cada dia é único na emergência. A sensação de salvar uma vida e fazer a diferença é incomparável. É desafiador, mas extremamente gratificante.",
        rating: 5
      },
      {
        name: "Dra. Ana Costa",
        role: "Residente R3",
        text: "A residência é intensa, mas prepara muito bem. Você aprende a trabalhar sob pressão e desenvolve um raciocínio clínico muito rápido.",
        rating: 4
      }
    ],
    videoEmbeds: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder YouTube embeds
      "https://www.youtube.com/embed/dQw4w9WgXcQ"
    ]
  }
};

const SpecialtyDetail = () => {
  const { id } = useParams();
  
  // For demo purposes, we'll use the emergency specialty data
  // In a real app, you'd fetch based on the ID
  const specialty = specialtyData.emergency;

  if (!specialty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Especialidade não encontrada</h2>
          <p className="text-gray-600 mb-4">A especialidade que você procura não foi encontrada.</p>
          <Link to="/specialties">
            <Button>Voltar às Especialidades</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <Link to="/specialties">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às Especialidades
            </Button>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-medical-blue/10 rounded-lg">
                  <Heart className="h-8 w-8 text-medical-blue" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{specialty.name}</h1>
                  <Badge className="mt-1">{specialty.category}</Badge>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl">{specialty.description}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/test">
                <Button className="medical-button">
                  <Brain className="h-4 w-4 mr-2" />
                  Fazer Teste de Compatibilidade
                </Button>
              </Link>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Mentoria
              </Button>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                R$ {specialty.salary.average.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600">Salário médio</p>
              <p className="text-xs text-gray-500 mt-1">{specialty.salary.description}</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <GraduationCap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{specialty.yearsTraining}</div>
              <p className="text-sm text-gray-600">Anos de residência</p>
              <p className="text-xs text-gray-500 mt-1">Após a graduação</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{specialty.jobMarket.availability}%</div>
              <p className="text-sm text-gray-600">Disponibilidade</p>
              <p className="text-xs text-gray-500 mt-1">Vagas no mercado</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-medical-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{specialty.stress}</div>
              <p className="text-sm text-gray-600">Nível de estresse</p>
              <p className="text-xs text-gray-500 mt-1">Durante o trabalho</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="routine">Rotina</TabsTrigger>
                <TabsTrigger value="career">Carreira</TabsTrigger>
                <TabsTrigger value="market">Mercado</TabsTrigger>
                <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Sobre a Especialidade</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{specialty.fullDescription}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          Principais Vantagens
                        </h4>
                        <ul className="space-y-2">
                          {specialty.pros.map((pro, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                          Principais Desafios
                        </h4>
                        <ul className="space-y-2">
                          {specialty.cons.map((con, index) => (
                            <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Habilidades Necessárias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {specialty.keySkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="justify-center p-2">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="routine" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Dia Típico de Trabalho</CardTitle>
                    <CardDescription>Rotina comum durante um plantão de 12 horas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specialty.dailyRoutine.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-16 h-8 bg-medical-blue/10 rounded flex items-center justify-center text-xs font-medium text-medical-blue">
                            {activity.split(' - ')[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{activity.split(' - ')[1]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Principais Procedimentos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {specialty.procedures.map((procedure, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <CheckCircle className="h-4 w-4 text-medical-green" />
                          <span className="text-sm">{procedure}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Locais de Atuação</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {specialty.workLocations.map((location, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <MapPin className="h-4 w-4 text-medical-blue" />
                          <span className="text-sm">{location}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="career" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Caminho de Formação</CardTitle>
                    <CardDescription>Etapas necessárias para se tornar um especialista</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {specialty.careerPath.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-medical-blue rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="market" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Análise do Mercado de Trabalho</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Disponibilidade de Vagas</span>
                          <span className="font-semibold">{specialty.jobMarket.availability}%</span>
                        </div>
                        <Progress value={specialty.jobMarket.availability} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Crescimento Esperado</span>
                          <span className="font-semibold">{specialty.jobMarket.growth}% ao ano</span>
                        </div>
                        <Progress value={specialty.jobMarket.growth * 5} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Competitividade</span>
                          <span className="font-semibold">{specialty.jobMarket.competition}%</span>
                        </div>
                        <Progress value={specialty.jobMarket.competition} className="h-2" />
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Perspectivas de Mercado</h4>
                      <p className="text-sm text-gray-700">
                        A {specialty.name} tem {specialty.marketDemand.toLowerCase()} demanda no mercado brasileiro. 
                        Com o envelhecimento da população e aumento dos acidentes urbanos, 
                        a necessidade por emergencistas tende a crescer nos próximos anos.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials" className="space-y-6">
                <div className="space-y-6">
                  {specialty.testimonials.map((testimonial, index) => (
                    <Card key={index} className="medical-card">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-medical-blue/10 rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-medical-blue" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <Badge variant="outline">{testimonial.role}</Badge>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div key={i} className={`w-3 h-3 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                    ⭐
                                  </div>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm italic">"{testimonial.text}"</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Vídeos de Profissionais</CardTitle>
                    <CardDescription>Depoimentos em vídeo de especialistas na área</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {specialty.videoEmbeds.map((videoUrl, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Vídeo {index + 1} - Depoimento Profissional</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Assistir Vídeo
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Teste de Compatibilidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Descubra o quanto esta especialidade combina com seu perfil através do nosso teste vocacional.
                </p>
                <Link to="/test">
                  <Button className="w-full medical-button">
                    <Brain className="h-4 w-4 mr-2" />
                    Fazer Teste Completo
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Informações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Categoria:</span>
                  <Badge>{specialty.category}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Horário:</span>
                  <span className="text-sm font-medium">{specialty.workSchedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Formação:</span>
                  <span className="text-sm font-medium">{specialty.yearsTraining} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Demanda:</span>
                  <span className="text-sm font-medium">{specialty.marketDemand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Estresse:</span>
                  <span className="text-sm font-medium">{specialty.stress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Equilíbrio:</span>
                  <span className="text-sm font-medium">{specialty.workLifeBalance}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="medical-card bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-lg">Fale com um Especialista</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Tire suas dúvidas diretamente com profissionais experientes na área.
                </p>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Mentoria
                </Button>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Especialidades Relacionadas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/specialty/surgery" className="block">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Cirurgia Geral
                  </Button>
                </Link>
                <Link to="/specialty/cardiology" className="block">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Cardiologia
                  </Button>
                </Link>
                <Link to="/specialty/anesthesiology" className="block">
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    Anestesiologia
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtyDetail;
