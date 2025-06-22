
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  GraduationCap,
  MapPin
} from 'lucide-react';

interface SpecialtyInfo {
  name: string;
  category: string;
  salary_range: string;
  demand_level: 'Baixa' | 'Média' | 'Alta' | 'Muito Alta';
  formation_years: number;
  work_locations: string[];
  description: string;
}

interface SpecialtyCardProps {
  specialty: SpecialtyInfo;
  score: number;
  rank: number;
}

const SpecialtyCard = ({ specialty, score, rank }: SpecialtyCardProps) => {
  const getDemandColor = (level: string) => {
    switch (level) {
      case 'Muito Alta': return 'bg-green-100 text-green-800 border-green-200';
      case 'Alta': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Média': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baixa': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <Card className="medical-card hover:shadow-lg transition-all duration-300 border-l-4 border-l-medical-blue">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-medical-blue text-white font-bold text-lg">
              #{rank}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{specialty.name}</h3>
              <p className="text-sm text-gray-600">{specialty.category}</p>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${getScoreColor(score)}`}>
            {score}%
          </div>
        </div>

        <Progress value={score} className="mb-4" />

        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {specialty.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-medical-green" />
            <div>
              <p className="text-xs text-gray-500">Faixa Salarial</p>
              <p className="font-semibold text-sm">{specialty.salary_range}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-medical-blue" />
            <div>
              <p className="text-xs text-gray-500">Demanda</p>
              <Badge className={`text-xs ${getDemandColor(specialty.demand_level)}`}>
                {specialty.demand_level}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-medical-gold" />
            <div>
              <p className="text-xs text-gray-500">Formação</p>
              <p className="font-semibold text-sm">{specialty.formation_years} anos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-medical-red" />
            <div>
              <p className="text-xs text-gray-500">Locais</p>
              <p className="font-semibold text-sm">{specialty.work_locations.slice(0, 2).join(', ')}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialtyCard;
