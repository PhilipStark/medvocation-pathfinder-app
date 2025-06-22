import { testModules } from '@/data/testModules';
import { specialties } from '@/data/specialties';
import { TestResponses } from '@/types/test';
import { normalizeScores } from './testValidation';
import { calculateImprovedResults } from './improvedTestCalculations';

export const calculateResults = (responses: TestResponses) => {
  // Use the improved calculation algorithm
  return calculateImprovedResults(responses);
};

export const getTopSpecialties = (scores: Record<string, number>, limit: number = 8) => {
  // Mapeamento de IDs para nomes em português
  const specialtyNames: Record<string, string> = {
    'emergency': 'Medicina de Emergência',
    'surgery': 'Cirurgia Geral',
    'cardiology': 'Cardiologia',
    'anesthesiology': 'Anestesiologia',
    'psychiatry': 'Psiquiatria',
    'dermatology': 'Dermatologia',
    'radiology': 'Radiologia',
    'pathology': 'Patologia',
    'pediatrics': 'Pediatria',
    'family_medicine': 'Medicina de Família',
    'internal_medicine': 'Clínica Médica',
    'orthopedics': 'Ortopedia',
    'neurology': 'Neurologia',
    'oncology': 'Oncologia'
  };

  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([id, score]) => ({
      specialty: {
        id,
        name: specialtyNames[id] || id,
        category: getSpecialtyCategory(id)
      },
      score: Math.round(score)
    }));
};

const getSpecialtyCategory = (specialtyId: string): string => {
  const categories: Record<string, string> = {
    'emergency': 'Urgência e Emergência',
    'surgery': 'Cirúrgica',
    'cardiology': 'Clínica',
    'anesthesiology': 'Apoio',
    'psychiatry': 'Clínica',
    'dermatology': 'Clínica',
    'radiology': 'Diagnóstica',
    'pathology': 'Diagnóstica',
    'pediatrics': 'Clínica',
    'family_medicine': 'Clínica',
    'internal_medicine': 'Clínica',
    'orthopedics': 'Cirúrgica',
    'neurology': 'Clínica',
    'oncology': 'Clínica'
  };
  
  return categories[specialtyId] || 'Especialidade';
};

export const getScoreInterpretation = (score: number) => {
  if (score >= 90) return { 
    level: 'Excelente Compatibilidade', 
    color: 'text-green-700', 
    bg: 'bg-green-100',
    description: 'Esta especialidade combina perfeitamente com seu perfil!'
  };
  if (score >= 80) return { 
    level: 'Alta Compatibilidade', 
    color: 'text-green-600', 
    bg: 'bg-green-50',
    description: 'Muito boa opção para considerar em sua escolha.'
  };
  if (score >= 70) return { 
    level: 'Boa Compatibilidade', 
    color: 'text-blue-600', 
    bg: 'bg-blue-50',
    description: 'Especialidade com bom potencial de adequação.'
  };
  if (score >= 60) return { 
    level: 'Compatibilidade Moderada', 
    color: 'text-yellow-600', 
    bg: 'bg-yellow-50',
    description: 'Pode ser uma opção, mas avalie outros fatores.'
  };
  if (score >= 50) return { 
    level: 'Baixa Compatibilidade', 
    color: 'text-orange-600', 
    bg: 'bg-orange-50',
    description: 'Não parece ser a melhor opção para seu perfil.'
  };
  return { 
    level: 'Muito Baixa Compatibilidade', 
    color: 'text-red-600', 
    bg: 'bg-red-50',
    description: 'Esta especialidade não combina com suas características.'
  };
};

export const getDetailedAnalysis = (responses: TestResponses, topSpecialties: any[]) => {
  const moduleProgress = getTestProgress(responses);
  const totalResponses = Object.keys(responses).length;
  
  return {
    completionRate: (totalResponses / 90) * 100,
    moduleBreakdown: moduleProgress,
    personalityInsights: getPersonalityInsights(responses),
    careerRecommendations: getCareerRecommendations(topSpecialties),
    nextSteps: getNextSteps(topSpecialties)
  };
};

const getTestProgress = (responses: TestResponses) => {
  const moduleKeys = Object.keys(testModules) as Array<keyof typeof testModules>;
  const progress: Record<string, { answered: number; total: number; percentage: number }> = {};
  
  moduleKeys.forEach(moduleKey => {
    const module = testModules[moduleKey];
    const answered = module.questions.filter(q => responses[q.id] !== undefined).length;
    const total = module.questions.length;
    
    progress[moduleKey] = {
      answered,
      total,
      percentage: (answered / total) * 100
    };
  });
  
  return progress;
};

const getPersonalityInsights = (responses: TestResponses) => {
  // Analyze personality based on responses to personality module
  const personalityResponses = Object.entries(responses)
    .filter(([id]) => parseInt(id) <= 22)
    .map(([, response]) => response);
  
  const avgResponse = personalityResponses.reduce((sum, r) => sum + r, 0) / personalityResponses.length;
  
  let insights = [];
  
  if (avgResponse >= 4) {
    insights.push("Você demonstra características de liderança e iniciativa");
    insights.push("Tem perfil para especialidades de alta responsabilidade");
  } else if (avgResponse >= 3) {
    insights.push("Apresenta equilíbrio entre colaboração e autonomia");
    insights.push("Adapta-se bem a diferentes ambientes de trabalho");
  } else {
    insights.push("Prefere trabalho colaborativo e ambientes estruturados");
    insights.push("Valoriza estabilidade e previsibilidade");
  }
  
  return insights;
};

const getCareerRecommendations = (topSpecialties: any[]) => {
  const recommendations = [];
  
  if (topSpecialties.length > 0) {
    const topSpecialty = topSpecialties[0];
    recommendations.push(`Considere fazer estágios ou observação na área de ${topSpecialty.specialty.name}`);
    recommendations.push("Busque conversar com profissionais da área para entender melhor a rotina");
    recommendations.push("Participe de eventos e congressos relacionados às suas top 3 especialidades");
  }
  
  return recommendations;
};

const getNextSteps = (topSpecialties: any[]) => {
  return [
    "Pesquise sobre programas de residência nas especialidades indicadas",
    "Identifique hospitais e serviços de referência nas áreas de interesse",
    "Considere fazer iniciação científica relacionada às especialidades",
    "Busque mentoria com profissionais experientes",
    "Avalie a grade curricular da faculdade para focar em disciplinas relevantes"
  ];
};
