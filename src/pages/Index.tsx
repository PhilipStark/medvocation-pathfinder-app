
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
  Activity
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
                  <Button size="lg" className="medical-button text-lg px-8 py-3">
                    Acessar Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register">
                    <Button size="lg" className="medical-button text-lg px-8 py-3">
                      Começar Teste Grátis
                    </Button>
                  </Link>
                  <Link to="/specialties">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                      Explorar Especialidades
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center animate-scale-in">
                <div className="text-3xl font-bold text-medical-blue">50+</div>
                <div className="text-gray-600">Especialidades Médicas</div>
              </div>
              <div className="text-center animate-scale-in" style={{animationDelay: '0.1s'}}>
                <div className="text-3xl font-bold text-medical-green">90</div>
                <div className="text-gray-600">Questões Científicas</div>
              </div>
              <div className="text-center animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="text-3xl font-bold text-medical-blue">95%</div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Como funciona o MedVocation?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Metodologia científica em 4 módulos para uma avaliação completa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="medical-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Personalidade</CardTitle>
                <CardDescription>30 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Análise de traços comportamentais, tolerância ao estresse e preferências de trabalho
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Interesses</CardTitle>
                <CardDescription>25 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Preferências por procedimentos, faixas etárias e áreas de atuação médica
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Estilo de Vida</CardTitle>
                <CardDescription>20 questões</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Equilíbrio trabalho-vida, disponibilidade para plantões e expectativas salariais
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-medical-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Habilidades</CardTitle>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Por que escolher o MedVocation?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-medical-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Metodologia Científica</h3>
                    <p className="text-gray-600">Baseado em psicometria e análise de dados de milhares de médicos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-medical-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Relatórios Detalhados</h3>
                    <p className="text-gray-600">Análise completa com top 5 especialidades e gráficos de compatibilidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-medical-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Base de Dados Atualizada</h3>
                    <p className="text-gray-600">Informações atuais sobre mercado, salários e rotina de cada especialidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-medical-green mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Suporte Personalizado</h3>
                    <p className="text-gray-600">Orientação profissional e consultoria para planos premium</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center">
                <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
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
                    <Button className="medical-button w-full">
                      Começar Meu Teste Agora
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-medical-gradient">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
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
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  Fazer Teste Vocacional
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                    Cadastrar Grátis
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-medical-blue">
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
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/test" className="hover:text-white transition-colors">Teste Vocacional</Link></li>
                <li><Link to="/specialties" className="hover:text-white transition-colors">Especialidades</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Planos</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
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
