
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/Navbar';
import { 
  Brain, 
  Clock, 
  Star, 
  TrendingUp, 
  BookOpen, 
  Award,
  Activity,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data - será substituído por dados reais do Supabase
  const userStats = {
    testsCompleted: 2,
    currentTestProgress: 65,
    topSpecialty: { name: 'Cardiologia', match: 87 },
    lastTestDate: '2024-01-15',
    planType: 'Premium'
  };

  const recentResults = [
    { id: 1, date: '2024-01-15', topSpecialty: 'Cardiologia', match: 87 },
    { id: 2, date: '2024-01-10', topSpecialty: 'Neurologia', match: 82 }
  ];

  const recommendedSpecialties = [
    { name: 'Cardiologia', match: 87, category: 'Clínica' },
    { name: 'Neurologia', match: 82, category: 'Clínica' },
    { name: 'Ortopedia', match: 78, category: 'Cirúrgica' },
    { name: 'Radiologia', match: 75, category: 'Diagnóstica' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Olá, {user?.user_metadata?.name || 'Estudante'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Bem-vindo ao seu painel de controle vocacional. Aqui você pode acompanhar seu progresso e descobrir sua especialidade ideal.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testes Realizados</CardTitle>
              <Brain className="h-4 w-4 text-medical-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.testsCompleted}</div>
              <p className="text-xs text-muted-foreground">
                +1 desde a semana passada
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Melhor Match</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.topSpecialty.match}%</div>
              <p className="text-xs text-muted-foreground">
                {userStats.topSpecialty.name}
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plano Atual</CardTitle>
              <Award className="h-4 w-4 text-medical-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.planType}</div>
              <p className="text-xs text-muted-foreground">
                Acesso completo
              </p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progresso Atual</CardTitle>
              <Activity className="h-4 w-4 text-medical-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.currentTestProgress}%</div>
              <p className="text-xs text-muted-foreground">
                Teste em andamento
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-medical-blue" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>
                  Continue sua jornada vocacional
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/test">
                    <Button className="w-full medical-button h-20 flex flex-col items-center justify-center space-y-2">
                      <Brain className="h-6 w-6" />
                      <span>Novo Teste Vocacional</span>
                    </Button>
                  </Link>
                  
                  <Link to="/results">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                      <Star className="h-6 w-6" />
                      <span>Ver Resultados</span>
                    </Button>
                  </Link>
                  
                  <Link to="/specialties">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                      <BookOpen className="h-6 w-6" />
                      <span>Explorar Especialidades</span>
                    </Button>
                  </Link>
                  
                  <Link to="/pricing">
                    <Button variant="outline" className="w-full h-20 flex flex-col items-center justify-center space-y-2">
                      <Award className="h-6 w-6" />
                      <span>Upgrade de Plano</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-medical-blue" />
                  Resultados Recentes
                </CardTitle>
                <CardDescription>
                  Seus últimos testes vocacionais
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentResults.length > 0 ? (
                  <div className="space-y-4">
                    {recentResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-medium">{result.topSpecialty}</h4>
                          <p className="text-sm text-gray-600">{result.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-medical-blue">{result.match}%</div>
                          <div className="text-sm text-gray-600">compatibilidade</div>
                        </div>
                      </div>
                    ))}
                    <Link to="/results">
                      <Button variant="outline" className="w-full">
                        Ver Todos os Resultados
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Nenhum teste realizado ainda</p>
                    <Link to="/test">
                      <Button className="medical-button">Fazer Primeiro Teste</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Progresso do Teste</CardTitle>
                <CardDescription>
                  Continue de onde parou
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Personalidade</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Interesses</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Estilo de Vida</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Habilidades</span>
                      <span>0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <Link to="/test">
                    <Button className="w-full medical-button">
                      Continuar Teste
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Specialties */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Especialidades Recomendadas</CardTitle>
                <CardDescription>
                  Baseado no seu perfil atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recommendedSpecialties.map((specialty, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sm">{specialty.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {specialty.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-medical-blue font-bold text-sm">
                          {specialty.match}%
                        </div>
                      </div>
                    </div>
                  ))}
                  <Link to="/specialties">
                    <Button variant="outline" size="sm" className="w-full">
                      Ver Todas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="medical-card bg-medical-gradient-light">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-medical-blue" />
                  Dica Vocacional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Lembre-se: não existe especialidade "melhor" ou "pior". O importante é encontrar aquela que combina com seu perfil e seus objetivos de vida.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Mais Dicas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
