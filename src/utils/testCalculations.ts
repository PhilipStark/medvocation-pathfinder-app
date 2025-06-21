
import { testModules } from '@/data/testModules';
import { specialties } from '@/data/specialties';
import { TestResponses } from '@/types/test';
import { normalizeScores } from './testValidation';

export const calculateResults = (responses: TestResponses) => {
  const scores: Record<string, number> = {};
  
  // Pesos ajustados para cada módulo baseado na importância para escolha vocacional
  const moduleWeights: Record<string, number> = {
    personality: 1.0,    // Base: características fundamentais
    interests: 1.3,      // Maior peso: área de interesse é crucial
    lifestyle: 1.1,      // Importante: compatibilidade com estilo de vida
    values: 1.2          // Muito importante: motivações e valores pessoais
  };
  
  // Initialize scores para todas as especialidades
  const allSpecialties = [
    'emergency', 'surgery', 'cardiology', 'anesthesiology', 'psychiatry',
    'dermatology', 'radiology', 'pathology', 'pediatrics', 'family_medicine',
    'internal_medicine', 'orthopedics', 'neurology', 'oncology'
  ];
  
  allSpecialties.forEach(specialty => {
    scores[specialty] = 0;
  });

  // Calculate weighted scores by module
  Object.entries(testModules).forEach(([moduleKey, module]) => {
    const moduleWeight = moduleWeights[moduleKey] || 1.0;
    
    module.questions.forEach(question => {
      const response = responses[question.id];
      if (response !== undefined) {
        Object.entries(question.weights).forEach(([specialtyId, weight]) => {
          if (scores[specialtyId] !== undefined) {
            // Convert 1-5 scale to 0-1, apply weights and module importance
            const normalizedResponse = (response - 1) / 4;
            
            // Ajuste na fórmula para dar mais variação nos resultados
            const contributionScore = normalizedResponse * weight * moduleWeight;
            scores[specialtyId] += contributionScore * 100; // Escala para 0-100
          }
        });
      }
    });
  });

  // Normalize scores to 0-100 range
  const maxScore = Math.max(...Object.values(scores));
  const minScore = Math.min(...Object.values(scores));
  const range = maxScore - minScore;
  
  const normalizedScores: Record<string, number> = {};
  
  if (range > 0) {
    Object.entries(scores).forEach(([specialtyId, score]) => {
      // Normalização melhorada para garantir variação significativa
      const normalizedScore = ((score - minScore) / range) * 85 + 15; // Range 15-100
      normalizedScores[specialtyId] = Math.round(normalizedScore);
    });
  } else {
    // Se todos os scores são iguais, distribute equally
    Object.keys(scores).forEach(specialtyId => {
      normalizedScores[specialtyId] = 50;
    });
  }

  // Ensure minimum meaningful differences between specialties
  const sortedEntries = Object.entries(normalizedScores).sort(([,a], [,b]) => b - a);
  
  // Adjust scores to ensure clear hierarchy
  sortedEntries.forEach(([specialtyId, score], index) => {
    if (index === 0) {
      // Top specialty gets boost
      normalizedScores[specialtyId] = Math.min(100, score + 5);
    } else if (index <= 2) {
      // Top 3 get slight adjustment
      normalizedScores[specialtyId] = Math.max(15, score - index);
    }
  });

  return normalizedScores;
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
