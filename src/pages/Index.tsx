
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { 
  CheckCircle, 
  Star, 
  Users, 
  TrendingUp, 
  Brain, 
  Heart, 
  Eye,
  Activity,
  Zap,
  Target,
  Award,
  ArrowRight,
  PlayCircle,
  Sparkles
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-medical-gradient rounded-full flex items-center justify-center animate-pulse-medical">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              Descubra sua{' '}
              <span className="bg-medical-gradient bg-clip-text text-transparent">
                especialidade médica
              </span>{' '}
              ideal
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Plataforma de teste vocacional científico para estudantes de medicina. 
              Analise sua personalidade, interesses e estilo de vida para encontrar 
              a especialidade perfeita para você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Acessar Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-medical-blue hover:from-blue-700 hover:to-medical-blue-dark text-white text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      <Zap className="w-5 h-5 mr-2" />
                      Começar Teste Grátis
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link to="/specialties">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-2 border-medical-blue text-medical-blue hover:bg-medical-blue hover:text-white transition-all duration-200">
                      <Target className="w-5 h-5 mr-2" />
                      Explorar Especialidades
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center animate-scale-in bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-medical-blue" />
                </div>
                <div className="text-3xl font-bold text-medical-blue">50+</div>
                <div className="text-gray-600">Especialidades Médicas</div>
              </div>
              <div className="text-center animate-scale-in bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-medical-green" />
                </div>
                <div className="text-3xl font-bold text-medical-green">90</div>
                <div className="text-gray-600">Questões Científicas</div>
              </div>
              <div className="text-center animate-scale-in bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600">95%</div>
                <div className="text-gray-600">Precisão do Teste</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona o MedVocation?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Metodologia científica em 4 módulos para uma avaliação completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="medical-card hover:scale-105 transition-transform duration-300 border-l-4 border-l-blue-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Personalidade
                </CardTitle>
                <CardDescription>30 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Análise de traços comportamentais, tolerância ao estresse e preferências de trabalho
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300 border-l-4 border-l-red-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Interesses
                </CardTitle>
                <CardDescription>25 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Preferências por procedimentos, faixas etárias e áreas de atuação médica
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300 border-l-4 border-l-green-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Estilo de Vida
                </CardTitle>
                <CardDescription>20 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Equilíbrio trabalho-vida, disponibilidade para plantões e expectativas salariais
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300 border-l-4 border-l-purple-500">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5 text-purple-500" />
                  Habilidades
                </CardTitle>
                <CardDescription>15 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Avaliação de coordenação motora, raciocínio analítico e habilidades comunicativas
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-medical-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-medical-gradient rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Por que escolher o MedVocation?
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Brain className="w-4 h-4 text-medical-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Metodologia Científica</h3>
                    <p className="text-gray-600">Baseado em psicometria e análise de dados de milhares de médicos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-medical-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Relatórios Detalhados</h3>
                    <p className="text-gray-600">Análise completa com top 5 especialidades e gráficos de compatibilidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Activity className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Base de Dados Atualizada</h3>
                    <p className="text-gray-600">Informações atuais sobre mercado, salários e rotina de cada especialidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <Users className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Suporte Personalizado</h3>
                    <p className="text-gray-600">Orientação profissional e consultoria para planos premium</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-yellow-400">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  +10.000 estudantes já descobriram sua vocação
                </h3>
                <p className="text-gray-600 mb-6">
                  Junte-se aos milhares de estudantes que já encontraram sua especialidade ideal
                </p>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-gray-600 ml-2">4.9/5 (2.847 avaliações)</span>
                </div>
                {!user && (
                  <Link to="/register">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white w-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Começar Meu Teste Agora
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-medical-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-green-600/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para descobrir sua especialidade médica?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Comece agora mesmo seu teste vocacional gratuito e dê o primeiro passo 
            para uma carreira médica de sucesso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/test">
                <Button size="lg" className="bg-white text-medical-blue hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Fazer Teste Vocacional
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="bg-white text-medical-blue hover:bg-gray-100 text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                    <Zap className="w-5 h-5 mr-2" />
                    Cadastrar Grátis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-2 border-white hover:bg-white hover:text-medical-blue transition-all duration-200 shadow-lg hover:shadow-xl">
                    <Award className="w-5 h-5 mr-2" />
                    Ver Planos
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-medical-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">MV</span>
                </div>
                <span className="text-xl font-bold">MedVocation</span>
              </div>
              <p className="text-gray-400">
                A plataforma de teste vocacional mais precisa para estudantes de medicina.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Produto
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/test" className="hover:text-white transition-colors flex items-center gap-2"><PlayCircle className="w-3 h-3" />Teste Vocacional</Link></li>
                <li><Link to="/specialties" className="hover:text-white transition-colors flex items-center gap-2"><Heart className="w-3 h-3" />Especialidades</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors flex items-center gap-2"><Award className="w-3 h-3" />Planos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Empresa
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Suporte
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MedVocation. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
