
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Navbar from '@/components/Navbar';
import { 
  Check, 
  Star, 
  Crown, 
  Users, 
  Calendar,
  Video,
  FileText,
  Brain,
  Heart,
  Shield,
  Zap,
  Gift
} from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [showReferralProgram, setShowReferralProgram] = useState(false);

  const plans = [
    {
      name: "Básico",
      price: isAnnual ? 0 : 0,
      originalPrice: 0,
      description: "Para conhecer a plataforma",
      icon: Brain,
      popular: false,
      features: [
        "1 teste vocacional completo",
        "Acesso a 3 perfis de especialidades",
        "Relatório básico de resultados",
        "Recomendações gerais",
        "Suporte por email"
      ],
      limitations: [
        "Sem acesso a vídeos profissionais",
        "Relatórios limitados",
        "Sem mentoria",
        "Anúncios na plataforma"
      ],
      cta: "Começar Grátis",
      color: "gray"
    },
    {
      name: "Premium",
      price: isAnnual ? 24.90 : 29.90,
      originalPrice: isAnnual ? 29.90 : 34.90,
      description: "Para estudantes sérios sobre sua carreira",
      icon: Star,
      popular: true,
      features: [
        "Testes vocacionais ilimitados",
        "Acesso completo a todas as especialidades",
        "Relatórios detalhados em PDF",
        "Vídeos exclusivos de profissionais",
        "Análise psicológica avançada",
        "Comparação entre especialidades",
        "Suporte prioritário",
        "Conteúdo de blog premium"
      ],
      limitations: [],
      cta: "Assinar Premium",
      color: "blue",
      savings: isAnnual ? "17% de desconto" : null
    },
    {
      name: "Pro",
      price: isAnnual ? 39.90 : 49.90,
      originalPrice: isAnnual ? 49.90 : 59.90,
      description: "Para quem quer acelerar sua decisão",
      icon: Crown,
      popular: false,
      features: [
        "Tudo do Premium",
        "1 mentoria individual mensal (1h)",
        "Acesso a webinars exclusivos",
        "Certificado digital de conclusão",
        "Acesso antecipado a novos recursos",
        "Comunidade exclusiva de estudantes",
        "Relatórios de mercado personalizados",
        "Sem anúncios",
        "Suporte VIP 24/7"
      ],
      limitations: [],
      cta: "Assinar Pro",
      color: "purple",
      savings: isAnnual ? "20% de desconto" : null
    }
  ];

  const features = [
    {
      name: "Teste Vocacional Avançado",
      basic: "1 teste",
      premium: "Ilimitado",
      pro: "Ilimitado"
    },
    {
      name: "Perfis de Especialidades",
      basic: "3 especialidades",
      premium: "50+ especialidades",
      pro: "50+ especialidades"
    },
    {
      name: "Relatórios em PDF",
      basic: "Básico",
      premium: "Detalhado",
      pro: "Personalizado"
    },
    {
      name: "Vídeos Profissionais",
      basic: false,
      premium: true,
      pro: true
    },
    {
      name: "Mentoria Individual",
      basic: false,
      premium: false,
      pro: "1h/mês"
    },
    {
      name: "Suporte",
      basic: "Email",
      premium: "Prioritário",
      pro: "VIP 24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Escolha o Plano Ideal para Sua Carreira
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Invista no seu futuro profissional. Descubra sua especialidade médica ideal 
            com ferramentas cientificamente validadas e orientação especializada.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'font-semibold text-medical-blue' : 'text-gray-600'}`}>
              Mensal
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-medical-blue"
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold text-medical-blue' : 'text-gray-600'}`}>
              Anual
            </span>
            {isAnnual && (
              <Badge className="ml-2 bg-green-100 text-green-800">
                <Gift className="h-3 w-3 mr-1" />
                Economize até 20%
              </Badge>
            )}
          </div>

          {/* Limited Time Offer Banner */}
          <div className="bg-gradient-to-r from-medical-blue to-medical-green text-white p-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Oferta por Tempo Limitado!</span>
            </div>
            <p className="text-sm">
              Primeiros 500 usuários ganham 50% de desconto no primeiro mês. 
              <span className="font-semibold"> Apenas hoje!</span>
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isPopular = plan.popular;
            
            return (
              <Card 
                key={plan.name} 
                className={`medical-card relative ${
                  isPopular ? 'border-medical-blue border-2 shadow-xl' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-medical-blue text-white px-4 py-1">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-3 rounded-lg ${
                    plan.color === 'blue' ? 'bg-medical-blue/10' :
                    plan.color === 'purple' ? 'bg-purple-100' :
                    'bg-gray-100'
                  } mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${
                      plan.color === 'blue' ? 'text-medical-blue' :
                      plan.color === 'purple' ? 'text-purple-600' :
                      'text-gray-600'
                    }`} />
                  </div>
                  
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">{plan.description}</CardDescription>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        R$ {plan.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span className="text-gray-600">/{isAnnual ? 'mês' : 'mês'}</span>
                    </div>
                    
                    {plan.originalPrice > plan.price && (
                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="text-sm text-gray-500 line-through">
                          R$ {plan.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                        {plan.savings && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {isAnnual && plan.price > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Cobrado anualmente: R$ {(plan.price * 12).toFixed(2).replace('.', ',')}
                      </p>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Incluso no plano:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-600 text-sm">Limitações:</h4>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="flex items-start gap-2 text-xs text-gray-500">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                            <span>{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button 
                    className={`w-full ${
                      isPopular ? 'medical-button' : 
                      plan.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                      ''
                    }`}
                    variant={isPopular || plan.color === 'purple' ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>

                  {plan.name === 'Premium' && (
                    <p className="text-xs text-center text-gray-500">
                      Garantia de 7 dias ou seu dinheiro de volta
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <Card className="medical-card mb-16">
          <CardHeader>
            <CardTitle className="text-center">Comparação Detalhada</CardTitle>
            <CardDescription className="text-center">
              Veja exatamente o que está incluído em cada plano
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Recursos</th>
                    <th className="text-center p-4 font-medium">Básico</th>
                    <th className="text-center p-4 font-medium">Premium</th>
                    <th className="text-center p-4 font-medium">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium">{feature.name}</td>
                      <td className="text-center p-4">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <Check className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          feature.basic
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <Check className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          feature.premium
                        )}
                      </td>
                      <td className="text-center p-4">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <Check className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )
                        ) : (
                          feature.pro
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="medical-card mb-16 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-medical-blue" />
              Programa de Indicação
            </CardTitle>
            <CardDescription>
              Ganhe Premium gratuito indicando amigos!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-medical-blue/10 text-medical-blue px-4 py-2 rounded-full mb-4">
                <Gift className="h-5 w-5" />
                Indique 3 amigos, ganhe 1 mês Premium gratuito!
              </div>
              <p className="text-gray-600 mb-6">
                Para cada amigo que fizer o teste completo, você ganha pontos. 
                Acumule 3 pontos e ganhe 1 mês de Premium totalmente grátis!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-medical-blue mb-2">1 🎯</div>
                <h4 className="font-semibold mb-1">Compartilhe</h4>
                <p className="text-sm text-gray-600">Envie seu link único para amigos</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-medical-blue mb-2">2 📝</div>
                <h4 className="font-semibold mb-1">Eles fazem o teste</h4>
                <p className="text-sm text-gray-600">Seus amigos completam o teste vocacional</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-medical-blue mb-2">3 🎉</div>
                <h4 className="font-semibold mb-1">Você ganha Premium</h4>
                <p className="text-sm text-gray-600">3 indicações = 1 mês gratuito</p>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={() => setShowReferralProgram(!showReferralProgram)}
                className="medical-button"
              >
                <Users className="h-4 w-4 mr-2" />
                Começar a Indicar Amigos
              </Button>
            </div>

            {showReferralProgram && (
              <div className="bg-white p-6 rounded-lg border">
                <h4 className="font-semibold mb-4">Seu Link de Indicação:</h4>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value="https://medvocation.com/ref/SEU_CODIGO" 
                    readOnly 
                    className="flex-1 p-2 border rounded text-sm bg-gray-50"
                  />
                  <Button variant="outline" size="sm">
                    Copiar
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Indicações atuais: <strong>0/3</strong> para próximo mês gratuito
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* University Partnership */}
        <Card className="medical-card mb-16">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-medical-blue" />
              Parcerias Universitárias
            </CardTitle>
            <CardDescription>
              Licenças em grupo para universidades e cursos preparatórios
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Benefícios para Instituições:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    Desconto progressivo por quantidade de alunos
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    Dashboard administrativo para acompanhamento
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    Relatórios agregados de turmas
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    Suporte técnico dedicado
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5" />
                    Integração com sistemas da universidade
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Preços Especiais:</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">50-100 alunos</span>
                      <span className="text-medical-blue font-bold">40% desconto</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">100-500 alunos</span>
                      <span className="text-medical-blue font-bold">50% desconto</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium">500+ alunos</span>
                      <span className="text-medical-blue font-bold">60% desconto</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button variant="outline" className="mr-4">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Demonstração
              </Button>
              <Button className="medical-button">
                <FileText className="h-4 w-4 mr-2" />
                Solicitar Proposta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card className="medical-card">
          <CardHeader className="text-center">
            <CardTitle>Perguntas Frequentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
                <p className="text-sm text-gray-600">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxa de cancelamento. 
                  Você continuará tendo acesso até o final do período pago.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Como funciona a garantia de 7 dias?</h4>
                <p className="text-sm text-gray-600">
                  Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do valor pago, 
                  sem perguntas ou burocracias.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Os resultados são cientificamente validados?</h4>
                <p className="text-sm text-gray-600">
                  Sim! Nosso teste é baseado em pesquisas psicométricas reconhecidas 
                  e validado por psicólogos especializados em orientação vocacional.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Posso mudar de plano depois?</h4>
                <p className="text-sm text-gray-600">
                  Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. 
                  Os ajustes são feitos proporcionalmente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pricing;
