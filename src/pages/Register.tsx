
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    semester: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const universities = [
    'Universidade de São Paulo (USP)',
    'Universidade Federal do Rio de Janeiro (UFRJ)',
    'Universidade Federal de Minas Gerais (UFMG)',
    'Universidade Federal do Rio Grande do Sul (UFRGS)',
    'Universidade Federal de São Paulo (UNIFESP)',
    'Universidade de Brasília (UnB)',
    'Universidade Federal da Bahia (UFBA)',
    'Universidade Federal do Paraná (UFPR)',
    'Universidade Federal de Santa Catarina (UFSC)',
    'Universidade Federal do Ceará (UFC)',
    'Pontifícia Universidade Católica de São Paulo (PUC-SP)',
    'Outra'
  ];

  const semesters = [
    '1º Período', '2º Período', '3º Período', '4º Período', '5º Período', '6º Período',
    '7º Período', '8º Período', '9º Período', '10º Período', '11º Período', '12º Período',
    'Residente', 'Formado'
  ];

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validações
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setLoading(false);
      return;
    }

    if (!formData.name || !formData.university || !formData.semester) {
      setError('Por favor, preencha todos os campos obrigatórios');
      setLoading(false);
      return;
    }

    try {
      const result = await signUp(formData.email, formData.password, {
        name: formData.name,
        university: formData.university,
        semester: formData.semester
      });

      if (result.error) {
        setError(result.error);
      } else {
        // If successful and user is immediately logged in, redirect
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      setError('Erro inesperado ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-medical-gradient-light">
      <Navbar />
      
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Crie sua conta
            </h2>
            <p className="text-gray-600">
              Comece sua jornada para descobrir sua especialidade médica ideal
            </p>
          </div>

          <Card className="medical-card">
            <CardHeader>
              <CardTitle>Cadastro</CardTitle>
              <CardDescription>
                Preencha seus dados para criar sua conta gratuita
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                    className="medical-input"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="seu@email.com"
                    className="medical-input"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="university">Universidade *</Label>
                  <Select value={formData.university} onValueChange={(value) => handleChange('university', value)} required>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Selecione sua universidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="semester">Período atual *</Label>
                  <Select value={formData.semester} onValueChange={(value) => handleChange('semester', value)} required>
                    <SelectTrigger className="medical-input">
                      <SelectValue placeholder="Selecione seu período" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="medical-input"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirmar senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    placeholder="Confirme sua senha"
                    className="medical-input"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full medical-button"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    'Criar conta'
                  )}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-medical-blue hover:underline font-medium">
                    Entre aqui
                  </Link>
                </p>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                Ao se cadastrar, você concorda com nossos{' '}
                <a href="#" className="text-medical-blue hover:underline">
                  Termos de Uso
                </a>{' '}
                e{' '}
                <a href="#" className="text-medical-blue hover:underline">
                  Política de Privacidade
                </a>
                .
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Register;
