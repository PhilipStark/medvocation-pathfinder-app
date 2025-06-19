
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UniversityCombobox } from '@/components/UniversityCombobox';
import { Edit2, Save, X } from 'lucide-react';

interface ProfileData {
  name?: string;
  university?: string;
  semester?: string;
}

interface ProfileEditFormProps {
  profile: ProfileData | null;
  onSave: (data: ProfileData) => Promise<boolean>;
  updating: boolean;
}

const ProfileEditForm = ({ profile, onSave, updating }: ProfileEditFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    name: profile?.name || '',
    university: profile?.university || '',
    semester: profile?.semester || ''
  });

  const handleSave = async () => {
    const success = await onSave(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || '',
      university: profile?.university || '',
      semester: profile?.semester || ''
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Card className="medical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Dados do Perfil</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Editar
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-600">Nome</Label>
            <p className="text-gray-900">{profile?.name || 'Não informado'}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Universidade</Label>
            <p className="text-gray-900">{profile?.university || 'Não informado'}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-600">Período</Label>
            <p className="text-gray-900">{profile?.semester || 'Não informado'}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="medical-card">
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name">Nome Completo</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <Label htmlFor="university">Universidade</Label>
          <UniversityCombobox
            value={formData.university || ''}
            onValueChange={(value) => setFormData(prev => ({ ...prev, university: value }))}
            placeholder="Selecione ou digite sua universidade"
            className="medical-input"
          />
        </div>

        <div>
          <Label htmlFor="semester">Período Atual</Label>
          <Select 
            value={formData.semester} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione seu período" />
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

        <div className="flex gap-2 pt-4">
          <Button 
            onClick={handleSave} 
            disabled={updating}
            className="medical-button flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {updating ? 'Salvando...' : 'Salvar'}
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            disabled={updating}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEditForm;
