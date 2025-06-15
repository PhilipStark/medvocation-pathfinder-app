
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Calendar,
  Edit2,
  Save,
  Download,
  Share2,
  Trophy,
  Brain,
  BookOpen,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Star,
  Target,
  Clock,
  Users
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.user_metadata?.name || 'João Silva',
    email: user?.email || 'joao.silva@email.com',
    phone: '+55 11 99999-9999',
    university: 'Universidade de São Paulo',
    semester: '8º semestre',
    location: 'São Paulo, SP',
    birthDate: '1995-03-15',
    bio: 'Estudante de medicina apaixonado por cardiologia e medicina de emergência. Sempre em busca de conhecimento e experiências práticas.',
    interests: ['Cardiologia', 'Medicina de Emergência', 'Pesquisa Científica']
  });

  const [notifications, setNotifications] = useState({
    emailResults: true,
    weeklyNewsletter: true,
    specialtyUpdates: false,
    marketingEmails: false
  });

  // Mock data for user statistics
  const userStats = {
    testsCompleted: 3,
    profileCompletion: 85,
    topSpecialty: { name: 'Cardiologia', match: 89 },
    joinDate: '2024-01-15',
    lastActive: '2024-01-20',
    planType: 'Premium',
    planExpiry: '2024-02-20'
  };

  const testHistory = [
    {
      id: 1,
      date: '2024-01-20',
      type: 'Completo',
      topResult: 'Cardiologia',
      score: 89,
      duration: 32
    },
    {
      id: 2,
      date: '2024-01-15',
      type: 'Personalidade',
      topResult: 'Medicina de Emergência',
      score: 85,
      duration: 15
    },
    {
      id: 3,
      date: '2024-01-10',
      type: 'Completo',
      topResult: 'Neurologia',
      score: 78,
      duration: 28
    }
  ];

  const favoriteSpecialties = [
    { name: 'Cardiologia', match: 89, category: 'Clínica' },
    { name: 'Medicina de Emergência', match: 85, category: 'Clínica' },
    { name: 'Neurologia', match: 78, category: 'Clínica' },
    { name: 'Cirurgia Geral', match: 72, category: 'Cirúrgica' }
  ];

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profileData);
      setIsEditing(false);
      // Show success message
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-medical-blue/10 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-medical-blue" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                <p className="text-gray-600">{profileData.university} - {profileData.semester}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge>{userStats.planType}</Badge>
                  <span className="text-sm text-gray-500">
                    Membro desde {new Date(userStats.joinDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Baixar CV Vocacional
              </Button>
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar Perfil
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Brain className="h-8 w-8 text-medical-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.testsCompleted}</div>
              <p className="text-sm text-gray-600">Testes Realizados</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.topSpecialty.match}%</div>
              <p className="text-sm text-gray-600">Melhor Compatibilidade</p>
              <p className="text-xs text-gray-500">{userStats.topSpecialty.name}</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-medical-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{userStats.profileCompletion}%</div>
              <p className="text-sm text-gray-600">Perfil Completo</p>
            </CardContent>
          </Card>

          <Card className="medical-card">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(testHistory.reduce((acc, test) => acc + test.duration, 0) / testHistory.length)}min
              </div>
              <p className="text-sm text-gray-600">Tempo Médio/Teste</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="tests">Histórico</TabsTrigger>
                <TabsTrigger value="specialties">Especialidades</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Informações Pessoais</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar
                          </>
                        ) : (
                          <>
                            <Edit2 className="h-4 w-4 mr-2" />
                            Editar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData(prev => ({ ...prev, birthDate: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="university">Universidade</Label>
                        <Select 
                          value={profileData.university} 
                          onValueChange={(value) => setProfileData(prev => ({ ...prev, university: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Universidade de São Paulo">USP - Universidade de São Paulo</SelectItem>
                            <SelectItem value="Universidade Federal do Rio de Janeiro">UFRJ - Universidade Federal do Rio de Janeiro</SelectItem>
                            <SelectItem value="Universidade Federal de Minas Gerais">UFMG - Universidade Federal de Minas Gerais</SelectItem>
                            <SelectItem value="Universidade Federal de São Paulo">UNIFESP - Universidade Federal de São Paulo</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="semester">Período Atual</Label>
                        <Select 
                          value={profileData.semester} 
                          onValueChange={(value) => setProfileData(prev => ({ ...prev, semester: value }))}
                          disabled={!isEditing}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1º semestre">1º semestre</SelectItem>
                            <SelectItem value="2º semestre">2º semestre</SelectItem>
                            <SelectItem value="3º semestre">3º semestre</SelectItem>
                            <SelectItem value="4º semestre">4º semestre</SelectItem>
                            <SelectItem value="5º semestre">5º semestre</SelectItem>
                            <SelectItem value="6º semestre">6º semestre</SelectItem>
                            <SelectItem value="7º semestre">7º semestre</SelectItem>
                            <SelectItem value="8º semestre">8º semestre</SelectItem>
                            <SelectItem value="9º semestre">9º semestre</SelectItem>
                            <SelectItem value="10º semestre">10º semestre</SelectItem>
                            <SelectItem value="11º semestre">11º semestre</SelectItem>
                            <SelectItem value="12º semestre">12º semestre</SelectItem>
                            <SelectItem value="Formado">Já formado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Localização</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div>
                      <Label htmlFor="bio">Sobre Mim</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={3}
                      />
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveProfile} className="medical-button">
                          Salvar Alterações
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Completude do Perfil</CardTitle>
                    <CardDescription>
                      Complete seu perfil para obter recomendações mais precisas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progresso do Perfil</span>
                        <span className="font-semibold">{userStats.profileCompletion}%</span>
                      </div>
                      <Progress value={userStats.profileCompletion} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <User className="h-4 w-4 text-green-600" />
                          Informações básicas
                        </span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-green-600" />
                          Dados acadêmicos
                        </span>
                        <span className="text-green-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-yellow-600" />
                          Teste vocacional
                        </span>
                        <span className="text-yellow-600">Parcial</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400" />
                          Foto de perfil
                        </span>
                        <span className="text-gray-400">Pendente</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tests" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Histórico de Testes</CardTitle>
                    <CardDescription>
                      Acompanhe a evolução dos seus resultados vocacionais
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testHistory.map((test) => (
                        <div key={test.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-medical-blue/10 rounded-full flex items-center justify-center">
                                <Brain className="h-5 w-5 text-medical-blue" />
                              </div>
                              <div>
                                <h4 className="font-semibold">Teste {test.type}</h4>
                                <p className="text-sm text-gray-600">
                                  {new Date(test.date).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-medical-blue">{test.score}%</div>
                              <div className="text-sm text-gray-600">{test.duration} min</div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-600">Melhor resultado: </span>
                              <span className="font-medium">{test.topResult}</span>
                            </div>
                            <Button variant="outline" size="sm">
                              Ver Detalhes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specialties" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle>Especialidades Favoritas</CardTitle>
                    <CardDescription>
                      Suas especialidades com maior compatibilidade
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {favoriteSpecialties.map((specialty, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                            <div>
                              <h4 className="font-semibold">{specialty.name}</h4>
                              <Badge variant="secondary" className="text-xs">
                                {specialty.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-medical-blue">{specialty.match}%</div>
                            <div className="text-sm text-gray-600">compatibilidade</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notificações
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Resultados de testes por email</h4>
                        <p className="text-sm text-gray-600">Receba seus resultados por email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.emailResults}
                        onChange={(e) => handleNotificationChange('emailResults', e.target.checked)}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Newsletter semanal</h4>
                        <p className="text-sm text-gray-600">Dicas vocacionais e novidades</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.weeklyNewsletter}
                        onChange={(e) => handleNotificationChange('weeklyNewsletter', e.target.checked)}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Atualizações de especialidades</h4>
                        <p className="text-sm text-gray-600">Novos conteúdos sobre suas especialidades favoritas</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.specialtyUpdates}
                        onChange={(e) => handleNotificationChange('specialtyUpdates', e.target.checked)}
                        className="rounded"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Emails promocionais</h4>
                        <p className="text-sm text-gray-600">Ofertas e promoções especiais</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.marketingEmails}
                        onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                        className="rounded"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="medical-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Privacidade e Segurança
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Alterar senha
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar meus dados
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Excluir minha conta
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Plano Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge className="mb-2">{userStats.planType}</Badge>
                  <p className="text-sm text-gray-600">
                    Expira em {new Date(userStats.planExpiry).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <Button className="w-full medical-button">
                  Gerenciar Assinatura
                </Button>
                <Button variant="outline" className="w-full">
                  Fazer Upgrade
                </Button>
              </CardContent>
            </Card>

            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Programa de Indicação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-medical-blue mb-1">0/3</div>
                  <p className="text-sm text-gray-600">Indicações para próximo mês gratuito</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Indicar Amigos
                </Button>
              </CardContent>
            </Card>

            <Card className="medical-card bg-gradient-to-r from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Dica do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4">
                  Refaça o teste a cada 6 meses para acompanhar a evolução do seu perfil vocacional!
                </p>
                <Button size="sm" variant="outline" className="w-full">
                  Ver Mais Dicas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
