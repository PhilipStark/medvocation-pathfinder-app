
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import { 
  Heart, 
  Brain, 
  Scissors, 
  Eye, 
  Search,
  Filter,
  ArrowRight,
  Clock,
  DollarSign,
  GraduationCap,
  Users
} from 'lucide-react';

const specialtiesData = [
  {
    id: "emergency",
    name: "Medicina de Emergência",
    category: "Clínica",
    icon: Heart,
    description: "Atendimento médico em situações críticas e urgentes, salvando vidas 24/7",
    salary: "R$ 15.000 - R$ 35.000",
    workSchedule: "Plantões 12x36h",
    yearsTraining: 3,
    popularity: 85,
    marketDemand: "Alta",
    stress: "Alto",
    workLifeBalance: "Médio"
  },
  {
    id: "surgery",
    name: "Cirurgia Geral",
    category: "Cirúrgica",
    icon: Scissors,
    description: "Tratamento cirúrgico de doenças do abdome, trauma e procedimentos gerais",
    salary: "R$ 20.000 - R$ 50.000",
    workSchedule: "Horário variável + plantões",
    yearsTraining: 5,
    popularity: 92,
    marketDemand: "Alta",
    stress: "Alto",
    workLifeBalance: "Baixo"
  },
  {
    id: "cardiology",
    name: "Cardiologia",
    category: "Clínica",
    icon: Heart,
    description: "Diagnóstico e tratamento de doenças cardiovasculares",
    salary: "R$ 18.000 - R$ 45.000",
    workSchedule: "Consultório + plantões ocasionais",
    yearsTraining: 3,
    popularity: 88,
    marketDemand: "Muito Alta",
    stress: "Médio",
    workLifeBalance: "Médio"
  },
  {
    id: "psychiatry",
    name: "Psiquiatria",
    category: "Clínica",
    icon: Brain,
    description: "Diagnóstico e tratamento de transtornos mentais e comportamentais",
    salary: "R$ 12.000 - R$ 30.000",
    workSchedule: "Horário flexível",
    yearsTraining: 3,
    popularity: 75,
    marketDemand: "Muito Alta",
    stress: "Médio",
    workLifeBalance: "Alto"
  },
  {
    id: "pediatrics",
    name: "Pediatria",
    category: "Clínica",
    icon: Users,
    description: "Cuidados médicos especializados para crianças e adolescentes",
    salary: "R$ 12.000 - R$ 28.000",
    workSchedule: "Consultório + plantões",
    yearsTraining: 3,
    popularity: 82,
    marketDemand: "Alta",
    stress: "Médio",
    workLifeBalance: "Médio"
  },
  {
    id: "dermatology",
    name: "Dermatologia",
    category: "Clínica",
    icon: Eye,
    description: "Diagnóstico e tratamento de doenças da pele, cabelos e unhas",
    salary: "R$ 15.000 - R$ 40.000",
    workSchedule: "Horário comercial",
    yearsTraining: 4,
    popularity: 95,
    marketDemand: "Média",
    stress: "Baixo",
    workLifeBalance: "Alto"
  },
  {
    id: "radiology",
    name: "Radiologia",
    category: "Diagnóstica",
    icon: Eye,
    description: "Diagnóstico por imagem e procedimentos radiológicos intervencionistas",
    salary: "R$ 18.000 - R$ 45.000",
    workSchedule: "Horário flexível",
    yearsTraining: 4,
    popularity: 78,
    marketDemand: "Alta",
    stress: "Baixo",
    workLifeBalance: "Alto"
  },
  {
    id: "anesthesiology",
    name: "Anestesiologia",
    category: "Cirúrgica",
    icon: Brain,
    description: "Anestesia e cuidados perioperatórios para procedimentos cirúrgicos",
    salary: "R$ 20.000 - R$ 50.000",
    workSchedule: "Horário variável",
    yearsTraining: 3,
    popularity: 70,
    marketDemand: "Alta",
    stress: "Alto",
    workLifeBalance: "Médio"
  },
  {
    id: "orthopedics",
    name: "Ortopedia",
    category: "Cirúrgica",
    icon: Scissors,
    description: "Tratamento de doenças e lesões do sistema musculoesquelético",
    salary: "R$ 22.000 - R$ 55.000",
    workSchedule: "Consultório + cirurgias",
    yearsTraining: 4,
    popularity: 85,
    marketDemand: "Alta",
    stress: "Médio",
    workLifeBalance: "Médio"
  },
  {
    id: "pathology",
    name: "Patologia",
    category: "Diagnóstica",
    icon: Eye,
    description: "Diagnóstico de doenças através da análise de tecidos e células",
    salary: "R$ 15.000 - R$ 35.000",
    workSchedule: "Horário comercial",
    yearsTraining: 4,
    popularity: 60,
    marketDemand: "Média",
    stress: "Baixo",
    workLifeBalance: "Alto"
  },
  {
    id: "family_medicine",
    name: "Medicina de Família",
    category: "Clínica",
    icon: Users,
    description: "Cuidados médicos abrangentes para toda a família em todas as idades",
    salary: "R$ 10.000 - R$ 25.000",
    workSchedule: "Horário comercial",
    yearsTraining: 2,
    popularity: 68,
    marketDemand: "Muito Alta",
    stress: "Baixo",
    workLifeBalance: "Alto"
  },
  {
    id: "internal_medicine",
    name: "Clínica Médica",
    category: "Clínica",
    icon: Heart,
    description: "Diagnóstico e tratamento não-cirúrgico de doenças em adultos",
    salary: "R$ 12.000 - R$ 30.000",
    workSchedule: "Consultório + plantões",
    yearsTraining: 3,
    popularity: 72,
    marketDemand: "Alta",
    stress: "Médio",
    workLifeBalance: "Médio"
  }
];

const Specialties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [salaryFilter, setSalaryFilter] = useState('all');
  const [trainingFilter, setTrainingFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const filteredSpecialties = specialtiesData
    .filter(specialty => {
      const matchesSearch = specialty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           specialty.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || specialty.category === categoryFilter;
      const matchesSalary = salaryFilter === 'all' || 
        (salaryFilter === 'low' && specialty.salary.includes('10.000') || specialty.salary.includes('12.000')) ||
        (salaryFilter === 'medium' && (specialty.salary.includes('15.000') || specialty.salary.includes('18.000'))) ||
        (salaryFilter === 'high' && (specialty.salary.includes('20.000') || specialty.salary.includes('22.000')));
      const matchesTraining = trainingFilter === 'all' ||
        (trainingFilter === 'short' && specialty.yearsTraining <= 3) ||
        (trainingFilter === 'long' && specialty.yearsTraining > 3);
      
      return matchesSearch && matchesCategory && matchesSalary && matchesTraining;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.popularity - a.popularity;
        case 'salary':
          return b.salary.localeCompare(a.salary);
        case 'training':
          return a.yearsTraining - b.yearsTraining;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const categories = ['all', 'Clínica', 'Cirúrgica', 'Diagnóstica'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explorar Especialidades Médicas
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubra detalhes sobre todas as especialidades médicas disponíveis no Brasil. 
            Compare salários, rotinas de trabalho e requisitos de formação.
          </p>
        </div>

        {/* Filters */}
        <Card className="medical-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-medical-blue" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar especialidade..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.slice(1).map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Faixa Salarial" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as faixas</SelectItem>
                  <SelectItem value="low">Até R$ 15.000</SelectItem>
                  <SelectItem value="medium">R$ 15.000 - R$ 25.000</SelectItem>
                  <SelectItem value="high">Acima de R$ 25.000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={trainingFilter} onValueChange={setTrainingFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tempo de Formação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Qualquer tempo</SelectItem>
                  <SelectItem value="short">Até 3 anos</SelectItem>
                  <SelectItem value="long">Mais de 3 anos</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularidade</SelectItem>
                  <SelectItem value="salary">Salário</SelectItem>
                  <SelectItem value="training">Tempo de formação</SelectItem>
                  <SelectItem value="name">Nome</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <strong>{filteredSpecialties.length}</strong> de <strong>{specialtiesData.length}</strong> especialidades
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpecialties.map((specialty) => {
            const IconComponent = specialty.icon;
            return (
              <Card key={specialty.id} className="medical-card hover:shadow-lg transition-all duration-200 group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-medical-blue/10 rounded-lg group-hover:bg-medical-blue/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-medical-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-medical-blue transition-colors">
                          {specialty.name}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {specialty.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Popularidade</div>
                      <div className="text-lg font-bold text-medical-green">
                        {specialty.popularity}%
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm">
                    {specialty.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Salário:</span>
                      <span className="text-gray-600">{specialty.salary}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Horário:</span>
                      <span className="text-gray-600">{specialty.workSchedule}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Formação:</span>
                      <span className="text-gray-600">{specialty.yearsTraining} anos</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-900">Demanda</div>
                      <div className={`font-semibold ${
                        specialty.marketDemand === 'Muito Alta' ? 'text-green-600' :
                        specialty.marketDemand === 'Alta' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {specialty.marketDemand}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-medium text-gray-900">Equilíbrio</div>
                      <div className={`font-semibold ${
                        specialty.workLifeBalance === 'Alto' ? 'text-green-600' :
                        specialty.workLifeBalance === 'Médio' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {specialty.workLifeBalance}
                      </div>
                    </div>
                  </div>

                  <Link to={`/specialty/${specialty.id}`}>
                    <Button className="w-full medical-button group-hover:bg-medical-blue/90 transition-colors">
                      Ver Detalhes Completos
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma especialidade encontrada
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou termos de busca para encontrar especialidades.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setSalaryFilter('all');
                setTrainingFilter('all');
              }}
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <Card className="medical-card mt-12 bg-gradient-to-r from-blue-50 to-green-50">
          <CardContent className="text-center py-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ainda não tem certeza da sua especialidade ideal?
            </h3>
            <p className="text-gray-600 mb-6">
              Faça nosso teste vocacional completo e descubra qual especialidade combina com seu perfil!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/test">
                <Button className="medical-button">
                  <Brain className="h-4 w-4 mr-2" />
                  Fazer Teste Vocacional
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Falar com Especialista
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Specialties;
